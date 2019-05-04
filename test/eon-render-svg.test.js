jest.setTimeout(30000)

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const xEonify = require('../eon-x-eonify.js')


describe('test d3', () => {

  test('d3 modules', async () => {
    let __eo = await xEonify.eostore()
    let [
      d3Selection,
      d3Collection,
      // d3,
      d3Geo,
      eonMuonProj3ct,
      eonProtonUniwen,
      eonRenderPortview, // viewScreenPrt - _e_ to be defined in z.
    ] = await Promise.all([
      __eo('xs').b('d3-selection'),
      __eo('xs').b('d3-collection'),
      // __eo('xs').b('d3'),
      __eo('xs').b('d3-geo'),
      __eo('xs').b('eon-muon-proj3ct'),
      __eo('xs').b('eon-proton-uniwen'),
      __eo('xs').b('eon-render-portview'),
    ])

    let eonRenderSvg = await __eo('xs').b('eon-render-svg')
 
    expect(typeof d3Selection).toBe('object')
    expect(typeof d3Collection).toBe('object')
    expect(typeof eonRenderSvg).toBe('function')

  })
})

describe('test svg', () => {

  test('svg', async () => {
    let __eo = await xEonify.eostore()
    let [
      d3Selection,
      d3Collection,
      d3Geo,
      eonMuonProj3ct,
      eonProtonUniwen,
      eonRenderPortview, // viewScreenPrt - _e_ to be defined in z.
    ] = await Promise.all([
      __eo('xs').b('d3-selection'),
      __eo('xs').b('d3-collection'),
      __eo('xs').b('d3-geo'),
      __eo('xs').b('eon-muon-proj3ct'),
      __eo('xs').b('eon-proton-uniwen'),
      __eo('xs').b('eon-render-portview'),
    ])

    let eonRenderSvg = await __eo('xs').b('eon-render-svg')


    expect(typeof eonRenderSvg.svg()).toBe('object')

  })
})

// call `svgelems(eoload, data, idfn)`
// idfyer = "svg:g.q/path.q"
// data [features]
// feature: {type: 'Feature',
//          geometry: {
//                type: 'Point',
//                coordinates: [0,0],
// } }
// idfn  d => d.properties.eoric.uid

describe('test svg', () => {

  test('svg', async () => {
    let __eo = await xEonify.eostore()
    let [
      d3Selection,
      d3Collection,
      d3Geo,
      eonMuonProj3ct,
      eonProtonUniwen,
      eonRenderPortview, // viewScreenPrt - _e_ to be defined in z.
    ] = await Promise.all([
      __eo('xs').b('d3-selection'),
      __eo('xs').b('d3-collection'),
      __eo('xs').b('d3-geo'),
      __eo('xs').b('eon-muon-proj3ct'),
      __eo('xs').b('eon-proton-uniwen'),
      __eo('xs').b('eon-render-portview'),
    ])


    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    console.log(dom.window.document.querySelector("p").textContent); // "Hello world"
    
    let eonRenderSvg = await __eo('xs').b('eon-render-svg')

    expect(typeof eonRenderSvg.svg()).toBe('object')

  })     
})


/**
 * Is this script currently running within a browser context?
 * Note: also returns true within a Web Worker context
 * @returns {boolean}
 * https://github.com/TimothyGu/jsdom/blob/master/test/util.js
 */


 
test('inBrowserContext', async () => { 
  /* globals window */
  let inBrowserContext = (typeof window === "object" && window === window.self) || exports.inWebWorkerContext()
  expect(inBrowserContext).toBe(false) 
}