if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('../eon-x-eonify.js')

test.only('test snap triple array', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo)
  let muonSnap = await __eo('xs').m('snap')

  let v = [[[0.0, 12, 0.0, 12, 0.0, 12]]]
  let vb = [ 0.0, 0.2, 0.4, 0.6, 0.8, 1.0]
  expect(muonSnap.snap(v, vb[0], 0)).toBe(0)
  expect(muonSnap.snap(v, 0.1, 0)).toBeCloseTo(6, 4)
  expect(muonSnap.snap(v, vb[1], 0)).toBe(12)
  expect(muonSnap.snap(v, 0.3, 0)).toBeCloseTo(6, 4)
  expect(muonSnap.snap(v, vb[2], 0)).toBe(0)
  expect(muonSnap.snap(v, vb[3], 0)).toBe(12)
  expect(muonSnap.snap(v, vb[4], 0)).toBe(0)
  expect(muonSnap.snap(v, vb[5], 0)).toBe(12)
})

test('test snap', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo)
  let muonSnap = await __eo('xs').m('snap')

  expect(muonSnap.snap(null, 0, 0)).toBe(null)
  expect(muonSnap.snap(1, 0, 0)).toBe(1)
})

test('test nat', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo)
  let muonSnap = await __eo('xs').m('snap')
  await __eo('xs').m('natform')

  let eoform = [[[ {
    a: 1,
    b: 1,
    m1: 3,
    m2: 3,
    n1: 100,
    n2: 200,
    n3: 200,
    pa6: 0,
    pb7: -1,
    ra2: 90,
    seg5: 6,
    v0: 0,
    v1: 1,
    w4: 0,
  } ]]]

  let t = 0.9779773809506358

  let res = [-81.10151850794651, 5.18529730453789]

  expect(muonSnap.snap(eoform, t, 0)).toEqual(res)
})

test('test nat', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo)
  let muonSnap = await __eo('xs').m('snap')
  await __eo('xs').m('natform')

  let coords = [
    [-90, -1.1021821192326179e-14],
    [-22.65649987627617, -39.242208907388324],
    [45.00000000000001, -77.94228634059948],
    [45.31299975255235, 0],
    [45.00000000000001, 77.94228634059948],
    [-22.656499876276165, 39.242208907388324],
    [-90, 1.1021821192326179e-14],
  ]

  let t = 0.993994047617196

  let res = [-87.57322886979335, 1.4141210285629384]

  expect(muonSnap.snap(coords, t, 1)).toEqual(res)
})
