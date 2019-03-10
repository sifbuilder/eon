jest.setTimeout(30000)

let fileUrl = require('file-url')

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

const xEonify = require('./eon-x-eonify.js')

global.d3interpolate = {}


test('test', async () => {

  let __eo = xEonify.xEo()
  __eo({'xs': xEonify.xs(__eo)})
  let muonEocrom = await __eo('xs').m('eocrom')
  
  expect(muonEocrom.kolor(777, 0)).toBe('rgb(251, 107, 11)')
  
})







