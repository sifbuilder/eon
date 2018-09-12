const d3 = require('./d3.v5.js')
global.d3 = d3

const xMapper = require('./x-mapper.js')
let __mapper = xMapper.xMapper()

const xs = require('./x-s.js')
__mapper({'xs': xs.xs(__mapper)}) // PROXIES

const muonGraticule = require('./muon-graticule.js')
const muonProfier = require('./muon-profier.js')
const muonProj3ct = require('./muon-proj3ct.js')
const muonNatform = require('./muon-natform.js')
let muonNatform = muonNatform.muonNatform(__mapper)

test('natNform', () => {
  let form = {'m1': 4, 'm2': 4, 'n1': 4, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1}
  let nformed = {
    'x': {
      'v0': 0, 'v1': 1, 'ra2': 120, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1, 'm1': 4, 'm2': 4, 'n1': 4, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, 'dom3': [-180, 180],
    },
    'y': {
      'v0': 0, 'v1': 1, 'ra2': 120, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1, 'm1': 4, 'm2': 4, 'n1': 4, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, 'dom3': [-180, 180],
    },
  }

  nformed.x.fn0 = (q, s, u, v, a, b, c = 1, d = 1) => a * cos(q) * c * cos(u)
  nformed.y.fn0 = (q, s, u, v, a, b, c = 1, d = 1) => b * sin(q) * c * cos(u)

  let result = muonNatform.natNform(form)

  expect(JSON.stringify(result)).toBe(JSON.stringify(nformed))
})
