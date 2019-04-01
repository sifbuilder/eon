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
    let __eo = await xEonify.eonit({anitem: '419h-pacer-string'})
    await __eo('xs').c('timer')
    await __eo('xs').e('sol')
    await __eo('xs').r('svg')

    let muonAnimation = await __eo('xs').m('animation')

    let state = {}, times = 0, dt = 100, t = 0, ntimes = 8 // td: 1000

    async function anitimer (callback) {
      await callback()
      setTimeout(() => {
        t = times * dt
        ++times
        state = muonAnimation.animier(t) // animier
        //   console.log(`time: ${t} with ${state.animas.length} animas and ${state.anigrams.length} anigrams in ${state}`)
        anitimer(callback)
      }, dt)
    }
    const callback = jest.fn()
    await anitimer(callback)
    for (let i = 0; i < ntimes; i++) {
      jest.advanceTimersByTime(dt)
      await Promise.resolve() // allow any pending jobs in the PromiseJobs queue to run
    }
console.log('state.anigrams', state.anigrams)
    let trace = state.anigrams[1].eofold.features[0]

    expect(callback).toHaveBeenCalledTimes(9) // ncalled: ntimes + 1
    expect(t).toBe(700) // ([0, ntimes - 1] + 1) * dt
    expect(state.anigrams[0].eotim.unElapsed).toBe(0.6) // 0.6 * 200
    expect(trace.geometry.coordinates.length).toEqual(3)
  })
})
