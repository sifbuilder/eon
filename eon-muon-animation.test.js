if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

jest.useFakeTimers()

describe('results from animation', () => {
  // https://stackoverflow.com/questions/52177631/jest-timer-and-promise-dont-work-well-settimeout-and-async-function/52196951
  test('aniTimer', async () => {
    let anitem = async function (__eo) {
      let ani = function () {
        let anima = {
          eohal: 'sol',
          eotim: {'td': 1000, 't0': 0, 't1': 1, 't2': 1, 't3': 1},
          eoric: {gid: 'g', cid: 'c', fid: 'f'},
          eofold: {
            type: 'Feature',
            geometry: {type: 'Point', coordinates: [ [[[0, 200]]], 0] },
          },
          eoload: {
            eocrom: {'csx': 0, 'cf': 777, 'cs': 777, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},
          },
        }
        return Array.of(anima)
      }
      let enty = () => {}
      enty.ani = ani
      return enty
    }

    let __eo = await xEonify.eonit({anitem: anitem})
    await __eo('xs').c('timer')
    await __eo('xs').e('sol')
    await __eo('xs').r('svg')

    let muonAnimation = await __eo('xs').m('animation')

    let state = {}, times = 0, dt = 100, t = 0, ntimes = 8 // td: 1000

    async function aniTimer (callback) {
      await callback()
      setTimeout(() => {
        t = times * dt
        ++times
        state = muonAnimation.animier(t) // animier
        //   console.log(`time: ${t} with ${state.animas.length} animas and ${state.anigrams.length} anigrams in ${state}`)
        aniTimer(callback)
      }, dt)
    }
    const callback = jest.fn()
    await aniTimer(callback)
    for (let i = 0; i < ntimes; i++) {
      jest.advanceTimersByTime(dt)
      await Promise.resolve() // allow any pending jobs in the PromiseJobs queue to run
    }

    expect(callback).toHaveBeenCalledTimes(9) // ncalled: ntimes + 1
    expect(t).toBe(700) // ([0, ntimes - 1] + 1) * dt
    expect(state.anigrams[0].eotim.unElapsed).toBe(0.6) // 0.6 * 200
    expect(state.anigrams[0].eofold.features[0].geometry.coordinates).toEqual([120, 0])
  })
})
