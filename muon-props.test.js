

const d3 = require('./d3.v5.js')
global.d3 = d3


const requiredprops = require('./muon-props.js')
let mprops = requiredprops.muonProps()()

  
  test('test tst', () => {
    expect(mprops.tst(2,3)).toBe(5);
  })


