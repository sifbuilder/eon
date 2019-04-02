jest.setTimeout(30000)

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

jest.useFakeTimers()

describe('results from animation', () => {
  test('aniTimer', async () => {
    let __eo = await xEonify.eonit({anitem: '419k-pacer-anima-nat'})
    __eo = await xEonify.eocharge(__eo)
    let muonAnimation = await __eo('xs').m('animation')

    let gjfc = {}, times = 0, dt = 100, t = 0, ntimes = 3 // td: 1000
    async function aniTimer (callback) {
      await callback()
      setTimeout(() => {
        t = times * dt
        ++times
        gjfc = muonAnimation.animier(t) // animier
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

    // feature 0 is Point
    expect(gjfc.features[0].properties.eotim).toBe(undefined)
    expect(gjfc.features[0].geometry.type).toEqual('Point')
    expect(gjfc.features[0].geometry.coordinates).toEqual([ 0, 0, 0 ])

    // feature 1 is MultiLineString
    expect(gjfc.features[1].properties.eotim.unElapsed).toBe(((ntimes - 1) * dt) / td) // 0.1 
    expect(gjfc.features[1].geometry.type).toBe('MultiLineString')
    expect(gjfc.features[1].properties.eoric.uid).toEqual('natpace_natpace_0')

  })
})
