/* ******************************************
   *    @eonZ856cMinkowski
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ856cMinkowski = global.eonZ856cMinkowski || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonEohalMars,
    eonEohalTextform,
    eonMuonGraticule,
    eonMuonMinkowski,
    eonMuonNatform,
    eonMuonProps,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-textform'),
    __eo('xs').b('eon-muon-graticule'),
    __eo('xs').b('eon-muon-minkowski'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let sin = Math.sin

    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

    // -------------

    let conformT = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [ 0, 7 * 360 ],
        'fn0': (e, c) => e[0],
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 360],
        'fn0': (e, c) => 0.1 * sin(e[0]),
      },
    }

    let conformAB = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [ 0, 7 * 360 ],
        'fn0': (e, c) => e[0],
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 360],
        'fn0': (e, c) => 0 * sin(e[0]),
      },
    }

    let proformT = {
      projection: 'uniwen',
      scale: [ 0.2, 0.2 ],
      prerotate: [[[ ctl.rotation ]]],
      translate: [ 0, 0, 0 ], // iter
      rotate: [0, 0, 0],
      lens: [0, 1, Infinity ],
    }

    let proformTA = {
      projection: 'uniwen',
      scale: 1,
      prerotate: [[[ ctl.rotation ]]],
      translate: [ 100, -140, 0 ],
      rotate: [0, 0, 0],
      lens: [0, 1, Infinity ],
    }

    let proformTB = {
      projection: 'uniwen',
      scale: 1,
      prerotate: [[[ ctl.rotation ]]],
      translate: [ 100, -160, 0 ],
      rotate: [0, 0, 0],
      lens: [0, 1, Infinity ],
    }

    let proformTAB = {
      projection: 'uniwen',
      scale: 1,
      prerotate: [[[ ctl.rotation ]]],
      translate: [ 90, -180, 0 ],
      rotate: [0, 0, 0],
      lens: [0, 1, Infinity ],
    }

    let eocromT = { 'csx': 7, 'cf': 999, 'co': 0.9, 'cs': 999, 'cw': 0.1, 'cp': 0.99}

    let eocromA = { 'csx': 0, 'cf': 999, 'co': 0.19, 'cs': 999, 'cw': 0.99, 'cp': 0.99 }
    let eocromB = { 'csx': 0, 'cf': 666, 'co': 0.069, 'cs': 444, 'cw': 0.99, 'cp': 0.99 }
    let eocromAB = { 'csx': 20, 'cf': 666, 'co': 0.069, 'cs': 555, 'cw': 2.99, 'cp': 0.99 }

    let eocromTA = { 'csx': 0, 'cf': 999, 'co': 0.19, 'cs': 999, 'cw': 0.39, 'cp': 0.99 }
    let eocromTB = { 'csx': 0, 'cf': 666, 'co': 0.069, 'cs': 444, 'cw': 0.39, 'cp': 0.99 }
    let eocromTAB = { 'csx': 20, 'cf': 666, 'co': 0.069, 'cs': 555, 'cw': 0.39, 'cp': 0.99 }

    // ............................. textAni
    let text = `Given two point sets or
polygons A,B with n and m
vertices their convolution
or Minkowski sum
is their point-wise sum
A+B = {a+b | a ∈ A, b ∈ B}
Minkowski sums are used
to plan the motion of an
object among obstacles
or to compute the set of
all its admissible positions`

    let textsegment = function (text, t) {
      let s = text // source
      let a = Array.from(s) // discretize source
      let q = a.length // length, number of elems
      let n = Math.ceil(q * t) // elems in time
      let v = a.slice(0, n) // segment in time
      let s1 = v.join('') // rejoin segment

      return s1
    }

    // -------------

    let conformA = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 3, 'pa6': 0, 'pb7': 100,
        'dom3': [ -180, 180 ],
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 3, 'pa6': 0, 'pb7': 100,
        'dom3': [ -180, 180 ],
      },
    }

    let conformB = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[1, 8]]], 'pa6': 0, 'pb7': 100,
        'dom3': [ -180, 180 ],
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[1, 8]]], 'pa6': 0, 'pb7': 100,
        'dom3': [ -180, 180 ],
      },
    }

    let proformM = {
      projection: 'uniwen',
      prerotate: [[[ ctl.rotation ]]],
      scale: 0.7,
      translate: [ 130, 30 ],
      rotate: [ 0, 0, 0 ],
    }

    // .................. natA
    let natA = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'natA'},

      eofold: ani => {
        let natipros = {
          eoform: ani.eoload.eoform,
          ghv: 1, // horizontal
          gsa: 0, // asymetric
          gco: 0, // open
        }
        let nat = eonMuonNatform.natMultiLineString(natipros)
        return nat
      },
      eonode: {
        type: 'Feature',
        geometry: {type: 'Point', coordinates: [0, 0, 0]},
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },
      eomot: {
        proform: proformM,
      },

      eocrom: eocromA,
      eoload: {
        eoform: conformA,
      },
    }
    // .................. natB
    let natB = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'natB'},

      eofold: ani => {
        let natipros = {
          eoform: ani.eoload.eoform,
          ghv: 1, // horizontal
          gsa: 0, // asymetric
          gco: 0, // open
        }
        let nat = eonMuonNatform.natMultiLineString(natipros)

        return nat
      },
      eonode: {
        type: 'Feature',
        geometry: {type: 'Point', coordinates: [0, 0, 0]},
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },
      eomot: {
        proform: proformM,
      },

      eocrom: eocromB,
      eoload: {
        eoform: conformB,
      },
    }
    // .................. natB
    let natAB = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'natAB'},

      eofold: ani => {
        let natA = {eoform: ani.eoload.eoformA, ghv: 1, gsa: 0, gco: 0}
        let A = eonMuonNatform.natMultiLineString(natA).geometry.coordinates

        let natB = {eoform: ani.eoload.eoformB, ghv: 1, gsa: 0, gco: 0}
        let B = eonMuonNatform.natMultiLineString(natB).geometry.coordinates

        let sum = eonMuonMinkowski(A, B)
        let sumring = [...sum, sum[0]]

        let res = {
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: [sumring],
          },
          properties: {},
        }

        return res
      },
      eonode: {
        type: 'Feature',
        geometry: {type: 'Point', coordinates: [0, 0, 0]},
        properties: {orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0]},
      },
      eomot: {
        proform: proformM,
      },

      eocrom: eocromAB,
      eoload: {
        eoformA: conformA,
        eoformB: conformB,
      },
    }
    // -------------------------------  geograt1
    let geograt1 = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {'gid': 'geo', 'cid': 'geo', 'fid': 'geograt1'},

      eofold: ani => eonMuonGraticule.gjfMultiLineString(ani.eoload.eoframe),

      eomot: {
        proform: proformM,
      },

      eocrom: { 'csx': 0, 'cf': 111, 'cs': 666, 'cw': 0.3, 'co': 0.05, 'cp': 0.9},

      eoload: {

        eoframe: {
          multiframe: [ [-180, 180, 30, 3],
            [-180, 180, 30, 3] ],
        },

      },
    }

    // .................. textAni
    let textAni = {
      eohal: eonEohalTextform,
      eotim: eotim,
      eoric: {gid: 'txtg', cid: 'txtcT', fid: 'txtfT'},

      eofold: ani => {
        let natipros = { eoform: ani.eoload.eoform, ghv: 1, gsa: 1, gco: 0 }
        return eonMuonNatform.natMultiLineString(natipros)
      },
      eomot: {
        proform: proformT,
      },
      eocrom: eocromT,

      eoload: {
        eoform: conformT,
        textform: {
          string: [[[function (t) {
            let txt = this.text
            let linenb = this.linenb
            let ttxt = textsegment(txt, t)
            let sttxt = ttxt.split('\n')

            return sttxt[linenb]
          }]]],
          text: text,
          style: {
            rotate: [[[ 0, 0 ]]],

            // eocromT
            // 'fill': "rgb(255, 215, 0)",
            // 'fill-opacity': 1,
            // 'stroke': "rgb(255, 215, 0)",
            // 'stroke-width': 0.1,
            // 'stroke-opacity': undefined,

            // 'dx': 444,
            // 'dy': 444,
            'font-size': [[[18, 18]]],
            'font-family': 'Verdana', // BankFuturistic, Arial
            // 'height': 56,
            'kerning': 4, // 1
            'lengthAdjust': 'spacing', // spacingAndGlyphs
            'letter-spacing': 1,
            'text-anchor': 'start', // start, middle, end
            'textLength': 0,
            // 'width': 111,
            'word-spacing': 1,
            // 'writing-mode': 'tb',
          },
        },
      },
    }

    let getanis = function (txt = '') {
      let anis = {}
      let a = txt.split('\n')
      for (let i = 0; i < a.length; i++) {
        let ani = eonMuonProps.clone(textAni)
        ani.eoric.fid = textAni.eoric.fid + '_' + i
        ani.eoric.cid = textAni.eoric.cid + '_' + i
        ani.eomot.proform.translate = [-285, 160 - 35 * i]
        ani.eoload.textform.linenb = i
        anis['ani' + '_' + i] = ani
      }
      return anis
    }

    // .................. textA
    let textA = {
      eohal: eonEohalTextform,
      eotim: eotim,
      eoric: {gid: 'txtg', cid: 'txtTA', fid: 'txtfA'},

      eofold: ani => {
        let natipros = { eoform: ani.eoload.eoform, ghv: 1, gsa: 1, gco: 0 }
        return eonMuonNatform.natMultiLineString(natipros)
      },
      eomot: {
        proform: proformTA,
      },
      eocrom: eocromTA,

      eoload: {
        eoform: conformAB,
        textform: {
          string: [[[function (t) { return this.text }]]],
          text: ` A ▬▬▬▬▬`,
          style: {
            rotate: [[[ 0, 0 ]]],
            // 'dx': 444,
            // 'dy': 444,
            'font-size': [[[9, 9]]],
            'font-family': 'Verdana', // BankFuturistic, Arial
            // 'height': 56,
            'kerning': 4, // 1
            'lengthAdjust': 'spacing', // spacingAndGlyphs
            'letter-spacing': 1,
            'text-anchor': 'start', // start, middle, end
            'textLength': 0,
            // 'width': 111,
            'word-spacing': 1,
            // 'writing-mode': 'tb',
          },
        },
      },
    }

    // .................. textB
    let textB = {
      eohal: eonEohalTextform,
      eotim: eotim,
      eoric: {gid: 'txtg', cid: 'txtcTB', fid: 'txtfB'},

      eofold: ani => {
        let natipros = { eoform: ani.eoload.eoform, ghv: 1, gsa: 1, gco: 0 }
        return eonMuonNatform.natMultiLineString(natipros)
      },
      eomot: {
        proform: proformTB,
      },
      eocrom: eocromTB,

      eoload: {
        eoform: conformAB,
        textform: {
          string: [[[function (t) { return this.text }]]],
          text: ` B ▬▬▬▬▬`,
          style: {
            rotate: [[[ 0, 0 ]]],
            // 'dx': 444,
            // 'dy': 444,
            'font-size': [[[9, 9]]],
            'font-family': 'Verdana', // BankFuturistic, Arial
            // 'height': 56,
            'kerning': 4, // 1
            'lengthAdjust': 'spacing', // spacingAndGlyphs
            'letter-spacing': 1,
            'text-anchor': 'start', // start, middle, end
            'textLength': 0,
            // 'width': 111,
            'word-spacing': 1,
            // 'writing-mode': 'tb',
          },
        },
      },
    }

    // .................. textAB
    let textAB = {
      eohal: eonEohalTextform,
      eotim: eotim,
      eoric: {gid: 'txtg', cid: 'txtcTAB', fid: 'txtfAB'},

      eofold: ani => {
        let natipros = { eoform: ani.eoload.eoform, ghv: 1, gsa: 1, gco: 0 }
        return eonMuonNatform.natMultiLineString(natipros)
      },
      eomot: {
        proform: proformTAB,
      },
      eocrom: eocromTAB,

      eoload: {
        eoform: conformAB,
        textform: {
          string: [[[function (t) { return this.text }]]],
          text: ` A+B ▬▬▬▬▬`,
          style: {
            rotate: [[[ 0, 0 ]]],
            // 'dx': 444,
            // 'dy': 444,
            'font-size': [[[9, 9]]],
            'font-family': 'Verdana', // BankFuturistic, Arial
            // 'height': 56,
            'kerning': 4, // 1
            'lengthAdjust': 'spacing', // spacingAndGlyphs
            'letter-spacing': 1,
            'text-anchor': 'start', // start, middle, end
            'textLength': 0,
            // 'width': 111,
            'word-spacing': 1,
            // 'writing-mode': 'tb',
          },
        },
      },
    }

    // .................. scene
    let scene = Object.assign(
      {},
      getanis(text),
      {
        textA,
        textB,
        textAB,

        natA, // h.mars g.uniwen
        natB, // h.mars g.uniwen
        natAB, // h.mars g.uniwen
        geograt1, // h.mars
      }
    )

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ856cMinkowski = anitem
}))
