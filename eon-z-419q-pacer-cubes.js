/* ******************************************
   *    @z419qPacerCubes
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.z419qPacerCubes = global.z419qPacerCubes || {})))
}(this, function (exports) {
  'use strict'

  // .................. anitem
  async function anitem (__eo) {
  // .................. eons
    let [
      ctlRayder,
      ctlWen,
      eohalNatform,
      eohalMars,
      eohalPacer,
      eohalTextform,
      muonEoric,
      muonGraticule,
      muonNatform,
      muonProps,
      muonStace,
      protonUniwen,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').c('rayder'),
      __eo('xs').c('wen'),
      __eo('xs').e('natform'),
      __eo('xs').e('mars'),
      __eo('xs').e('pacer'),
      __eo('xs').e('textform'),
      __eo('xs').m('eoric'),
      __eo('xs').m('graticule'),
      __eo('xs').m('natform'),
      __eo('xs').m('props'),
      __eo('xs').m('stace'),
      __eo('xs').p('uniwen'),
      __eo('xs').r('svg'),
    ])

    try { renderSvg.scenecolor('black') } catch (e) {}
    let ctl
    try {
      ctl = ctlWen().control(renderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }
    let muonStore = __eo('muonStore')
    // .................. animas
    let z = function () {
    // .................. pics
      let eotim = {'td': 10000, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // ....................... pacerNat
      let pacerNat = {

        eohal: eohalPacer,
        eoric: { gid: 'natpace', cid: 'natpace', fid: 'natpace' },
        eoload: {

          pacer: {

            pacedby: {
              initN: 0, eventN: 0, autoN: 1, autoP: 0.036, autoT: 0.1,
              outtimed: 0, maxN: 60,
              geospan: 0,
              basePaceOnAniView: '', // undefined, base on resulting geofold
              addItemToPacer: 0, // geometries will not be accumulated

            },

            anima: {
              eotim: eotim,
              eohal: eohalMars,

              eoric: function (ani, props) {
                // let eoric = ani.eoric
                let eoric = { gid: 'g', cid: 'c', fid: 'paced' }

                if (props !== undefined) {
                  if (props.key === 'init') { // INIT
                    let q = muonStore.animasInClassHowMany(eoric)
                    let nextq = q++ // store updated between items
                    eoric.fid = muonEoric.idify(eoric.fid, props.key, nextq)
                  } else if (props.key === 'auto') { // AUTO
                    let q = muonStore.animasInClassHowMany(eoric)
                    let nextq = q + props.counter
                    eoric.fid = muonEoric.idify(eoric.fid, props.key, nextq)
                  } else if (props.key === 'event') { // EVENT
                    let q = muonStore.animasInClassHowMany(eoric)
                    let nextq = q + props.counter
                    eoric.fid = muonEoric.idify(eoric.fid, props.key, nextq)
                  }
                  eoric.uid = muonEoric.getuid(eoric)
                }

                return eoric
              },

              eofold: function (ani, props) {
                return a => muonNatform.natMultiLineString({eoform: a.eoload.eoform})
              },

              eonode: function (ani, props) {
                // eoric repeated in pacedItem eonode from pacedItem eoric
                let eoric = { gid: 'g', cid: 'c', fid: 'paced' }
                let stace = [0, 0, 0]
                if (props.key === 'init') { // INIT
                  let autocount = props.counter

                  let ridx = muonGraticule.ridx(4, 6, 1, 1)

                  let k = [40, 40]
                  let d = [-140, -40]
                  stace = [d[0] + k[0] * ridx(autocount)[0],
                    d[1] + k[1] * ridx(autocount)[1],
                    0]
                } else if (props.key === 'auto') { // AUTO
                  let eoric = { gid: 'g', cid: 'c', fid: 'paced' }

                  let ridx = muonGraticule.ridx(4, 6, 1, 1)

                  let q = muonStore.animasInClassHowMany(eoric)


                  let k = [40, 40]
                  let d = [-140, -40]
                  stace = [d[0] + k[0] * ridx(q)[0],
                    d[1] + k[1] * ridx(q)[1],
                    0]
                } else if (props.key === 'event') { // EVENT
                  if (ctlRayder.grabbed() !== undefined) {
                    let grabbed = ctlRayder.grabbed()
                    let x = grabbed[0]
                    let y = grabbed[1]
                    let z = 0
                    stace = {x, y, z }
                  }
                }

                let coordinates = stace
                let res = {
                  type: 'Feature',
                  geometry: { type: 'Point', coordinates: coordinates },
                  properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
                }
                return res
              },

              eomot: {
                proform: {
                  projection: 'uniwen',
                  translate: [ 0, 0, 0], // mot
                  scale: 1,
                  rotate: [ [[[0, 360]]], [[[0, 360]]], [[[0, 360]]] ],
                  prerotate: [[[ ctl.rotation ]]],
                  lens: [0, 1, Infinity],
                  addNodeToTranslate: 1, // eonode
                },
              },



              eoload: {
                eocrom: { 'csx': 0, 'cf': 777, 'co': 0.1, 'cs': [[[999, 111, 999]]], 'cw': 0.5, 'cp': 1},
               
                eoform: {
                  'x': {
                    'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
                    'ra2': 20 * Math.sqrt(2), 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 8, 'pa6': 0, 'pb7': -1,
                    'dom3': [ -180, 180 ],
                  },
                  'y': {
                    'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
                    'ra2': 20 * Math.sqrt(2), 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 8, 'pa6': 0, 'pb7': -1,
                    'dom3': [ -180, 180 ],
                  },
                  'z': {
                    'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
                    'ra2': 20, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 8, 'pa6': 0, 'pb7': -1,
                    'dom3': [ -180, 180 ],
                  },
                },

              },
            },
          },
        },
      }

      // .................. scene
      let scene = {
        pacerNat, // h.pacer
      }

      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.z419qPacerCubes = anitem
}))
