/***********
 *    @renderSvg
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.renderSvg = global.renderSvg || {})))
}(this, function (exports) {
  'use strict'

  // md: # md:{filename}
  // md: **render svg**
  // md:
  // md:  The viewport is the visible area of the SVG image
  // md:  Default units are pixels
  // md:  `<svg width="600" height="400"></svg>`
  // md:  The svg [viewBox](http://tutorials.jenkov.com/svg/svg-viewport-view-box.html) attribute is used to redefine the viewport coordinates
  // md:  two first coordinates define user coordinates of upper left corner
  // md:  two last coordinates define user coordinates of lower right corner
  // md:  `<svg width="600" height="400" viewBox="0 0 50 20" >`
  // md: ref: [Margin Convention](https://bl.ocks.org/mbostock/3019563)
  // md: ## methods
  // md: * ### svg
  // md: * ### elems
  // md:      call `elems(payload, data, idfn)`
  // md: * ### render
  // md:      call `render(elapsed, featurecollection, maxlimit)`
  // md:      gets anima.geofold's from m.animation
  // md:   @elapsed
  // md:   @featurecollection
  // md:   @maxlimit

  let renderSvg = function (__mapper = {}) {
    let f = __mapper('props')()

    let r = __mapper('xs').r('renderport'),
      width = r.width(),
      height = r.height()

    let state = {
      width: width,
      height: height
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





    // ............................. svg
    let svg = () => d3.select('#viewframe')

    // ............................. elems
    let elems = function (idfyer, data = ['data'], idfn = null) {
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

      } else if (idfyer == 'image') { // if image insert image
        if (d3.select('.image').empty()) {
          let img = svg.selectAll('image').data([0])
            .enter()
            .insert('svg:image')
            .attr('xlink:href', './image.jpg')
            .attr('x', '0')
            .attr('y', '0')
            .attr('width', state.width)
            .attr('height', state.height)
          return img
        }
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
      
      
      let features = featurecollection.features
        .filter(
          d => d.properties !== undefined && // req properties
            d.properties.ric !== undefined // req ric
        )
      let svg = __mapper('renderSvg').svg()

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


            __mapper('renderSvg').elems('svg:g.' + gid + '/text.' + cid, texts, d => d.uid)
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
            __mapper('renderSvg').elems('svg:g.' + gid + '/image.' + cid, imgs, d => d.id)

              .data(() => imgs)

              .attr('transform', d => { // eg. "translate(21,20) rotate(15)")
                return 'translate(' +
                    d.geometry.coordinates[0] +
                    ',' +
                    d.geometry.coordinates[1] +
                    ')' +
                    ' rotate(' +
                    (d.properties.style.rotate || 0) +
                    ' )'
              })

              .attr('xlink:href', d => d.properties['xlink:href'])
              .attr('width', d => d.properties.style.width)
              .attr('height', d => d.properties.style.height)
          }

          /*  ................. AXES ................. */
          let axes = fitems
            .filter(d => d.properties.sort === 'axis') // __ axis __
            .filter((d, i) => (d.properties.delled !== 1)) // not delled
            .filter((d, i) => (d.properties.ric.delled !== 1)) // not delled
          if (axes.length > 0) {

            for (let k = 0; k<axes.length; k++) {

             let axis = axes[k]
             
              __mapper('renderSvg').elems('svg:g.' + gid + '/g.' + cid, Array.of(axis), d => d.properties.uid)

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

                .style('fill', d => d.properties.style.fill)
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


            __mapper('renderSvg').elems('svg:g.' + gid + '/path.' + cid, features, d => d.uid)  // elems
              .data(() => features)
              .attr('d', d => {
                if (2 && 2 && d.properties.style === undefined) console.log('** style is undefined', d)
                let geoitem = d // geojson feature
                let properties = geoitem.properties || {} // properties
                let pointRadius = properties.pointRadius || 2.5 // def pointRadius

                let cameraProjer = r.cameraProjer()

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

    enty.svg = svg
    enty.elems = elems
    enty.render = render

    return enty
  }

  exports.renderSvg = renderSvg
}))
