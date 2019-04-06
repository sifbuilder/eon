if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')


test('test isArray', async () => {
  let eo = jest.fn(async () => {
    let __eo = xEonify.eomap() // init mapper
  
    __eo({'xs': xEonify.xs(__eo)}) // map xs
    __eo({'xD3Require': { require: xEonify.require, requireFrom: xEonify.requireFrom } })
  
    let muonStore = await __eo('xs').m('store') // map store
    muonStore = __eo('muonStore')
  
    return __eo
  })
  let muonEotype = await __eo('xs').m('eotype')

  expect(muonEotype.isArray([0, 1])).toBe(true)
})

test('test isQuasiPureArray', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let muonEotype = await __eo('xs').m('eotype')

  expect(muonEotype.isQuasiPureArray([0, 'text', 1])).toBe(true)
  expect(muonEotype.isQuasiPureArray([0, {a: 1}, 1])).toBe(false)
  expect(muonEotype.isQuasiPureArray([0, 1, () => true])).toBe(false)
})

test('test isDoubleSingleArray', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let muonEotype = await __eo('xs').m('eotype')

  expect(muonEotype.isDoubleSingleArray([[ 1 ]])).toBe(true)
  expect(muonEotype.isDoubleSingleArray([[[1]]])).toBe(true)
  expect(muonEotype.isDoubleSingleArray([[0, 1]])).toBe(false)
})

test('test isTripleArray', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo) 
  let muonEotype = await __eo('xs').m('eotype')

  expect(muonEotype.isTripleArray([[[ 1 ]]])).toBe(true)
  expect(muonEotype.isTripleArray([[[ [0, 1] ]]])).toBe(true)
  expect(muonEotype.isTripleArray([[[ {a: 1} ]]])).toBe(true)
  expect(muonEotype.isTripleArray([[ 1 ]])).toBe(false)
})
