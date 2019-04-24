if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('../eon-x-eonify.js')

let eo = jest.fn(async ({anitem, time}) => {
  let __eo = xEonify.eomap() // init mapper

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

    let __eo = await xEonify.eonit({anitem: undefined})
    let muonAnimation = await __eo('xs').m('animation')
 
  let json = JSON.stringify(__eo())
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
  expect(r).toBe('eonMuonTest')
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
  let m = xEonify.eomap()
  let r = await xEonify.getCell(e, n, m)
  expect(r).toBe(undefined)
})

test('test getCell if e object', async () => {
  let e = {f: () => {}}
  let n = 'muonProps'
  let m = xEonify.eomap()
  let r = await xEonify.getCell(e, n, m)
  expect(r).toBe(e)
})

test('test getEonItem anchor', async () => {
  let href = "file:///E:/Dropbox/dBox/e/c/eons/eons/index.html#eon-z100a-anima"
  let r = await xEonify.getEonItem(href)
  expect(r).toBe("eon-z100a-anima")
})

test('test getEonItem filename', async () => {
  let href = "file:///E:/Dropbox/dBox/e/c/eons/eons/eon-z100a-anima.html"
  let r = await xEonify.getEonItem(href)
  expect(r).toBe("eon-z100a-anima")
})

test('test getEonItem v param', async () => {
  let href = "file:///E:/Dropbox/dBox/e/c/eons/eons?v=eon-z100a-anima"
  let r = await xEonify.getEonItem(href)
  expect(r).toBe("eon-z100a-anima")
})