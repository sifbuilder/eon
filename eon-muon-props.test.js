jest.setTimeout(30000)

let fileUrl = require('file-url')

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

const xEonify = require('./eon-x-eonify.js')


getMuonProps = jest.fn( async () => {
  let __eo = xEonify.xEo()
  __eo({'xs': xEonify.xs(__eo)})
  let muonProps = await __eo('xs').m('props')
  return muonProps
})


test('test cant', async () => {
  let muonProps = await getMuonProps()
  expect(muonProps.cant([ [0,0],[1,1] ], 0.2)).toEqual([ [ 0.2, 0.2 ], [ 0.8, 0.8 ] ])
})


test('test', async () => {
  let muonProps = await getMuonProps()
  expect(muonProps.isPureArray([1,2])).toBe(true)
})

test('test is not PureArray', async () => {
  let muonProps = await getMuonProps()
  expect(muonProps.isPureArray([1, {}])).toBe(false)
})
test('test is not PureArray', async () => {
  let muonProps = await getMuonProps()
  expect(muonProps.isPureArray([1, ()=>{}])).toBe(false)
})
