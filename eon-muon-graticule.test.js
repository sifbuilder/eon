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

  let muonStore = await __eo('xs').m('store') // map store
  muonStore = __eo('muonStore')

  return __eo
})
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
  let __eo = await eonify()
  let eon = await __eo('xs').m('graticule')

  let tidxer = eon.tidx(6, 4, 1, 1) // h (mers), v (parals)
  let idx = tidxer(3, 5) // col ([0,3]), row ([0,2])
  expect(idx).toBe(33) // 5 * (6*1) + 3 : 33
})

test('ridx a', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('graticule')
  // . . 3 . . .
  // . . . . . .
  // . . . . . .
  // . . . . . .
  let ridx = eon.ridx(6, 4, 1, 1) // h (mers), v (parals)
  let coords = ridx(3) //
  expect(coords).toEqual([0, 3]) //
})

test('ridx b', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('graticule')

  let tidxer = eon.ridx(6, 4, 1, 1) // h (mers), v (parals)
  let coords = tidxer(8) //
  expect(coords).toEqual([1, 2]) //
})

test('gratiparams', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('graticule')

  let params = { geoframe: [ [ [-180, 180, 15, 15], [-180, 180, 60, 60] ] ] }
  let r = eon.gratiparams(params)
  let o = {DX: 15, DY: 60, PX: 15, PY: 60,
    X0: -180, X1: 180, Y0: -180, Y1: 180,
    dx: 15, dy: 60, px: 15, py: 60,
    x0: -180, x1: 180, y0: -180, y1: 180}
  expect(r).toEqual(o) //
})
