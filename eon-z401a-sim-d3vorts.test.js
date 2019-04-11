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
    let __eo = await xEonify.eonit({anitem: '401a-sim-d3vorts'})
    __eo = await xEonify.eocharge(__eo)
    let muonAnimation = await __eo('xs').m('animation')

    let state = {}, times = 0, dt = 100, t = 0, ntimes = 2

    async function anitimer (callback) {
      await callback()
      setTimeout(() => {
        t = times * dt
        ++times
        state = muonAnimation.animier(t)
        anitimer(callback)
      }, dt)
    }
    const callback = jest.fn()
    await anitimer(callback)
    for (let i = 0; i < ntimes; i++) {
      jest.advanceTimersByTime(dt)
      await Promise.resolve() // allow any pending jobs in the PromiseJobs queue to run
    }

    let animas = state.animas
    let anigrams = state.anigrams
    
    expect(callback).toHaveBeenCalledTimes(ntimes + 1) // ntimes + 1
    expect(t).toBe((ntimes -1) * dt) // (ntimes - 1) * dt
    expect(animas.length).toBe(32)
    expect(anigrams.length).toBe(32)
    expect(animas[0].eotim.unElapsed).toBe((ntimes -1) / dt) // 7x100/10000 (td: 10000)
    expect(animas[0].eoric.uid).toBe('field_field_field')
    expect(animas[1].eoric.uid).toBe('node_node_node0')
    expect(animas[1].eofold.geometry.coordinates).toEqual([0, 0, 0])
    expect(animas[1].eonode.geometry.coordinates).toEqual([ 69, 210, 0 ])
    expect(animas[2].eoric.uid).toBe('node_node_node1')
    expect(animas[2].eofold.geometry.coordinates).toEqual([0, 0, 0])
    expect(animas[14].eoric.uid).toBe("link_link_link0")
    
  })
})
