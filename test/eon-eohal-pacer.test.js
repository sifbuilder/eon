jest.setTimeout(30000)

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('../eon-x-eonify.js')

let __eo
beforeAll(async () => {
  __eo = await xEonify.eostore()
  let [
    eonMuonProps,
  ] = await Promise.all([
    __eo('xs').b('eon-muon-props'),
  ])
})

describe('test grabbed', () => {
  test('grabbed is undefined', async () => {
    let eonEohalPacer = await __eo('xs').b('eon-eohal-pacer')
    expect(eonEohalPacer.anify).not.toBe(undefined)
  })

  test('grabbed is undefined', async () => {
    let eonEohalPacer = await __eo('xs').e('pacer')
    expect(typeof eonEohalPacer.grabbed).toBe('function')
    expect(eonEohalPacer.grabbed()).toBe(undefined)
  })
})
