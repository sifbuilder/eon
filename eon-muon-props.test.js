Object.defineProperty(document, 'currentScript', {
  value: document.createElement('script'),
})

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}


const d3 = require('./d3-require.js')
global.d3 = d3

// jest.mock('./d3-require.js')
d3.requireFrom = jest.fn(
  (resolver) => {

  const cache = new Map;
  const requireBase = requireRelative(null);

  function requireAbsolute(url) {
    if (1 && 1) console.log('requireAbsolute url', url)

    if (typeof url !== "string") return url;
    let module = cache.get(url);
    if (1 && 1) console.log('requireAbsolute module', module)
      
  // console.log eon-muon-props.test.js:25
    // requireAbsolute module Promise {
      // <rejected> RequireError: invalid module
        // at cache.set.Promise (E:\Dropbox\dBox\e\c\eons\eons\eon-muon-props.test.js:30:32)
        // at new Promise (<anonymous>)
        // at requireAbsolute (E:\Dropbox\dBox\e\c\eons\eons\eon-muon-props.test.js:26:42)
        // at process._tickCallback (internal/process/next_tick.js:68:7) }    
    
    
    if (!module) cache.set(url, module = new Promise((resolve, reject) => {
      // const script = document.createElement("script");
      // script.onload = () => {
        try { resolve(queue.pop()(requireRelative(url))); }
        catch (error) { reject(new d3.RequireError("invalid module")); }
        // script.remove();
      // };
      // script.onerror = () => {
        // reject(new d3.RequireError("unable to load module"));
        // script.remove();
      // };
      // script.async = true;
      // script.src = url;
      // window.define = define;
      // document.head.appendChild(script);
    }));
    return module;
  }

  function requireRelative(base) {
    return name => Promise.resolve(resolver(name, base)).then(requireAbsolute);
  }

  function requireAlias(aliases) {
    return requireFrom((name, base) => {
      if (name in aliases) {
        name = aliases[name], base = null;
        if (typeof name !== "string") return name;
      }
      return resolver(name, base);
    });
  }

  function require(name) {
    return arguments.length > 1
        ? Promise.all(map.call(arguments, requireBase)).then(merge)
        : requireBase(name);
  }

  require.alias = requireAlias;
  require.resolve = resolver;

  return require;
  }
)

const metas = new Map;
const queue = [];
const map = queue.map;
const some = queue.some;
const hasOwnProperty = queue.hasOwnProperty;
const origin = "https://cdn.jsdelivr.net/npm/";
const identifierRe = /^((?:@[^/@]+\/)?[^/@]+)(?:@([^/]+))?(?:\/(.*))?$/;
const versionRe = /^\d+\.\d+\.\d+(-[\w-.+]+)?$/;
const extensionRe = /\.[^/]*$/;
const mains = ["unpkg", "jsdelivr", "browser", "main"];


function parseIdentifier(identifier) {
  const match = identifierRe.exec(identifier);
  return match && {
    name: match[1],
    version: match[2],
    path: match[3]
  };
}


function resolveMeta(target) {
  const url = `${origin}${target.name}${target.version ? `@${target.version}` : ""}/package.json`;
  let meta = metas.get(url);
  if (!meta) metas.set(url, meta = fetch(url).then(response => {
    if (!response.ok) throw new d3.RequireError("unable to load package.json");
    if (response.redirected && !metas.has(response.url)) metas.set(response.url, meta);
    return response.json();
  }));
  return meta;
}

async function newResolve(name, base) {
  if (1 && 1) console.log(' ************* ', name, base)

  if (name.startsWith(origin)) name = name.substring(origin.length);
  if (/^(\w+:)|\/\//i.test(name)) return name;
  if (/^[.]{0,2}\//i.test(name)) return new URL(name, base == null ? location : base).href;
  if (!name.length || /^[\s._]/.test(name) || /\s$/.test(name)) throw new d3.RequireError("illegal name");
  const target = parseIdentifier(name);

  
  if (!target) return `${origin}${name}`;
  if (!target.version && base != null && base.startsWith(origin)) {
    const meta = await resolveMeta(parseIdentifier(base.substring(origin.length)));
    target.version = meta.dependencies && meta.dependencies[target.name] || meta.peerDependencies && meta.peerDependencies[target.name];
  }
  if (target.path && !extensionRe.test(target.path)) target.path += ".js";
  if (target.path && target.version && versionRe.test(target.version)) return `${origin}${target.name}@${target.version}/${target.path}`;
  // const meta = await resolveMeta(target);
  // return `${origin}${meta.name}@${meta.version}/${target.path || main(meta) || "index.js"}`;
  target.path = './'
  let res = `${target.path}${target.name}`
  if (1 && 1) console.log(' ************* res', res)  
  return res
}




function define(name, dependencies, factory) {
  const n = arguments.length;
  if (n < 2) factory = name, dependencies = [];
  else if (n < 3) factory = dependencies, dependencies = typeof name === "string" ? [] : name;
  queue.push(some.call(dependencies, isexports) ? require => {
    const exports = {};
    return Promise.all(map.call(dependencies, name => {
      return isexports(name += "") ? exports : require(name);
    })).then(dependencies => {
      factory.apply(null, dependencies);
      return exports;
    });
  } : require => {
    return Promise.all(map.call(dependencies, require)).then(dependencies => {
      return typeof factory === "function" ? factory.apply(null, dependencies) : factory;
    });
  });
}








let newRequire = d3.requireFrom(newResolve)

if (1 && 1) console.log('newRequire', newRequire)


const xEonify = require('./eon-x-eonify.js')
let __eo = xEonify.xEo()
__eo({'xs': xEonify.xs(__eo)})


const _muonProps = newRequire('eon-muon-props.js')
  .then( mod => {console.log( '**************** mod', mod)} )
// const muonProps = _muonProps.muonProps(__eo)

test('test', async () => {
  const _muonProps = newRequire('eon-muon-props.js')  
  let muonProps = await _muonProps.muonProps()
  if (1 && 1) console.log('muonProps', muonProps)

  expect(1 + 1).toBe(2)
})

// test('test isPureArray', async () => {
  // let enty = await Promise.resolve(muonProps)
  // expect(enty.isPureArray([1,2])).toBe(true)
// })
// test('test is not PureArray', async () => {
  // let enty = await Promise.resolve(muonProps)
  // expect(enty.isPureArray([1, {}])).toBe(false)
// })
// test('test is not PureArray', async () => {
  // let enty = await Promise.resolve(muonProps)
  // expect(enty.isPureArray([1, ()=>{}])).toBe(false)
// })
