/* ******************************************
   *    @eonZ752gD3formfaces
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ752gD3formfaces = global.eonZ752gD3formfaces || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    eonEohalMars,
    eonEohalNatform,
    eonMuonGraticule,
    eonProtonNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-proton-natform'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let z = function () {
  // .................. pics
    let eotim = {'td': 19800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}
    let form = {

      x: {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,

      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,

      },
      z: {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
        'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,

      },
    }

    let conform = {
      projection: 'natform',
      eoform: form,
    }

    let proform = {
      projection: 'uniwen',
      translate: [230 - 300, 240 - 200, 0],
      rotate: [ 90, 0, 0 ],
      scale: 1,
    }

    // -------------------------------  gratifaces11
    let gratifaces11 = {
      eohal: eonEohalMars,
      eofold: p => {
        let vertices = eonMuonGraticule.gjfMultiPoint(p.eoload.eoframe).geometry.coordinates
        let faces = eonMuonGraticule.gfaces(p.eoload.eoframe)
        faces = faces.map(face => [...face, face[0]])
        faces = faces.map(face => // faces : points => vertices
          face.map(vi => vertices[vi]) // eg. [1, 0, 3, 2, 1]
        ) //  (2) [-180, -45] [0, 0] [-180, 0]
        let features = faces.map(face => ({
          type: 'Feature', geometry: {type: 'Polygon', coordinates: Array.of(face)}, properties: {}}))
        let gj = {type: 'FeatureCollection', features: features}
        return gj
      },
      eotim: eotim,
      eoric: {'gid': 'gratis', 'cid': 'gratis', 'fid': 'gratifaces11'},

      eocrom: { 'csx': 0, 'cf': [[[666, 666]]], 'cs': 333, 'cw': 0.9, 'co': [[[0.03, 0.03, 0.03]]], 'cp': [[[0.9, 0.9, 0.9]]]},

      eomot: {
        conform: conform,

        proform: {projection: 'uniwen', rotate: [30, 30, 0], translate: [ 200 - 300, 150 - 200 ], scale: 1},
      },

      eoload: {
        eoframe: {
          geoframe: [
            [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ],
            [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ],
          ],
        },
      },
    }
    // -------------------------------  gratifaces12
    let gratifaces12 = {
      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {'gid': 'gratis', 'cid': 'gratis', 'fid': 'gratifaces12'},

      eofold: ani => {
        let vertices = eonMuonGraticule.gjfMultiPoint(ani.eoload.eoframe).geometry.coordinates

        let faces = eonMuonGraticule.gfaces(ani.eoload.eoframe)
        faces = faces.map(face => [...face, face[0]])
        faces = faces.map(face => // faces : points => vertices
          face.map(vi => vertices[vi]) // eg. [1, 0, 3, 2, 1]
        ) //  (2) [-180, -45] [0, 0] [-180, 0]
        let features = faces.map(face => ({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: Array.of(face),
          }, properties: {},
        }))
        let gj = {
          type: 'FeatureCollection',
          features: features,
        }
        return gj
      },

      eomot: {
        conform: conform,
        proform: {projection: 'uniwen', rotate: [30, 30, 0], translate: [ 200 - 300, 300 - 200 ], scale: 1},
      },
      eocrom: { 'csx': 0, 'cf': [[[666, 666]]], 'cs': 333, 'cw': 0.9, 'co': [[[0.03, 0.03, 0.03]]], 'cp': [[[0.9, 0.9, 0.9]]]},
      eoload: {
        eoframe: {

          multiframe: [
            [ -180, 180, 30, 30],
            [ -180, 180, 30, 30],
          ],

        },
      },
    }
    // -------------------------------  gratifaces11
    let gratilines21 = {
      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {'gid': 'gratis', 'cid': 'gratis', 'fid': 'gratilines21'},

      eofold: p => eonMuonGraticule.gjfMultiLineString(p.eoload.eoframe),
      eomot: {
        conform: conform,
        proform: {projection: 'uniwen', rotate: [30, 30, 0], translate: [ 400 - 300, 150 - 200 ], scale: 1},
      },

      eocrom: { 'csx': 0, 'cf': [[[666, 666]]], 'cs': 333, 'cw': 0.9, 'co': [[[0.03, 0.03, 0.03]]], 'cp': [[[0.9, 0.9, 0.9]]]},

      eoload: {
        eoframe: {
          geoframe: [
            [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ],
            [ [-180, 180, 45, 45], [-90, 90, 22.5, 22.5] ],
          ],
        },

      },

    }
    // -------------------------------  gratilines22
    let gratilines22 = {
      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'gratis', cid: 'gratis', fid: 'gratilines22'},

      eofold: ani => eonMuonGraticule.gjfMultiLineString(ani.eoframe),

      eomot: {
        conform: {
          projection: 'natform',
          eoform: form,
        },
        proform: {
          projection: 'uniwen',
          rotate: [30, 30, 0],
          translate: [ 400 - 300, 300 - 200 ],
          scale: 1,
        },
      },

      eocrom: { 'csx': 0, 'cf': 666, 'cs': 333, 'cw': 0.9, 'co': 0.03, 'cp': 0.9 },
      eoframe: {
        multiframe: [ [-180, 180, 45, 1],
          [-90, 90, 22.5, 1] ],

      },
      eoload: {},
    }

    // -------------------------------  animas
    let animas = [
      gratifaces11, // h.mars p.natform
      gratifaces12, // h.mars p.natform
      gratilines21, // h.mars p.natform
      gratilines22, // h.mars p.natform

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ752gD3formfaces = anitem
}))