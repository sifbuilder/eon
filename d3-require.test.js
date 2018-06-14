
// https://www.youtube.com/watch?v=bw10S2BK-5w  
const d3 = require('./d3.v5.js')
global.d3 = d3

const xs = require('./x-s.js')


const muonMapper = require('./muon-mapper.js')
const requiredprops = require('./muon-props.js')

d3.require = require('./d3-require.js').require
//d3.require function require(name) {
//   return arguments.length > 1 ? Promise.all(map.call(arguments, requireBase)).then(merge) : requireBase(name);
//}


let __mapper = muonMapper.muonMapper()
__mapper({'xs': xs.xs(__mapper)}).xs
let mpropsPromise = requiredprops.muonProps(__mapper)



const fetch = require('./script-node-fetch.js')
global.fetch = fetch


async function asyncFetch(url) {
  return await fetch(url);
}



describe('asyncFetch', () => {

  it('can fetch', async () => {

    const response = await asyncFetch('https://unpkg.com/d3-array@1.2.1/build/d3-array.js');
    const result = await response.json();
    expect(result).toEqual("something");

  });
});
