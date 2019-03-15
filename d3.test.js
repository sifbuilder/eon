let fileUrl = require('file-url')

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

const xEonify = require('./eon-x-eonify.js')

test('test', async () => {
  let __eo = xEonify.xEo()
  __eo({'xs': xEonify.xs(__eo)})
  let bosonD3 = await __eo('xs').b('d3')

  expect(bosonD3.version).toBe('5.8.0')
})
