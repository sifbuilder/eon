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
    let __eo = await xEonify.eonit({anitem: '419h-pacer-string'})
    __eo = await xEonify.eocharge(__eo)
    let muonAnimation = await __eo('xs').m('animation')

    jest.useFakeTimers()
    const callback = jest.fn()    
    let gjfc = {}, times = 0, dt = 100, t = 0, ntimes = 8 // td: 1000
    async function anitimer (callback) {
      await callback()
      setTimeout(() => {
        t = times * dt
        ++times
        gjfc = muonAnimation.animier(t) // animier
        //   console.log(`time: ${t}`)
        anitimer(callback)
      }, dt)
    }
    await anitimer(callback)
    for (let i = 0; i < ntimes; i++) {
      jest.advanceTimersByTime(dt)
      await Promise.resolve() // allow any pending jobs in the PromiseJobs queue to run
    }

    let trace = gjfc.anigrams[1].eofold.features[0]

    expect(callback).toHaveBeenCalledTimes(9) // ncalled: ntimes + 1
    expect(t).toBe(700) // ([0, ntimes - 1] + 1) * dt
    expect(gjfc.anigrams[0].eotim.unElapsed).toBe(0.6) // 0.6 * 200
    expect(trace.geometry.coordinates.length).toEqual(3)
  })
})
