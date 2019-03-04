Object.defineProperty(document, 'currentScript', {
  value: document.createElement('script'),
})

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}


const d3 = require('./d3-require.js')
global.d3 = d3


const xEonify = require('./eon-x-eonify.js')
let __eo = xEonify.xEo()
__eo({'xs': xEonify.xs(__eo)})


jest.mock('./d3-require.js')
d3.require = jest.fn(
  (_) => {
    let filepath = xEonify.filenize(_)
    if (1 && 1) console.log('d3 require', _, filepath)
    Promise.resolve(require(filepath))
    
  }
)



const _muonProps = require('./eon-muon-props.js')
const muonProps = _muonProps.muonProps(__eo)

test('test isPureArray', async () => {
  let enty = await Promise.resolve(muonProps)
  expect(enty.isPureArray([1,2])).toBe(true)
})
test('test is not PureArray', async () => {
  let enty = await Promise.resolve(muonProps)
  expect(enty.isPureArray([1, {}])).toBe(false)
})
test('test is not PureArray', async () => {
  let enty = await Promise.resolve(muonProps)
  expect(enty.isPureArray([1, ()=>{}])).toBe(false)
})
