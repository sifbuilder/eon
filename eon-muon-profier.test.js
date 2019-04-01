if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

let eo = jest.fn(async () => {
  let __eo = xEonify.eomap() // init mapper

  __eo({ 'xs': xEonify.xs(__eo) }) // map xs
  __eo({ 'xD3Require': { require: xEonify.require, requireFrom: xEonify.requireFrom } })
  await __eo('xs').m('store') // map store

  return __eo
})

test('test getPrt uniwen', async () => {
  let __eo = await eo()
  let [
    muonProfier,
  ] = await Promise.all([
    __eo('xs').m('profier'),
  ])

  expect(typeof muonProfier.getPrt('uniwen')).toBe('function')
  expect(muonProfier.getPrt('__uniwen')).toBe(null)
})

test('test getPrt geoOrthographic', async () => {
  let __eo = await eo()
  let [
    d3Geo,
    muonProfier,
  ] = await Promise.all([
    __eo('xs').b('d3-geo'),
    __eo('xs').m('profier'),
  ])

  let proton = muonProfier.getPrt(d3Geo.geoOrthographic())
  expect(proton.name).toBe('projection')
  expect(proton.rotate).toEqual(expect.any(Function))
  expect(proton.invert).toEqual(expect.any(Function))
})
