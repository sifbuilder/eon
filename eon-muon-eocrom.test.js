let fileUrl = require('file-url')

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

const xEonify = require('./eon-x-eonify.js')

let getEon = jest.fn(async () => {
  let __eo = xEonify.xEo()
  __eo({'xs': xEonify.xs(__eo)})
  let eon = await __eo('xs').m('eocrom')
  return eon
})

test('test', async () => {
  let eon = await getEon()

  expect(eon.kolor(777, 0)).toBe('rgb(251, 107, 11)')
})
