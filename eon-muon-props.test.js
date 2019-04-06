if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')



test('test cant', async () => {
  let __eo = await xEonify.eonit({anitem: '419e-pacer-nat-eoload-anify'})
  __eo = await xEonify.eocharge(__eo)
  let eon = await __eo('xs').m('props')
  expect(eon.cant([ [0, 0], [1, 1] ], 0.2)).toEqual([ [ 0.2, 0.2 ], [ 0.8, 0.8 ] ])
})

test('test', async () => {
  let __eo = await xEonify.eonit({anitem: '419e-pacer-nat-eoload-anify'})
  __eo = await xEonify.eocharge(__eo)
  let eon = await __eo('xs').m('props')

  expect(eon.isPureArray([1, 2])).toBe(true)
})

test('test is not PureArray', async () => {
  let __eo = await xEonify.eonit({anitem: '419e-pacer-nat-eoload-anify'})
  __eo = await xEonify.eocharge(__eo)
  let eon = await __eo('xs').m('props')

  expect(eon.isPureArray([1, {}])).toBe(false)
})
test('test is not PureArray', async () => {
  let __eo = await xEonify.eonit({anitem: '419e-pacer-nat-eoload-anify'})
  __eo = await xEonify.eocharge(__eo)
  let eon = await __eo('xs').m('props')

  expect(eon.isPureArray([1, () => {}])).toBe(false)
})
test('test scale linear', async () => {
  let __eo = await xEonify.eonit({anitem: '419e-pacer-nat-eoload-anify'})
  __eo = await xEonify.eocharge(__eo)
  let eon = await __eo('xs').m('props')

  let scale = eon.linear()
    .domain([0, 3])
    .range([2, 8])

  expect(scale(0)).toBe(2)
  expect(scale(1)).toBe(4)
})
