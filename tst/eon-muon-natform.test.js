if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('../eon-x-eonify.js')

test.only('test natMultiLineString', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 

  let eoform = {
    x: {
      'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1, // triangle
      'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': 100,
      'dom3': [ -180, 180 ],
    },
    y: {
      'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1, // triangle
      'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': 100,
      'dom3': [ -180, 180 ],
    },
  }

  let coords = [
    [-120, -1.469576158976824e-14],
    [-30.20866650170156, -52.3229452098511],
    [60.000000000000014, -103.92304845413263],
    [60.41733300340313, 0],
    [60.000000000000014, 103.92304845413263],
    [-30.208666501701554, 52.32294520985109],
    [-120, 1.469576158976824e-14] ]

  let natipros = {
    eoform: eoform,
    ghv: 1, // horizontal geodesics
    gsa: 0, // symetric distribution of geodesics around the origin
    gco: 0, // closed line
  }

  let muonNatform = await __eo('xs').m('natform')
  let feat = muonNatform.natMultiLineString(natipros)

  expect(feat.geometry.type).toEqual('LineString')
  expect(feat.geometry.coordinates).toEqual(coords)
})

test('test natMultiPolygon', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 

  let eoform = {
    x: {'m1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
      'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
    },
    y: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
      'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
    },
    z: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
      'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4, 'pa6': 0, 'pb7': -1,
    },

  }

  let coords = [
    [-7.34788079488412e-15, -8.998558695971147e-31, -120],
    [4.499279347985573e-31, -7.34788079488412e-15, -120],
    [7.34788079488412e-15, 0, -120],
    [4.499279347985573e-31, 7.34788079488412e-15, -120],
    [-120, -1.469576158976824e-14, 0],
    [7.34788079488412e-15, -120, 0],
    [120, 0, 0],
    [7.34788079488412e-15, 120, 0],
    [-7.34788079488412e-15, -8.998558695971147e-31, 120],
    [4.499279347985573e-31, -7.34788079488412e-15, 120],
    [7.34788079488412e-15, 0, 120],
    [4.499279347985573e-31, 7.34788079488412e-15, 120],
  ]

  let natipros = {
    eoform: eoform,
    ghv: 0, // horizontal geodesics
    gsa: 0, // symetric distribution of geodesics around the origin
    gco: 0, // closed line
  }

  let faces = [
    [0, 1, 5],
    [0, 5, 4],
    [4, 5, 9],
    [4, 9, 8],
    [1, 2, 6],
    [1, 6, 5],
    [5, 6, 10],
    [5, 10, 9],
    [2, 3, 7],
    [2, 7, 6],
    [6, 7, 11],
    [6, 11, 10],
    [3, 0, 4],
    [3, 4, 7],
    [7, 4, 8],
    [7, 8, 11],
  ]

  let muonNatform = await __eo('xs').m('natform')
  let feat = muonNatform.natMultiPolygon(natipros)

  expect(feat.geometry.type).toEqual('MultiPoint')
  expect(feat.geometry.coordinates).toEqual(coords)
  expect(feat.properties.eoMultiPolygon).toBe(1)
  expect(feat.properties.faces).toEqual(faces)
})

test('test nat with functions ', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 

  let eoform = {
    x: {
      'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1, // triangle
      'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': 100,
      'dom3': [ -180, 180 ],
      fn0: (e, c, d) => {
        return c[0] * Math.cos(e[0])
      },
    },
    y: {
      'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1, // triangle
      'ra2': 120, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6, 'pa6': 0, 'pb7': 100,
      'dom3': [ -180, 180 ],
      fn0: (e, c, d) => {
        return c[1] * Math.sin(e[1])
      },
    },
  }

  let coords = [
    [-120, -1.469576158976824e-14],
    [-30.20866650170156, -52.3229452098511],
    [60.000000000000014, -103.92304845413263],
    [60.41733300340313, 0],
    [60.000000000000014, 103.92304845413263],
    [-30.208666501701554, 52.32294520985109],
    [-120, 1.469576158976824e-14] ]

  let natipros = {
    eoform: eoform,
    ghv: 1, // horizontal geodesics
    gsa: 0, // symetric distribution of geodesics around the origin
    gco: 0, // closed line
  }

  let muonNatform = await __eo('xs').m('natform')
  let feat = muonNatform.natMultiLineString(natipros)

  expect(feat.geometry.type).toEqual('LineString')
  expect(feat.geometry.coordinates).toEqual(coords)
})

test('test nat with functions ', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 

  let eoform = {
    x: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6,
      'dom3': [ -180, 180 ],
      fn0: (e, c, d) => {
        return e[0]
      },
    },
    y: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 6,
      'dom3': [ -180, 180 ],
      fn0: (e, c, d) => {
        return e[1]
      },
    },
  }

  let coords = [
    [-3.141592653589793, -3.141592653589793],
    [-2.0943951023931953, -2.0943951023931953],
    [-1.0471975511965976, -1.0471975511965976],
    [0, 0],
    [1.0471975511965976, 1.0471975511965976],
    [2.0943951023931953, 2.0943951023931953],
    [3.141592653589793, 3.141592653589793],
  ]

  let natipros = {
    eoform: eoform,
    ghv: 1, // horizontal geodesics
    gsa: 0, // symetric distribution of geodesics around the origin
    gco: 0, // closed line
  }

  let muonNatform = await __eo('xs').m('natform')
  let feat = muonNatform.natMultiLineString(natipros)

  expect(feat.geometry.type).toEqual('LineString')
  expect(feat.geometry.coordinates).toEqual(coords)
})

