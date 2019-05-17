/* ******************************************
   *    @eonZ719bEohalDots
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ719bEohalDots = global.eonZ719bEohalDots || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    let [
      eonMuonProps,
      eonMuonEoforces,
      eonMuonNatform,
      d3Force3d,
      eonRenderPortview,
      eonCtlRayder,
      eonMuonEoric,
      eonEohalMars,
      eonEohalNatform,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-muon-eoforces'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('d3-force-3d'),
      __eo('xs').b('eon-render-portview'),
      __eo('xs').b('eon-ctl-rayder'),
      __eo('xs').b('eon-muon-eoric'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-natform'),
      __eo('xs').b('eon-render-svg'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) { }
    let eonMuonStore = __eo('eonMuonStore')
    // .................. animas
    let z = function () {
      let width = eonRenderPortview.width(),
        height = eonRenderPortview.height()

      let eohalIsolation_anify = anima => { // eohal ANIFY
        let animas = (anima.eoinited !== 1) ? (anima.eoinited = anima.eogelded = 1, [anima]) : []

        let nbr = 12

        for (let i = 0; i < nbr; i++) {
          let ani = eonMuonProps.cloneObj(natAni) // clone of model anima
          ani.eoric.gid = 'nat'
          ani.eoric.cid = 'nat'
          ani.eoric.fid = 'item' + i // identify

          let uid = eonMuonEoric.getuid(ani.eoric)
          ani.eoric.uid = uid

          let preani = eonMuonStore.findAnimaFromUid(ani.eoric.uid)

          if (preani) {
            ani = preani
          } else { // create anima
            ani.eohal = 'natform' // create eohal

            ani.eofold = { // will create anigram
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [ 10 * i, 0, 0],
              },
              properties: {pointRadius: 36},
            }

            ani.eonode.properties.orgen = [0, 0, 0 ]
          }
          animas.push(ani)
        }

        eonMuonStore.apply({type: 'UPDANIMA', animas: animas}) // live
        return animas
      }

      let eohalIsolation_gramify = anima => [] // eohal GRAMIFY))

      let isolation = {
        anify: anima => eohalIsolation_anify(anima),
        gramify: anima => eohalIsolation_gramify(anima),
      }

      // .................... pics
      let eotim = {'td': 52800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // .................... natAni
      let natAni = {

        eohal: isolation, // eohal defines anify and gramify behavior

        eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),

        eotim: eotim,
        eoric: {gid: 'ani', cid: 'ani', fid: 'natAni'},

        eonode: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
        },
        eomot: {
          proform: {
            projection: 'uniwen',
            translate: [0, 0, 0],
            scale: 1,
            rotate: [ 0, 0, 0 ],
            lens: [0, 1, 12],
            addNodeToTranslate: 1,
          },
        },
        eocrom: { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.49, 0.49]]], 'cs': [[[666, 666]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]},

        eoform: {

          'x': {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
            'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': [[[90, 90 - 0 * 360]]], 'pa6': 0, 'pb7': 360,
          },
          'y': {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
            'ra2': 20, 'v0': 0, 'v1': 1, 'seg5': 12, 'w4': [[[90, 90 - 0 * 360]]], 'pa6': 0, 'pb7': 360,
          },

        },
        eoload: {
        },
      }

      // .................. animas
      let animas = [

        natAni, // h.isolation

      ]

      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ719bEohalDots = anitem
}))
