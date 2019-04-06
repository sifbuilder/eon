if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')


test('test', async () => {
  let __eo = await xEonify.eonit({anitem: undefined})
  __eo = await xEonify.eocharge(__eo)  
  let eon = await __eo('xs').m('eoforces')

  expect(eon.ceonize('link', 'force')).toBe('forceLink')
})
