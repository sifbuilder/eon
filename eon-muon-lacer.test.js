if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill =  require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')


let eonify = jest.fn(async () => {
  
    let __eo = xEonify.xEo() // init mapper

    __eo({'xs': xEonify.xs(__eo)}) // map xs
    __eo({'xD3Require': { require: xEonify.require, requireFrom: xEonify.requireFrom } })

    let muonStore = await __eo('xs').m('store') // map store
    muonStore = __eo('muonStore')

    return __eo

})


test('test scale linear', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let scale = eon.linear()
    .domain([0, 3])
    .range([2, 8])

  expect(scale(0)).toBe(2)
  expect(scale(1)).toBe(4)
})

test('test range', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  expect(eon.range(1, 4, 2)).toEqual([1, 3])
  expect(eon.range(1, 5, 2)).toEqual([1, 3])
})
