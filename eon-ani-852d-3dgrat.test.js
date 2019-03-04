Object.defineProperty(document, 'currentScript', {
  value: document.createElement('script'),
})

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

const d3 = require('./d3-require.js')
global.d3 = d3

jest.mock('./d3-require.js')
d3.require = require      // require

const xEonify = require('./eon-x-eonify.js')


jest.mock('d3-array',() => {},{virtual: true},)
jest.mock('d3-color',() => {},{virtual: true},)


let __eo = xEonify.xEo()
__eo({'xs': xEonify.xs(__eo)})

const muonStore = require('./eon-muon-store.js')
const d3Array = require('./d3-array.js')
const eohalMars = require('./eon-eohal-mars.js')
const muonNatform = require('./eon-muon-natform.js')
const renderSvg = require('./eon-render-svg.js')
const d3Geo = require('./d3-geo.js')
const d3Interpolate = require('./d3-interpolate.js')
const muonProfier = require('./eon-muon-profier.js')


let anitem = require('./eon-ani-852d-3dgrat.js')


test('test add', async () => {
  let ani = await Promise.resolve(anitem)
  let enty = await ani.ani852d3dgrat(__eo)
  xEonify.eon({ anitem: anitem, time: 0 })

})
