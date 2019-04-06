jest.setTimeout(30000)

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

// test('test tidx', async () => {
// let eon = await getEon()
// let tidxer = eon.tidx(6, 4, 1, 1) // h (mers), v (parals)
// let idx = tidxer(2, 3) // col ([0,3]), row ([0,2])
// expect(idx).toBe(20) // 3 * (6*1) + 2 : 20 (in [0,23]
// })

// . . . . . . [0,3]:18     [5,3]:23
// . . . . . .
// . . . . . .
// . . . . . . [0,0]:0      [5,0]:4

test('tidx', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let tidxer = eon.tidx(6, 4, 1, 1) // h (mers), v (parals)
  let idx = tidxer(3, 5) // col ([0,3]), row ([0,2])
  expect(idx).toBe(33) // 5 * (6*1) + 3 : 33
})

test('ridx a', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')
  // . . 3 . . .
  // . . . . . .
  // . . . . . .
  // . . . . . .
  let ridx = eon.ridx(6, 4, 1, 1) // h (mers), v (parals)
  let coords = ridx(3) //
  expect(coords).toEqual([0, 3]) //
})

test('tidxer b', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let tidxer = eon.ridx(6, 4, 1, 1) // h (mers), v (parals)
  let coords = tidxer(8) //
  expect(coords).toEqual([1, 2]) //
})

// quads
test('quads', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let p0 = [0, 0, 3, 13] // i, j, xn, yn
  let p1 = [2, 3, 3, 13]
  expect(eon.quads(...p0)).toEqual([[0, 1, 4, 3]])
  expect(eon.quads(...p1)).toEqual([[11, 9, 12, 14]])
})

test('gratiparams', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let params1 = {
    geoframe: [ [ [-180, 180, 15, 15], [-180, 180, 60, 60] ] ],
  }

  let params2 = {
    geoframe: [
      [ [-180, 180, 15, 15], [-180, 180, 60, 60] ],
      [ [-180, 180, 15, 15], [-180, 180, 60, 60] ],
    ],
  }

  let params3 = {
    multiframe: [ [-180, 180, 15, 15], [-180, 180, 60, 60] ],
  }

  let r1 = eon.gratiparams(params1)
  let r2 = eon.gratiparams(params2)
  let r3 = eon.gratiparams(params3)

  let o = {
    DX: 15, DY: 60, PX: 15, PY: 60,
    X0: -180, X1: 180, Y0: -180, Y1: 180,
    dx: 15, dy: 60, px: 15, py: 60,
    x0: -180, x1: 180, y0: -180, y1: 180,
  }

  expect(r1).toEqual(o) //
  expect(r2).toEqual(o) //
  expect(r3).toEqual(o) //
})

// arywinopen
test('arywinopen', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let pars1 = [-180, 180, 30] //  d0, d1, dd
  let pars2 = [0, 90, 30]

  let res1 = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150]
  let res2 = [30, 60]

  expect(eon.arywinopen(...pars1)).toEqual(res1)
  expect(eon.arywinopen(...pars2)).toEqual(res2)
})

// arywinclosed
test('arywinclosed', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let pars1 = [-180, 180, 30] //  d0, d1, dd
  let pars2 = [0, 90, 30]

  let res1 = [-180, -150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180]
  let res2 = [0, 30, 60, 90]

  expect(eon.arywinclosed(...pars1)).toEqual(res1)
  expect(eon.arywinclosed(...pars2)).toEqual(res2)
})

// grarr
test('grarr', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let p2 = {multiframe: [ [-180, 180, 180, 180], [-90, 90, 90, 90] ] }

  let r2 = {
    'mms': {
      'coordinates': [[[-180, -90], [-180, 0], [-180, 90]], [[0, -90], [0, 0], [0, 90]]], 'type': 'MultiLineString'}, 'pps': {'coordinates': [[[-180, -90], [0, -90], [180, -90]], [[-180, 0], [0, 0], [180, 0]], [[-180, 90], [0, 90], [180, 90]]], 'type': 'MultiLineString',
    },
  }

  expect(eon.grarr(p2)).toEqual(r2)
})
// dedges
test('dedges', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let p2 = {
    multiframe: [ [-180, 180, 180, 180], [-90, 90, 90, 90] ],
  }

  let r2 = {
    'type': 'Feature',
    'geometry': {
      'coordinates': [[[0, 3], [2, 5], [1, 2], [3, 4]], [[0, 3], [2, 5], [1, 2], [3, 4]]],
      'type': 'MultiLineString',
    },
    'properties': {
      'muonGraticule': 'vhMultiLine',
    },
  }

  expect(eon.dedges(p2)).toEqual(r2)
})
// oneface
test('oneface', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let p1 = [[ 2, 1 ], [ 0, 2 ], [ 2, 2 ], 3, 7]
  let r1 = [ 5, 6, 8 ]

  let p2 = [[ 2, 2 ], [ 0, 2 ], [ 0, 3 ], 3, 7]
  let r2 = [ 8, 6, 9 ]

  expect(eon.oneface(...p1)).toEqual(r1)
  expect(eon.oneface(...p2)).toEqual(r2)
})
// bifaces
test('bifaces', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let p1 = [ 1, 4, 3, 7]
  let r1 = [[ 13, 14, 17 ], [ 13, 17, 16 ]]

  let p2 = [ 1, 5, 3, 7]
  let r2 = [[ 16, 17, 20 ], [ 16, 20, 19 ]]

  expect(eon.bifaces(...p1)).toEqual(r1)
  expect(eon.bifaces(...p2)).toEqual(r2)
})

