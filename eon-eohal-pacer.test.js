if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

let eonify = jest.fn(async () => {
  let __eo = xEonify.xEo() // init mapper

  __eo({'xs': xEonify.xs(__eo)}) // map xs
  __eo({'xD3Require': { require: xEonify.require, requireFrom: xEonify.requireFrom } })

  await __eo('xs').m('store')
  await __eo('xs').c('rayder')
  await __eo('xs').e('mars')
  await __eo('xs').e('pacer')
  await __eo('xs').m('natform')
  await __eo('xs').m('stace')
  await __eo('xs').p('uniwen')


  return __eo
})

test('test grabbed', async () => {
  let __eo = await eonify()
  let muonEotype = await __eo('xs').e('pacer')
  console.log('muonEotype:', muonEotype)

  expect(typeof muonEotype.grabbed).toBe('function')
  expect(muonEotype.grabbed()).toBe(undefined)
})

test('test grabbed', async () => {
  let __eo = await eonify()

  let eohalPacer = __eo('eohalPacer')
  let muonNatform = __eo('muonNatform')
  let muonStace = __eo('muonStace')
  let protonUniwen = __eo('protonUniwen')

  let geoLined = {
    eohal: eohalPacer,
    eotim: {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1},
    eoric: {gid: 'traces', cid: 'traces', fid: 'traceLine'},

    eofold: {
      type: 'Feature',
      geometry: {type: 'LineString', coordinates: null },
      properties: {},
    },
    eonode: {
      type: 'Feature',
      geometry: {type: 'Point', coordinates: [0, 0, 0] },
      properties: {
        orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
      },
    },
    eoform: [ [[[0, 120]]], 0, 0],
    eoload: {
      eocrom: {'csx': 0, 'cf': 777, 'cs': 777, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},
    },
  }

  let ani = eohalPacer.ween(geoLined)



})
