const d3 = require('./d3-require.js')
global.d3 = d3

let d3Require = d3.require
let d3RequireFrom = d3.requireFrom

const xEonify = require('./eon-x-eonify.js')
global.d3 = xEonify.define

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

test('test getCell if e.n function', () => {
  let e = {muonProps: () => {} }
  let n = 'muonProps'
  let m = xEonify.xEo()
  let r = xEonify.getCell(e, n, m)
  expect(r).toBe(undefined)
})

test('test getCell if e object', () => {
  let e = {f: () => {}}
  let n = 'muonProps'
  let m = xEonify.xEo()
  let r = xEonify.getCell(e, n, m)
  expect(r).toBe(e)
})

test('test xEo() return empty state object', () => {
  let state = xEonify.xEo()
  expect(state()).toEqual({})
})
