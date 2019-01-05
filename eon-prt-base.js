/****************************
 *      @prtBase
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.prtBase = global.prtBase || {})))
}(this, function (exports) {
  'use strict'

  async function prtBase (__eo = {}) {
    let [
      d3Geo,
    ] = await Promise.all([
      __eo('xs').b('d3-geo'),
    ])

    let epsilon = 1e-6
    let radians = Math.PI / 180
    let transform = d3Geo.geoTransform({ point: function (x, y) { this.stream.point(x, y) }})

    // https://medium.com/@dtipson/creating-an-es6ish-compose-in-javascript-ac580b95104a
    const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

    // ............................. fitExtent
    let fitExtent = function fitExtent (projection, extent, object) {
      var w = extent[1][0] - extent[0][0],
        h = extent[1][1] - extent[0][1],
        clip = projection.clipExtent && projection.clipExtent()

      // projection

      if (clip != null) projection.clipExtent(null)

      geoStream(object, projection.stream(boundsStream))

      var b = boundsStream.result(),
        k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
        x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
        y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2

      if (clip != null) projection.clipExtent(clip)

      return projection
    }

    let fitSize = function fitSize (projection, size, object) {
      return fitExtent(projection, [[0, 0], size], object)
    }
    // ............................. multiplex
    function multiplex (streams) {
      var n = streams.length

      return {
        point: function (x, y) { var i = -1; while (++i < n) { streams[i].point(x, y) } },
        sphere: function () { var i = -1; while (++i < n) { streams[i].sphere() } },
        lineStart: function () { var i = -1; while (++i < n) { streams[i].lineStart() } },
        lineEnd: function () { var i = -1; while (++i < n) { streams[i].lineEnd() } },
        polygonStart: function () { var i = -1; while (++i < n) { streams[i].polygonStart() } },
        polygonEnd: function () { var i = -1; while (++i < n) { streams[i].polygonEnd() } },
      }
    }

    // ............................. projection
    // let projection = function (p1, p2) {
    let projection = function (p1, p2) {
      var cache,
        cacheStream

      let proj1 = p1 = d3Geo.geoOrthographic()
      let	proj1Point

      let proj2 = p2
      let proj2Point

      let point
      let pointStream = {point: function (x, y) { point = [x, y] }}

      function projection (coordinates) {
        let x = coordinates[0], y = coordinates[1]
        return		proj1Point.point(x, y)
      }

      projection.invert = function (coordinates) {
        let k = proj1.scale(),
          t = proj1.translate(),
          x = (coordinates[0] - t[0]) / k,
          y = (coordinates[1] - t[1]) / k

        return proj1.invert(coordinates)
      }

      projection.transform = function (_) {
        if (!arguments.length) { return transform }
        transform = d3Geo.geoTransform({ // stream 2
          point: _,
        })
        return projection
      }

      projection.stream = function (s) {
        let streams = []
        streams.push(transform.stream(proj1.stream(s)))
        return multiplex(streams)
      }

      projection.precision = function (_) {
        if (!arguments.length) { return proj1.precision() }
        if (proj1 !== undefined) proj1.precision(_)
        if (proj2 !== undefined) proj2.precision(_)
        return reset()
      }

      projection.scale = function (_) {
        if (!arguments.length) { return proj1.scale() }
        if (proj1 !== undefined) proj1.scale(_)
        if (proj2 !== undefined) proj2.scale(_)
        return projection
      }

      projection.rotate = function (_) {
        if (!arguments.length) { return proj1.rotate() }
        if (proj1 !== undefined) proj1.rotate(_)
        if (proj2 !== undefined) proj2.rotate(_)
        return projection
      }

      projection.translate = function (_) {
        if (!arguments.length) { return proj1.translate() }
        var k = proj1.scale(), x = +_[0], y = +_[1]

        if (proj1 !== undefined) {
          proj1Point = proj1
            .translate(_)
            .stream(pointStream)
        }

        if (proj2 !== undefined) {
          proj2Point = proj2
            .stream(pointStream)
        }

        return reset()
      }

      projection.fitExtent = function (extent, object) {
        return fitExtent(projection, extent, object)
      }

      projection.fitSize = function (size, object) {
        return fitSize(projection, size, object)
      }

      function reset () {
        cache = cacheStream = null
        return projection
      }

      projection.drawCompositionBorders = function (context) {}
      projection.getCompositionBorders = function () {
        var context = path()
        this.drawCompositionBorders(context)
        return context.toString()
      }

      return projection
    }

    // .................. enty
    let enty = {}
    enty.projection = projection
    return enty
  }

  exports.prtBase = prtBase
}))
