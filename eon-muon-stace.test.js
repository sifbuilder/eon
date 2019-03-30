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

test('test natMultiLineString', async () => {
  let __eo = await eo()
  let muonStace = await __eo('xs').m('stace')

  let anitem = {
    eocrom: {csx: 0, cf: 777, cs: 777, cw: 0.99, co: 0.4 },
    eofold: {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [

            [10, 0, 0],
            [20, 0, 0],
            [30, 0, 0],
            [40, 0, 0],
            [50, 0, 0],
            [60, 0, 0],
            [70, 0, 0],
            [80, 0, 0],
            [90, 0, 0],

          ],
          properties: {},
        },
      }],
    },

    eoform: [-29.819999989122152, 0, 0],
    eohal: 'sol',
    eoinited: {g_c_f: 0.3757500000453244},
    eomot: {},
    eonode: {
      type: 'Feature',
      geometry: {
        coordinates: [0, 0, 0],
        type: 'Point',
      },
      properties: {
        geodelta: null,
        orgen: null,
        prevous: null,
        velang: [0, 0, 0],
        velin: [0, 0, 0],
      },
    },
    eoouted: {g_c_f: 0.8117388889271145},
    eoric: {gid: 'g', cid: 'c', fid: 'f', uid: 'g_c_f'},
    eotim: {
      common: 0,
      inverse: 0,
      msElapsed: 676.3500000815839,
      nostop: 0,
      t0: 0,
      t1: 1,
      t2: 1,
      t3: 1,
      td: 1800,
      tf: t => t,
      tu: 1000,
      tw: 1,
      unDelta: 2.3229174139771658e-10,
      unElapsed: 0.9999999996140835,
      unEnd: 1,
      unPassed: 2.3229174139771658e-10,
      unStart: 0.9999999993817917,
      unTime: 2.3229174139771658e-10,
    },
  }

  let stace0 = [ 0, 1, 2]
  let stace1 = [ {pos: 1}, {pos: 1}, {pos: 0}]
  let stace2 = {x: 0, y: 0, z: 0}
  let stace3 = [300, 200, 0]
  // let stace4 = [[a1,a2,a3], [b1,b2]]
  // let stace5 = [[[ {nat} ]]]
  // let stace6 = [{pos:0}, 3]

  let locus0 = muonStace.getTranspots(stace0, anitem)
  let locus1 = muonStace.getTranspots(stace1, anitem)
  let locus2 = muonStace.getTranspots(stace2, anitem)
  let locus3 = muonStace.getTranspots(stace3, anitem)

  expect(locus0).toEqual([[0, 1, 2]])
  // expect(locus1).toEqual([[10, 0, 0]])
  expect(locus2).toEqual([[0, 0, 0]])
  expect(locus3).toEqual([[300, 200, 0]])
})
