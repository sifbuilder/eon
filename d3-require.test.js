let d3,
    xs,
    xmapper,
    mprops,
    fetch


const d3Require = require('./d3-require.js')
var requireFromString = require('require-from-string');

async function g () {


  const xsPromise =  require('./x-s.js')
  const xMapperPromise =  require('./x-mapper.js')
  const mpropsPromise =  require('./muon-props.js')
  const fetchPromise =  require('./script-node-fetch.js')


  let [
      xs,
      xmapper,
      mprops,
      fetch,
     ]
  = await Promise.all(
    [
      xsPromise,
      xMapperPromise,
      mpropsPromise,
      fetchPromise,
    ])
    .catch(e=>{console.log(e)})


  global.fetch = fetch


  let d3Promise = d3Require.require('d3')
    let [
      d3,
    ]
  = await Promise.all(
    [d3Promise])
    .catch(e=>{console.log(e)})



  global.d3 = d3
  global.d3Require = d3Require



}

g()




describe('asyncFetch', () => {

  it('can fetch', async () => {

    const response = await d3Require.require('d3-array')

    // const result = await response.text();
    // const result = await response
    const result = requireFromString(response)
    expect(result).toEqual("something");
    // expect(5).toEqual(5);

  });
});
