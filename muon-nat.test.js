const d3 = require('./d3.v5.js')
const muonMapper = require('./muon-mapper.js')

const xs = require('./x-s.js')

global.d3 = d3

let __mapper = muonMapper.muonMapper()
__mapper({'xs': xs.xs(__mapper)}) // PROXIES

global.__mapper = __mapper


// if (1 && 1) console.log('_____ mapper:', mmapper)

const muonNat = require('./muon-nat.js')
let mnat = muonNat.muonNat(__mapper)

if (1 && 1) console.log('______mnat', mnat)
if (1 && 1) console.log('natNform', mnat.natNform)

  
  test('test tst', () => {
    expect(5).toBe(5)
  })


