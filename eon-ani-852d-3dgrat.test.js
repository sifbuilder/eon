if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill =  require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

let eon = jest.fn(async (_) => xEonify.eon(_))

test('test filenize', async () => {
  let _ = {anitem:'852d-3dgrat', time:0}
  let datit = await eon(_)
  expect (typeof datit).toBe('object')
  let featureCollection = datit.dat
  let t = datit.t
  console.log('datit:', t, featureCollection)
  expect (featureCollection.type).toBe('FeatureCollection')
  expect (featureCollection.features.length).toBe(1)
  expect (featureCollection.features[0].geometry.type).toBe('MultiLineString')
  expect (featureCollection.features[0].geometry.coordinates.length).toBe(2)  

  expect (typeof featureCollection.features[0].properties.proform.properties).toBe('object')  // _e_ 
  
  
})

