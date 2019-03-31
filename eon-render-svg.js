/***********
 *    @renderSvg
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.renderSvg = global.renderSvg || {})))
}(this, function (exports) {
  'use strict'

  async function renderSvg (__eo = {}) {
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
    // ... d.properties.axis: cf, co, cp, cs, csx, cw, d3Axis, domain, label, orient, range, rotate, scale, scaleType, tickFormat, tickPadding, tickSize,
    // ... d.properties.axis.style :  font-family, font-size, text-anchor
    // ...
    // ... # license
    // ... MIT

    let [
      d3Selection,
      d3Collection,
      d3Geo,
      muonProj3ct,
      protonUniwen,
      renderPortview, // viewScreenPrt - _e_ to be defined in z.
    ] = await Promise.all([
      __eo('xs').b('d3-selection'),
      __eo('xs').b('d3-collection'),
      __eo('xs').b('d3-geo'),
      __eo('xs').m('proj3ct'),
      __eo('xs').p('uniwen'),
      __eo('xs').r('portview'),
    ])

    let width = 600,
      height = 400

    let state = {
      width: width,
      height: height,
    }
    // ............................. svg
    let _svg = () => d3Selection.select('#viewframe')

    try {
      if (d3Selection.select('#viewframe').empty()) {
        d3Selection.select('body')
          .append('svg')
          .attr('id', 'viewframe') // Viewport
          .attr('class', 'viewframe')
          .attr('width', state.width)
          .attr('height', state.height)
          .style('position', 'absolute')
          .style('top', 10)
          .style('left', 10)
          .style('fill', 'transparent')
          .style('background-color', state.background) // background
          .append('defs')
      }
    } catch (error) {
      console.log('e', error)
    }

    let resetsvg = function () {
      if (!d3Selection.select('#viewframe').empty()) {
        let svglayer = d3Selection.select('#viewframe')
          .attr('width', state.width)
          .attr('height', state.height)
          .style('background-color', state.background) // background
      }
    }

    // ............................. elems
    let svgelems = function (idfyer, data = ['data'], idfn = null) {
      if (0 && 1) console.log('idfyer', idfyer)

      if (d3Selection.select('.muon-style-block').empty()) {
        d3Selection.select('head').append('style').attr('class', 'muon-style-block')
          .html('')
      }

      if (idfyer === null) { // if null return the layer
        let svgLayer = d3Selection.select('body').selectAll('svg').data(['svg'])
          .enter()
          .append('svg')
          .attr('class', 'svg')
          .attr('id', 'svg')
          .attr('width', state.width)
          .attr('height', state.height)
          .style('border', '1px solid lightgray')

        return svgLayer
      } else if (typeof (idfyer) === 'string') {
        // manage the dom elements
        // eg. 'svg:g.links/path.link', data, idfn}
        // eg. 'svg:g.text/text.text', [{}], d=>d.uid}
        // eg. 'text.cid2/textPath.cid3', [1], d=>3}

        let parts = idfyer.split('/')
        let layerpart = (parts[0]) ? parts[0] : 'svg'
        let elemspart = (parts[1]) ? parts[1] : null

        let layerparts = layerpart.split(':')
        let parentLayer = (layerparts[0]) ? layerparts[0] : 'svg'
        // let group = (layerparts[1]) ? layerparts[1] : 'group'
        let group = layerparts[1]

        let layer, elemcls, elemtyp
        if (group !== undefined) {
          let groupparts = group.split('.')
          let groupref = (groupparts[0]) ? groupparts[0] : 'g'
          let layercls = (groupparts[1]) ? groupparts[1] : 'layer'

          let elemsparts = (elemspart) ? elemspart.split('.') : null
          elemtyp = (elemsparts && elemsparts[0]) ? elemsparts[0] : 'circle'
          elemcls = (elemsparts && elemsparts[1]) ? elemsparts[1] : 'elems'

          let layerMark = d3Selection.select(parentLayer).selectAll('.' + layercls).data([layercls])
          layer = layerMark.enter().append('g')
            .merge(layerMark)
            .attr('class', layercls)
        } else if (group === undefined) {
          let group = parentLayer
          let groupparts = group.split('.')
          let groupref = (groupparts[0]) ? groupparts[0] : 'g'
          let layercls = (groupparts[1]) ? groupparts[1] : 'layer'

          let elemsparts = (elemspart) ? elemspart.split('.') : null
          elemtyp = (elemsparts && elemsparts[0]) ? elemsparts[0] : 'circle'
          elemcls = (elemsparts && elemsparts[1]) ? elemsparts[1] : undefined

          let layerMark
          if (layercls !== undefined) {
            layerMark = d3Selection.select(parentLayer).selectAll('.' + layercls).data([layercls])
          } else {
            layerMark = d3Selection.select(parentLayer)
          }

          layer = layerMark
        }

        // parentLayer:layertyp.layercls/elemtyp.elemcls
        // layer is layertyp or parentLayer

        if (elemspart === null) {
          return layer
        } else {
          console.assert(Array.isArray(data), `data ${data} is not an array`)
          // let elemsupd = layer.selectAll('.' + elemcls)
          // .data(data)

          // if (elemtyp === 'textPath')   elemsupd = layer

          let elemsupd

          if (elemcls !== undefined) {
            elemsupd = layer.selectAll('.' + elemcls)
              .data(data)
          } else {
            elemsupd = layer
              .data(data)
          }

          let elems = elemsupd
            .enter().append(elemtyp)
            .merge(elemsupd)
            .attr('class', elemcls)

          let elemsExit = elemsupd.exit().remove()

          return elems
        }
      }
    }

    // ............................. render
    let render = function (featurecollection, maxlimit) {
      if (0 && 1) console.log('featurecollection', featurecollection)
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
      let proton = protonUniwen(prtdef)

      viewScreenPrt = proton // view screen projection

      let gitems = d3Collection.nest() // let framesByGid = f.groupBy(frames, "gid")
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
          // a single svg 1.1 <text> eklement creates a single line of text
          // x,y are <tspan> independent attributes
          // dx,dy are delta location from previous <tspan>

          let texts = fitems
            .filter(d => d.properties.sort === 'text')
          //
          // pathed texts
          //
          // pathed texts are geofolded by geojson Feature.LineString
          let textsWithPath = texts // without path
            .filter(d =>
              d.properties.textpath !== undefined ||
              (d.type === 'Feature' && d.geometry.type === 'LineString') || // Feature.LineString
              (d.type === 'Feature' && d.geometry.type === 'Polygon') // Feature.Polygon
            )

          // text support paths are added to defs

          for (let tx = 0; tx < textsWithPath.length; tx++) {
            let text = textsWithPath[tx]
            let props = text.properties
            let gid = props.eoric.gid
            let cid = props.eoric.cid // text id
            let uid = props.eoric.uid

            let properties = text.properties || {}
            let pointRadius = properties.pointRadius || 2.5
            let geoPath = d3Geo.geoPath(viewScreenPrt) // path on view projection
            let path = (pointRadius !== undefined) // geoPath
              ? geoPath.pointRadius(pointRadius)
              : geoPath

            // the svg path comes from geoPath of geojson geofold
            let textpath = path(text)

            let gidpath = 'paths' + gid
            let cidpath = 'paths' + cid
            let fs = [uid]
            let pathid = `textpath${uid}`
            svgelems('defs:g.' + gidpath + '/path.' + cidpath, fs, d => uid)
              .data(() => fs)
              .attr('d', textpath)
              .attr('id', pathid)
          }

          if (textsWithPath.length > 0) { // text with textpath
            svgelems('svg:g.' + gid + '/text.' + cid, textsWithPath, d => d.properties.eoric.uid)
              .attr('x', 0) // translate instead
              .attr('y', 0) // translate instead

              .attr('transform', d => { // eg. "translate(21,20) rotate(15)") scale(sx, sy) skew (skew)
                let item = d
                let style = d.properties.style
                let dx = style.dx || 0
                let dy = style.dy || 0

                let geometry = item.geometry
                let projgeo = muonProj3ct.project(geometry, viewScreenPrt)

                let translate = [dx, dy] // projgeo.coordinates
                let rotate = item.properties.style['rotate']

                let r = 'translate(' + translate[0] + ',' + translate[1] + ')' + ' rotate(' + (rotate || 0) + ' )'
                return r
              })

              .style('fill', d => d.properties.style.fill)
              .style('stroke', d => d.properties.style.stroke)
              .style('fill-opacity', d => d.properties.style['fill-opacity'])
              .style('stroke-opacity', d => d.properties.style['stroke-opacity'])
              .style('stroke-width', d => d.properties.style['stroke-width'])

              .style('dx', d => d.properties.style['dx'])
              .style('dy', d => d.properties.style['dy'])
              .style('font-size', d => d.properties.style['font-size'])
              .style('font-family', d => d.properties.style['font-family'])
              .style('kerning', d => d.properties.style['kerning'])
              .style('lengthAdjust', d => d.properties.style['lengthAdjust'])
              .style('letter-spacing', d => d.properties.style['letter-spacing'])
              .style('height', d => d.properties.style.height)
              .style('textLength', d => d.properties.style['textLength'])
              .style('text-anchor', d => d.properties.style['text-anchor'])
              .style('width', d => d.properties.style.width)
              .style('word-spacing', d => d.properties.style['word-spacing'])
              .style('writing-mode', d => d.properties.style['writing-mode'])
              .style('direction', 'ltr')
              .style('unicode-bidi', 'bidi-override')

              // string path is added to the text element
            // the textpath id is defs#textpath${d.properties.eoric.uid}
            svgelems(`text.${cid}/textPath`, textsWithPath, d => d.properties.eoric.uid)
              .attr('class', d => `${d.properties.eoric.cid}`)
              .attr('xlink:href', d => `#textpath${d.properties.eoric.uid}`)
              .text(d => d.properties.string)
          }

          //
          // unpathed texts
          //

          // unpathed texts are geofolded by geojson Feature.Point
          let textsWithOutPath = texts // without path
            .filter(d => (d.type === 'Feature' && d.geometry.type === 'Point') // Feature.Point
            )

          if (textsWithOutPath.length > 0) { // text without path
            svgelems('svg:g.' + gid + '/text.' + cid, textsWithOutPath, d => d.properties.eoric.uid)
              .text(d => d.properties.string)

              .attr('x', 0) // translate instead
              .attr('y', 0) // translate instead

              .attr('transform', d => {
              // eg. "translate(21,20) rotate(15)") scale(sx, sy) skew (skew)

                let item = d
                let geometry = item.geometry
                let projgeo = muonProj3ct.project(geometry, viewScreenPrt)

                let translate = projgeo.coordinates
                let rotate = item.properties.style['rotate']

                let r = 'translate(' + translate[0] + ',' + translate[1] + ')' + ' rotate(' + (rotate || 0) + ' )'
                return r
              })

              .style('dx', d => d.properties.style['dx'])
              .style('dy', d => d.properties.style['dy'])
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
            svgelems('svg:g.' + gid + '/image.' + cid, imgs, d => d.properties.eoric.uid)

              .data(() => imgs)

              .attr('transform', d => { // eg. "translate(21,20) rotate(15)")
                let item = d
                let geometry = item.geometry
                let projgeo = muonProj3ct.project(geometry, viewScreenPrt)

                let translate = projgeo.coordinates
                let rotate = item.properties.attr.rotate || 0

                let r = 'translate(' + translate[0] + ',' + translate[1] + ')' + ' rotate(' + (rotate || 0) + ' )'
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

                .call(d => d.call(d.datum().properties.axis.d3Axis))

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
            svgelems('svg:g.' + gid + '/path.' + cid, features, d => d.properties.eoric.uid) // elems
              .data(() => features)
              .attr('d', d => { // geojson feature
                let properties = d.properties || {} // properties
                console.assert(properties.style !== undefined, `style is undefined in ${d}`)
                let pointRadius = properties.pointRadius || 2.5 // def pointRadius

                let geoPath = d3Geo.geoPath(viewScreenPrt) // path on view projection

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
    enty.scenecolor = _ => _ === undefined ? state : (state.background = _, resetsvg(), state)
    return enty
  }

  exports.renderSvg = renderSvg
}))
