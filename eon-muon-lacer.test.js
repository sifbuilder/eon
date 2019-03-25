if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

let eonify = jest.fn(async () => {
  let __eo = xEonify.xEo() // init mapper

  __eo({'xs': xEonify.xs(__eo)}) // map xs
  __eo({'xD3Require': { require: xEonify.require, requireFrom: xEonify.requireFrom } })

  await __eo('xs').m('store') // map store

  return __eo
})



test('test  linear', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let d = [0, 1] 
  let r = [0.7, 0.9]
  let t = 0.8342705357132391
  let res = 0.8668541071426479
  
  let scale = eon.linear()
    .domain(d)
    .range(r)

  expect(scale(t)).toBe(res)
 
})


test('test  linear', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let d = [0, 0.5, 1]
  let r = [500, 888, 650] 
  let t = 0.8342705357132391
  let res = 728.8872250004982
  
  let scale = eon.linear()
    .domain(d)
    .range(r)

  expect(scale(t)).toBe(res)
 
})



test('test  linear', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let d = [0, 0.16666666666666666, 0.3333333333333333, 0.5, 0.6666666666666666, 0.8333333333333334, 1]
  let r = [-90, -22.65649987627617, 45.00000000000001, 45.31299975255235, 45.00000000000001, -22.656499876276165, -90]
  let t = 0.8353657738085271
  let res = -23.47772980863217
  
  let scale = eon.linear()
    .domain(d)
    .range(r)

  expect(scale(t)).toBeCloseTo(res)
 
})



test('test scale linear', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let scale = eon.linear()
    .domain([0, 3])
    .range([2, 8])

  expect(scale(0)).toBe(2)
  expect(scale(1)).toBe(4)
})

test('test range', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  expect(eon.range(1, 4, 2)).toEqual([1, 3])
  expect(eon.range(1, 5, 2)).toEqual([1, 3])
})

test('test slide', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let as = [ 
    [1, 2, 3], 
    [3, 5] 
  ]


  let bs = [ 
    [3, 5], 
    [10, 20, 21, 34, 24] 
  ]  
  expect(eon.slide(as, 'max')).toEqual([[1, 3], [2, 4], [3, 5]])
  expect(eon.slide(as, 'min')).toEqual([[1, 3], [2, 5]])
  
  expect(eon.slide(bs, 'max')).toEqual([[3, 10], [3.5, 20], [4, 21], [4.5, 34], [5, 24]])
                                    // [[3, 10], [3.5, 20], [4, 30], [4.5, 40], [5, 50]]  
  expect(eon.slide(bs, 'min')).toEqual([[3, 10], [5, 20]])
  
   
})


test('test slide 2', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let as = [  // mx: 2
    [-90, -1.1021821192326179e-14],
    [-22.65649987627617, -39.242208907388324],
    [45.00000000000001, -77.94228634059948],
    [45.31299975255235, 0],
    [45.00000000000001, 77.94228634059948],
    [-22.656499876276165, 39.242208907388324],
    [-90, 1.1021821192326179e-14],
  ]

  let r = [
[  
-90,
-22.65649987627617,
45.00000000000001,
45.31299975255235,
45.00000000000001,
-22.656499876276165,
-90,
],
[
-1.1021821192326179e-14,
-39.242208907388324,
-77.94228634059948,
0,
77.94228634059948,
39.242208907388324,
1.1021821192326179e-14,
]
]
  
  expect(eon.unslide(as)).toEqual(r)

})



test('test unslide', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let as = [  // mx: 2
    [-90, -1.1021821192326179e-14],
    [-22.65649987627617, -39.242208907388324],
    [45.00000000000001, -77.94228634059948],
    [45.31299975255235, 0],
    [45.00000000000001, 77.94228634059948],
    [-22.656499876276165, 39.242208907388324],
    [-90, 1.1021821192326179e-14],
  ]

  let r = [
[  
-90,
-22.65649987627617,
45.00000000000001,
45.31299975255235,
45.00000000000001,
-22.656499876276165,
-90,
],
[
-1.1021821192326179e-14,
-39.242208907388324,
-77.94228634059948,
0,
77.94228634059948,
39.242208907388324,
1.1021821192326179e-14,
]
]
  
  expect(eon.unslide(as)).toEqual(r)

})
