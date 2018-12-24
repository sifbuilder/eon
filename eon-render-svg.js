/***********
 *    @renderSvg
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.renderSvg = global.renderSvg || {})))
}(this, function (exports) {
  'use strict'

  async function renderSvg (__mapper = {}) {
    // ... # eon-render-svg
    // ... **render svg**
    // ...
    // ... The viewport is the visible area of the SVG image
    // ... Default units are pixels
    // ... `<svg width="600" height="400"></svg>`
    // ... The svg [viewBox](http://tutorials.jenkov.com/svg/svg-viewport-view-box.html) attribute is used to redefine the viewport coordinates
    // ... two first coordinates define user coordinates of upper left corner
    // ... two last coordinates define user coordinates of lower right corner
    // ... `<svg width="600" height="400" viewBox="0 0 50 20" >`
    // ... ref: [Margin Convention](https://bl.ocks.org/mbostock/3019563)
    // ... ## methods
    // ... * ### svg
    // ... * ### svgelems
    // ... call `svgelems(eoload, data, idfn)`
    // ... * ### render
    // ... call `render(elapsed, featurecollection, maxlimit)`
    // ... gets anima.eofold's from m.animation
    // ... @elapsed
    // ... @featurecollection
    // ... @maxlimit
    // ...
    // ... axes
    // ... d.properties.axis: cf, co, cp, cs, csx, cw, d3axis, domain, label, orient, range, rotate, scale, scaleType, tickFormat, tickPadding, tickSize,
    // ... d.properties.axis.style :  font-family, font-size, text-anchor
    // ...
    // ... # license
    // ... MIT

    let [
      d3,
      muonProj3ct,
      puniwen,
      renderPortview, // viewScreenPrt - _e_ to be defined in z.
    ] = await Promise.all([
      __mapper('xs').b('d3'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').p('uniwen'),
      __mapper('xs').r('portview'),
    ])

    let width = 600,
      height = 400,
      background = 'black'

    let state = {
      width: width,
      height: height,
      background: background,
    }

    // ............................. svg
    let _svg = () => d3.select('#viewframe')

    if (d3.select('#viewframe').empty()) {
      let svglayer = d3.select('body')
        .append('svg')
        .attr('id', 'viewframe') // Viewport
        .attr('class', 'viewframe')
        .attr('width', state.width)
        .attr('height', state.height)
        .style('position', 'absolute')
        .style('top', 0)
        .style('left', 0)
        .style('fill', 'transparent')
        .style('background-color', state.background) // background
      // .attr('pointer-events', 'none')
      // .attr('overflow', 'visible')
    }

    // ............................. elems
    let svgelems = function (idfyer, data = ['data'], idfn = null) {
      if (d3.select('.muon-style-block').empty()) {
        d3.select('head').append('style').attr('class', 'muon-style-block')
          .html('')
      }

      if (idfyer === null) { // if null return the layer
        let svgLayer = d3.select('body').selectAll('svg').data(['svg'])
          .enter()
          .append('svg')
          .attr('class', 'svg')
          .attr('id', 'svg')
          .attr('width', state.width)
          .attr('height', state.height)
          .style('border', '1px solid lightgray')
        return svgLayer
      } else if (typeof (idfyer) === 'string') { // 'svg:g.links/path.link', data, idfn}
        // manage the dom elements

        let parts = idfyer.split('/')
        let layerpart = (parts[0]) ? parts[0] : 'svg'
        let elemspart = (parts[1]) ? parts[1] : null

        let layerparts = layerpart.split(':')
        let parentcls = (layerparts[0]) ? layerparts[0] : 'svg'
        let group = (layerparts[1]) ? layerparts[1] : 'group'

        let groupparts = group.split('.')
        let groupref = (groupparts[0]) ? groupparts[0] : 'g'
        let layercls = (groupparts[1]) ? groupparts[1] : 'layer'

        let elemsparts = (elemspart) ? elemspart.split('.') : null
        let elemtype = (elemsparts && elemsparts[0]) ? elemsparts[0] : 'circle'
        let elemcls = (elemsparts && elemsparts[1]) ? elemsparts[1] : 'elems'

        let layerMark = d3.select(parentcls).selectAll('.' + layercls).data([layercls])
        let layer = layerMark.enter().append('g')
          .merge(layerMark)
          .attr('class', layercls)

        if (elemspart === null) {
          return layer
        } else {
          console.assert(Array.isArray(data), `data ${data} is not an array`)
          let elemsupd = layer.selectAll('.' + elemcls)
            .data(data)
          let elems = elemsupd
            .enter().append(elemtype)
            .merge(elemsupd)
            .attr('class', elemcls)
          let elemsExit = elemsupd.exit().remove()

          return elems
        }
      }
    }

    // ............................. render
    let render = function (featurecollection, maxlimit) {
      let features = featurecollection.features
        .filter(
          d => d !== null
        )
        .filter(
          d => d.properties !== undefined && // req properties
            d.properties.eoric !== undefined // req eoric
        )

      let svg = _svg()

      let viewScreenPrt = renderPortview.viewScreenPrt()
      let prtdef = renderPortview.prtdef()
      let prt = puniwen(prtdef)

      viewScreenPrt = prt // view screen projection

      let gitems = d3.nest() // let framesByGid = f.groupBy(frames, "gid")
        .key(function (d) { return d.properties.eoric.gid })
        .key(function (d) { return d.properties.eoric.cid })
        .entries(features) // features

      for (let i in gitems) { // DOTS (seg5===0) each group gid
        let gid = gitems[i].key,
          citems = gitems[i].values

        for (let j in citems) { // each class cid
          let cid = citems[j].key // cid
          let fitems = citems[j].values // fitems
          let current = fitems.slice(-1)[0]

          /*  ................. TEXTS ................. */
          let texts = fitems
            .filter(d => d.properties.sort === 'text')

          if (texts.length > 0) {
            svgelems('svg:g.' + gid + '/text.' + cid, texts, d => d.eoric.uid)
              .text(d => d.properties.string)

              .attr('x', 0) // translate instead
              .attr('y', 0) //

              .attr('transform', d => { // eg. "translate(21,20) rotate(15)")
                // translate tx, ty
                // rotate cx, cy
                // scale sx, sy
                // skew skew

                let item = d
                let geometry = item.geometry
                let projgeo = muonProj3ct.project(geometry, viewScreenPrt)

                let translate = projgeo.coordinates
                let rotate = item.properties.style['rotate']

                let r = 'translate(' +
                    translate[0] +
                    ',' +
                    translate[1] +
                    ')' +
                    ' rotate(' +
                    (rotate || 0) +
                    ' )'
                return r
              })

              .style('dx', d => d.properties.style['dx'])
              .style('dy', d => d.properties.style['dx'])
              .style('textLength', d => d.properties.style['textLength'])
              .style('lengthAdjust', d => d.properties.style['lengthAdjust'])

              .style('font-size', d => d.properties.style['font-size'])
              .style('font-family', d => d.properties.style['font-family'])

              .style('fill', d => d.properties.style.fill)
              .style('stroke', d => d.properties.style.stroke)

              .style('fill-opacity', d => d.properties.style['fill-opacity'])
              .style('stroke-opacity', d => d.properties.style['stroke-opacity'])
              .style('stroke-width', d => d.properties.style['stroke-width'])
              .style('text-anchor', d => d.properties.style['text-anchor'])
          }

          /*  ................. IMG ................. */
          let imgs = fitems
            .filter(d => d.properties.sort === 'img') // __ imgs __
            .filter((d, i) => (d.properties.eodelled !== 1)) // not eodelled

          if (imgs.length > 0) {
            svgelems('svg:g.' + gid + '/image.' + cid, imgs, d => d.eoric.uid)

              .data(() => imgs)

              .attr('transform', d => { // eg. "translate(21,20) rotate(15)")
                let item = d
                let geometry = item.geometry
                let projgeo = muonProj3ct.project(geometry, viewScreenPrt)

                let translate = projgeo.coordinates
                let rotate = item.properties.attr.rotate || 0

                let r = 'translate(' +
                    translate[0] +
                    ',' +
                    translate[1] +
                    ')' +
                    ' rotate(' +
                    (rotate || 0) +
                    ' )'
                return r
              })

              .attr('xlink:href', d => d.properties.attr['xlink:href'])
              .attr('width', d => d.properties.attr.width)
              .attr('height', d => d.properties.attr.height)
          }

          /*  ................. AXES ................. */
          let axes = fitems
            .filter(d => d.properties.sort === 'axis') // __ axis __
            .filter((d, i) => (d.properties.eodelled !== 1)) // not eodelled
            .filter((d, i) => (d.properties.eoric.eodelled !== 1)) // not eodelled

          if (axes.length > 0) {
            for (let k = 0; k < axes.length; k++) {
              let axis = axes[k]
              let uid = axis.properties.eoric.uid

              svgelems('svg:g.' + gid + '/g.' + uid, Array.of(axis), d => d.properties.eoric.uid)

                .data(() => Array.of(axis))

                .call(d => d.call(d.datum().properties.axis.d3axis))

                .attr('transform', d => { // eg. "translate(21,20) rotate(15)")
                  let item = d
                  let geometry = item.geometry

                  // let projgeo = muonProj3ct.project(geometry, viewScreenPrt)

                  let geocoords = geometry.coordinates
                  let geooringin = geocoords[0]
                  let geoextreme = geocoords[1]

                  let translate = geooringin // versor origin

                  let rotate = item.properties.axis.rotate || 0

                  let r = 'translate(' + translate[0] + ',' + translate[1] + ')' +
                          ' rotate(' + rotate + ' )'
                  return r
                })

                .style('font-size', d => d.properties.axis.style['font-size'])
                .style('text-anchor', d => d.properties.axis.style['text-anchor'])
                .style('font-family', d => d.properties.axis.style['font-family'])

                .style('fill', d => d.properties.style.fill)
                .style('stroke', d => d.properties.style.stroke)
                .style('fill-opacity', d => d.properties.style['fill-opacity'])
                .style('stroke-opacity', d => d.properties.style['stroke-opacity'])
                .style('stroke-width', d => d.properties.style['stroke-width'])
            }
          }

          /*  ................. GEOJSON FEATURE ................. */
          let features = fitems
            .filter(d => d.properties.sort === 'feature' ||
              d.properties.sort === 'form'
            )
            .filter((d, i) => (d.properties.eodelled !== 1)) // not eodelled
            .filter((d, i) => (d.properties.eoric.eodelled !== 1)) // not eodelled

          if (features.length > 0) { // _e_
            svgelems('svg:g.' + gid + '/path.' + cid, features, d => d.eoric.uid) // elems
              .data(() => features)
              .attr('d', d => { // geojson feature
                let properties = d.properties || {} // properties
                console.assert(properties.style !== undefined, `style is undefined in ${d}`)
                let pointRadius = properties.pointRadius || 2.5 // def pointRadius

                let geoPath = d3.geoPath(viewScreenPrt) // path on view projection
                let path = (pointRadius !== undefined) // geoPath
                  ? geoPath.pointRadius(pointRadius)
                  : geoPath

                let ret = path(d)

                return ret
              })

              .style('fill', d => d.properties.style.fill)
              .style('stroke', d => d.properties.style.stroke)
              .style('fill-opacity', d => d.properties.style['fill-opacity'])
              .style('stroke-opacity', d => d.properties.style['stroke-opacity'])
              .style('stroke-width', d => d.properties.style['stroke-width'])
          }

          /*  ................. END SVG FORMS ................. */
        }
      }
    }

    // ............................. enty
    let enty = function enty () {}
    enty.svg = _svg
    enty.svgelems = svgelems
    enty.render = render
    return enty
  }

  exports.renderSvg = renderSvg
}))
