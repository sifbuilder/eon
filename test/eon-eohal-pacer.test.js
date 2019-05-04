jest.setTimeout(30000)

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('../eon-x-eonify.js')

describe('test grabbed', () => {
  test('grabbed is undefined', async () => {
    let __eo = await xEonify.eostore()
    let [
      eonCtlRayder,
      eonMuonAnitem,
      eonMuonEoric,
      eonMuonEotim,
      eonMuonGeom,
      eonMuonGeoj,
      eonMuonProps,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-rayder'),
      __eo('xs').b('eon-muon-anitem'),
      __eo('xs').b('eon-muon-eoric'),
      __eo('xs').b('eon-muon-eotim'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-props'),
    ])

    let eonEohalPacer = await __eo('xs').b('eon-eohal-pacer')

    expect(eonEohalPacer.anify).not.toBe(undefined)
  })
  test('grabbed is undefined', async () => {
    let __eo = await xEonify.eostore()
    let [
      eonCtlRayder,
      eonMuonAnitem,
      eonMuonEoric,
      eonMuonEotim,
      eonMuonGeom,
      eonMuonGeoj,
      eonMuonProps,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-rayder'),
      __eo('xs').b('eon-muon-anitem'),
      __eo('xs').b('eon-muon-eoric'),
      __eo('xs').b('eon-muon-eotim'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-props'),
    ])

    let eonEohalPacer = await __eo('xs').e('pacer')

    expect(typeof eonEohalPacer.grabbed).toBe('function')
    expect(eonEohalPacer.grabbed()).toBe(undefined)
  })
})
