if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

let eonify = jest.fn(async () => {
  let __eo = xEonify.xEo() // init mapper

  __eo({'xs': xEonify.xs(__eo)}) // map xs
  __eo({'xD3Require': { require: xEonify.require, requireFrom: xEonify.requireFrom } })

  await __eo('xs').m('store') // map store

  return __eo
})

test('test scale', async () => {
  let __eo = await eonify()
  let muonNatform = await __eo('xs').m('natform')
  let d3Scale = __eo('d3Scale')

  let _s1extent = [-180, 180]
  let _s1range = [0, 6]
  let _s2extent = [ 0, 1, 2, 3, 4, 5, 6 ]
  let _s2range = [
    0.24253562503633297,
    0.2857142857142857,
    0.48507125007266594,
    1,
    0.4850712500726661,
    0.28571428571428575,
    0.24253562503633297,
  ]
  let _s1 = d3Scale.scaleLinear().domain(_s1extent).range(_s1range) // [-1,1] => [0,seg5]
  let _s2 = d3Scale.scaleLinear().domain(_s2extent).range(_s2range) // [0,..,seg5] => rador

  expect(_s1(0)).toBe(3)
  expect(_s1(-180)).toBe(0)
  expect(_s2(_s1(-180))).toBe(0.24253562503633297)
  expect(_s1(0)).toBe(3)
  expect(_s2(_s1(0))).toBe(1)
  expect(_s1(180)).toBe(6)
  expect(_s2(_s1(180))).toBe(0.24253562503633297)
})

test('test natMultiLineString', async () => {
  let __eo = await eonify()

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
  console.log('feat:', feat.geometry.coordinates)

  expect(feat.geometry.type).toEqual('LineString')
  expect(feat.geometry.coordinates).toEqual(coords)
})

test('test natMultiPolygon', async () => {
  let __eo = await eonify()

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

  let coords = [60.41733300340313, 0]

  let natipros = {
    eoform: eoform,
    ghv: 1, // horizontal geodesics
    gsa: 0, // symetric distribution of geodesics around the origin
    gco: 0, // closed line
  }

  let faces = [
    [0, 0, 1],
    [0, 1, 1],
    [1, 1, 2],
    [1, 2, 2],
    [2, 2, 3],
    [2, 3, 3],
    [3, 3, 4],
    [3, 4, 4],
    [4, 4, 5],
    [4, 5, 5],
    [5, 5, 6],
    [5, 6, 6],
  ]

  let muonNatform = await __eo('xs').m('natform')
  let feat = muonNatform.natMultiPolygon(natipros)
  console.log('feat:', feat.geometry.coordinates)

  expect(feat.geometry.type).toEqual('Point')
  expect(feat.geometry.coordinates).toEqual(coords)
  expect(feat.properties.eoMultiPolygon).toBe(1)
  expect(feat.properties.faces).toEqual(faces)
})
