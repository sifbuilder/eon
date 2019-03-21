if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill =  require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

let eonify = jest.fn(async ({anitem, time}) => {
  let datit = await xEonify.eon({anitem, time})
  return datit
  
    // let __eo = xEonify.xEo() // init mapper

    // __eo({'xs': xEonify.xs(__eo)}) // map xs
    // __eo({'xD3Require': { require: xEonify.require, requireFrom: xEonify.requireFrom } })

    // let muonStore = await __eo('xs').m('store') // map store
// if (1 && 1) console.log('************** muonStore', muonStore)
    
    // let animas = await __eo('xs').a(anitem) // function
    // if (typeof anitem === 'string') { // anitem: 852d-3dgrat
      // animas = animas.ani() // animas: {natform: {…}}
    // }
    // muonStore.apply({type: 'UPDANIMA', animas: animas})

    // await __eo('xs').m('animation') // map animation
    // let datit = __eo('muonAnimation').animate(time) // animate
    // return datit  
  
})

test('test filenize', async () => {
  let _ = {anitem:'852d-3dgrat', time:0}
  let datit = await eonify(_)
  expect (typeof datit).toBe('object')
  let featureCollection = datit.dat
  let t = datit.t

  expect (featureCollection.type).toBe('FeatureCollection')
  expect (featureCollection.features.length).toBe(1)
  expect (featureCollection.features[0].geometry.type).toBe('MultiLineString')
  expect (featureCollection.features[0].geometry.coordinates.length).toBe(2)  

  expect (typeof featureCollection.features[0].properties.proform.properties).toBe('object')  // _e_ 
  
  
})

