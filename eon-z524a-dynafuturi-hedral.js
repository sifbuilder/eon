/* ******************************************
   *    @eonZ524aDynafuturiHedral
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ524aDynafuturiHedral = global.eonZ524aDynafuturiHedral || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
    // .................. eons
    let [
      topojson,
      eonCtlWen,
      datWorldTopo110m,
      eonEohalTextform,
      eonEohalMars,
      eonMuonNatform,
      eonMuonGeom,
      eonMuonGraticule,
      eonMuonProps,
      eonProtonHedrals,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('topojson'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').d('worldTopo110m'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-textform'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-proton-hedrals'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
      let eotim = { 'td': 18200, 't0': 0, 't1': 1, 't2': 1, 't3': 1 }

      let proform = {

        'projection': 'hedrals',
        'scale': 30,
        'rotate': [[[[0, -60]]], [[[0, -60]]], [[[0, -60]]]],
        'translate': [0, 0],

        'trees': [
          [-1, 4, 5, 2, 0, 1],
          [-1, 4, 5, 0, 0, 1],
          [-1, 0, 0, 0, 0, 4],

          [-1, 2, 3, 0, 1, 4],
          [-1, 2, 0, 2, 1, 1],
          [-1, 0, 1, 2, 1, 2],
          [-1, 4, 1, 2, 0, 3],
          [-1, 0, 1, 2, 1, 2],
          [-1, 0, 1, 2, 0, 2],
          [-1, 0, 1, 5, 0, 2],
        ],
        'treeidx': [[[0, 9.1, 0]]],
        'faciaRotation': [[[Math.PI / 1, Math.PI / 1]]],

        'vertices': [
          [-1, -1, 1], // 0  // 0
          [1, -1, 1], // 1  // 1
          [1, 1, 1], // 2  // 2
          [-1, 1, 1], // 3  // 3
          [-1, -1, -1], // 5  // 4
          [1, -1, -1], // 4  // 5
          [1, 1, -1], // 7  // 6
          [-1, 1, -1], // 6  // 7
        ].map(eonMuonGeom.normalize) // eg. [0.5773, -0.577, 0.5773]
          .map(eonMuonGeom.spherical) // eg. [-0.7853, 0.6154]
          .map(eonMuonGeom.to_degrees),

        'faces': [
          [1, 0, 3, 2, 1], // N
          [1, 2, 6, 5, 1],
          [2, 3, 7, 6, 2],
          [3, 0, 4, 7, 3],
          [0, 1, 5, 4, 0],
          [5, 6, 7, 4, 5], // S
        ],

      }

      // ............................. geograt
      let geograt = {

        eohal: eonEohalMars,

        eofold: anitem => eonMuonGraticule.gjfMultiLineString(anitem.eoframe),
        eotim: eotim,
        eoric: { 'gid': 'geograt', 'cid': 'geograt', 'fid': 'geograt' },
        eocrom: { 'csx': 0, 'cf': [[[111, 111]]], 'cs': 666, 'cw': 0.39, 'co': [[[0.5, 0.5]]], 'cp': [[[0.9, 0.9]]] },

        eomot: {
          proform: proform,
        },
        eoframe: {

          'geoframe': [[[-180, 180, 45, 45], [-90, 90, 22.5, 22.5]],
            [[-180, 180, 45, 45], [-90, 90, 22.5, 22.5]]],

        },
        eoload: {

        },

      }

      // ............................. geoearth
      let geoearth = {

        eohal: eonEohalMars,

        eofold: p => {
          let geometry = Object.assign({},
            topojson.mesh(
              datWorldTopo110m.data(),
              datWorldTopo110m.data().objects.land
            )
          )
          return { type: 'Feature', geometry: geometry, properties: {} }
        },
        eotim: eotim,
        eoric: { 'gid': 'geoearth', 'cid': 'geoearth', 'fid': 'geoearth' },
        eocrom: { 'csx': 0, 'cf': [[[555, 333, 555, 333, 555, 333, 555]]], 'cs': 333, 'cw': 0.2, 'co': 0.4, 'cp': 0.9 },

        eomot: {
          conform: proform,
        },
        eoload: {
        },
      }

      // -------------------------------  geoearth
      let geoshpere = {

        eohal: eonEohalMars,

        eofold: {
          type: 'Feature',
          geometry: {
            type: 'Sphere',
          },
          properties: {},
        },
        eotim: eotim,
        eoric: { 'gid': 'geoshpere', 'cid': 'geoshpere', 'fid': 'geoshpere' },
        eocrom: { 'csx': 0, 'cf': 444, 'cs': 333, 'cw': 0.9, 'co': 0.4, 'cp': 0.9 },

        eomot: {
          proform: proform,
        },
        eoload: {
        },

      }

      // -------------------------------  text
      let text = {

        eohal: eonEohalTextform,
        eotim: eotim,
        eoric: { 'gid': 'text', 'cid': 'text', 'fid': 'text' },

        eofold: ani => {
          let res = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0],
            },
          }
          return res
        },

        eocrom: { 'csx': 0, 'cf': [[[888, 777]]], 'cs': 111, 'cw': [[[0.1, 0.7]]], 'co': [[[0.6, 0.99]]], 'cp': [[[0.5, 0.5]]] },

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [-250, 0],
          },
        },

        eoload: {
          textform: {
            string: 'nine realms unified by the world tree yggdrasil.',
            style: {
              rotate: [[[0, -1]]],
              'font-size': [[[10, 60]]],
              'font-family': 'BankFuturistic',
              'text-anchor': 'center',

            },
          },

        },
      }

      // ............................. animas
      let animas = [
        geograt, // h.mars g.hedrals
        geoearth, // h.mars g.hedrals
        geoshpere, // h.mars g.hedrals

        text, // h.text
      ]

      return animas
    }

    let enty = () => { }
    enty.z = z
    return enty
  }
  exports.eonZ524aDynafuturiHedral = anitem
}))