/* ******************************************
   *    @eonZ812vD3movement
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ812vD3movement = global.eonZ812vD3movement || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonCtlWen,
    eonEohalMars,
    eonMuonNatform,
    eonMuonProps,
    eonRenderPortview,
    eonRenderWebgl,
  ] = await Promise.all([
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-render-portview'),
    __eo('xs').b('eon-render-webgl'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
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
    let eotim = {'td': 8600, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1, tf: t => 1 - 4 * (t - 0.5) * (t - 0.5)}

    let conformCircle = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 60, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 1, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 1],
        'fn0': (e, c) => c[0] * cos(e[0]) * cos(e[2]),
      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 60, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 1, 'pa6': 0, 'pb7': -1,
        'dom3': [0, 1],
        'fn0': (e, c) => 0, // c[1] * sin(e[1]) * cos(e[2]),
      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 60, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c) => c[2] * sin(e[3]),
      },
      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 60, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 1, 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
        'fn0': (e, c) => c[3] * cos(e[3]),
      },
    }

    let conformLine = {
      'x': {
        'm1': -7.66, 'm2': -3.73, 'n1': 16.24, 'n2': 5.98, 'n3': 17, 'a': 8.98, 'b': 0.19,
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 1, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c) => c[0] * cos(e[0]),
      },
      'y': {
        'm1': -7.66, 'm2': -3.73, 'n1': 16.24, 'n2': 5.98, 'n3': 17, 'a': 8.98, 'b': 0.19,
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 1, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c) => c[1] * sin(e[0]) * cos(e[3]),
      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 2, 'b': 1,
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 1, 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c) => c[1] * sin(e[3]),
      },
      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 1, 'pa6': 0, 'pb7': -1,
      },
    }

    let conformTorus = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        'fn0': (e, c) => c[0] * (10 + 5 * cos(e[0])) * c[2] * cos(e[3]),
      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 1, 1, [[[10, 10]]], [[[5, 5]]]],
        'fn0': (e, c, d) => c[1] * (d.c[2] + d.c[3] * cos(e[0])) * c[2] * sin(e[3]),
      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 1, 1, 1, [[[5, 5]]] ],
        'fn0': (e, c, d) => d.c[3] * c[3] * sin(e[0]),
      },
      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 12, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        'fn0': (e, c) => c[3] * cos(e[2]),
      },
    }

    let conformSphere = {
      'x': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 60, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c) => c[0] * cos(e[0]) * c[2] * cos(e[3]),
      },
      'y': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 60, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-180, 180],
        'fn0': (e, c, dax) => c[1] * sin(e[0]) * c[2] * cos(e[3]),
      },
      'z': {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 60, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
        'fn0': (e, c) => c[2] * sin(e[3]),
      },
      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': [[[64, 60, 60, 60]]], 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
        'fn0': (e, c) => c[3] * cos(e[2]),
      },
    }

    let conformHyper = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        fn0: (e, c) => cos(e[0]) * Math.cosh(e[3]),
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 1, 0, 0 ],
        fn0: (e, c, d) => d.c[0] * sin(e[0]) * Math.cosh(e[3]),

      },
      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
        'dom3': [ -90, 90 ],
        fn0: (e, c) => Math.sinh(e[2]),
      },
      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
      },

    }

    let conformHalo = {
      x: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        fn0: (e, c) => cos(e[0]) * Math.cosh(e[3]),
      },
      y: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
        'dom3': [ -180, 180 ],
        c: [ 1, 0, 0 ],
        fn0: (e, c, d) => d.c[0] * sin(e[0]) * Math.cosh(e[3]),

      },
      z: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 1, 'pa6': 0, 'pb7': -1,
        'dom3': [ -90, 90 ],
        fn0: (e, c) => Math.sinh(e[2]),
      },
      w: {
        'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
        'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 36, 'pa6': 0, 'pb7': -1,
        'dom3': [-90, 90],
      },

    }

    let eocromCircle = { 'csx': 0, 'cf': [[[ 777, 777, 777]]], 'co': [[[0.02, 0.001, 0.001, 0.001]]],
      'cs': [[[999, 999, 999]]], 'cw': [[[1.61, 0.61, 0.61, 0.61]]], 'cp': [[[0.99, 0.99, 0.99, 0.99]]]}

    let eocromLine = { 'csx': 0, 'cf': [[[ 777, 777, 777]]], 'co': [[[0.02, 0.001, 0.001, 0.001]]],
      'cs': [[[999, 999, 999]]], 'cw': [[[1.61, 0.61, 0.61, 0.61]]], 'cp': [[[0.99, 0.99, 0.99, 0.99]]]}

    let eocromSphere = { 'csx': 0, 'cf': 777, 'co': 0.02,
      'cs': 222, 'cw': 0.61, 'cp': 0.99}

    let eocromSpheres = { 'csx': 0, 'cf': 777, 'co': 0.02, 'cs': 222, 'cw': 0.71, 'cp': 0.99}

    let eocromHyper = { 'csx': 0, 'cf': [[[ 777, 777, 777]]], 'co': [[[0.001, 0.001, 0.001, 0.001]]],
      'cs': [[[333, 333, 333]]], 'cw': [[[0.21, 0.61, 0.99, 0.79]]], 'cp': [[[0.99, 0.99, 0.99, 0.99]]]}

    let eocromTorus = { 'csx': 0, 'cf': [[[ 777, 777, 777]]], 'co': [[[0.001, 0.001, 0.001, 0.001]]],
      'cs': [[[666, 666, 666]]], 'cw': 0.79, 'cp': [[[0.99, 0.99, 0.99, 0.99]]]}

    let stace = {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 4, 'b': 2, // circle
      'ra2': 30, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
    }

    let rotate = [ [ [[[0, -90]]], [[[0, 0, 60, 210]]], [[[0, 60]]] ], [[[ stace ]]] ]

    // ............................. haloAni
    let haloAni = {
      eohal: eonEohalMars,
      eofold: ani => {
        let res = eonMuonNatform.natMultiLineString({
          eoform: ani.eoform,
          ghv: 1,
        })
        if (1 && 1) console.log('res', res)

        return res
      },
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q9'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 1, 1 ],
          translate: [ 0, 0, 0 ],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: { 'csx': 0, 'cf': 777, 'co': 0.001, 'cs': 333, 'cw': 0.99, 'cp': 0.99},
      eoform: conformHalo,
      eoload: {},
    }

    // ............................. hyperAni
    let hyperAni = {
      eohal: eonEohalMars,
      eofold: ani => {
        let res = eonMuonNatform.natMultiPolygon({
          eoform: ani.eoform,
          ghv: 0,
        })
        if (1 && 1) console.log('res', res)

        return res
      },
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q1'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 1, 1 ],

          translate: [ 0, 0, 0 ],
          rotate: [ 90, 0, 90 ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: { 'csx': 0, 'cf': 777, 'co': 0.001, 'cs': 333, 'cw': 0.99, 'cp': 0.99},
      eoform: conformHyper,
      eoload: {},
    }

    // ............................. sphereAni
    let sphereAni = {
      eohal: eonEohalMars,
      eofold: ani => eonMuonNatform.natMultiPolygon({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q2'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ [[[0.5, 0.5]]], [[[0.5, 0.5]]] ],

          // translate: [ -70, 0, 0 ],
          translate: [ [ 70, 80, 0 ], [[[ {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
            'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
          } ]]] ],
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocromSphere,
      eoform: conformSphere,
      eoload: {},
    }
    // ............................. sphereAni3a
    let sphereAni3a = {
      eohal: eonEohalMars,
      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q3a'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 0.9, 0.9 ],

          translate: [ -120, 0, 0 ],
          rotate: [ 90, 0, 0 ],
          // rotate: rotate,
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocromSpheres,
      eoform: conformSphere,
      eoload: {},
    }

    // ............................. sphereAni3b
    let sphereAni3b = {
      eohal: eonEohalMars,
      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q3b'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 0.9, 0.9 ],

          translate: [ 120, 0, 0 ],
          rotate: [ 90, 0, 0 ],
          // rotate: rotate,
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocromSpheres,
      eoform: conformSphere,
      eoload: {},
    }

    // ............................. lineAni
    let lineAni = {
      eohal: eonEohalMars,
      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q4'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 3, 3 ],

          translate: [ 0, 0, 0 ],
          rotate: [ -75, 0, [[[0, 133 - 30]]] ],
          rotate: rotate,
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocromLine,
      eoform: conformLine,
      eoload: {},
    }

    // ............................. circleAni
    let circleAni = {
      eohal: eonEohalMars,
      eofold: ani => {
        let form = eonMuonNatform.natMultiLineString({eoform: ani.eoform})
        let gjf = {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: Array.of(form.geometry.coordinates[0]),
          },
        }
        return gjf
      },
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q5'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ [[[3, 3]]], [[[3, 3]]] ],

          translate: [ 0, 0, 0 ],
          rotate: [ -75, 0, [[[0, 133 - 30]]] ],
          rotate: rotate,
          rotate: [ 0, 0, 0 ],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocromCircle,
      eoform: conformCircle,
      eoload: {},
    }
    // ............................. torusAni
    let torusAni = {
      eohal: eonEohalMars,
      eofold: ani => eonMuonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {gid: 'q', cid: 'q', fid: 'q3'},
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ [[[0.1, 0.1]]], [[[0.1, 0.1]]] ],

          translate: [ 0, 0, 0 ],
          rotate: [ 90, 0, 0 ],
          // rotate: rotate,
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: eocromTorus,
      eoform: conformTorus,
      eoload: {
      },
    }

    // ............................. animas
    let animas = [

      // sphereAni, // h.natform
      // sphereAni3a, // h.natform
      // sphereAni3b, // h.natform
      // hyperAni, // h.natform
      haloAni, // h.natform
      // torusAni, // h.natform
      // lineAni, // h.natform
      // circleAni, // h.natform

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ812vD3movement = anitem
}))