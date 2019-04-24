jest.setTimeout(30000)

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('../eon-x-eonify.js')

//
// check access to rayder grab
//
describe('test grabbed', () => {
  test('grabbed is undefined', async () => {
    let __eo = await xEonify.eostore()
    await __eo('xs').c('rayder')
    await __eo('xs').e('mars')
    await __eo('xs').e('pacer')
    await __eo('xs').m('natform')
    await __eo('xs').m('stace')
    await __eo('xs').p('uniwen')
    let muonEotype = await __eo('xs').e('pacer')

    expect(typeof muonEotype.grabbed).toBe('function')
    expect(muonEotype.grabbed()).toBe(undefined)
  })
})
