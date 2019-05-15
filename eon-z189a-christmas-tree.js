/* ******************************************
   *    @eonZ189aChristmasTree
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ189aChristmasTree = global.eonZ189aChristmasTree || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonCtlRayder,
      eonCtlWen,
      eonEohalPacer,
      eonEohalTextform,
      eonEohalMars,
      eonEohalFuel, // eslint-disable-line no-unused-vars
      eonMuonEoric,
      eonMuonGeoj,
      eonMuonLindenmayer,
      eonMuonNatform,
      eonMuonProps,
      eonMuonStace,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-rayder'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-pacer'),
      __eo('xs').b('eon-eohal-textform'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-fuel'),
      __eo('xs').b('eon-muon-eoric'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-lindenmayer'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-muon-stace'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    let eonMuonStore = __eo('eonMuonStore')

    // .................. animas
    let z = function () {
    // .................. pics
      let ctl
      try {
        ctl = eonCtlWen().control(eonRenderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      let sin = Math.sin, cos = Math.cos

      let eotim = {'td': 6800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // ....................... natBall
      let natBall = {

        eohal: 'fuel', // 'mars',
        eotim: eotim,
        eoric: {gid: 'nat', cid: 'nat', fid: 'natBall'},

        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
        eonode: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {
            orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
          },
        },
        eoform: {
          x: {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
            'ra2': 2, 'v0': 0, 'v1': 1, 'seg5': 15, 'w4': 0, 'pa6': 0, 'pb7': -1,
          },
          y: {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
            'ra2': 2, 'v0': 0, 'v1': 1, 'seg5': 15, 'w4': 0, 'pa6': 0, 'pb7': -1,
          },
        },

        eocrom: { 'csx': 1, 'cf': [[[600, 990, 600, 990, 600, 990]]], 'co': [[[0.99, 0.99]]], 'cs': [[[100, 100]]], 'cw': [[[0.2, 0.2]]], 'cp': [[[0.7, 0.9]]]},

        eoload: {
          fuel: {
            f: 2, // which items are showed: 2: just those new
            ra2: 2, //
            candidates: 180, // try candidates
            sample: 120, // to get sample
          },
        },

      }

      // ....................... natLintree
      let natLintree = {

        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani' },
        eohal: eonEohalMars,

        eofold: ani => {
          let lindenmayers = ani.eoload.lindenmayers
          let pointer = 0 // Math.floor( (qLindenmayers -1) * ani.eotim.unElapsed)

          return eonMuonLindenmayer.multiLine(lindenmayers[pointer])
        },

        eocrom: { 'csx': 9, 'cf': [[[444, 666, 444]]], 'cs': [[[766, 766]]], 'cw': [[[1.9, 1.9]]], 'co': [[[0.01, 0.01]]], 'cp': [[[0.29, 0.29]]]},
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: [2.7, 2.7],
            translate: {x: 0, y: 180 },
            prerotate: [[[ ctl.rotation ]]],
            rotate: [ 0, 0, 0 ],
          },
        },
        eoload: {

          lindenmayers: [

            { // tree
              linden: {
                axiom: 'X',
                loopq: 6,
                rules: {
                  X: '[+FX][FX][-FX]',
                  F: 'FF',
                },
              },
              mayer: {
                side: [[[1, 1, 1]]],
                angunit: [[[120, 120, 120]]],
                angstart: 90,
                start: [0, -90],
              },
            },

          ],

        },
      }

      natLintree.avatars = {natBall}
      // ....................... natTriang
      let natTriang = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},

        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
        eonode: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {
            orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
          },
        },

        eomot: {
          proform: {
            projection: 'uniwen',
            prerotate: [[[ ctl.rotation ]]],
            translate: [ 0, -60 ], //
            scale: [2.0, 2, 1],
            rotate: [ 0, 0, 30 ],
            lens: [0, 1, Infinity],
          },
        },
        eocrom: { 'csx': 0, 'cf': [[[100, 300]]], 'co': [[[0.29, 0.29]]], 'cs': [[[333, 333]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]},
        eoform: {
          x: {
            'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1,
            'ra2': 90, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          },
          y: {
            'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1,
            'ra2': 90, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          },
        },

        eoload: {},

      }
      // ....................... natLeaform
      let natStar = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {gid: 'nat', cid: 'nat', fid: 'nat'},

        eofold: ani => eonMuonNatform.natMultiLineString({
          eoform: ani.eoform,
          ghv: 0, // horizontal geodesics
          gsa: 0, // symetric distribution of geodesics around the origin
          gco: 0, // closed line
        }),
        eonode: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {
            orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
          },
        },

        eomot: {
          proform: {
            projection: 'uniwen',
            prerotate: [[[ ctl.rotation ]]],
            translate: [ 0, 150, 0], //
            scale: 1,
            rotate: [ 0, 0, 0 ],
            lens: [0, 1, Infinity],
          },
        },
        eocrom: { 'csx': 0, 'cf': [[[999, 999, 999]]], 'co': [[[0.69, 0.69]]], 'cs': [[[999, 999]]], 'cw': [[[1.9, 3.9, 1.9 ]]], 'cp': [[[0.7, 0.9, 0.2]]]},

        eoform: {
          x: {
            'm1': 6, 'm2': 6, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
            'ra2': 36, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          },
          y: {
            'm1': 6, 'm2': 6, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
            'ra2': 36, 'v0': 0, 'v1': 1, 'seg5': 360, 'w4': 0, 'pa6': 0, 'pb7': -1,
          },
        },

        eoload: {},

      }

      // ............................. natSpiral
      let natSpiral = {

        eohal: eonEohalMars,
        eotim: eotim,
        eoric: {gid: 'q', cid: 'q', fid: 'q'},

        eofold: ani => {
          let natipros = {
            eoform: ani.eoform,
            ghv: 1, // horizontal geodesics
            gsa: 0, // symetric distribution of geodesics around the origin
            gco: 0, // closed line
          }

          let gj = eonMuonNatform.natMultiLineString(natipros)
          let coords = eonMuonGeoj.getCoords(gj)
          let nb = coords.length
          let unElapsed = ani.eotim.unElapsed
          let t = unElapsed
          let nbt = Math.ceil(nb * t)

          let firstcoord = 0

          let newFeatures = [gj]

          let inc = 0
          let pars = 0

          if (inc === 1 || pars === 1) {
            let tgj = gj
            tgj.geometry = eonMuonGeoj.getCoordsInRange(gj.geometry, nbt, firstcoord)
            tgj.properties = tgj.properties === undefined ? {} : tgj.properties
            tgj.properties.eocrom = ani.eocrom
            tgj.properties.lastcoord = nbt

            newFeatures = [tgj]
          }

          if (inc === 1) {
            let preani = eonMuonStore.findAnigramFromUid(ani.eoric.uid)

            if (preani !== undefined) {
              let features = preani.eofold.features

              let lastFeature = features[features.length - 1]
              let lastFeatureProps = lastFeature.properties
              let lastcoord = lastFeatureProps.lastcoord

              if (lastcoord !== undefined) {
                firstcoord = 0 // lastcoord
              }

              let tgj = gj
              tgj.geometry = eonMuonGeoj.getCoordsInRange(gj.geometry, nbt, firstcoord)
              tgj.properties = tgj.properties === undefined ? {} : tgj.properties
              tgj.properties.eocrom = ani.eocrom
              tgj.properties.eocrom.cs = 300 + 700 * unElapsed
              tgj.properties.lastcoord = nbt

              newFeatures = [ tgj] // newFeatures = [...prefeatures, tgj]
            }
          }

          let gfeats = {
            type: 'FeatureCollection',
            features: newFeatures,
          }
          return gfeats
        },

        eomot: {
          proform: {
            projection: 'uniwen',
            scale: [ 0.9, 0.5 ],
            prerotate: [[[ ctl.rotation ]]],
            translate: [ [0, 40, 0] ],
            rotate: [ 90, 0, 0 ],
            lens: [0, 1, Infinity ],
          },
        },
        eocrom: { 'csx': 1, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
          'cs': [[[666, 333, 666]]], 'cw': [[[1.7, 1.7, 1.7]]], 'cp': [[[0.9, 0.9]]]},

        eoform: {
          x: {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
            'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 180, 'pa6': 0, 'pb7': -1,
            'dom3': [-180, 180],
            c: [ [[[1, 1]]], [[[1, 1]]], [[[0, 90]]], 1 ],
            'fn0': (e, c, dax) => {
              let x = e[0]

              let z = e[2]

              let levels = 3
              let m = 1
              if (z === 0) {
                let i = levels
                m = 1 / i
              } else {
                for (let i = 1; i < levels; i++) { // 1
                  if (z === (Math.PI / 2) / i) {
                    m = 1 / i
                    break
                  }
                }
              }

              let res = m * Math.sqrt((Math.PI + x)) * cos(x) * sin(x)

              return res
            },
          },
          y: {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
            'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 180, 'pa6': 0, 'pb7': -1,
            'dom3': [-180, 180],
            c: [ [[[1, 1]]], [[[1, 1]]], [[[0, 90]]], 1 ],
            'fn0': (e, c, dax) => {
              let y = e[1]
              let z = e[2]

              let levels = 3
              let m = 1
              if (z === 0) {
                let i = levels
                m = 1 / i
              } else {
                for (let i = 1; i < levels; i++) { // 1
                  if (z === (Math.PI / 2) / i) {
                    m = 1 / i
                    break
                  }
                }
              }

              let res = m * Math.sqrt((Math.PI + y)) * sin(y) * sin(y)

              return res
            },

          },

          z: {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
            'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 3, 'pa6': 0, 'pb7': -1, // segs: double cycles
            'dom3': [0, 180],
            c: [ [[[1, 1]]], 1, 1, 1], // 37.5   radians * 225 / 6    2:2/3, 4:2/2,
            'fn0': (e, c, dax) => {
              let x = e[0] // dom:[-180, 180] : [-1.57, 1.57]
              let y = e[1] // dom:[-180, 180] : [-1.57, 1.57]
              let z = e[2]

              let seg5 = dax.seg5

              let res = z + 0.5 * (x + y) / seg5
              return res
            },
          },

          w: {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
            'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
            'dom3': [0, 360],
            c: [ 1, 1, 1, 1 ],
            'fn0': (e, c, dax) => {
              return e[3]
            },

          },

        },
        eoload: {},

      }

      // ....................... aviStar
      let aviStar = {

        eohal: eonEohalPacer,
        eotim: eotim,
        eoric: { gid: 'nat', cid: 'nat', fid: 'pacerNat' },

        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),

        eonode: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
        },

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [0, 0, 0],
            scale: 1,
            rotate: [ 0, 0, 0 ],
            lens: [0, 1, Infinity],
            addNodeToTranslate: 1, // add eonode to projection
          },
        },

        eocrom: { 'csx': 0, 'cf': 777, 'co': 1, 'cs': 666 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},

        eoform: {
          'x': {
            'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
            'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
          },
          'y': {
            'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
            'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
          },
        },

        eoload: {
          pacer: {

            initN: 0, eventN: 0, autoN: 9, autoP: 0.1, outtimed: 0, maxN: 60, geospan: 0,

            addItemToPacer: 0,
            pacedAnisort: 'anigram',
            basePaceOnAniView: 'viewform',

            eohal: eonEohalMars,

            eoric: function (ani, props) {
              let eoric = eonMuonProps.clone(ani.eoric)

              if (props.key === 'init') { // INIT
                let q = eonMuonStore.animasInClassHowMany(eoric)
                let nextq = q + props.counter
                eoric.fid = eonMuonEoric.idify(eoric.fid, props.key, nextq)
              } else if (props.key === 'auto') { // AUTO
                let q = eonMuonStore.animasInClassHowMany(eoric)
                let nextq = q + props.counter
                eoric.fid = eonMuonEoric.idify(eoric.fid, props.key, nextq)
              } else if (props.key === 'event') { // EVENT
                let q = eonMuonStore.animasInClassHowMany(eoric)
                let nextq = q + props.counter
                eoric.fid = eonMuonEoric.idify(eoric.fid, props.key, nextq)
              }

              eoric.uid = eonMuonEoric.getuid(eoric)
              return eoric
            },

            eonode: function (ani, props) {
              let stace = [0, 0, 0]
              if (props.key === 'init') { // INIT
                stace = eonMuonStace.getLocus([null, null, null], ani)
              } else if (props.key === 'auto') { // AUTO
                let sep = Math.floor(10 * (1 + Math.random()))
                let counter = props.counter
                let locus = ani.eoload.stace.auto.locus

                locus[0].pos = locus[0].pos + counter * sep
                locus[1].pos = locus[1].pos + counter * sep

                stace = eonMuonStace.getLocus(locus, ani)
              } else if (props.key === 'event') { // EVENT
                if (eonCtlRayder.grabbed() !== undefined) {
                  let grabbed = eonCtlRayder.grabbed()
                  let x = grabbed[0]
                  let y = grabbed[1]
                  let z = 0
                  stace = {x, y, z }
                }
              }

              let coordinates = stace
              let res = {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: coordinates,
                },
                properties: {orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
              }
              return res
            },

          },
          stace: {
            auto: {
              locus: [ {pos: [[[10, 360]]] }, {pos: [[[10, 360]]]}, {pos: 0} ],
            },
          },
        },
      }
      // ....................... natAni avatars
      natSpiral.avatars = {

        aviStar, // h.pacer

      }
      // .................. textAniA
      let textAniA = {

        eohal: eonEohalTextform,
        eotim: eotim,
        eoric: {gid: 'text', cid: 'text', fid: 'texta'},

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

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [ -175, 30 ],
          },
        },

        eocrom: { 'csx': 0, 'cf': [[[888, 666, 888]]], 'cs': 111, 'cw': [[[0.1, 0.7]]], 'co': [[[0.99, 0.99]]], 'cp': [[[0.5, 0.5]]]},

        eoload: {
          textform: {
            string: 'Merry',
            style: {
              rotate: [[[ 0, 0 ]]],
              'font-size': [[[40, 40]]],
              'font-family': 'BankFuturistic',
              'text-anchor': 'center',

            },
          },

        },
      }
      // .................. textAniB
      let textAniB = {

        eohal: eonEohalTextform,
        eotim: eotim,
        eoric: {'gid': 'text', 'cid': 'text', 'fid': 'textb'},

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

        eocrom: { 'csx': 0, 'cf': [[[888, 666, 888]]], 'cs': 111, 'cw': [[[0.1, 0.7]]], 'co': [[[0.99, 0.99]]], 'cp': [[[0.5, 0.5]]]},

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [ 75, 30 ],
          },
        },

        eoload: {
          textform: {
            string: 'Christmas',
            style: {
              rotate: [[[ 0, 0 ]]],
              'font-size': [[[40, 40]]],
              'font-family': 'BankFuturistic',
              'text-anchor': 'center',

            },
          },

        },
      }

      // .................. textAniC
      let textAniC = {

        eohal: eonEohalTextform,

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

        eotim: eotim,
        eoric: {'gid': 'text', 'cid': 'text', 'fid': 'textc'},
        eocrom: { 'csx': 0, 'cf': [[[666, 888, 666]]], 'cs': 111, 'cw': [[[0.1, 0.7]]], 'co': [[[0.99, 0.99]]], 'cp': [[[0.5, 0.5]]]},

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [ -220, -50 ],
          },
        },

        eoload: {
          textform: {
            string: 'Happy',
            style: {
              rotate: [[[ 0, 0 ]]],
              'font-size': [[[40, 40]]],
              'font-family': 'BankFuturistic',
              'text-anchor': 'center',

            },
          },

        },
      }
      // .................. textAniD
      let textAniD = {

        eohal: eonEohalTextform,

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

        eotim: eotim,
        eoric: {'gid': 'text', 'cid': 'text', 'fid': 'textd'},
        eocrom: { 'csx': 0, 'cf': [[[666, 888, 666]]], 'cs': 111, 'cw': [[[0.1, 0.7]]], 'co': [[[0.99, 0.99]]], 'cp': [[[0.5, 0.5]]]},

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [ 120, -50 ],
          },
        },

        eoload: {
          textform: {
            string: '2019',
            style: {
              rotate: [[[ 0, 0 ]]],
              'font-size': [[[40, 40]]],
              'font-family': 'BankFuturistic',
              'text-anchor': 'center',

            },
          },

        },
      }
      // .................. animas
      let animas = [
        natTriang,
        natLintree,
        natStar,
        natSpiral,
        textAniA,
        textAniB,
        textAniC,
        textAniD,
      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ189aChristmasTree = anitem
}))
