
// https://www.youtube.com/watch?v=bw10S2BK-5w
// const d3 = require('./d3.js')

const xEonify = require('./eon-x-eonify.js')
global.xEonify = xEonify

const muonProps = require('./eon-muon-props.js').muonProps

global.fetch = jest.fn().mockImplementation(() => Promise.resolve( (url) => {require(url)}))


// d3Require = require('./d3-require.js')

// d3.require = d3Require.require
// d3.requireFrom = d3Require.requireFrom



test('Adding 1 + 1 equals 2', async () => {
  let enty = await xEonify.eon({muonProps})
  if (1 && 1) console.log('enty', enty)

})


// {
// require: {
// [Function: require] resolve: [AsyncFunction: resolve]
// },
// requireFrom: [Function: requireFrom]
// }

// let __eo = xEo.xEo()
// __eo({'xs': xs.xs(__eo)}).xs
// let mpropsPromise = requiredprops.muonProps(__eo)

// const fetch = require('./script-node-fetch.js')
// global.fetch = fetch

// test('range', (done) => {
  // return expect(d3Require.require('d3-array')
    // .then(d3 => {
      // console.log(' --- res', d3.range(100))
      // return 5
    // })).resolves.toBe(5)
    // .then(done)
    // .catch(e => {
      // console.log(' ----------- e', e)
    // })
// }, 500)

// test('withasync', async () => {

// let enty = await mpropsPromise
// let r = await enty.addtst(2,3)
// expect(r).toBe(5)

// })

// test('withthen', () => {

// return expect (mpropsPromise
// .then(enty => enty.addtst(2,3))).resolves.toBe(5)

// })

// test('withdone', done => {    // done()
// expect.assertions(1)      // expect.assiertions(1)
// return mpropsPromise
// .then(enty => { expect(enty.addtst(2,3)).toBe(5) })
// .then(done)
// .catch(done.fail)

// }, 100, )     // custom timeouts
