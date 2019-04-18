if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('../eon-x-eonify.js')

let eo = jest.fn(async () => {
  let __eo = xEonify.eomap() // init mapper

  __eo({'xs': xEonify.xs(__eo)}) // map xs
  __eo({'xD3Require': { require: xEonify.require, requireFrom: xEonify.requireFrom } })

  await __eo('xs').m('store') // map store

  return __eo
})

test('test factorial', async () => {
  let __eo = await eo()
  let ani = await __eo('xs').m('gamma')

  expect(ani.fact(0)).toBeCloseTo(1, 6)
  expect(ani.fact(3)).toBeCloseTo(6, 6)
  expect(ani.fact(9)).toBeCloseTo(362880, 6)
  expect(ani.fact(-0)).toBeCloseTo(1, 6)
  expect(ani.fact(-1)).toBe(Infinity)
  expect(ani.fact(-2)).toBe(-Infinity)
  expect(ani.fact(-3)).toBe(Infinity)
  expect(ani.fact(-9)).toBeNaN()
})

test('test bern', async () => {
  let __eo = await eo()
  let ani = await __eo('xs').m('gamma')

  let a = 2 * Math.PI
  let t = 1
  let summs = 23
  let range = 17

  let x0 = 1.0799224746714915
  let x = range * x0 / a
  expect(ani.bessel({x, summs, level: 1})).toBe(0.36763936568047256)
  expect(ani.bessel({x, summs, level: 2})).toBe(0.48408521542384175)
  expect(ani.bessel({x, summs, level: 3})).toBe(0.295065528161791)
})
