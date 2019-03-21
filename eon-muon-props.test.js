let fileUrl = require('file-url')

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

const xEonify = require('./eon-x-eonify.js')


getEon = jest.fn(async () => {
  // let __eo = await xEonify.eoframe()
  let __eo = xEonify.xEo()
  __eo({'xs': xEonify.xs(__eo)})

  let eon = await __eo('xs').m('props')
if (1 && 1) console.log('eon', eon)
  return eon
})

test('test cant', async () => {
  let eon = await getEon()
  expect(eon.cant([ [0, 0], [1, 1] ], 0.2)).toEqual([ [ 0.2, 0.2 ], [ 0.8, 0.8 ] ])
})

// test('test', async () => {
  // let eon = await getEon()

  // expect(eon.isPureArray([1, 2])).toBe(true)
// })

// test('test is not PureArray', async () => {
  // let eon = await getEon()

  // expect(eon.isPureArray([1, {}])).toBe(false)
// })
// test('test is not PureArray', async () => {
  // let eon = await getEon()

  // expect(eon.isPureArray([1, () => {}])).toBe(false)
// })
// test('test scale linear', async () => {
  // let eon = await getEon()

  // let scale = eon.linear()
    // .domain([0, 3])
    // .range([2, 8])

  // expect(scale(0)).toBe(2)
  // expect(scale(1)).toBe(4)
// })
