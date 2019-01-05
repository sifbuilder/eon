const d3 = require('./d3.v5.js')
global.d3 = d3

const xMapper = require('./x-mapper.js')
const xs = require('./x-s.js')
const requiredGraticule = require('./muon-graticule.js')

let __eo = xMapper.xMapper()
__eo({'xs': xs.xs(__eo)}).xs

let mGraticule = requiredGraticule.muonGraticule(__eo)

test('test tidx', () => {
  let tidxer = mGraticule.tidx(6, 4, 1, 1) // h (mers), v (parals)
  let idx = tidxer(2, 3) // col ([0,3]), row ([0,2])
  expect(idx).toBe(20) // 3 * (6*1) + 2 : 20 (in [0,23]
})

// . . . . . . [0,3]:18     [5,3]:23
// . . . . . .
// . . . . . .
// . . . . . . [0,0]:0      [5,0]:4

test('tidx', () => {
  let tidxer = mGraticule.tidx(6, 4, 1, 1) // h (mers), v (parals)
  let idx = tidxer(3, 5) // col ([0,3]), row ([0,2])
  expect(idx).toBe(33) // 5 * (6*1) + 3 : 33
})

test('ridx a', () => {
  let tidxer = mGraticule.ridx(6, 4, 1, 1) // h (mers), v (parals)
  let coords = tidxer(3) //
  expect(coords).toEqual([0, 3]) //
})

test('ridx b', () => {
  let tidxer = mGraticule.ridx(6, 4, 1, 1) // h (mers), v (parals)
  let coords = tidxer(8) //
  expect(coords).toEqual([1, 2]) //
})

test('gratiparams', () => {
  let params = { frame: [ [ [-180, 180, 15, 15], [-180, 180, 60, 60] ] ] }
  let r = mGraticule.gratiparams(params)
  let o = {DX: 15, DY: 60, PX: 15, PY: 60,
    X0: -180, X1: 180, Y0: -180, Y1: 180,
    dx: 15, dy: 60, px: 15, py: 60,
    x0: -180, x1: 180, y0: -180, y1: 180}
  expect(r).toEqual(o) //
})
