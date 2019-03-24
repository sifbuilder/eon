if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

test('test filenize', async () => {

  let ww = {anitem: '000a', time: 5000}
  let datit = await xEonify.eon(ww)

  expect(datit.dat.type).toEqual('FeatureCollection')
  expect(datit.dat.features[0].type).toEqual('Feature')
  expect(datit.dat.features[0].geometry.coordinates).toEqual([-175, 0, 0])
  expect(datit.dat.features[0].properties.eotim.msElapsed).toEqual(5000)
  expect(datit.dat.features[0].properties.eotim.unElapsed).toEqual(0.5)

})
