Object.defineProperty(document, 'currentScript', {
  value: document.createElement('script'),
})

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

const d3 = require('./d3-require.js')
global.d3 = d3

jest.mock('./d3-require.js')

const xEonify = require('./eon-x-eonify.js')
let __eo = xEonify.xEo()
__eo({'xs': xEonify.xs(__eo)})

const muonProps = require('./eon-muon-props.js').muonProps(__eo)


test('test add', async () => {
  let m = await Promise.resolve(muonProps)

  expect(m.addtest(1, 1)).toBe(2)
})

test('test isPureArray', async () => {
  let m = await Promise.resolve(muonProps)


  expect(m.isPureArray([1,2])).toBe(true)
})
test('test is not PureArray', async () => {
  let m = await Promise.resolve(muonProps)
  expect(m.isPureArray([1, {}])).toBe(false)
})
test('test is not PureArray', async () => {
  let m = await Promise.resolve(muonProps)
  expect(m.isPureArray([1, ()=>{}])).toBe(false)
})
