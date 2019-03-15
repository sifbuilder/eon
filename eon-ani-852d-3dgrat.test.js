let fileUrl = require('file-url')

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

const xEonify = require('./eon-x-eonify.js')

let getAni = jest.fn(async () => {
  let __eo = xEonify.xEo()
  __eo({'xs': xEonify.xs(__eo)})

  let eon = require('./eon-ani-852d-3dgrat.js')
  // eon = await eon.ani852d3dgrat(__eo)
  eon = eon.ani852d3dgrat
  __eo = xEonify.eon({ anitem: eon, time: 0 })

  return __eo
})

test('test add', async () => {
  let __eo = await getAni()

  expect(1 + 1).toBe(2)
})
