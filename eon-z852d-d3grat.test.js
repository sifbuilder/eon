jest.setTimeout(30000)

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const eonXEonify = require('../eon-x-eonify.js')

jest.useFakeTimers()

describe('results from animation', () => {
  
  test('ani timer', async () => {
    let __eo = await eonXEonify.eonit({anitem: '852d-3dgrat'})
    await __eo('xs').b('eon-ctl-timer')
    await __eo('xs').b('eon-eohal-sol')
    await __eo('xs').b('eon-render-svg')

    let eonMuonAnimation = await __eo('xs').b('eon-muon-animation')

    let state = {}, times = 0, dt = 100, t = 0, ntimes = 8

    async function anitimer (callback) {
      await callback()
      setTimeout(() => {
        t = times * dt
        ++times
        state = eonMuonAnimation.animier(t) // animier
        anitimer(callback)
      }, dt)
    }
    const callback = jest.fn()
    await anitimer(callback)
    for (let i = 0; i < ntimes; i++) {
      jest.advanceTimersByTime(dt)
      await Promise.resolve()
    }

    let anigram = state.anigrams[0]
    let td = anigram.eotim.td

    expect(callback).toHaveBeenCalledTimes(ntimes + 1)  // 9
    expect(t).toBe((ntimes - 1) * dt) // 700
    expect(anigram.eotim.unElapsed).toBe((ntimes - 2) * dt / td)  // 0.06
    expect(anigram.eofold.features[0].geometry.type).toBe('MultiLineString')
    expect(anigram.eofold.features[0].geometry.coordinates.length).toBe(2)
  })
})
