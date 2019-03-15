jest.setTimeout(30000)

let fileUrl = require('file-url')

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

const xEonify = require('./eon-x-eonify.js')



let getAni = jest.fn( async () => {
  let __eo = xEonify.xEo()
  __eo({'xs': xEonify.xs(__eo)})
  

  let eon = require('./eon-ani-852d-3dgrat.js').ani852d3dgrat

  // let enty = await ani.ani852d3dgrat(__eo)
  __eo = xEonify.eon({ anitem: eon, time: 0 })  
  
  return __eo
})




test('test add', async () => {

  let __eo = await getAni()  
// if (1 && 1) console.log('eon', eon)
    // xEonify.eon({ anitem: anitem, time: 0 })
  
  expect(1 + 1).toBe(2)
  
})
