if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

const xEonify = require('./eon-x-eonify.js')

getEon = jest.fn(async () => {
  let __eo = xEonify.xEo()
  __eo({'xs': xEonify.xs(__eo)})
  let muonProps = await __eo('xs').m('lacer')
  return muonProps
})

test('test scale linear', async () => {
  let eon = await getEon()

  let scale = eon.linear()
    .domain([0, 3])
    .range([2, 8])

  expect(scale(0)).toBe(2)
  expect(scale(1)).toBe(4)
})

test('test range', async () => {
  let eon = await getEon()

  expect(eon.range(1, 4, 2)).toEqual([1, 3])
  expect(eon.range(1, 5, 2)).toEqual([1, 3])
})
