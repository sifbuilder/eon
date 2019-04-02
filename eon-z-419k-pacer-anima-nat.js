/* ******************************************
   *    @z419kPacerAnimaNat
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.z419kPacerAnimaNat = global.z419kPacerAnimaNat || {})))
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

    let muonStore = __eo('muonStore')
    try { renderSvg.scenecolor('black') } catch (e) {}
    // .................. animas
    let z = function () {
    // .................. pics
      let ctl
      try {
        ctl = ctlWen().control(renderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // ....................... pacerNat
      let pacerNat = {

        eohal: eohalPacer,
        eotim: eotim,
        eoric: { gid: 'natpace', cid: 'natpace', fid: 'natpace' },

        eofold: {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
        },

        eonode: {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
        },

        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [ 0, 0, 0], // mot
            scale: 1,
            rotate: [ [[[0, 60]]], [[[0, 60]]], [[[0, 60]]] ],
            prerotate: [[[ ctl.rotation ]]],
            lens: [0, 1, Infinity],
            addNodeToTranslate: 1, // eonode
          },
        },

        eocrom: { 'csx': 0, 'cf': 777, 'co': 0.1, 'cs': 666 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},

        eoload: {
          eoform: {
            'x': {
              'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
              'ra2': 24, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 20, 'pa6': 0, 'pb7': -1,
            },
            'y': {
              'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
              'ra2': 24, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 20, 'pa6': 0, 'pb7': -1,
            },
            'z': {
              'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
              'ra2': 24, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 10, 'pa6': 0, 'pb7': -1,
            },
          },

          pacer: {

          // ... the pacer is in the eoload of the hosting anima
          // ... initN: 1, one paced anitem will be generated, then sleep
          // ... pacedAnisort: anima, hsoting anima will create pacecount resident animas
          // ... basePaceOnAniView: undefined, base on resulting geofold
          // ... geoadd: 0, geometries will not be accumulated

            initN: 24, eventN: 0, autoN: 0, autoP: 0.01, outtimed: 0, maxN: 60, geospan: 0,

            eohal: eohalMars,
            pacedAnisort: 'anima',
            basePaceOnAniView: '',
            addItemToPacer: 0,

            eoric: function (ani, props) {
              let autocount = props.counter
              let eoric = muonProps.clone(ani.eoric)
              eoric.fid = muonEoric.idify(eoric.fic, autocount)
              eoric.uid = muonEoric.getuid(eoric)
              return eoric
            },

            eofold: (ani, props) => muonNatform.natMultiLineString({eoform: ani.eoload.eoform}),

            eonode: function (ani, props) {
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
                stace = [0, 0, 0]
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
  exports.z419kPacerAnimaNat = anitem
}))
