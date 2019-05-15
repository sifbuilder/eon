if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('../eon-x-eonify.js')

test('test', async (done) => {
  let __eo = await xEonify.eostore()

  const expectedActions = [
    ['eon-z815e-d2bernoulli', ''],
    ['d3-array', ''],
  ]

  const asyncCall = async (index) => {
    const response = await xEonify.getEon(expectedActions[index], __eo)
    expect(response).toBeDefined()
    return response
  }

  const responses = await Promise.all([
    asyncCall(0),
    asyncCall(1),
  ])

  expect(responses.length).toEqual(2)

  done()
})

test('test filenize', async () => {
  let _ = {anitem: undefined, time: 0}

  let __eo = await xEonify.eonit({anitem: undefined})
  let muonAnimation = await __eo('xs').m('animation')

  let json = JSON.stringify(__eo())
  expect(json).toEqual('{"xD3Require":{},"eonEohalCore":{},"eonMuonTimer":{},"eonCtlTimer":{},"eonMuonAnimation":{}}')
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
  let href = 'file:///E:/Dropbox/dBox/e/c/eons/eons/index.html#eon-z100a-anima'
  let r = await xEonify.getEonItem(href)
  expect(r).toBe('eon-z100a-anima')
})

test('test getEonItem filename', async () => {
  let href = 'file:///E:/Dropbox/dBox/e/c/eons/eons/eon-z100a-anima.html'
  let r = await xEonify.getEonItem(href)
  expect(r).toBe('eon-z100a-anima')
})

test('test getEonItem v param', async () => {
  let href = 'file:///E:/Dropbox/dBox/e/c/eons/eons?v=eon-z100a-anima'
  let r = await xEonify.getEonItem(href)
  expect(r).toBe('eon-z100a-anima')
})

test('test inNode', () => {
  let inNode = xEonify.inNode()
  expect(inNode).toBe(true)
})