test('test nat with functions 3D', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 

  let eoform = {
    x: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4,
      'dom3': [ -180, 180 ],
      fn0: (e, c, d) => {
        return e[0]
      },
    },
    y: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4,
      'dom3': [ -180, 180 ],
      fn0: (e, c, d) => {
        return e[1]
      },
    },
    z: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4,
      'dom3': [ -90, 90 ],
      fn0: (e, c, d) => {
        return e[1]
      },
    },
  }

  let coords = [
    [[-3.141592653589793, -3.141592653589793, -3.141592653589793],
      [-1.5707963267948966, -1.5707963267948966, -1.5707963267948966],
      [0, 0, 0],
      [1.5707963267948966, 1.5707963267948966, 1.5707963267948966],
      [3.141592653589793, 3.141592653589793, 3.141592653589793]],
    [[-3.141592653589793, -3.141592653589793, -3.141592653589793],
      [-1.5707963267948966, -1.5707963267948966, -1.5707963267948966],
      [0, 0, 0],
      [1.5707963267948966, 1.5707963267948966, 1.5707963267948966],
      [3.141592653589793, 3.141592653589793, 3.141592653589793]],
    [
      [-3.141592653589793, -3.141592653589793, -3.141592653589793],
      [-1.5707963267948966, -1.5707963267948966, -1.5707963267948966],
      [0, 0, 0],
      [1.5707963267948966, 1.5707963267948966, 1.5707963267948966],
      [3.141592653589793, 3.141592653589793, 3.141592653589793],
    ]]

  let natipros = {
    eoform: eoform,
    ghv: 1, // horizontal geodesics
    gsa: 0, // symetric distribution of geodesics around the origin
    gco: 0, // closed line
  }

  let muonNatform = await __eo('xs').m('natform')
  let feat = muonNatform.natMultiLineString(natipros)

  expect(feat.geometry.type).toEqual('MultiLineString')
  expect(feat.geometry.coordinates).toEqual(coords)
})

test('test nat with functions 3D', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 

  let eoform = {
    x: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4,
      'dom3': [ -180, 180 ],
      fn0: (e, c, d) => {
        return e[0]
      },
    },
    y: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4,
      'dom3': [ -180, 180 ],
      fn0: (e, c, d) => {
        return e[1]
      },
    },
    z: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4,
      'dom3': [ -18, 18 ],
      fn0: (e, c, d) => {
        return e[1]
      },
    },
  }

  let coords = [
    [-3.141592653589793, -3.141592653589793, -3.141592653589793],
    [-1.5707963267948966, -1.5707963267948966, -1.5707963267948966],
    [0, 0, 0],
    [1.5707963267948966, 1.5707963267948966, 1.5707963267948966],
    [3.141592653589793, 3.141592653589793, 3.141592653589793],
  ]

  let natipros = {
    eoform: eoform,
    ghv: 1, // horizontal geodesics
    gsa: 0, // symetric distribution of geodesics around the origin
    gco: 0, // closed line
  }

  let muonNatform = await __eo('xs').m('natform')
  let feat = muonNatform.natMultiLineString(natipros)

  expect(feat.geometry.type).toEqual('LineString')
  expect(feat.geometry.coordinates).toEqual(coords)
})

test('test nat with functions 2D', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 

  let eoform = {
    x: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4,
      'dom3': [ -180, 180 ],
      fn0: (e, c, d) => {
        return e[0]
      },
    },
    y: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4,
      'dom3': [ -18, 18 ],
      fn0: (e, c, d) => {
        return e[1]
      },
    },

  }

  let coords = [
    [-3.141592653589793, -3.141592653589793],
    [-1.5707963267948966, -1.5707963267948966],
    [0, 0],
    [1.5707963267948966, 1.5707963267948966],
    [3.141592653589793, 3.141592653589793],
  ]

  let natipros = {
    eoform: eoform,
    ghv: 1, // horizontal geodesics
    gsa: 0, // symetric distribution of geodesics around the origin
    gco: 0, // closed line
  }

  let muonNatform = await __eo('xs').m('natform')
  let feat = muonNatform.natMultiLineString(natipros)

  expect(feat.geometry.type).toEqual('LineString')
  expect(feat.geometry.coordinates).toEqual(coords)
})

test('test nat with functions 2D', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 

  let eoform = {
    x: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4,
      'dom3': [ -18, 18 ],
      fn0: (e, c, d) => {
        return e[0]
      },
    },
    y: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4,
      'dom3': [ -180, 180 ],
      fn0: (e, c, d) => {
        return e[1]
      },
    },

  }

  let coords = [
    [-0.3141592653589793, -0.3141592653589793],
    [0, 0],
    [0.3141592653589793, 0.3141592653589793],
  ]

  let natipros = {
    eoform: eoform,
    ghv: 1, // horizontal geodesics
    gsa: 0, // symetric distribution of geodesics around the origin
    gco: 0, // closed line
  }

  let muonNatform = await __eo('xs').m('natform')
  let feat = muonNatform.natMultiLineString(natipros)

  expect(feat.geometry.type).toEqual('LineString')
  expect(feat.geometry.coordinates).toEqual(coords)
})

test('test nat with functions 2D', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 

  let eoform = {
    x: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4,
      'dom3': [ -180, 180 ],
      fn0: (e, c, d) => {
        return c[0]
      },
    },
    y: {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
      'ra2': 1, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 4,
      'dom3': [ -18, 18 ],
      fn0: (e, c, d) => {
        return c[1]
      },
    },

  }

  let coords = [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]]

  let natipros = {
    eoform: eoform,
    ghv: 1, // horizontal geodesics
    gsa: 0, // symetric distribution of geodesics around the origin
    gco: 0, // closed line
  }

  let muonNatform = await __eo('xs').m('natform')
  let feat = muonNatform.natMultiLineString(natipros)

  expect(feat.geometry.type).toEqual('LineString')
  expect(feat.geometry.coordinates).toEqual(coords)
})
