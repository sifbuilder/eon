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

  let muonStore = await __eo('xs').m('store') // map store
  muonStore = __eo('muonStore')

  return __eo
})

describe('test eocrom', async () => {
  test('kolor', async () => {
    let __eo = await eo()
    let muonEocrom = await __eo('xs').m('eocrom')

    expect(muonEocrom.kolor(777, 0)).toBe('rgb(251, 107, 11)')
  })
})
