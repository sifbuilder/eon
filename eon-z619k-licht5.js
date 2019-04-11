/* ******************************************
   *    @eonZ619kLicht5
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ619kLicht5 = global.eonZ619kLicht5 || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
    // .................. eons
    let [
      dlicht5,
      eohalMars,
      eohalSol,
      muonGeoj,
      muonProj3ct,
      muonProfier,
      muonStace,
      muonEoric,
      muonCastel,
      renderPortview,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').d('licht5'),
      __eo('xs').e('mars'),
      __eo('xs').e('sol'),
      __eo('xs').m('geoj'),
      __eo('xs').m('proj3ct'),
      __eo('xs').m('profier'),
      __eo('xs').m('stace'),
      __eo('xs').m('eoric'),
      __eo('xs').m('castel'),
      __eo('xs').r('portview'),
      __eo('xs').r('svg'),
    ])
    try { renderSvg.scenecolor('black') } catch (e) { }
    let muonStore = __eo('xs').m('store')

    // .................. animas
    let z = function () {
      // .................. pics
      let eotim = { 'td': 43800, 't0': 0, 't1': 1, 't2': 1, 't3': 1 }

      let svgdata = dlicht5.data()
      let extent = svgdata.viewBox.split(' ').map(d => parseInt(d))
      let x0 = extent[0], y0 = extent[1], x1 = extent[2], y1 = extent[3]

      let width = renderPortview.width(), height = renderPortview.height()

      let r0 = width / (x1 - x0)
      let r1 = height / (y1 - y0)
      let rx = Math.sign(r0) * Math.min(Math.abs(r0), Math.abs(r1))
      let ry = -Math.sign(r1) * Math.min(Math.abs(r0), Math.abs(r1))

      let dx = -(width - (x1 - x0)) / 2
      let dy = -(height - (y1 - y0)) / 2

      let gjdata = muonCastel.castels(svgdata, { start: 0, stop: 0.9, step: 0.091 })

      let nb = muonGeoj.getCoordsLength(gjdata) // will show (nb * t) dots,  eg. 894

      let proform = {
        projection: 'uniwen',
        translate: [dx - 0, dy - 0, 0],
        scale: [rx * 0.2, ry * 0.2],
        rotate: [0, 0, 0],
        lens: [0, 1, Infinity],
      }

      let project = muonProfier.uniweon(proform)
      let geoData = muonProj3ct(gjdata, project)

      // .................. polyForm
      let polyForm = {

        eohal: eohalSol,

        eofold: ani => {
          let anigram = ani, // anigram
            eohal = ani.eohal, // eohal
            eofold = ani.eofold, // eofold
            eoload = ani.eoload // eoload

          let unElapsed = ani.eotim.unElapsed // unit time elapsed
          let t = ani.eoload.tf(unElapsed) || unElapsed // time function

          let nbt = Math.ceil(nb * t)
          let csi = t => muonGeoj.getCoordsInRange(geoData, nbt)

          let coords = csi(t).geometry.coordinates

          let ngj = {
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [] },
            properties: {
              eocrom: { 'csx': 0, 'cf': 666, 'cs': 111, 'cw': 0.8, 'co': 1, 'cp': 0.9 },
            },
          }

          // ... a single line generates a LineString from muonProj3ct(geoData)
          if (geoData.geometry.type === 'LineString') ngj.geometry.coordinates = Array.of(coords)
          else if (geoData.geometry.type === 'MultiLineString') ngj.geometry.coordinates = coords
          else if (geoData.geometry.type === 'Polygon') ngj.geometry.coordinates = coords

          let rings = ngj.geometry.coordinates // rings in Polygon
          let newFeatureCollection = { type: 'FeatureCollection', features: [] }

          for (let i = 0; i < rings.length; i++) {
            let ring = rings[i]
            let feature = {
              type: 'Feature',
              geometry: { type: 'Polygon', coordinates: [ring] },
              properties: {},
            }
            if (i < rings.length - 1) { // first
              feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.8, 'co': 1, 'cp': 1 }
            } else {
              feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.8, 'co': 0.1, 'cp': 1 }
            }

            newFeatureCollection.features.push(feature)
          }

          newFeatureCollection.features = Array.of(ngj)

          let geodata = newFeatureCollection

          if (eoload.proform) {
            let proformion = muonProfier.proformion(anigram)
            newFeatureCollection = muonProj3ct(geodata, proformion)
          }

          return newFeatureCollection
        },

        eotim: eotim,
        eoric: { gid: 'fouriers', cid: 'fouriers', fid: 'fourier' },
        eocrom: { 'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.9, 'co': 0.72, 'cp': 0.7 },
        eoload: { // eoload in polyForm
          tf: t => t,

        },
      }

      // .................. animas
      let animas = [

        polyForm, // h.sol

      ]

      return animas
    }

    let enty = () => { }
    enty.z = z
    return enty
  }
  exports.eonZ619kLicht5 = anitem
}))