/* ******************************************
   *    @eonZ716aGeopoints
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ716aGeopoints = global.eonZ716aGeopoints || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonMuonProps,
    eonCtlWen,
    msnap,
    mlacer,
    eonEohalMars,
    eonEohalNatform,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-muon-snap'),
    __eo('xs').b('eon-muon-lacer'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) { }
  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 3800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}
    let eocrom = { csx: 0, cf: 777, cs: 222, cw: 1.7, co: 0.7, cp: 0.5}
    let eofold = {type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0]}, properties: {pointRadius: 6}}

    let translate = {'m1': 4,
      'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,
    }
    let proform = {projection: 'uniwen', scale: 1, translate: [ 0 - 300, 100 ], rotate: [ 0, 0 ],
      control: 'wen' }

    // .................. animas
    let p1 = {
      eohal: eonEohalMars,
      eofold,
      eotim,
      eocrom,
      eoric: {gid: 'p', cid: 'p', fid: 'p1'},
      eomot: {
        proform: {projection: 'uniwen', scale: 1, rotate: [ 0, 0, 0 ], translate: [ [[[ 100 - 300, 125 ]]], 100 - 200, 0 ],
        },
      },
      eoload: {
      },
    }

    let p2 = {
      eohal: eonEohalMars,
      eotim,
      eofold,
      eocrom,
      eoric: {gid: 'p', cid: 'p', fid: 'p2'},
      eomot: {
        proform: {projection: 'uniwen', scale: 1, rotate: [ 0, 0, 0 ], translate: [[[ () => [ [[[150 - 300, 175 - 200]]], 100, 0] ]]],
        },
      },
      eoload: {
      },
    }

    let p3 = {
      eohal: eonEohalMars,
      eotim,
      eofold,
      eocrom,
      eoric: {gid: 'p', cid: 'p', fid: 'p3'},
      eomot: {
        proform: {projection: 'uniwen', scale: 1, rotate: [ 0, 0, 0 ], translate: [ [[[ t => (() => 175 - 300)() ]]], 100 - 200 ],
        },
      },
      eoload: {
      },
    }

    let p4 = {
      eohal: eonEohalMars,
      eotim,
      eofold,
      eocrom,
      eoric: {gid: 'p', cid: 'p', fid: 'p4'},
      eomot: {
        proform: {projection: 'uniwen', scale: 1, rotate: [ 0, 0, 0 ], translate: [ [[[ 200 - 300, 225 - 300 ]]], 100 - 200, 0 ],
        },
      },
      eoload: {
      },
    }

    let p5 = {
      eohal: eonEohalMars,
      eotim,
      eofold,
      eocrom,
      eoric: {gid: 'p', cid: 'p', fid: 'p5'},
      eomot: {
        proform: {projection: 'uniwen', scale: 1, rotate: [ 0, 0, 0 ], translate: {x: [[[250 - 300, 275 - 300]]], y: 100 - 200 },
        },
      },
      eoload: {
      },
    }

    let p6 = {
      eohal: eonEohalMars,
      eotim,
      eofold,
      eocrom,
      eoric: {gid: 'p', cid: 'p', fid: 'p6'},
      eomot: {
        proform: {
          projection: 'uniwen',
          translate: [[[ () => {
            let geo = {'type': 'LineString', 'coordinates': [ [300 - 300, 100, 0], [325 - 300, 100, 0], [300 - 300, 100 - 200, 0] ]}
            return eonMuonProps.ta(mlacer.unslide(geo.coordinates)) // dimensional triple array
          } ]]],
        },
      },
      eoload: {
      },
    }

    let p7 = {
      eohal: eonEohalMars,
      eotim,
      eofold,
      eocrom,
      eoric: {gid: 'p', cid: 'p', fid: 'p7'},
      eomot: {
        proform: {projection: 'uniwen',
          scale: 1,
          rotate: [ 0, 0, 0 ],
          translate: [[[ {
            'x': {
              'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
              'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,

            },
            'y': {
              'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
              'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,

            },
          } ]]],
        },
      },
      eoload: {
      },
    }

    let p8 = {
      eohal: eonEohalMars,
      eotim,
      eofold,
      eocrom,
      eoric: {'gid': 'p', 'cid': 'p', 'fid': 'p8'},
      eomot: {
        proform: {projection: 'uniwen',
          scale: 1,
          rotate: [ 0, 0, 0 ],
          translate: [ [[[ {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
            'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,

          } ]]],
          [[[ {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
            'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,

          } ]]],
          ],
        },
      },
      eoload: {
      },
    }

    let p10 = { // NOK
      eohal: eonEohalMars,
      eotim,
      eofold,
      eocrom,
      eoric: {'gid': 'p', 'cid': 'p', 'fid': 'p10'},
      eomot: {
        proform: {projection: 'uniwen',
          scale: 1,
          rotate: [ 0, 0, 0 ],
          translate: [

            [[[ (t, a = 378, b = {
              'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
              'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,

            }) => {
              let as = a
              let bs = __eo('xs').b('eon-muon-snap')(b, t, 1).x
              return as + bs
            } ]]],

            [[[ (t, a = 100, b = {
              'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
              'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,

            }) => {
              let as = a
              let bs = __eo('xs').b('eon-muon-snap')(b, t, 1).y
              return as + bs
            } ]]],

          ],
        },
      },
      eoload: {
      },
    }

    let p11 = {
      eohal: eonEohalMars,
      eotim,
      eofold,
      eocrom,
      eoric: {'gid': 'p', 'cid': 'p', 'fid': 'p11'},
      eomot: {
        proform: {projection: 'uniwen',
          scale: 1,
          rotate: [ 0, 0, 0 ],
          translate: [[[ {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
            'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,

          } ]]],
        },
      },
      eoload: {
      },
    }

    let p12 = {
      eohal: eonEohalMars,
      eotim,
      eofold,
      eocrom,
      eoric: {'gid': 'p', 'cid': 'p', 'fid': 'p12'},
      eomot: {
        proform: {projection: 'uniwen',
          scale: 1,
          rotate: [ 0, 0, 0 ],
          translate: [[[ (...args) => {
            let a = [[[ {
              'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
              'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,

            } ]]]
            if (args.length === 0) {
              return a
            } else {
              let as = args[0]
              return [ 100 + as.x, 100 + as.y ]
            }
          } ]]],
        },
      },
      eoload: {
      },
    }

    let p13 = {
      eohal: eonEohalMars,
      eotim,
      eofold,
      eocrom,
      eoric: {'gid': 'p', 'cid': 'p', 'fid': 'p13'},
      eomot: {
        proform: {projection: 'uniwen',
          scale: 1,
          rotate: [ 0, 0 ],
          translate: [

            [[[ t => {
              let msnap = __eo('xs').b('eon-muon-snap')
              let fn = (a, b) => a + b.x
              let args = [
                378,
                [[[ {
                  'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
                  'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,

                } ]]],
              ]
              args = args.map(d => msnap(d, t, 0))
              return fn(...args)
            } ]]],

            [[[ (t, a = 100, b = {
              'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
              'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,

            }) => {
              let msnap = __eo('xs').b('eon-muon-snap')
              let as = a
              let bs = msnap(b, t, 1).y
              return as + bs
            } ]]],

          ],
        },
      },
      eoload: {
      },
    }

    let p15 = {
      eohal: eonEohalMars,
      eotim,
      eofold,
      eocrom,
      eoric: {'gid': 'p', 'cid': 'p', 'fid': 'p15'},
      eomot: {
        proform: {projection: 'uniwen',
          scale: 1,
          rotate: [ 0, 0 ],
          center: [ [[[ 100, 325 ]]], 100, 0 ],
          translate: [[[ {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
            'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,

          } ]]],
        },
      },
      eoload: {
      },
    }

    let p16 = {
      eohal: eonEohalMars,
      eotim,
      eofold,
      eocrom,
      eoric: {'gid': 'p', 'cid': 'p', 'fid': 'p16'},
      eomot: {
        proform: {projection: 'uniwen',
          scale: 1,
          rotate: [ 0, 0 ],
          center: [ [[[ 300, 225 ]]], 300, 0 ],
          translate: [[[ {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
            'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,

          } ]]],
          control: 'wen',
        },
      },
      eoload: {
        stace: [[[ {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 100, 'v0': 0, 'v1': 1, 'w4': 90, 'seg5': 360, 'pa6': 0, 'pb7': -1,

        } ]]],

      }}

    let animas = [
    // p1, // h.mars g.uniwen
    // p2, // h.mars g.uniwen
    // p3, // h.mars g.uniwen
    // p4, // h.mars g.uniwen
    // p5, // h.mars g.uniwen
    // p6, // h.mars g.uniwen
      p7, // h.mars g.uniwen
    // p8, // h.mars g.uniwen

    // p10, // h.mars g.uniwen
    // p11, // h.mars g.uniwen
    // p12, // h.mars g.uniwen
    // p13, // h.mars g.uniwen

    // p15, // h.mars g.uniwen
    // p16, // h.mars g.uniwen

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ716aGeopoints = anitem
}))