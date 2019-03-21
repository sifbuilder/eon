let fileUrl = require('file-url')

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

const xEonify = require('./eon-x-eonify.js')


let eonify = jest.fn(async () => {
  
    let __eo = xEonify.xEo() // init mapper

    __eo({'xs': xEonify.xs(__eo)}) // map xs
    __eo({'xD3Require': { require: xEonify.require, requireFrom: xEonify.requireFrom } })

    let muonStore = await __eo('xs').m('store') // map store
    if (1 && 1) console.log('muonStore', muonStore)
    
    // let animas = await __eo('xs').a(anitem) // function
    // if (typeof anitem === 'string') { // anitem: 852d-3dgrat
      // animas = animas.ani() // animas: {natform: {…}}
    // }
    // muonStore.apply({type: 'UPDANIMA', animas: animas})

    // await __eo('xs').m('animation') // map animation
    // let datit = __eo('muonAnimation').animate(time) // animate
    // return datit  
    

    let eon = await __eo('xs').m('props')
    if (1 && 1) console.log('eon', eon)
    return eon



})

test('test cant', async () => {
  let eon = await eonify()
  expect(eon.cant([ [0, 0], [1, 1] ], 0.2)).toEqual([ [ 0.2, 0.2 ], [ 0.8, 0.8 ] ])
})

// test('test', async () => {
  // let eon = await eonify()

  // expect(eon.isPureArray([1, 2])).toBe(true)
// })

// test('test is not PureArray', async () => {
  // let eon = await eonify()

  // expect(eon.isPureArray([1, {}])).toBe(false)
// })
// test('test is not PureArray', async () => {
  // let eon = await eonify()

  // expect(eon.isPureArray([1, () => {}])).toBe(false)
// })
// test('test scale linear', async () => {
  // let eon = await eonify()

  // let scale = eon.linear()
    // .domain([0, 3])
    // .range([2, 8])

  // expect(scale(0)).toBe(2)
  // expect(scale(1)).toBe(4)
// })
