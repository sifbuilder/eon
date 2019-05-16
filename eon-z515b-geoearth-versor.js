/* ******************************************
   *    @eonZ515bGeoearthVersor
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ515bGeoearthVersor = global.eonZ515bGeoearthVersor || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      d3Geo,
      topojson,
      eonCtlVersor,
      eonDatWorldTopo110m,
      eonEohalMars,
      eonEohalTextform,
      eonMuonGraticule,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('d3-geo'),
      __eo('xs').b('topojson'),
      __eo('xs').b('eon-ctl-versor'),
      __eo('xs').b('eon-dat-world-topo110m'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-textform'),
      __eo('xs').b('eon-muon-graticule'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    // .................. animas
    let z = function () {
    // .................. pics
      eonCtlVersor().control(eonRenderSvg.svg())

      let eotim = {'td': 18800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

      // .................. geoearthDark  DARK
      let pDark = function () {
        let forward = (x, y) => d3Geo.geoOrthographicRaw(-x, -y)
        forward.invert = (x, y) => d3Geo.geoOrthographicRaw.invert(-x, -y)
        return forward
      }

      let darkProjection = d3Geo.geoProjection(pDark())
        .clipAngle(90)
        .translate([0, 0, 0])
        .scale(180)

      let proformDark = {

        projection: darkProjection,
        prerotate: [[[ t => {
          let rot = eonCtlVersor
            .projection({projection: darkProjection})
            .rotation()
          let res = [180 + rot[0], -rot[1], -rot[2]]
          return res
        }]]],
        rotate: [ [[[0, 1 * 360]]], 30, 9],

      }

      let geoearthDark = {

        eohal: eonEohalMars,
        eotim,
        eoric: {gid: 'geo', cid: 'geo', fid: 'geoearthDark'},

        eofold: () => {
          return Object.assign({},
            topojson.feature(
              eonDatWorldTopo110m.data(),
              eonDatWorldTopo110m.data().objects.land
            )
          )
        },

        eomot: {
          proform: proformDark,
        },
        eocrom: { 'csx': 0, 'cf': 333, 'cs': 333, 'cw': 0.2, 'co': 0.4, 'cp': 0.9},
        eoload: {},

      }

      // .................. geoearthFront FRONT
      let pFront = function (x, y) {
        let forward = (x, y) => d3Geo.geoOrthographicRaw(x, -y)
        forward.invert = (x, y) => d3Geo.geoOrthographicRaw.invert(x, -y)
        return forward
      }

      let frontProjection = d3Geo.geoProjection(pFront())
        .clipAngle(90)
        .translate([0, 0, 0])
        .rotate([0, 0, 0])

      let proformFront = {

        projection: frontProjection,
        prerotate: [[[ function (t) {
          let rot = eonCtlVersor
            .projection({projection: frontProjection})
            .rotation()
          return rot
        } ]]],

        translate: [0, 0, 0],
        scale: 180,
        rotate: [ [[[0, 1 * 360]]], -30, -9],

      }

      let geoearthFront = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {gid: 'geo', cid: 'geo', fid: 'geoearthFront'},

        eofold: () => {
          return Object.assign({},
            topojson.feature(
              eonDatWorldTopo110m.data(),
              eonDatWorldTopo110m.data().objects.land
            )
          )
        },

        eomot: {
          proform: proformFront,
        },

        eocrom: { 'csx': 0, 'cf': 555, 'cs': 333, 'cw': 0.2, 'co': 1, 'cp': 0.9},
        eoload: {},

      }

      // .................. graticuleFront
      let graticuleFront = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {'gid': 'geoearth', 'cid': 'geoearth', 'fid': 'graticuleFront'},

        eofold: p => eonMuonGraticule.gjfMultiLineString(p.eoframe),
        eomot: {
          proform: proformFront,
        },
        eocrom: { 'csx': 0, 'cf': [[[555, 555]]], 'cs': 333, 'cw': 0.4, 'co': 0.001, 'cp': 0.9},

        eoframe: {

          geoframe: [ [ [ -180, 180, 30, 3], // x
            [ -180, 180, 15, 1.5] ] ], // y

        },
        eoload: {},

      }
      // .................. textAni1
      let textAni1 = {

        eohal: eonEohalTextform,
        eoric: {'gid': 'text', 'cid': 'text', 'fid': 'textAni1'},
        eotim: eotim,

        eocrom: { 'csx': 0, 'cf': [[[888, 777]]], 'cs': 111, 'cw': [[[0.1, 0.1]]], 'co': [[[0.6, 0.6]]], 'cp': [[[0.5, 0.5]]]},
        eofold: ani => ({ type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] } }),

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [ -295, 175 ],
          },
        },
        eoload: {
          textform: {
            string: function () {
              let proRotation = this.proRotation.map(d => Math.floor(10 * d) / 10)

              return `rotate:   λ = ${proRotation[0]}, φ = ${proRotation[1]}, γ = ${proRotation[2]}`
            },
            rotInDrag: [[[ eonCtlVersor.rotInDrag ]]],
            rotMomentum: [[[ eonCtlVersor.rotMomentum ]]],
            proRotation: [[[ eonCtlVersor.proRotation ]]],
            style: {
              rotate: [[[ 0, 0 ]]],
              'font-size': [[[12, 12]]],
              'font-family': 'BankFuturistic',
              'text-anchor': 'center',
            },
          },
        },
      }
      // .................. textAni2
      let textAni2 = {

        eohal: eonEohalTextform,
        eoric: {'gid': 'text', 'cid': 'text', 'fid': 'textAni2'},
        eotim: eotim,

        eocrom: { 'csx': 0, 'cf': [[[888, 777]]], 'cs': 111, 'cw': [[[0.1, 0.1]]], 'co': [[[0.6, 0.6]]], 'cp': [[[0.5, 0.5]]]},
        eofold: ani => ({ type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] } }),

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [ -295, 160 ],
          },
        },
        eoload: {
          textform: {
            string: function () {
              let rotInDrag = this.rotInDrag.map(d => Math.floor(10 * d) / 10)

              return `drag:     λ = ${rotInDrag[0]}, φ = ${rotInDrag[1]}, γ = ${rotInDrag[2]}`
            },
            rotInDrag: [[[ eonCtlVersor.rotInDrag ]]],
            rotMomentum: [[[ eonCtlVersor.rotMomentum ]]],
            proRotation: [[[ eonCtlVersor.proRotation ]]],
            style: {
              rotate: [[[ 0, 0 ]]],
              'font-size': [[[12, 12]]],
              'font-family': 'BankFuturistic',
              'text-anchor': 'center',
            },
          },
        },
      }
      // .................. textAni3
      let textAni3 = {

        eohal: eonEohalTextform,
        eoric: {'gid': 'text', 'cid': 'text', 'fid': 'textAni3'},
        eotim: eotim,

        eocrom: { 'csx': 0, 'cf': [[[888, 777]]], 'cs': 111, 'cw': [[[0.1, 0.1]]], 'co': [[[0.6, 0.6]]], 'cp': [[[0.5, 0.5]]]},
        eofold: ani => ({ type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] } }),

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [ -295, 145 ],
          },
        },
        eoload: {
          textform: {
            string: function () {
              let rotMomentum = this.rotMomentum.map(d => Math.floor(10 * d) / 10)
              return `momentum: λ = ${rotMomentum[0]}, φ = ${rotMomentum[1]}, γ = ${rotMomentum[2]}`
            },
            rotInDrag: [[[ eonCtlVersor.rotInDrag ]]],
            rotMomentum: [[[ eonCtlVersor.rotMomentum ]]],
            proRotation: [[[ eonCtlVersor.proRotation ]]],
            style: {
              rotate: [[[ 0, 0 ]]],
              'font-size': [[[12, 12]]],
              'font-family': 'BankFuturistic',
              'text-anchor': 'center',
            },
          },
        },
      }

      // .................. scene
      let scene = {
        graticuleFront, // h.mars
        geoearthFront, // h.mars g.orthographic
        geoearthDark,
        textAni1,
        textAni2,
        textAni3,

      }

      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ515bGeoearthVersor = anitem
}))
