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

test('test grabbed', async () => {
  let __eo = await eonify()
  let muonEotype = await __eo('xs').e('pacer')
  console.log('muonEotype:', muonEotype)

  expect(typeof muonEotype.grabbed).toBe('function')
  expect(typeof muonEotype.grabbed()).toBe(undefined)
})

