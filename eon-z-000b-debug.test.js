if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

let eo = jest.fn(async () => {
  let __eo = xEonify.eomap() // init mapper

  __eo({'xs': xEonify.xs(__eo)}) // map xs
  __eo({'xD3Require': { require: xEonify.require, requireFrom: xEonify.requireFrom } })

  await __eo('xs').m('store') // map store
  return __eo
})

jest.useFakeTimers()

test('use jsdom', () => {
  const element = document.createElement('div')
  expect(element).not.toBeNull()
})

test('timer with promises', async () => {
  const anitems = []
  anitems.push('1')
  setTimeout(() => { anitems.push('6') }, 0)
  const promise = new Promise(resolve => {
    anitems.push('2')
    resolve()
  }).then(() => {
    anitems.push('4')
  })
  anitems.push('3')
  await promise
  anitems.push('5')
  jest.advanceTimersByTime(0)
  expect(anitems).toEqual([ '1', '2', '3', '4', '5', '6' ])
})
