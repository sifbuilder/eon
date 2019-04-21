/* ******************************************
   *    @eonZ619lBeat
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ619lBeat = global.eonZ619lBeat || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    dbeat,
    eonEohalSol,
    eonMuonGeoj,
    eonMuonProj3ct,
    eonMuonProfier,
    eonMuonCastel,
    eonRenderPortview,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-dat-beat'),
    __eo('xs').b('eon-eohal-sol'),
    __eo('xs').b('eon-muon-geoj'),
    __eo('xs').b('eon-muon-proj3ct'),
    __eo('xs').b('eon-muon-profier'),
    __eo('xs').b('eon-muon-castel'),
    __eo('xs').b('eon-render-portview'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}

  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 9800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => t}

    let svgdata = dbeat.data()
    let extent = svgdata.viewBox.split(' ').map(d => parseInt(d))
    let x0 = extent[0],
      y0 = extent[1],
      x1 = extent[2],
      y1 = extent[3]

    let w = eonRenderPortview.width(),
      h = eonRenderPortview.height(),
      wr = w / 2,
      hr = h / 2

    let imgw = x1 - x0
    let imgh = y1 - y0

    let dx = -wr + 50,
      dy = hr - 50

    let kx = w / imgw,
      ky = -h / imgh

    let start = 0,
      stop = 0.9,
      step = 0.091

    let gjdata = eonMuonCastel.castels(svgdata, {start: start, stop: stop, step: step})

    let nb = eonMuonGeoj.getCoordsLength(gjdata) // will show (nb * t) dots,  eg. 894

    let proform = {
      projection: 'uniwen',
      translate: [dx, dy, 0],
      scale: [kx, ky],
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, Infinity],
    }

    let project = eonMuonProfier.uniweon(proform)
    let geoData = eonMuonProj3ct(gjdata, project)

    // .................. polyForm
    let polyForm = {

      eohal: eonEohalSol,
      eotim: eotim,
      eoric: { gid: 'trace', cid: 'trace', fid: 'trace'},

      eofold: ani => {
        let anigram = ani, // anigram
          eoload = ani.eoload // eoload

        let unTime = ani.eotim.unTime // unit time elapsed
        let t = ani.eoload.tf(unTime) || unTime // time function

        let nbt = Math.ceil(nb * t)
        let startingpoint = nbt

        let csi = t => (geometry, coords, startingin) => eonMuonGeoj.getCoordsInRange(geometry, coords, startingin)
        let pointsatatime = 1200

        let geo = csi(t)(geoData.geometry, pointsatatime, startingpoint)
        let tcoords = geo.coordinates

        let ngj = {
          type: 'Feature',
          geometry: { type: 'Polygon', coordinates: [] },
          properties: {
            eocrom: { 'csx': 0, 'cf': 777, 'cs': 777, 'cw': 0.8, 'co': 0.01, 'cp': 0.9},
          },
        }

        // ... a single line generates a LineString from eonMuonProj3ct(geoData)
        if (geoData.geometry.type === 'LineString') ngj.geometry.coordinates = Array.of(tcoords)
        else if (geoData.geometry.type === 'MultiLineString') ngj.geometry.coordinates = tcoords
        else if (geoData.geometry.type === 'Polygon') ngj.geometry.coordinates = tcoords

        let rings = ngj.geometry.coordinates // rings in Polygon
        let newFeatureCollection = {type: 'FeatureCollection', features: []}

        for (let i = 0; i < rings.length; i++) {
          let ring = rings[i]
          let feature = {
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [ring]},
            properties: {},
          }
          if (i < rings.length - 1) { // first
            feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 777, 'cw': 0.8, 'co': 0.9, 'cp': 1}
          } else {
            feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 777, 'cw': 0.8, 'co': 0.9, 'cp': 1}
          }

          newFeatureCollection.features.push(feature)
        }

        newFeatureCollection.features = Array.of(ngj)

        let geodata = newFeatureCollection

        if (eoload.proform) {
          let proformion = eonMuonProfier.proformion(anigram)
          newFeatureCollection = eonMuonProj3ct(geodata, proformion)
        }

        return newFeatureCollection
      },

      eoload: { // eoload in polyForm
        eocrom: {'csx': 0, 'cf': 555, 'cs': 777, 'cw': 0.9, 'co': 0.12, 'cp': 0.7},
        tf: t => t,

      },
    }

    // .................. animas
    let animas = [

      polyForm, // h.sol

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ619lBeat = anitem
}))
