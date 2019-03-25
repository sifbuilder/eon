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

test('test snap', async () => {
  let __eo = await eonify()
  let muonSnap = await __eo('xs').m('snap')

  expect(muonSnap.snap(null, 0, 0)).toBe(null)
  expect(muonSnap.snap(1, 0, 0)).toBe(1)
})

test('test nat', async () => {
  let __eo = await eonify()
  let muonSnap = await __eo('xs').m('snap')
  let muonNatform = await __eo('xs').m('natform')

  let eoform = [[[ {
    'm1': 3, 'm2': 3, 'n1': 100, 'n2': 200, 'n3': 200, 'a': 1, 'b': 1,
    'ra2': 90, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
  } ]]]

  let coords = [
    [-120, -1.469576158976824e-14],
    [-30.20866650170156, -52.3229452098511],
    [60.000000000000014, -103.92304845413263],
    [60.41733300340313, 0],
    [60.000000000000014, 103.92304845413263],
    [-30.208666501701554, 52.32294520985109],
    [-120, 1.469576158976824e-14] ]



  expect(muonSnap.snap(eoform, 0, 0)).toBe(coords)

})

