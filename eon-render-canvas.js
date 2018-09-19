/***********
 *    @renderCanvas
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.renderCanvas = global.renderCanvas || {})))
}(this, function (exports) {
  'use strict'

  async function renderCanvas (__mapper = {}) {
    
    let [
      rrenderport, // cameraProjer
      d3,
    ] = await Promise.all([
      __mapper('xs').r('renderport'),
      __mapper('xs').b('d3'),
    ])   
    
    let radians = Math.PI / 180

    let state = {
      width: rrenderport.width(),
      height: rrenderport.height()
    }

    let canvas = d3.select('body')
        .append('canvas')
        .attr('id', 'canvas')
        .attr('class', 'canvas')
        .style('position', 'absolute')
        .attr('width', state.width)
        .attr('height', state.height)
        .style('top', 0)
        .style('left', 0)
        .style('border', '1px solid lightgray')
        .style('position', 'absolute; top:0px; left:0px; z-index:1')
        .attr('pointer-events', 'none')
        .attr('overflow', 'visible')

        
    // ............................. render
    let render = function (elapsed, featurecollection, maxlimit) {
      let features = featurecollection.features
        .filter(
          d => d.properties !== undefined && // req properties
            d.properties.ric !== undefined // req ric
        )

      let canvas = d3.select('.canvas')
      let context = canvas.node().getContext('2d')

      /* clean canvas */
      context.clearRect(0, 0, width, height)

      /* items to add to scene */
      let gitems = d3.nest() // let framesByGid = f.groupBy(frames, "gid")
        .key(function (d) { return d.properties.ric.gid })
        .key(function (d) { return d.properties.ric.cid })
        .entries(features)

      for (let i in gitems) { // DOTS (seg5===0) each group gid
        let gid = gitems[i].key,
          citems = gitems[i].values

        for (let j in citems) { // each class cid
          let cid = citems[j].key // cid
          let fitems = citems[j].values // fitems
          let current = fitems.slice(-1)[0]

          /*  ................. GEOJSON FEATURE ................. */
          let features = fitems
            .filter(d => d.properties.sort === 'feature' || 
              d.properties.sort === 'form'
            )
            .filter((d, i) => (d.properties.delled !== 1)) // not delled
            .filter((d, i) => (d.properties.ric.delled !== 1)) // not delled

          if (features.length > 0) {
            for (let k in features) { // DOTS (seg5===0) each group gid
              let item = features[k] // feature

              let feature = item // .feature
              let style = item.properties.style

              let geometry = feature.geometry // rings in MultiPolygon, MultiLineString

              if (geometry.type === 'LineString') {
                let coordinates = Array.of(geometry.coordinates)

                let fillStyle = feature.properties.style.fill
                let strokeStyle = feature.properties.style.stroke
                let lineWidth = feature.properties.style['stroke-width']

                context.beginPath()
                let now = performance.now()
                path(coordinates)
                context.lineWidth = lineWidth
                context.strokeStyle = strokeStyle
                context.stroke()
                context.fillStyle = fillStyle
                context.fill()
                context.closePath()
              }
            }
          }
        } // citems
      } // gitems
    } // render

    // ............................. enty
    let enty = function enty () {}
    enty.render = render
    return enty
  }

  exports.renderCanvas = renderCanvas
}))
