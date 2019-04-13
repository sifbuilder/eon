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
  test('aniTimer', async () => {
    let __eo = await xEonify.eonit({anitem: '419e-pacer-nat-eoload-anify'})
    __eo = await xEonify.eocharge(__eo)
    let muonAnimation = await __eo('xs').m('animation')

    let state = {}, times = 0, dt = 100, t = 0, ntimes = 7
    async function aniTimer (callback) {
      await callback()
      setTimeout(() => {
        t = times * dt
        ++times
        state = muonAnimation.animier(t) // animier
        aniTimer(callback)
      }, dt)
    }
    const callback = jest.fn()
    await aniTimer(callback)
    for (let i = 0; i < ntimes; i++) {
      jest.advanceTimersByTime(dt)
      await Promise.resolve() // allow any pending jobs in the PromiseJobs queue to run
    }

    expect(callback).toHaveBeenCalledTimes(ntimes + 1) //  4
    expect(t).toBe((ntimes - 1) * dt) //  200

    expect(state.featurecollection.features.length).toBe(2)


    // feature 0 is MultiLineString
    let td_0 = state.featurecollection.features[0].properties.eotim.td
    expect(state.featurecollection.features[0].properties.eotim.unElapsed).toBe(((ntimes - 1) * dt) / td_0) // 0.1
    expect(state.featurecollection.features[0].geometry.type).toBe('MultiLineString')
    expect(state.featurecollection.features[0].properties.eoric.uid).toEqual('g_c_paced_init_1')

    // feature 1 is Mul0iLineString
    let td_1 = state.featurecollection.features[1].properties.eotim.td
    expect(state.featurecollection.features[1].properties.eotim.unElapsed).toBe(((ntimes - 1) * dt) / td_1) // 0.1
    expect(state.featurecollection.features[1].geometry.type).toBe('MultiLineString')
    expect(state.featurecollection.features[1].properties.eoric.uid).toEqual('g_c_paced_init_2')
  })
})
