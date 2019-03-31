if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

let eo = jest.fn(async () => {
  let __eo = xEonify.xEo() // init mapper

  __eo({'xs': xEonify.xs(__eo)}) // map xs
  __eo({'xD3Require': { require: xEonify.require, requireFrom: xEonify.requireFrom } })

  await __eo('xs').m('store') // map store
  return __eo
})

global.document = document

// test('use jsdom in this test file', () => {
//   const element = document.createElement('div')
//   expect(element).not.toBeNull()
// })

jest.useFakeTimers()

test('test', async () => { // d3-selection:101 document is null
  let anitem = async function (__eo) {
    let ani = function () {
      let anima = {
        eohal: 'sol',
        eotim: {'td': 1000, 't0': 0, 't1': 1, 't2': 1, 't3': 1},
        eoric: {gid: 'g', cid: 'c', fid: 'f'},
        eofold: {
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [0, 0] },
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

  let __eo = await eo()

  await __eo('xs').c('timer')
  await __eo('xs').e('sol')
  // await __eo('xs').r('svg')

  let muonStore = __eo('muonStore')

  let animas = await __eo('xs').a(anitem)
  __eo('muonStore').apply({type: 'UPDANIMA', animas: animas})

  let muonAnimation = await __eo('xs').m('animation')

  let state = {}
  state.animas = muonStore.animasLive()
  state.anigrams = muonStore.anigrams()

  setTimeout(function (t) {
    state = muonAnimation.animier(t) // animier
  }, 100)

  jest.runAllTimers()
  expect(setTimeout).toHaveBeenCalledTimes(1)
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100)
})

test('simpleTimer', async () => {
  const order = []
  order.push('1')
  setTimeout(() => { order.push('6') }, 0)
  const promise = new Promise(resolve => {
    order.push('2')
    resolve()
  }).then(() => {
    order.push('4')
  })
  order.push('3')
  await promise
  order.push('5')
  jest.advanceTimersByTime(0)
  expect(order).toEqual([ '1', '2', '3', '4', '5', '6' ])
})

// https://stackoverflow.com/questions/52177631/jest-timer-and-promise-dont-work-well-settimeout-and-async-function/52196951
test.only('simpleTimer', async () => {
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

  let __eo = await eo()

  await __eo('xs').c('timer')
  await __eo('xs').e('sol')
  await __eo('xs').r('svg')

  let muonStore = __eo('muonStore')

  let animas = await __eo('xs').a(anitem)
  __eo('muonStore').apply({type: 'UPDANIMA', animas: animas})

  let muonAnimation = await __eo('xs').m('animation')

  let state = {}
  state.animas = muonStore.animasLive()
  state.anigrams = muonStore.anigrams()

  let times = 0, dt = 100, t = 0, ntimes = 8 // td: 1000

  async function simpleTimer (callback) {
    await callback()
    setTimeout(() => {
      t = times * dt
      ++times
      state = muonAnimation.animier(t) // animier
      //   console.log(`time: ${t} with ${state.animas.length} animas and ${state.anigrams.length} anigrams in ${state}`)
      simpleTimer(callback)
    }, dt)
  }

  const callback = jest.fn()
  await simpleTimer(callback)
  for (let i = 0; i < ntimes; i++) {
    jest.advanceTimersByTime(dt)
    await Promise.resolve() // allow any pending jobs in the PromiseJobs queue to run
  }

  expect(callback).toHaveBeenCalledTimes(9) // ncalled: ntimes + 1
  expect(t).toBe(700) // ([0, ntimes - 1] + 1) * dt
  expect(state.anigrams[0].eotim.unElapsed).toBe(0.6) // 0.6 * 200
  expect(state.anigrams[0].eofold.features[0].geometry.coordinates).toEqual([120, 0])
})
