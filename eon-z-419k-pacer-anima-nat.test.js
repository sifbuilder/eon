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
    await __eo('xs').c('timer')
    await __eo('xs').e('sol')
    await __eo('xs').r('svg')
    await __eo('xs').m('eotest')

    let muonAnimation = await __eo('xs').m('animation')
    let muonEotest = await __eo('xs').m('eotest')

    let data = {times: 0, dt: 100, t: 0, ntimes: 8}
    data.anifn = muonAnimation.animier
    data.callback = jest.fn()
    
    let res = await muonEotest.anivance(data)
    let state = res.stat
    let newt = res.newt

    let trace = state.anigrams[1].eofold.features[0]

    expect(data.callback).toHaveBeenCalledTimes(9) // ncalled: ntimes + 1
    expect(newt).toBe(700) // ([0, ntimes - 1] + 1) * dt
    expect(state.anigrams[0].eotim.unElapsed).toBe(0.6) // 0.6 * 200
    expect(trace.geometry.coordinates.length).toEqual(3)
  })
})
