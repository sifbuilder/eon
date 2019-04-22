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
  // https://stackoverflow.com/questions/52177631/jest-timer-and-promise-dont-work-well-settimeout-and-async-function/52196951
  test('aniTimer', async () => {
    let anitem = async function (__eo) {
      let z = function () {
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
      enty.z = z
      return enty
    }

    let __eo = await xEonify.eonit({anitem: anitem})
    __eo = await xEonify.eocharge(__eo)
    let muonAnimation = await __eo('xs').m('animation')

    let state = {}, times = 0, dt = 100, t = 0, ntimes = 3 // td: 1000

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

    let td = state.featurecollection.features[0].properties.eotim.td //  1000

    expect(callback).toHaveBeenCalledTimes(ntimes + 1) //  4
    expect(t).toBe((ntimes - 1) * dt) //  200
    expect(state.featurecollection.features[0].properties.eotim.unElapsed).toBe(((ntimes - 1) * dt) / td) // 0.1
    expect(state.featurecollection.features[0].geometry.coordinates).toEqual([40, 0])
    // expect(1).toBe(1)
  })
})
