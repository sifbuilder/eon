if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill =  require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('../eon-x-eonify.js')

let eonify = jest.fn(async () => xEonify.eostore()) // init mapper

test('test', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').b('d3')

  expect(eon.version).toBe('5.8.0')
})
