const d3 = require('./d3-require.js')
global.d3 = d3

const xEonify = require('./eon-x-eonify.js')
global.xEonify = xEonify

if (1 && 1) console.log('this', xEonify.eon({}))


test('test ', () => {
  expect(1).toBe(1)
})
