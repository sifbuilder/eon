jest.setTimeout(30000)

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('../eon-x-eonify.js')

jest.useFakeTimers()

describe('results from animation', () => {
  
  test('ani timer', async () => {
    let __eo = await xEonify.eonit({anitem: '852d-3dgrat'})
    await __eo('xs').c('timer')
    await __eo('xs').e('sol')
    await __eo('xs').r('svg')

    let muonAnimation = await __eo('xs').m('animation')

    let state = {}, times = 0, dt = 100, t = 0, ntimes = 8

    async function anitimer (callback) {
      await callback()
      setTimeout(() => {
        t = times * dt
        ++times
        state = muonAnimation.animier(t) // animier
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
