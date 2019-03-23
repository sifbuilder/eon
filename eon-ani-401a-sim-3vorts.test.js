if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

test('test filenize', async () => {
    let ww = {anitem: '401a-sim-3vorts', time: 0}
    let datit = await xEonify.eon(ww)

  expect(datit.dat.type).toEqual('FeatureCollection')
  expect(datit.dat.features.length).toEqual(31)
  expect(datit.dat.features[0].geometry.coordinates).toEqual([69, 210, 0])
  expect(datit.dat.features[0].properties.eoric.uid).toEqual('node_node_node0')
  expect(datit.dat.features[13].properties.eoric.uid).toEqual('link_link_link0')


})
