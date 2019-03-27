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

  expect(typeof muonEotype.grabbed).toBe('function')
  expect(muonEotype.grabbed()).toBe(undefined)
})

test('test e.pacer', async () => {
  let __eo = await eonify()

  let muonStore = __eo('muonStore')
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
      pacer: {

        initN: 1, eventN: 0, autoN: 1, autoP: 0, autoT: 0, 
        outtimed: 0, maxN: 60,
        geospan: 0,

        paceAnisOfSort: 'anima',
        basePaceOnAniView: 'eoform',
        addItemToPacer: 1, // addItemToPacer for trace

      },
    },
  }

  let ani = eohalPacer.ween(geoLined)
  expect(ani).toHaveLength(0)

  let anitems = muonStore.animasLive()
  console.log('anitems:', anitems)

  expect(anitems).toHaveLength(1)
  expect(anitems[0]).toHaveProperty('eohal')
  expect(anitems[0]).toHaveProperty('eotim')
  expect(anitems[0]).toHaveProperty(['eoric', 'gid'], 'traces')
  expect(anitems[0]).toHaveProperty(['eoric', 'cid'], 'traces')
  expect(anitems[0]).toHaveProperty(['eoric', 'fid'], 'traceLine')
  expect(anitems[0]).toHaveProperty(['eoric', 'uid'], 'traces_traces_traceLine')
  expect(anitems[0]).toHaveProperty('eofold')
  expect(anitems[0]).toHaveProperty('eonode')
  expect(anitems[0]).toHaveProperty('eoload')
})
