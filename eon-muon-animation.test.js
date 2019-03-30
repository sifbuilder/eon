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

jest.useFakeTimers()

test('test', async () => {
  let anitem = async function anitem (__eo) {
    let ani = function () {
      let anima = {
        eohal: 'sol',
        eotim: {'td': 1000, 't0': 0, 't1': 1, 't2': 1, 't3': 1},
        eoric: {gid: 'g', cid: 'c', fid: 'f'},
        eofold: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0],
          },
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

  let muonStore = __eo('muonStore')

  let animas = await __eo('xs').a(anitem)

  __eo('muonStore').apply({type: 'UPDANIMA', animas: animas})

  let muonAnimation = await __eo('xs').m('animation')

  let state = {}
  state.animas = muonStore.animasLive()
  state.anigrams = muonStore.anigrams()

  let s = muonAnimation.animier()

  console.log('pre state:', state)
  console.log('new state:', s)

  expect(1).toBe(1)
})
