if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill =  require('url-polyfill')

global.path = require('path')

global.fs = require('fs')


// let f = 'file:///E:/Dropbox/dBox/e/c/eons/eons/eon-muon-store.js'
// let f = './eon-muon-store.js'
// f = path.basename(f)
// if (1 && 1) console.log('f', f)
// if (1 && 1) console.log('f', fs.readFileSync(f, "utf8"))



const xEonify = require('./eon-x-eonify.js')

getEon = jest.fn(async (_) => {
  let __eo = xEonify.eon(_)
  return __eo
})


test('test filenize', async () => {
  let _ = {anitem:undefined, time:0}
  let eon = await getEon(_)  
  
  let filepath = xEonify.filenize('d3-scale')
  expect(filepath).toEqual('./d3-scale.js')
})


// test('test filenize', () => {
  // let filepath = xEonify.filenize('d3-scale')
  // expect(filepath).toEqual('./d3-scale.js')
// })

// test('test capitalize', () => {
  // let r = xEonify.capitalize('test')
  // expect(r).toBe('Test')
// })

// test('test ceonize', () => {
  // let r = xEonify.ceonize('eon-muon-test')
  // expect(r).toBe('muonTest')
// })

// test('test feonize', () => {
  // let r = xEonify.feonize('wen', 'muon')
  // expect(r).toBe('./eon-muon-wen.js')
// })

// test('test camelize', () => {
  // let r = xEonify.camelize('pre wen')
  // expect(r).toBe('preWen')
// })

// test('test getCell if e.n function', () => {
  // let e = {muonProps: () => {} }
  // let n = 'muonProps'
  // let m = xEonify.xEo()
  // let r = xEonify.getCell(e, n, m)
  // expect(r).toBe(undefined)
// })

// test('test getCell if e object', () => {
  // let e = {f: () => {}}
  // let n = 'muonProps'
  // let m = xEonify.xEo()
  // let r = xEonify.getCell(e, n, m)
  // expect(r).toBe(e)
// })

// test('test xEo() return empty state object', () => {
  // let state = xEonify.xEo()
  // expect(state()).toEqual({})
// })