// gfaces
test('gfaces', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let p2 = {multiframe: [ [-180, 180, 120, 60], [-90, 90, 30, 30] ] }

  let r2 = [[0, 1, 4], [0, 4, 3], [3, 4, 7], [3, 7, 6], [6, 7, 10], [6, 10, 9], [9, 10, 13], [9, 13, 12], [12, 13, 16], [12, 16, 15], [15, 16, 19], [15, 19, 18], [1, 2, 5], [1, 5, 4], [4, 5, 8], [4, 8, 7], [7, 8, 11], [7, 11, 10], [10, 11, 14], [10, 14, 13], [13, 14, 17], [13, 17, 16], [16, 17, 20], [16, 20, 19], [2, 0, 3], [2, 3, 5], [5, 3, 6], [5, 6, 8], [8, 6, 9], [8, 9, 11], [11, 9, 12], [11, 12, 14], [14, 12, 15], [14, 15, 17], [17, 15, 18], [17, 18, 20]]

  expect(eon.gfaces(p2)).toEqual(r2)
})
// qfaces

// equator
test('equator', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let p1 = {multiframe: [ [-180, 180, 60, 60], [-180, 180, 60, 60] ] }
  let p2 = {multiframe: [ [-180, 180, 120, 60], [-90, 90, 30, 30] ] }

  let r1 = {
    'type': 'Feature',
    'geometry': {
      'coordinates': [[-180, -180], [-120, -180], [-60, -180], [0, -180], [60, -180], [120, -180], [180, -180]],
      'type': 'LineString',
    },
    'properties': {
      'muonGraticule': 'equator',
    },
  }

  let r2 = {
    'type': 'Feature',
    'geometry': {
      'coordinates': [[-180, -90], [-120, -90], [-60, -90], [0, -90], [60, -90], [120, -90], [180, -90]],
      'type': 'LineString',
    },
    'properties': {
      'muonGraticule': 'equator',
    },
  }

  expect(eon.equator(p1)).toEqual(r1)
  expect(eon.equator(p2)).toEqual(r2)
})
// gjfMultiLineString
test('gjfMultiLineString', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let p2 = {multiframe: [ [-180, 180, 120, 60], [-90, 90, 30, 30] ] }

  let r2 = {
    'type': 'Feature',
    'geometry': {
      'coordinates': [[[-180, -90], [-120, -90], [-60, -90], [0, -90], [60, -90], [120, -90], [180, -90]], [[-180, -60], [-120, -60], [-60, -60], [0, -60], [60, -60], [120, -60], [180, -60]], [[-180, -30], [-120, -30], [-60, -30], [0, -30], [60, -30], [120, -30], [180, -30]], [[-180, 0], [-120, 0], [-60, 0], [0, 0], [60, 0], [120, 0], [180, 0]], [[-180, 30], [-120, 30], [-60, 30], [0, 30], [60, 30], [120, 30], [180, 30]], [[-180, 60], [-120, 60], [-60, 60], [0, 60], [60, 60], [120, 60], [180, 60]], [[-180, 90], [-120, 90], [-60, 90], [0, 90], [60, 90], [120, 90], [180, 90]], [[-120, -90], [-120, -60], [-120, -30], [-120, 0], [-120, 30], [-120, 60], [-120, 90]], [[0, -90], [0, -60], [0, -30], [0, 0], [0, 30], [0, 60], [0, 90]], [[120, -90], [120, -60], [120, -30], [120, 0], [120, 30], [120, 60], [120, 90]]],
      'type': 'MultiLineString',
    },
    'properties': {},
  }

  expect(eon.gjfMultiLineString(p2)).toEqual(r2)
})

