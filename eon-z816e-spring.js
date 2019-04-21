/* ******************************************
   *    @eonZ816eSpring
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ816eSpring = global.eonZ816eSpring || {})))
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

    let svgstate = eonRenderSvg.scenecolor('Wheat')

    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt

    let fact = n => n - 1 > 0 ? n * fact(n - 1) : n
    let fact0 = 1,
      fact1 = 1,
      fact2 = 2,
      fact3 = 6,
      fact4 = 24,
      fact5 = 120,
      fact6 = 720,
      fact7 = 5040,
      fact8 = 40320,
      fact9 = 362880
    let infact0 = 1 / fact0,
      infact1 = 1 / fact1,
      infact2 = 1 / fact2,
      infact3 = 1 / fact3,
      infact4 = 1 / fact4,
      infact5 = 1 / fact5,
      infact6 = 1 / fact6,
      infact7 = 1 / fact7,
      infact8 = 1 / fact8,
      infact9 = 1 / fact9

    let sinp = [infact0, 0, -infact2, 0, infact4, 0, -infact6, 0, infact8]
    let cosp = [0, infact1, 0, -infact3, 0, infact5, 0, -infact7, 0, infact9]
    let exp = [infact0, infact1, infact2, infact3, infact4, infact5, infact6, infact7, infact8, infact9]

    // ............................. pics
    let tf = t => 1 - 4 * (t - 0.5) * (t - 0.5)
    let eotim = {'td': 24600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => t}

    let conform = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 180, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [ [[[1, 4]]], 1, 1, 1],
        'fn0': (e, c, dax) => {
          let a = 6 // a: frequency
          let h = 90 // h: height
          let r = 90 // r: radius
          let x = e[0]
          let y = e[1]
          let z = e[2]
          let w = e[3]
          let d = 0.157 // radians * 36 / 360 // 0.157  , z.seg5: 36, xy.dom: 360
          let res = cos(x) * cos(dax.c[0] * y)

          return res
        },
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 180, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        c: [ [[[1, 4]]], 1, 1, 1],
        'fn0': (e, c, dax) => {
          let a = 6 // a: frequency
          let h = 90 // h: height
          let r = 90 // r: radius
          let x = e[0]
          let y = e[1]
          let z = e[2]
          let w = e[3]
          let d = 0.157 // radians * 36 / 360 // 0.157  , z.seg5: 36, xy.dom: 360

          let res = sin(y) * cos(dax.c[0] * y)

          return res
        },

      },

      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 180],
        c: [ [[[94, 104]]], 1, 1, 1],
        'fn0': (e, c, dax) => {
          let a = 6 // a: frequency
          let h = 90 // h: height
          let r = 90 // r: radius
          let x = e[0] // dom:[-180, 180] : [-1.57, 1.57]
          let y = e[1] // dom:[-180, 180] : [-1.57, 1.57]
          let z = e[2]
          let w = e[3] // [0, 3.14] : [0, 2 * 1.57]
          let d = 0.157 // radians * 36 / 360 // 0.157  , z.seg5: 36, xy.dom: 360

          let seg5 = dax.seg5
          let cycles = seg5 - 1

          let res = z + 0.5 * (x + y) / seg5

          return res
        },
      },

      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 90],
        'fn0': (e, c, dax) => {
          return e[2]
        },

      },

    }

    let eomot = {
      proform: {
        projection: 'uniwen',
        scale: [ 1, 1 ],
        prerotate: [[[ ctl.rotation ]]],
        translate: [ 0, 0, 0 ],
        // rotate: [ [[[95, -5, -5, -5, -5, -5]]], [[[2, 2, 2, 2, 2, 2]]], [[[0,0,0,0,0,0]]] ],
        rotate: [ 0, [[[90, 90, 0, 0, 90, 90, 0, 0, 90, 90]]], 0 ],
        lens: [0, 1, Infinity ],
      },
    }
    // ............................. natAniA
    let natAniA = {

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

        let inc = 0 // show part from origin to end
        let pars = 1 // show partial from void to full

        if (inc === 1 || pars === 1) {
          let preani = eonMuonStore.findAnigramFromUid(ani.eoric.uid)
          if (preani !== undefined) {
            let tgj = gj
            tgj.geometry = eonMuonGeoj.getCoordsInRange(gj.geometry, nbt, firstcoord)
            tgj.properties = tgj.properties === undefined ? {} : tgj.properties
            tgj.properties.eocrom = ani.eocrom
            tgj.properties.lastcoord = nbt

            newFeatures = [tgj]
          }
        }

        if (inc === 1) {
          let preani = eonMuonStore.findAnigramFromUid(ani.eoric.uid)

          if (preani !== undefined) {
            let features = preani.eofold.features

            let lastFeature = features[features.length - 1]
            let lastFeatureProps = lastFeature.properties
            let lastcoord = lastFeatureProps.lastcoord
            let prefeatures = preani.eofold.features.map(eonMuonGeoj.deprop) // _e_

            if (lastcoord !== undefined) {
              firstcoord = lastcoord
            }

            let tgj = gj
            tgj.geometry = eonMuonGeoj.getCoordsInRange(gj.geometry, nbt, firstcoord)
            tgj.properties = tgj.properties === undefined ? {} : tgj.properties
            tgj.properties.eocrom = ani.eocrom
            let intercept = 300
            let slope = 700
            tgj.properties.eocrom.cs = intercept + slope * unElapsed
            tgj.properties.lastcoord = nbt

            newFeatures = [ tgj ] // newFeatures = [...prefeatures, tgj]
          }
        }

        let gfeats = {
          type: 'FeatureCollection',
          features: newFeatures,
        }
        return gfeats
      },
      eomot: eomot,
      eocrom: { 'csx': 22, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.069, 0.06, 0.069]]],
        'cs': [[[500, 333, 666]]], 'cw': [[[0.7, 0.6, 0.4]]], 'cp': [[[0.99, 0.99]]]},

      eoform: conform,
      eoload: {},

    }
    // ............................. natAniV
    let natAniB = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'q', cid: 'q2', fid: 'q2'},

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

        let inc = 0 // show part from origin to end
        let pars = 0 // show partial from void to full

        if (inc === 1 || pars === 1) {
          let preani = eonMuonStore.findAnigramFromUid(ani.eoric.uid)
          if (preani !== undefined) {
            let tgj = gj
            tgj.geometry = eonMuonGeoj.getCoordsInRange(gj.geometry, nbt, firstcoord)
            tgj.properties = tgj.properties === undefined ? {} : tgj.properties
            tgj.properties.eocrom = ani.eocrom
            tgj.properties.lastcoord = nbt

            newFeatures = [tgj]
          }
        }

        if (inc === 1) {
          let preani = eonMuonStore.findAnigramFromUid(ani.eoric.uid)

          if (preani !== undefined) {
            let features = preani.eofold.features

            let lastFeature = features[features.length - 1]
            let lastFeatureProps = lastFeature.properties
            let lastcoord = lastFeatureProps.lastcoord
            let prefeatures = preani.eofold.features.map(eonMuonGeoj.deprop) // _e_

            if (lastcoord !== undefined) {
              firstcoord = lastcoord
            }

            let tgj = gj
            tgj.geometry = eonMuonGeoj.getCoordsInRange(gj.geometry, nbt, firstcoord)
            tgj.properties = tgj.properties === undefined ? {} : tgj.properties
            tgj.properties.eocrom = ani.eocrom
            let intercept = 300
            let slope = 700
            tgj.properties.eocrom.cs = intercept + slope * unElapsed
            tgj.properties.lastcoord = nbt

            newFeatures = [ tgj ] // newFeatures = [...prefeatures, tgj]
          }
        }

        let gfeats = {
          type: 'FeatureCollection',
          features: newFeatures,
        }
        return gfeats
      },
      eomot: eomot,
      eocrom: { 'csx': 21, 'cf': [[[ 666, 333, 666]]], 'co': [[[0.0069, 0.006, 0.0069]]],
        'cs': [[[999, 999, 999]]], 'cw': [[[0.1, 0.1, 0.1]]], 'cp': [[[0.99, 0.99]]]},

      eoform: conform,
      eoload: {},

    }
    // ............................. animas
    let animas = [

      // natAniA, // h.natform
      natAniB, // h.natform

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ816eSpring = anitem
}))