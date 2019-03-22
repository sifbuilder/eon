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

test('test', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').b('d3')


  expect(eon.version).toBe('5.8.0')
})
