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

test('test scale', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let _s1extent = [-180, 180]
  // let _s1range = [0, 6]

  // let _s2extent = [ 0, 1, 2, 3, 4, 5, 6 ]
  let _s2range = [
    0.24253562503633297,
    0.2857142857142857,
    0.48507125007266594,
    1,
    0.4850712500726661,
    0.28571428571428575,
    0.24253562503633297,
  ]
  // expect(eon.eoformer(_s1extent, _s2range)(-180)).toBe(0.24253562503633297)
  // expect(eon.eoformer(_s1extent, _s2range)(180)).toBe(0.24253562503633297)

  let scale = eon.linscal().domain(_s1extent).range(_s2range)
  expect(scale(180)).toBe(0.24253562503633297)
})

test('test  linscal', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let d = [0, 1]
  let r = [500, 650]

  // linscal takes
  //  [0, 1]   => [500, 750] nok
  expect(eon.eoliner(d, r)(0)).toBe(500)
  expect(eon.eoliner(d, r)(1)).toBe(650)
  expect(eon.eoliner(d, r)(0.5)).toBe(575)
  expect(eon.eoliner(d, r)(0.25)).toBe(537.5)

  // eoformer takes [0,1] => [500, 750, 650] ok
  expect(eon.eoformer(d, r)(0)).toBe(500)
  expect(eon.eoformer(d, r)(1)).toBe(650)
  expect(eon.eoformer(d, r)(0.50)).toBe(575)
  expect(eon.eoformer(d, r)(0.25)).toBe(537.5)
})

test('test  linscal', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let d = [0, 1]
  let r = [500, 750, 650]

  // linscal takes
  //  [0, 1]   => [500, 750] nok
  expect(eon.eoliner(d, r)(0)).toBe(500)
  expect(eon.eoliner(d, r)(1)).toBe(650)
  expect(eon.eoliner(d, r)(0.5)).toBe(750)
  expect(eon.eoliner(d, r)(0.25)).toBe(625)

  // eoformer takes [0,1] => [500, 750, 650] ok
  expect(eon.eoformer(d, r)(0)).toBe(500)
  expect(eon.eoformer(d, r)(1)).toBe(650)
  expect(eon.eoformer(d, r)(0.50)).toBe(750)
  expect(eon.eoformer(d, r)(0.25)).toBe(625)
})

test('test  linscal', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let d = [0, 0.5, 1]
  let r = [500, 750, 650]

  // linscal takes
  //  [0, 0.5]   => [500, 750] ok
  //  [0.5, 1]   => [ 750, 650] ok
  expect(eon.eoliner(d, r)(0)).toBe(500)
  expect(eon.eoliner(d, r)(0.25)).toBe(625)
  expect(eon.eoliner(d, r)(0.5)).toBe(750)
  expect(eon.eoliner(d, r)(1)).toBe(650)

  // eoformer takes [0,0.25] => [500, 750] nok
  // eoformer takes [0.25,0.50] => [750, 650] nok
  expect(eon.eoformer(d, r)(0)).toBe(500)
  expect(eon.eoformer(d, r)(0.25)).toBe(750)
  expect(eon.eoformer(d, r)(0.50)).toBe(650)
  expect(eon.eoformer(d, r)(0.75)).toBe(550)
  expect(eon.eoformer(d, r)(1)).toBe(450)
})

test.only('test  linscal', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let d = [0, 0.5, 1]
  let r = [500, 650]

  // linscal takes
  //  [0, 0.5]   => [500, 575]
  //  [0.5, 1]   => [575, 650]
  expect(eon.eoliner(d, r)(0)).toBe(500)
  expect(eon.eoliner(d, r)(0.25)).toBe(537.5)
  expect(eon.eoliner(d, r)(0.5)).toBe(575)
  expect(eon.eoliner(d, r)(1)).toBe(650)

})

test('test slide', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let as1 = [ [1, 2 ], [5, 6] ]
  let as2 = [ [1, 2, 3], [5, 6] ]
  let as3 = [ [1, 2 ], [5, 6, 7] ]
  let as4 = [ [1, 2, 3], [5, 6, 7] ]

  expect(eon.slide(as1, 'max')).toEqual([[1, 5], [2, 6]])
  expect(eon.slide(as1, 'min')).toEqual([[1, 5], [2, 6]])

  expect(eon.slide(as2, 'max')).toEqual([[1, 5], [2, 5.5], [3, 6]])
  expect(eon.slide(as2, 'min')).toEqual([[1, 5], [2, 6]])

  expect(eon.slide(as3, 'max')).toEqual([[1, 5], [1.5, 6], [2, 7]])
  expect(eon.slide(as3, 'min')).toEqual([[1, 5], [2, 6]])

  expect(eon.slide(as4, 'max')).toEqual([[1, 5], [2, 6], [3, 7]])
  expect(eon.slide(as4, 'min')).toEqual([[1, 5], [2, 6], [3, 7]])
})

test('test unslide', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let as1 = [ [1, 5], [2, 5.5], [3, 6] ]
  let as2 = [ [1, 5], [3, 6] ]

  expect(eon.unslide(as1)).toEqual([[1, 2, 3], [5, 5.5, 6]])
  expect(eon.unslide(as1)).toEqual([[1, 3], [5, 6]])
})

test('test slide/unslide', async () => {
  let __eo = await eonify()
  let eon = await __eo('xs').m('lacer')

  let as1 = [ [0, 1], [500, 750, 650] ]
  let as2 = [ [0, 0.5, 1], [500, 650] ]

  expect(eon.unslide(eon.slide(as1))).toEqual([[0, 0.5, 1], [500, 750, 650]])
  expect(eon.unslide(eon.slide(as2))).toEqual([[0, 0.5, 1], [500, 575, 650]])
})
