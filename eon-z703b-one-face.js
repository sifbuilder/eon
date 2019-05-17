/* ******************************************
   *    @eonZ703bOneFace
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ703bOneFace = global.eonZ703bOneFace || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonCtlWen,
      eonEohalMars,
      eonMuonProps,
      eonProtonUniwen,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-proton-uniwen'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
    // .................. pics
      let ctl
      try {
        ctl = eonCtlWen().control(eonRenderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      let eotim = {'td': 29200, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      let proformFaces = {

        projection: eonProtonUniwen(),
        center: [ 0, 0 ],
        translate: [ 180 - 180, 200 - 200 ],
        scale: 90,
        rotate: [ [0, 1, 12], [[[ ctl.rotation ]]] ],
        lens: [0, 1, 4], // [1,0] // [ [[[0,0,1,1,1,0]]], [[[0,0,1,1,1,0]]] ],  //

      }

      let geoformFaces = ani => { // eofold creates geojson featurecollection
        let eoload = ani.eoload // eoload

        let faces = eonMuonProps.v(eoload.faces) // eoload.faces
        let json = {type: 'FeatureCollection', features: []}

        // for (let i = 0, l = faces.length; i < l; i++) {
        // let face = faces[i] // face cornersx position
        for (let i = 0, l = 40; i < l; i++) {
          let face = faces[0] // face cornersx position

          let geometry = {type: 'Polygon', coordinates: []}
          geometry.coordinates = Array.of(face.vertices) // eg [-1, 1, 1]

          let properties = {}
          // properties.eocrom = face.eocrom || eocrom
          properties.eocrom = {'csx': 0, 'cf': 333 + 10 * i, 'cs': 688, 'cw': 0.7, 'co': [[[0.999, 0.999]]], 'cp': 0.999}
          properties.name = 'orange' + '_' + i

          let feature = {type: 'Feature', geometry: {}, properties: {}}
          feature.geometry = geometry
          feature.properties = properties

          json.features.push(feature)
        }
        return json
      }
      // .................. aniOneFace
      let aniOneFace = {

        eohal: eonEohalMars,

        eofold: geoformFaces, // eofold,
        eotim: eotim,
        eoric: {'gid': 'faces', 'cid': 'face', 'fid': 'face'},
        eocrom: {'csx': 0, 'cf': [[[222, 333, 222, 333, 222, 333, 222]]], 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

        eomot: {
          proform: proformFaces,
        },
        eoload: {
          faces: [
            {
              vertices: [
                [-1, -1, 1],
                [ 1, -1, 1],
                [ 1, 1, 1],
                [ -1, 1, 1],
                [-1, -1, 1],
              ],
              eocrom: {'csx': 0, 'cf': 333, 'cs': 688, 'cw': 0.7, 'co': [[[0.999, 0.999]]], 'cp': 0.999},
            },

            {
              vertices: [
                [-1, -1, -1],
                [ 1, -1, -1],
                [ 1, 1, -1],
                [-1, 1, -1],
                [-1, -1, -1],
              ],
              eocrom: {'csx': 0, 'cf': 777, 'cs': 833, 'cw': 0.7, 'co': [[[0.999, 0.999]]], 'cp': 0.999},
            },
          ],

        },
      }

      // .................. animas
      let animas = [
        aniOneFace,
      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ703bOneFace = anitem
}))
