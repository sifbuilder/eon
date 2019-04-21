/* ******************************************
   *    @eonZ855cTextpath
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ855cTextpath = global.eonZ855cTextpath || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonEohalMars,
    eonEohalTextform,
    eonMuonNatform,
    eonMuonProps,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-textform'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  eonCtlWen.control(eonRenderSvg.svg())

  let z = function () {
    // .................. pics
    let ctl
    try {
      ctl = eonCtlWen().control(eonRenderSvg.svg())
    } catch (e) {
      ctl = () => [0, 0, 0]
    }

    let radians = Math.PI / 180, degrees = 180 / Math.PI,
      sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt
    let cosh = Math.cosh,
      sinh = Math.sinh
    let epsilon = 1e-5

    let eotim = {'td': 12800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tp: t => Math.sin((Math.PI / 2) * t)}

    let conform0 = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [ [[[0, 120]]], [[[7 * 360, 7 * 360 + 120]]] ],

        'fn0': (e, c) => e[0],
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 360],

        'fn0': (e, c) => 0.5 * sin(e[0]),

      },
    }

    let conform1 = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [ [[[0, 120]]], [[[5 * 360, 5 * 360 + 120]]] ],

        'fn0': (e, c) => e[0],
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 360],

        'fn0': (e, c) => 0.4 * sin(45 + e[0]),

      },
    }

    let conform2 = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [ [[[0, 120]]], [[[5 * 360, 5 * 360 + 120]]] ],

        'fn0': (e, c) => e[0],
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 360],

        'fn0': (e, c) => 0.6 * sin(90 + e[0]),

      },
    }

    let eocrom = { 'csx': 7, 'cf': [[[ 999, 999, 999]]], 'co': [[[0.9, 0.9, 0.9]]],
      'cs': [[[999, 999, 999]]], 'cw': [[[0.1, 0.1, 0.1]]], 'cp': [[[0.99, 0.99]]]}

    // ............................. textAni0
    let textAni0 = {
      eohal: eonEohalTextform,
      eotim,
      eoric: {gid: 'txtg', cid: 'txtc0', fid: 'txtf0'},

      eofold: ani => {
        let natipros = {
          eoform: ani.eoform,
          ghv: 1, // horizontal geodesics
          gsa: 1, // asymetric distribution of geodesics around the origin
          gco: 0, // open line
        }

        let res = eonMuonNatform.natMultiLineString(natipros) // Feature.LineString

        return res
      },
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 0.2, 0.2 ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ -250, 130, 0 ],
          rotate: [0, 0, 0],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocrom,
      eoform: conform0,
      eoload: {
        textform: {
          string: "sif's   thick   wondrous  golden   hair",
          style: {
            rotate: [[[ 0, 0 ]]],
            'font-size': [[[24, 24]]],
            'font-family': 'BankFuturistic',
            'text-anchor': 'center',
          },
        },

      },
    }

    // ............................. textAni1
    let textAni1 = {
      eohal: eonEohalTextform,
      eotim,
      eoric: {gid: 'txtg', cid: 'txtc1', fid: 'txtf1'},
      eofold: ani => {
        let natipros = {
          eoform: ani.eoform,
          ghv: 1, // horizontal geodesics
          gsa: 1, // asymetric distribution of geodesics around the origin
          gco: 0, // open line
        }

        let res = eonMuonNatform.natMultiLineString(natipros) // Feature.LineString

        return res
      },
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 0.2, 0.2 ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ -250, 30, 0 ],
          rotate: [0, 0, 0],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocrom,
      eoform: conform1,
      eoload: {
        textform: {
          string: "thor's   loving   wife  and   goddess  of the  harvest",
          style: {
            rotate: [[[ 0, 0 ]]],
            'font-size': [[[24, 24]]],
            'font-family': 'BankFuturistic',
            'text-anchor': 'center',
          },
        },

      },
    }

    // ............................. textAni2
    let textAni2 = {
      eohal: eonEohalTextform,
      eotim,
      eoric: {gid: 'txtg', cid: 'txtc2', fid: 'txtf2'},
      eofold: ani => {
        let natipros = {
          eoform: ani.eoform,
          ghv: 1, // horizontal geodesics
          gsa: 1, // asymetric distribution of geodesics around the origin
          gco: 0, // open line
        }

        let res = eonMuonNatform.natMultiLineString(natipros) // Feature.LineString

        return res
      },
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 0.2, 0.2 ],
          prerotate: [[[ ctl.rotation ]]],
          translate: [ -250, -70, 0 ],
          rotate: [0, 0, 0],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocrom,
      eoform: conform2,
      eoload: {
        textform: {
          string: 'who   made   the   norse  people’s   crops   grow',
          style: {
            rotate: [[[ 0, 0 ]]],
            'font-size': [[[24, 24]]],
            'font-family': 'BankFuturistic',
            'text-anchor': 'center',
          },
        },

      },
    }
    // .................. textAniA
    let textAniA = {

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
      eoric: {'gid': 'text', 'cid': 'ca', 'fid': 'fa'},
      eocrom: { 'csx': 0, 'cf': [[[888, 777]]], 'cs': 111, 'cw': [[[0.1, 0.7]]], 'co': [[[0.6, 0.99]]], 'cp': [[[0.5, 0.5]]]},

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [ -150, -150 ],
        },
      },

      eoload: {
        textform: {
          string: 'mother of the obscure ullr',
          style: {
            rotate: [[[ 0, 0 ]]],
            'font-size': [[[24, 24]]],
            'font-family': 'BankFuturistic',
            'text-anchor': 'center',
          },
        },

      },
    }

    // .................. animas
    let animas = [

      textAni0, // h.textform
      textAni1, // h.textform
      textAni2, // h.textform
      textAniA, // h.textform

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ855cTextpath = anitem
}))