// gjfMultiPoint
test('gjfMultiPoint', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let p2 = {multiframe: [ [-180, 180, 120, 60], [-90, 90, 30, 30] ] }

  let r2 = {
    'type': 'Feature',
    'geometry': {
      'coordinates': [[-120, -90], [0, -90], [120, -90], [-120, -60], [0, -60], [120, -60], [-120, -30], [0, -30], [120, -30], [-120, 0], [0, 0], [120, 0], [-120, 30], [0, 30], [120, 30], [-120, 60], [0, 60], [120, 60], [-120, 90], [0, 90], [120, 90]],
      'type': 'MultiPoint',
    },
    'properties': {},
  }

  expect(eon.gjfMultiPoint(p2)).toEqual(r2)
})

// gjfMultiPolygon
test('gjfMultiPolygon', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let p2 = {multiframe: [ [-180, 180, 120, 60], [-90, 90, 30, 30] ] }

  let r2 = {
    'type': 'Feature',
    'geometry': {
      'type': 'MultiPoint',
      'coordinates': [[-120, -90], [0, -90], [120, -90], [-120, -60], [0, -60], [120, -60], [-120, -30], [0, -30], [120, -30], [-120, 0], [0, 0], [120, 0], [-120, 30], [0, 30], [120, 30], [-120, 60], [0, 60], [120, 60], [-120, 90], [0, 90], [120, 90]],
    },
    'properties': {
      'doc': 'natform',
      'eoMultiPolygon': 1,
      'eonode': {
        'geometry': {
          'type': 'Point',
          'coordinates': [0, 0, 0],
        }, 'properties': {
          'geodelta': [0, 0, 0],
          'hyperdelta': [0, 0, 0],
          'orgen': [0, 0, 0], 'prevous': [0, 0, 0], 'velang': [0, 0, 0], 'velin': [0, 0, 0]},
        'type': 'Feature',
      },
      'faces': [[0, 1, 4], [0, 4, 3], [3, 4, 7], [3, 7, 6], [6, 7, 10], [6, 10, 9], [9, 10, 13], [9, 13, 12], [12, 13, 16], [12, 16, 15], [15, 16, 19], [15, 19, 18], [1, 2, 5], [1, 5, 4], [4, 5, 8], [4, 8, 7], [7, 8, 11], [7, 11, 10], [10, 11, 14], [10, 14, 13], [13, 14, 17], [13, 17, 16], [16, 17, 20], [16, 20, 19], [2, 0, 3], [2, 3, 5], [5, 3, 6], [5, 6, 8], [8, 6, 9], [8, 9, 11], [11, 9, 12], [11, 12, 14], [14, 12, 15], [14, 15, 17], [17, 15, 18], [17, 18, 20]],
      'sort': 'form',
    },
  }

  expect(eon.gjfMultiPolygon(p2)).toEqual(r2)
})

// natMultiLineString
test('natMultiLineString ', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let eon = await __eo('xs').m('graticule')

  let p2 = {multiframe: [ [-180, 180, 120, 60], [-90, 90, 30, 30] ] }

  let r2 = {
    'type': 'Feature',
    'geometry': {
      'type': 'MultiPoint',
      'coordinates': [[-120, -90], [0, -90], [120, -90], [-120, -60], [0, -60], [120, -60], [-120, -30], [0, -30], [120, -30], [-120, 0], [0, 0], [120, 0], [-120, 30], [0, 30], [120, 30], [-120, 60], [0, 60], [120, 60], [-120, 90], [0, 90], [120, 90]],
    },
    'properties': {
      'doc': 'natform',
      'eoMultiPolygon': 1,
      'eonode': {
        'geometry': {
          'type': 'Point',
          'coordinates': [0, 0, 0],
        }, 'properties': {
          'geodelta': [0, 0, 0],
          'hyperdelta': [0, 0, 0],
          'orgen': [0, 0, 0], 'prevous': [0, 0, 0], 'velang': [0, 0, 0], 'velin': [0, 0, 0]},
        'type': 'Feature',
      },
      'faces': [[0, 1, 4], [0, 4, 3], [3, 4, 7], [3, 7, 6], [6, 7, 10], [6, 10, 9], [9, 10, 13], [9, 13, 12], [12, 13, 16], [12, 16, 15], [15, 16, 19], [15, 19, 18], [1, 2, 5], [1, 5, 4], [4, 5, 8], [4, 8, 7], [7, 8, 11], [7, 11, 10], [10, 11, 14], [10, 14, 13], [13, 14, 17], [13, 17, 16], [16, 17, 20], [16, 20, 19], [2, 0, 3], [2, 3, 5], [5, 3, 6], [5, 6, 8], [8, 6, 9], [8, 9, 11], [11, 9, 12], [11, 12, 14], [14, 12, 15], [14, 15, 17], [17, 15, 18], [17, 18, 20]],
      'sort': 'form',
    },
  }

  expect(eon.gjfMultiPolygon(p2)).toEqual(r2)
})
