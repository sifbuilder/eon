jest.setTimeout(30000)

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const xEonify = require('../eon-x-eonify.js')

let __eo
beforeAll(async () => {
  __eo = await xEonify.eostore()
  let [
    d3Selection,
    d3Collection,
    d3,
    d3Geo,
    eonMuonProj3ct,
    eonProtonUniwen,
    eonRenderPortview, // viewScreenPrt - _e_ to be defined in z.
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('d3-selection'),
    __eo('xs').b('d3-collection'),
    __eo('xs').b('d3'),
    __eo('xs').b('d3-geo'),
    __eo('xs').b('eon-muon-proj3ct'),
    __eo('xs').b('eon-proton-uniwen'),
    __eo('xs').b('eon-render-portview'),
    __eo('xs').b('eon-render-svg'),
  ])
})

// https://github.com/d3/d3-selection/tree/master/test/selection
// https://github.com/d3/d3-selection/blob/master/test/selection/node-test.js
test('selection.node() returns the first element in a selection', async () => {
  let d3 = __eo('d3')

  const dom = new JSDOM("<h1 id='one'></h1><h1 id='two'></h1>"),
    one = dom.window.document.querySelector('#one'),
    two = dom.window.document.querySelector('#two')
  expect(d3.selectAll([one, two]).node()).toEqual(one)
})

describe('test d3', () => {
  test('d3 modules', async () => {
    let d3Selection = __eo('d3Selection')
    let d3Collection = __eo('d3Collection')
    let eonRenderSvg = __eo('eonRenderSvg')

    expect(typeof d3Selection).toBe('object')
    expect(typeof d3Collection).toBe('object')
    expect(typeof eonRenderSvg).toBe('function')
  })
})

describe('test svg', () => {
  test('svg', async () => {
    let eonRenderSvg = __eo('eonRenderSvg')

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
    let eonRenderSvg = __eo('eonRenderSvg')

    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)
    console.log(dom.window.document.querySelector('p').textContent) // "Hello world"

    expect(typeof eonRenderSvg.svg()).toBe('object')
  })
})
