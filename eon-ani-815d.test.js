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

test('test factorial', async () => {
  let __eo = await eonify()
  let ani = await __eo('xs').a('815d-2dbernoulli')

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
  let __eo = await eonify()
  let ani = await __eo('xs').a('815d-2dbernoulli')

  let e = [
    0.9817477042468103,
    0.9817477042468103,
    1.0799224746714915,
    1.0799224746714915,
  ]
  let d = {}

  expect(ani.berny(e, [0, 17, 23, 1], d)).toBe(-0.12284023092514747)
  expect(ani.berny(e, [1, 17, 23, 1], d)).toBe(0.454729103538626)
  expect(ani.berny(e, [2, 17, 23, 1], d)).toBe(0.46522449711893754)
})
