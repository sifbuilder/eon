if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

let eonify = jest.fn(async ({anitem, time}) => {
  let __eo = xEonify.xEo() // init mapper

  __eo({'xs': xEonify.xs(__eo)}) // map xs
  __eo({'xD3Require': { require: xEonify.require, requireFrom: xEonify.requireFrom } })

  let muonStore = await __eo('xs').m('store') // map store

  let animas = await __eo('xs').a(anitem) // function
  if (typeof anitem === 'string') { // anitem: 852d-3dgrat
    animas = animas.ani() // animas: {natform: {…}}
  }
  muonStore.apply({type: 'UPDANIMA', animas: animas})

  await __eo('xs').m('animation') // map animation
  __eo('muonAnimation').animate(time) // animate
  return __eo
})

test('test filenize', async () => {
  let _ = {anitem: undefined, time: 0}
  let eon = await eonify(_)

  // let eonobjt = { xs:
  // { [Function: eons]
  // a: [Function],
  // ani: [Function],
  // b: [Function],
  // boson: [Function],
  // c: [Function],
  // ctl: [Function],
  // d: [Function],
  // dat: [Function],
  // e: [Function],
  // eohal: [Function],
  // f: [Function],
  // force: [Function],
  // g: [Function],
  // geo: [Function],
  // l: [Function],
  // lib: [Function],
  // m: [Function],
  // muon: [Function],
  // p: [Function],
  // proton: [Function],
  // r: [Function],
  // render: [Function],
  // z: [Function],
  // zindex: [Function] },
  // xD3Require:
  // { require:
  // { [Function: d3Require]
  // alias: [Function: requireAlias],
  // resolve: [AsyncFunction: resolve] },
  // requireFrom: [Function: requireFrom] },
  // muonEoric:
  // { [Function: enty]
  // getAnigramRic: [Function: getAnigramRic],
  // getuid: [Function: getuid],
  // enric: [Function: enric],
  // idify: [Function: idify],
  // getdefault: [Function: getdefault] },
  // muonEotim:
  // { [Function: enty]
  // timing: [Function: timing],
  // getdefault: [Function: getdefault] },
  // muonLacer:
  // { [Function: enty]
  // range: [Function: range],
  // linear: [Function: linear],
  // interlace: [Function: interlace],
  // slide: [Function: slide],
  // unslide: [Function: unslide],
  // interadd: [Function: interadd] },
  // muonSnap: { [Function: enty] snap: [Function: snap] },
  // muonAnitem:
  // { [Function: enty]
  // snapani: [Function: snapani],
  // functorize: [Function: functorize],
  // functorgeofold: [Function: functorgeofold],
  // functorpayload: [Function: functorpayload] },
  // muonStore:
  // { [Function: enty]
  // apply: [Function: _apply],
  // gramm: [Function: gramm],
  // ween: [Function: ween],
  // anigrams: [Function],
  // animasAll: [Function],
  // animasLive: [Function],
  // animas: [Function],
  // animasInGroupHowMany: [Function],
  // animasInClassHowMany: [Function],
  // anigramsInClassHowMany: [Function],
  // findFromUid: [Function],
  // findAnigramFromUid: [Function],
  // findAnimaFromUid: [Function] },
  // renderRenderer: { [Function: enty] render: [Function: render] },
  // muonTimer:
  // { now: [Function: now],
  // Timer: [Function: Timer],
  // timer: [Function: timer],
  // timerFlush: [Function: timerFlush] },
  // ctlTimer:
  // { started: [Function],
  // start: [Function: start],
  // restart: [Function: restart],
  // resume: [Function: resume],
  // stop: [Function: stop],
  // subscribe: [Function: subscribe] },
  // muonAnimation: { animate: [Function: animate], animationStop: [Function] } }

  let json = JSON.stringify(eon())
  expect(json).toEqual('{"xD3Require":{},"muonTimer":{},"ctlTimer":{},"muonAnimation":{}}')
})

test('test filenize', () => {
  let filepath = xEonify.filenize('d3-scale')
  expect(filepath).toEqual('./d3-scale.js')
})

test('test capitalize', () => {
  let r = xEonify.capitalize('test')
  expect(r).toBe('Test')
})

test('test ceonize', () => {
  let r = xEonify.ceonize('eon-muon-test')
  expect(r).toBe('muonTest')
})

test('test feonize', () => {
  let r = xEonify.feonize('wen', 'muon')
  expect(r).toBe('./eon-muon-wen.js')
})

test('test camelize', () => {
  let r = xEonify.camelize('pre wen')
  expect(r).toBe('preWen')
})

test('test getCell if e.n function', async () => {
  let e = {muonProps: () => {} }
  let n = 'muonProps'
  let m = xEonify.xEo()
  let r = await xEonify.getCell(e, n, m)
  expect(r).toBe(undefined)
})

test('test getCell if e object', async () => {
  let e = {f: () => {}}
  let n = 'muonProps'
  let m = xEonify.xEo()
  let r = await xEonify.getCell(e, n, m)
  expect(r).toBe(e)
})
