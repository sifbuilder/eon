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
    let __eo = await xEonify.eonit({anitem: '419e-pacer-nat-eoload-anify'})
    __eo = await xEonify.eocharge(__eo)
    let muonAnimation = await __eo('xs').m('animation')

    let gjfc = {}, times = 0, dt = 100, t = 0, ntimes = 7
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

    expect(gjfc.features.length).toBe(3)

    // feature 0 is Point
    expect(gjfc.features[0].properties.eotim).toBe(undefined)
    expect(gjfc.features[0].geometry.type).toEqual('Point')
    expect(gjfc.features[0].geometry.coordinates).toEqual([ 0, 0, 0 ])
    expect(gjfc.features[0].properties.eoric).toBe(undefined)

    // feature 1 is MultiLineString
    let td1 = gjfc.features[1].properties.eotim.td
    expect(gjfc.features[1].properties.eotim.unElapsed).toBe(((ntimes - 1) * dt) / td1) // 0.1
    expect(gjfc.features[1].geometry.type).toBe('MultiLineString')
    expect(gjfc.features[1].properties.eoric.uid).toEqual('nat_nat_paced_init_0')

    // feature 1 is MultiLineString
    let td2 = gjfc.features[2].properties.eotim.td
    expect(gjfc.features[2].properties.eotim.unElapsed).toBe(((ntimes - 1) * dt) / td2) // 0.1
    expect(gjfc.features[2].geometry.type).toBe('MultiLineString')
    expect(gjfc.features[2].properties.eoric.uid).toEqual('nat_nat_paced_init_1')
  })
})
