/* ******************************************
   *    @eonZ619mLicht
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ619mLicht = global.eonZ619mLicht || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    dlicht5,
    eonEohalSol,
    eonMuonGeoj,
    eonMuonProj3ct,
    eonMuonProfier,
    eonMuonStace,
    eonMuonEoric,
    eonMuonCastel,
    eonRenderPortview,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-dat-licht5'),
    __eo('xs').b('eon-eohal-sol'),
    __eo('xs').b('eon-muon-geoj'),
    __eo('xs').b('eon-muon-proj3ct'),
    __eo('xs').b('eon-muon-profier'),
    __eo('xs').b('eon-muon-stace'),
    __eo('xs').b('eon-muon-eoric'),
    __eo('xs').b('eon-muon-castel'),
    __eo('xs').b('eon-render-portview'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let eonMuonStore = __eo('xs').b('eon-muon-store')

  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    let svgdata = dlicht5.data()
    let extent = svgdata.viewBox.split(' ').map(d => parseInt(d))
    let x0 = extent[0], y0 = extent[1], x1 = extent[2], y1 = extent[3]

    let width = eonRenderPortview.width(), height = eonRenderPortview.height()

    let r0 = width / (x1 - x0)
    let r1 = height / (y1 - y0)
    let rx = Math.sign(r0) * Math.min(Math.abs(r0), Math.abs(r1))
    let ry = -Math.sign(r1) * Math.min(Math.abs(r0), Math.abs(r1))

    let dx = -(width - (x1 - x0)) / 2
    let dy = -(height - (y1 - y0)) / 2

    let gjdata1 = eonMuonCastel.castels(svgdata, {start: 0, stop: 0.9, step: 0.091})
    let gjdata2 = eonMuonCastel.castels(svgdata, {start: 0, stop: 0.9, step: 0.091})
    let gjdata3 = eonMuonCastel.castels(svgdata, {start: 0, stop: 0.9, step: 9.091})
    let gjdata4 = eonMuonCastel.castels(svgdata, {start: 0, stop: 0.9, step: 9.091})

    let nb1 = eonMuonGeoj.getCoordsLength(gjdata1) // will show (nb * t) dots,  eg. 894
    let nb2 = eonMuonGeoj.getCoordsLength(gjdata2) // will show (nb * t) dots,  eg. 894
    let nb3 = eonMuonGeoj.getCoordsLength(gjdata3) // will show (nb * t) dots,  eg. 894
    let nb4 = eonMuonGeoj.getCoordsLength(gjdata4) // will show (nb * t) dots,  eg. 894

    let proform1 = {
      projection: 'uniwen',
      translate: [dx + 40, dy + 25, 0],
      scale: [rx * 0.2, ry * 0.2],
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, Infinity],
    }

    let proform2 = {
      projection: 'uniwen',
      translate: [dx - 230, dy + 25, 0],
      scale: [rx * 0.2, ry * 0.2],
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, Infinity],
    }

    let proform3 = {
      projection: 'uniwen',
      translate: [dx + 40, dy - 160, 0],
      scale: [rx * 0.2, ry * 0.2],
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, Infinity],
    }

    let proform4 = {
      projection: 'uniwen',
      translate: [dx - 230, dy - 160, 0],
      scale: [rx * 0.2, ry * 0.2],
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, Infinity],
    }

    let geoData1 = eonMuonProj3ct(gjdata1, eonMuonProfier.uniweon(proform1))
    let geoData2 = eonMuonProj3ct(gjdata2, eonMuonProfier.uniweon(proform2))
    let geoData3 = eonMuonProj3ct(gjdata3, eonMuonProfier.uniweon(proform3))
    let geoData4 = eonMuonProj3ct(gjdata4, eonMuonProfier.uniweon(proform4))

    // .................. lichtAni1
    let lichtAni1 = {

      eohal: eonEohalSol,
      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani1'},

      eofold: ani => {
        let anigram = ani, // anigram
          eohal = ani.eohal, // eohal
          eofold = ani.eofold, // eofold
          eoload = ani.eoload // eoload

        let geoData = geoData1 // geoData
        let unElapsed = ani.eotim.unElapsed // unit time elapsed
        let t = ani.eoload.tf(unElapsed) || unElapsed // time function
        let nbt = Math.ceil(nb1 * t)
        let csi = t => eonMuonGeoj.getCoordsInRange(geoData, nbt)
        let coords = csi(t).geometry.coordinates

        let ngj = {
          type: 'Feature',
          geometry: { type: 'Polygon', coordinates: [] },
          properties: {
            eocrom: { 'csx': 0, 'cf': 666, 'cs': 666, 'cw': 0.8, 'co': 0.01, 'cp': 0.99},
          },
        }

        if (geoData.geometry.type === 'LineString') ngj.geometry.coordinates = Array.of(coords)
        else if (geoData.geometry.type === 'MultiLineString') ngj.geometry.coordinates = coords
        else if (geoData.geometry.type === 'Polygon') ngj.geometry.coordinates = coords

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
            feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.8, 'co': 1, 'cp': 1}
          } else {
            feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.8, 'co': 0.1, 'cp': 1}
          }

          newFeatureCollection.features.push(feature)
        }

        newFeatureCollection.features = Array.of(ngj)
        if (eoload.proform) {
          let proformion = eonMuonProfier.proformion(anigram)
          newFeatureCollection = eonMuonProj3ct(newFeatureCollection, proformion)
        }

        return newFeatureCollection
      },

      eocrom: {'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.9, 'co': 0.072, 'cp': 0.7},
      eoload: {
        tf: t => t,
      },
    }

    // .................. lichtAni2
    let lichtAni2 = {

      eohal: eonEohalSol,

      eofold: ani => {
        let anigram = ani, // anigram
          eohal = ani.eohal, // eohal
          eofold = ani.eofold, // eofold
          eoload = ani.eoload // eoload

        let geoData = geoData2 // geoData
        let unElapsed = ani.eotim.unElapsed // unit time elapsed
        let t = ani.eoload.tf(unElapsed) || unElapsed // time function
        let nbt = Math.ceil(nb2 * t)
        let csi = t => eonMuonGeoj.getCoordsInRange(geoData, nbt)
        let coords = csi(t).geometry.coordinates

        let ngj = {
          type: 'Feature',
          geometry: { type: 'Polygon', coordinates: [] },
          properties: {
            eocrom: { 'csx': 0, 'cf': 666, 'cs': 111, 'cw': 0.8, 'co': 1, 'cp': 0.9},
          },
        }

        if (geoData.geometry.type === 'LineString') ngj.geometry.coordinates = Array.of(coords)
        else if (geoData.geometry.type === 'MultiLineString') ngj.geometry.coordinates = coords
        else if (geoData.geometry.type === 'Polygon') ngj.geometry.coordinates = coords

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
            feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.8, 'co': 1, 'cp': 1}
          } else {
            feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.8, 'co': 0.1, 'cp': 1}
          }

          newFeatureCollection.features.push(feature)
        }

        newFeatureCollection.features = Array.of(ngj)
        if (eoload.proform) {
          let proformion = eonMuonProfier.proformion(anigram)
          newFeatureCollection = eonMuonProj3ct(newFeatureCollection, proformion)
        }

        return newFeatureCollection
      },
      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani2'},
      eocrom: {'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.9, 'co': 0.72, 'cp': 0.7},
      eoload: {
        tf: t => t,
      },
    }

    // .................. lichtAni3
    let lichtAni3 = {

      eohal: eonEohalSol,

      eofold: ani => {
        let anigram = ani, // anigram
          eohal = ani.eohal, // eohal
          eofold = ani.eofold, // eofold
          eoload = ani.eoload // eoload

        let geoData = geoData3 // geoData
        let unElapsed = ani.eotim.unElapsed // unit time elapsed
        let t = ani.eoload.tf(unElapsed) || unElapsed // time function
        let nbt = Math.ceil(nb3 * t)
        let csi = t => eonMuonGeoj.getCoordsInRange(geoData, nbt)
        let coords = csi(t).geometry.coordinates

        let ngj = {
          type: 'Feature',
          geometry: { type: 'Polygon', coordinates: [] },
          properties: {
            eocrom: { 'csx': 0, 'cf': 666, 'cs': 111, 'cw': 0.8, 'co': 1, 'cp': 0.9},
          },
        }

        if (geoData.geometry.type === 'LineString') ngj.geometry.coordinates = Array.of(coords)
        else if (geoData.geometry.type === 'MultiLineString') ngj.geometry.coordinates = coords
        else if (geoData.geometry.type === 'Polygon') ngj.geometry.coordinates = coords

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
            feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.8, 'co': 1, 'cp': 1}
          } else {
            feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.8, 'co': 0.1, 'cp': 1}
          }

          newFeatureCollection.features.push(feature)
        }

        newFeatureCollection.features = Array.of(ngj)
        if (eoload.proform) {
          let proformion = eonMuonProfier.proformion(anigram)
          newFeatureCollection = eonMuonProj3ct(newFeatureCollection, proformion)
        }

        return newFeatureCollection
      },
      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani3'},
      eocrom: {'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.9, 'co': 0.072, 'cp': 0.7},
      eoload: {
        tf: t => t,
      },
    }

    // .................. lichtAni3
    let lichtAni4 = {

      eohal: eonEohalSol,

      eofold: ani => {
        let anigram = ani, // anigram
          eohal = ani.eohal, // eohal
          eofold = ani.eofold, // eofold
          eoload = ani.eoload // eoload

        let geoData = geoData4 // geoData
        let unElapsed = ani.eotim.unElapsed // unit time elapsed
        let t = ani.eoload.tf(unElapsed) || unElapsed // time function
        let nbt = Math.ceil(nb4 * t)
        let csi = t => eonMuonGeoj.getCoordsInRange(geoData, nbt)
        let coords = csi(t).geometry.coordinates

        let ngj = {
          type: 'Feature',
          geometry: { type: 'Polygon', coordinates: [] },
          properties: {
            eocrom: { 'csx': 0, 'cf': 666, 'cs': 666, 'cw': 0.7, 'co': 0.01, 'cp': 0.9},
          },
        }

        if (geoData.geometry.type === 'LineString') ngj.geometry.coordinates = Array.of(coords)
        else if (geoData.geometry.type === 'MultiLineString') ngj.geometry.coordinates = coords
        else if (geoData.geometry.type === 'Polygon') ngj.geometry.coordinates = coords

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
            feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.8, 'co': 0.01, 'cp': 1}
          } else {
            feature.properties.eocrom = { 'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.8, 'co': 0.01, 'cp': 1}
          }

          newFeatureCollection.features.push(feature)
        }

        newFeatureCollection.features = Array.of(ngj)
        if (eoload.proform) {
          let proformion = eonMuonProfier.proformion(anigram)
          newFeatureCollection = eonMuonProj3ct(newFeatureCollection, proformion)
        }

        return newFeatureCollection
      },
      eotim: eotim,
      eoric: { gid: 'ani', cid: 'ani', fid: 'ani4'},
      eocrom: {'csx': 0, 'cf': 555, 'cs': 111, 'cw': 0.9, 'co': 0.0072, 'cp': 0.7},
      eoload: {
        tf: t => t,
      },
    }

    // .................. animas
    let animas = [

      lichtAni1, // h.sol
      lichtAni2, // h.sol
      lichtAni3, // h.sol
      lichtAni4, // h.sol

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ619mLicht = anitem
}))
