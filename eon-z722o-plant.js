/* ******************************************
   *    @eonZ722oPlant
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ722oPlant = global.eonZ722oPlant || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
  // .................. eons
    let [
      eonCtlRayder,
      eonCtlWen,
      eonEohalNatform,
      eonEohalPacer,
      eonEohalTextform,
      eonEohalMars,
      eonEohalFuel,
      eonMuonEoric,
      eonMuonGeoj,
      eonMuonLindenmayer,
      eonMuonNatform,
      eonMuonProps,
      eonMuonStace,
      eonProtonUniwen,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-rayder'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-natform'),
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
      __eo('xs').b('eon-proton-uniwen'),
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

      let eotim = { td: 24200, t0: 0, t1: 1, t2: 1, t3: 1, nostop: 1 }

      // ....................... aniForm
      let aniForm = {

        eotim: eotim,
        eoric: { gid: 'ani', cid: 'ani', fid: 'ani' },
        eohal: eonEohalMars,

        eofold: ani => {
          let gj = eonMuonLindenmayer.multiLine(ani.eoload.lindenmayer)
          let res = eonMuonGeoj.timeSeg(gj, ani.eotim.unElapsed) // gj  //

          return res
        },

        eocrom: { 'csx': 22, 'cf': [[[444, 666]]], 'cs': 900, 'cw': [[[0.9, 0.9]]], 'co': [[[0.1, 0.1]]], 'cp': [[[0.9, 0.9]]]},
        eomot: {
          proform: {
            projection: 'uniwen',
            scale: 1,
            translate: {'x': 0, 'y': 0 },
            prerotate: [[[ ctl.rotation ]]],
            rotate: [ 0, 0, 0 ],
          },
        },
        eoload: {

          lindenmayer: { // plant1
            linden: {
              axiom: 'F',
              loopq: 4,
              rules: {
                F: 'F[-F]F[+F][F]',
              },
            },
            mayer: {
              side: 10.6,
              angunit: 30,
              angstart: 90,
              start: [0, -150],
            },
          },

        },
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

        eoform: {
          'x': {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
            'ra2': 2, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
          },
          'y': {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
            'ra2': 2, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
          },
        },

        eocrom: { 'csx': 22, 'cf': 999, 'co': 1, 'cs': 666, 'cw': 1.5, 'cp': 1},

        eoload: {
          pacer: {

            initN: 0, eventN: 0, autoN: [[[0, 0, 0, 40, 60, 80, 100, 120, 120, 120, 120]]], autoP: 0.1, outtimed: 0, maxN: 60, geospan: 0,

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
                let pid = ani.eoric.pid
                let parentAnigram = eonMuonStore.findAnigramFromUid(pid)
                let lines = parentAnigram.eofold.features[0].geometry.coordinates
                let verts = lines.map(d => d[d.length - 1])

                let qnodes = 10
                let lastnodes = -qnodes
                let nodes = verts.slice(lastnodes)
                let counter = props.counter
                if (1 && 1) console.log('verts', counter, verts.length)

                stace = nodes[counter]
              } else if (props.key === 'auto') { // AUTO
                let sep = Math.floor(10 * (1 + Math.random()))
                let counter = props.counter
                let locus = ani.eoload.stace.auto.locus

                locus[0].pos = locus[0].pos + counter * sep
                locus[1].pos = locus[1].pos + counter * sep
                locus[2].pos = locus[2].pos

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
      aniForm.avatars = {

        aviStar, // h.pacer

      }
      // .................. animas
      let animas = [
        aniForm, // h.mars
      ]
      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ722oPlant = anitem
}))
