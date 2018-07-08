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
    let [
      rrenderport, // cameraProjer
      d3,
      guniwen
    ] = await Promise.all([
      __mapper('xs').r('renderport'),
      __mapper('xs').b('d3'),
      __mapper('xs').g('uniwen')
    ])

    let width = 600,
      height = 400,
      background = 'black'

    let state = {
      width: width,
      height: height,
      background: background
    } // Viewport

    let svglayer = d3.select('.viewframe')
      .append('svg')
      .attr('id', 'svglayer')
      .attr('class', 'svglayer')
      .style('position', 'absolute')
      .attr('width', state.width)
      .attr('height', state.height)
      .style('top', 0)
      .style('left', 0)

    let svgElem = svglayer.append('rect')
      .attr('id', 'svg')
      .attr('class', 'svg')
      .style('fill', 'transparent')
      .attr('pointer-events', 'none')
      .attr('overflow', 'visible')
      .style('background-color', state.background) // background

    // ............................. svg
    let _svg = () => d3.select('#viewframe')

    // ............................. elems
    let svgelems = function (idfyer, data = ['data'], idfn = null) {
      if (d3.select('.muon-style-block').empty()) {
        d3.select('head').append('style').attr('class', 'muon-style-block')
          .html('')
      }

      if (idfyer == null) { // if null return the layer
        let svgLayer = d3.select('body').selectAll('svg').data(['svg'])
          .enter()
          .append('svg')
          .attr('class', 'svg')
          .attr('id', 'svg')
          .attr('width', state.width)
          .attr('height', state.height)
          .style('border', '1px solid lightgray')
        return svgLayer
      }

      // manage the dom elements
      else if (typeof (idfyer) === 'string') { // 'svg:g.links/path.link', data, idfn}
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
          if (!Array.isArray(data)) console.log('data is not an array')
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
    let render = function (elapsed, featurecollection, maxlimit) {
      if (1 && 1) console.log('featurecollection', featurecollection.features)

      let features = featurecollection.features
        .filter(
          d => d.properties !== undefined && // req properties
            d.properties.ric !== undefined // req ric
        )

      if (1 && 1) console.log(' ------------------ render', features.length)

      let svg = _svg()

      let cameraProjer = rrenderport.cameraProjer()
      let prjdef = rrenderport.prjdef()
      let prj = guniwen(prjdef)
      cameraProjer = prj

      let gitems = d3.nest() // let framesByGid = f.groupBy(frames, "gid")
        .key(function (d) { return d.properties.ric.gid })
        .key(function (d) { return d.properties.ric.cid })
        .entries(features) // features

      for (let i in gitems) { // DOTS (seg5===0) each group gid
        let gid = gitems[i].key, citems = gitems[i].values

        for (let j in citems) { // each class cid
          let cid = citems[j].key // cid
          let fitems = citems[j].values // fitems
          let current = fitems.slice(-1)[0]

          /*  ................. TEXTS ................. */
          let texts = fitems
            .filter(d => d.properties.sort === 'text')

          if (texts.length > 0) {
            svgelems('svg:g.' + gid + '/text.' + cid, texts, d => d.uid)
              .text(d => d.properties.string)

              .attr('x', 0) // translate instead
              .attr('y', 0) //

              .attr('transform', d => // eg. "translate(21,20) rotate(15)")

                'translate(' +
                    d.geometry.coordinates[0] +
                    ',' +
                    d.geometry.coordinates[1] +
                    ')' +
                    ' rotate(' +
                    (d.properties.style['rotate'] || 0) +
                    ' )'

              )

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
            .filter((d, i) => (d.properties.delled !== 1)) // not delled

          if (imgs.length > 0) {
            if (1 && 1) console.log('imgs', imgs)

            svgelems('svg:g.' + gid + '/image.' + cid, imgs, d => d.id)

              .data(() => imgs)

              .attr('transform', d => { // eg. "translate(21,20) rotate(15)")
                return 'translate(' +
                    d.geometry.coordinates[0] +
                    ',' +
                    d.geometry.coordinates[1] +
                    ')' +
                    ' rotate(' +
                    (d.properties.attr.rotate || 0) +
                    ' )'
              })

              .attr('xlink:href', d => d.properties.attr['xlink:href'])
              .attr('width', d => d.properties.attr.width)
              .attr('height', d => d.properties.attr.height)
          }

          /*  ................. AXES ................. */
          let axes = fitems
            .filter(d => d.properties.sort === 'axis') // __ axis __
            .filter((d, i) => (d.properties.delled !== 1)) // not delled
            .filter((d, i) => (d.properties.ric.delled !== 1)) // not delled
          if (axes.length > 0) {
            for (let k = 0; k < axes.length; k++) {
              let axis = axes[k]
              if (1 && 1) console.log('-----------geometry ', axis.geometry)
              if (1 && 1) console.log('-----------axis ', axis.properties.axis)
              if (1 && 1) console.log('-----------style ', axis.properties.style)

              svgelems('svg:g.' + gid + '/g.' + cid, Array.of(axis), d => d.properties.uid)

                .data(() => Array.of(axis))

                .call(axis.properties.axis.d3Axis)

                .attr('transform', d => // eg. "translate(21,20) rotate(15)")

                  'translate(' +
                    d.geometry.coordinates[0] +
                    ',' +
                    d.geometry.coordinates[1] +
                    ')' +
                    ' rotate(' +
                    (d.properties.axis.rotate || 0) +
                    ' )'

                )

                .style('font-size', d => d.properties.axis.style['font-size'])
                .style('text-anchor', d => d.properties.axis.style['text-anchor'])
                .style('font-family', d => d.properties.axis.style['font-family'])

                .style('fill', d => {
                  if (1 && 1) console.log('d', d.properties.style)

                  return d.properties.style.fill
                })
                .style('stroke', d => d.properties.style.stroke)
                .style('fill-opacity', d => d.properties.style['fill-opacity'])
                .style('stroke-opacity', d => d.properties.style['stroke-opacity'])
                .style('stroke-width', d => d.properties.style['stroke-width'])
            }
          }

          /*  ................. GEOJSON FEATURE ................. */
          let features = fitems
            .filter(d => d.properties.sort === 'feature'
            )
            .filter((d, i) => (d.properties.delled !== 1)) // not delled
            .filter((d, i) => (d.properties.ric.delled !== 1)) // not delled

          if (features.length > 0) { // _e_
            svgelems('svg:g.' + gid + '/path.' + cid, features, d => d.uid) // elems
              .data(() => features)
              .attr('d', d => {
                if (2 && 2 && d.properties.style === undefined) console.log('** style is undefined', d)
                let geoitem = d // geojson feature
                let properties = geoitem.properties || {} // properties
                let pointRadius = properties.pointRadius || 2.5 // def pointRadius

                let geoPath = d3.geoPath(cameraProjer) // path on view projection
                let path = (pointRadius !== undefined) // geoPath
                  ? geoPath.pointRadius(pointRadius)
                  : geoPath

                let ret = path(geoitem)
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
