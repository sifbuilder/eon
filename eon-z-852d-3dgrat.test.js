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

    let anigram = state.anigrams[0]
    let feature = anigram.eofold.features[0]

    expect(callback).toHaveBeenCalledTimes(9) // ntimes + 1
    expect(t).toBe(700) // (ntimes - 1) * dt
    expect(anigram.eotim.unElapsed).toBe(0.875) // 0.875 tp ???? td: 12800
    expect(feature.geometry.type).toBe('MultiLineString')
    expect(feature.geometry.coordinates.length).toBe(2)

  })
})
