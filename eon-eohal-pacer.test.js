jest.setTimeout(30000)

if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')

//
// check access to rayder grab
//
describe('test grabbed', () => {
  test('grabbed is undefined', async () => {
    let __eo = await xEonify.eostore()
    await __eo('xs').c('rayder')
    await __eo('xs').e('mars')
    await __eo('xs').e('pacer')
    await __eo('xs').m('natform')
    await __eo('xs').m('stace')
    await __eo('xs').p('uniwen')
    let muonEotype = await __eo('xs').e('pacer')

    expect(typeof muonEotype.grabbed).toBe('function')
    expect(muonEotype.grabbed()).toBe(undefined)
  })
})


//
// anima paces animas auto
//  eon-z-419k-pacer-anima-nat
//
describe('2 anima paces animas auto', () => {
  test('test anima.pacer with eoload.pacer ', async () => {
  // .................. anitem
    async function anitem (__eo) {
    // .................. eons
      let [
        ctlRayder,
        ctlWen,
        eohalNatform,
        eohalMars,
        eohalPacer,
        eohalTextform,
        muonEoric,
        muonGraticule,
        muonNatform,
        muonProps,
        muonStace,
        protonUniwen,
        renderSvg,
      ] = await Promise.all([
        __eo('xs').c('rayder'),
        __eo('xs').c('wen'),
        __eo('xs').e('natform'),
        __eo('xs').e('mars'),
        __eo('xs').e('pacer'),
        __eo('xs').e('textform'),
        __eo('xs').m('eoric'),
        __eo('xs').m('graticule'),
        __eo('xs').m('natform'),
        __eo('xs').m('props'),
        __eo('xs').m('stace'),
        __eo('xs').p('uniwen'),
        __eo('xs').r('svg'),
      ])

      let muonStore = __eo('muonStore')
      try { renderSvg.scenecolor('black') } catch (e) {}
      // .................. animas
      let z = function () {
      // .................. pics
        let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}
        // ....................... pacerNat
        let pacerNat = {
          eoric: { gid: 'natpace', cid: 'natpace', fid: 'natpace' },
          eohal: eohalPacer,
          eotim: eotim,
          eofold: {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
          },
          eonode: {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
          },
          eomot: {
            proform: {
              projection: 'uniwen',
              translate: [ 0, 0, 0], // mot
              scale: 1,
              rotate: [ [[[0, 60]]], [[[0, 60]]], [[[0, 60]]] ],
              lens: [0, 1, Infinity],
              addNodeToTranslate: 1, // eonode
            },
          },

          eocrom: { 'csx': 0, 'cf': 777, 'co': 0.1, 'cs': 666 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},
          eoload: {
            eoform: {
              'x': {
                'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
                'ra2': 24, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 20, 'pa6': 0, 'pb7': -1,
              },
              'y': {
                'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
                'ra2': 24, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 20, 'pa6': 0, 'pb7': -1,
              },
              'z': {
                'm1': 4, 'm2': 4, 'n1': 100, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1, // square
                'ra2': 24, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 10, 'pa6': 0, 'pb7': -1,
              },
            },

            pacer: {

              initN: 24, eventN: 0, autoN: 0, autoP: 0.01,
              outtimed: 0, maxN: 60,
              geospan: 0,

              eohal: eohalMars,
              pacedAnisort: 'anima',
              basePaceOnAniView: '',
              addItemToPacer: 0,

              eoric: function (ani, props) {
                let autocount = props.counter
                let eoric = muonProps.clone(ani.eoric)
                eoric.fid = muonEoric.idify(eoric.fic, autocount)
                eoric.uid = muonEoric.getuid(eoric)
                return eoric
              },

              eofold: (ani, props) => muonNatform.natMultiLineString({eoform: ani.eoload.eoform}),

              eonode: function (ani, props) {
                let stace = [0, 0, 0]
                if (props.key === 'init') { // INIT
                  let autocount = props.counter

                  let ridx = muonGraticule.ridx(4, 6, 1, 1)

                  let k = [40, 40]
                  let d = [-140, -40]

                  stace = [d[0] + k[0] * ridx(autocount)[0],
                    d[1] + k[1] * ridx(autocount)[1],
                    0]
                } else if (props.key === 'auto') { // AUTO
                  stace = [0, 0, 0]
                } else if (props.key === 'event') { // EVENT
                  if (ctlRayder.grabbed() !== undefined) {
                    let grabbed = ctlRayder.grabbed()
                    let x = grabbed[0]
                    let y = grabbed[1]
                    let z = 0
                    stace = {x, y, z }
                  }
                }

                let coordinates = stace
                let res = {
                  type: 'Feature',
                  geometry: { type: 'Point', coordinates: coordinates },
                  properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
                }
                return res
              },
            },
          },
        }
        let scene = {
          pacerNat, // h.pacer
        }
        return scene
      }
      let enty = () => {}
      enty.z = z
      return enty
    }

    let __eo = await xEonify.eonit({anitem: anitem})
    __eo = await xEonify.eocharge(__eo)
    let muonAnimation = await __eo('xs').m('animation')

    jest.useFakeTimers()
    const callback = jest.fn()
    let gjfc = {}, times = 0, dt = 100, t = 0, ntimes = 3 // td: 1000
    async function aniTimer (callback) {
      await callback()
      setTimeout(() => {
        t = times * dt
        ++times
        gjfc = muonAnimation.animier(t) // animier
        aniTimer(callback)
      }, dt)
    }
    await aniTimer(callback)
    for (let i = 0; i < ntimes; i++) {
      jest.advanceTimersByTime(dt)
      await Promise.resolve() // allow any pending jobs in the PromiseJobs queue to run
    }

    expect(gjfc.features).toHaveLength(25) // 1 point plus 24 cubes
    expect(gjfc.features[1].type).toBe('Feature')
    expect(gjfc.features[1].geometry.type).toBe('MultiLineString')
    expect(gjfc.features[1].geometry.coordinates[0]).toHaveLength(21)
  })
})

//
// anima paces animas auto
//  eon-z-419h-pacer-string
//
describe('2 anima paces animas auto', () => {
  test('test anima.pacer with eoload.pacer ', async () => {
  // .................. anitem
    async function anitem (__eo) {
    // .................. eons
      let [
        ctlWen,
        muonNatform,
        muonStace,
        muonGeoj,
        ctlRayder,
        eohalMars,
        eohalNatform,
        eohalPacer,
        eohalTextform,
        protonUniwen,
        renderSvg,
      ] = await Promise.all([
        __eo('xs').c('wen'),
        __eo('xs').m('natform'),
        __eo('xs').m('stace'),
        __eo('xs').m('geoj'),
        __eo('xs').c('rayder'),
        __eo('xs').e('mars'),
        __eo('xs').e('natform'),
        __eo('xs').e('pacer'),
        __eo('xs').e('textform'),
        __eo('xs').p('uniwen'),
        __eo('xs').r('svg'),
      ])

      try { renderSvg.scenecolor('black') } catch (e) {}
      let muonStore = __eo('muonStore')
      ctlRayder.control()
      ctlRayder.showpos(true)

      // .................. animas
      let z = function () {
      // .................. pics
        let eotim = {'td': 1000, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

        // .................. geoLined
        let geoLined = {

          eohal: eohalPacer,
          eotim: eotim,
          eoric: {gid: 'gline', cid: 'cline', fid: 'fline'},

          eofold: {
            type: 'Feature',
            geometry: { type: 'LineString', coordinates: [ [0, 0], [10, 10] ] },
            properties: {},
          },
          eonode: {
            type: 'Feature',
            geometry: {type: 'Point', coordinates: [0, 0, 0] },
            properties: {
              orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
            },
          },

          // ... the eofold changes form with eofom

          eoform: [ 0, 0, 0], // [ [[[0, 120]]], 0, 0]
          eocrom: {'csx': 0, 'cf': 777, 'cs': 777, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},

          eoload: {
            pacer: {

            // initN: 0, eventN: 1, autoN: 0, autoP: 0, autoT: 0,
              initN: 0, eventN: 0, autoN: 1, autoP: 0.1, autoT: 0.1,
              outtimed: 0, maxN: 60,
              geospan: 0,

              pacedAnisort: 'anigram',
              basePaceOnAniView: '', // 'viewform'
              addItemToPacer: 1, // addItemToPacer for trace

              eohal: eohalMars,

              eofold: function (ani, props) {
                let coords

                if (props.key === 'init') { // INIT
                  let point = ani.eonode.geometry.coordinates
                  coords = Array.of(point) // eonode
                } else if (props.key === 'auto') { // AUTO
                  let point = ani.eoform

                  point = muonGeoj.geotrim(point) // ... geotrim to fix [num, num, NaN]
                  point = [600 * (0.5 - Math.random()), 400 * (0.5 - Math.random()) ]
                  console.log('point:', point)
                  let preani = muonStore.findAnigramFromUid(ani.eoric.uid)
                  if (preani) {
                    if (preani.eofold.type === 'FeatureCollection') {
                      let feature = preani.eofold.features[0]
                      coords = (feature.geometry.coordinates)
                        ? [...feature.geometry.coordinates, point ]
                        : Array.of(point)
                    } else if (preani.eofold.type === 'Feature') {
                      let feature = preani.eofold
                      coords = (feature.geometry.coordinates)
                        ? [...feature.geometry.coordinates, point ]
                        : Array.of(point)
                    }
                  } else {
                    coords = Array.of(point)
                  }
                } else if (props.key === 'event') { // EVENT
                  let preani = muonStore.findAnigramFromUid(ani.eoric.uid)

                  let grabbed = ctlRayder.getGrabbed()
                  if (grabbed !== undefined) {
                    let x = grabbed[0]
                    let y = grabbed[1]
                    let z = 0
                    let point = [ x, y, z ]

                    if (preani) {
                      if (preani.eofold.type === 'FeatureCollection') {
                        let feature = preani.eofold.features[0]
                        coords = (feature.geometry.coordinates)
                          ? [...feature.geometry.coordinates, point ]
                          : Array.of(point)
                      } else if (preani.eofold.type === 'Feature') {
                        let feature = preani.eofold
                        coords = (feature.geometry.coordinates)
                          ? [...feature.geometry.coordinates, point ]
                          : Array.of(point)
                      }
                    } else {
                      coords = Array.of(point)
                    }
                  }
                }

                let geometry = {
                  type: 'LineString',
                  coordinates: coords,
                }
                console.assert(muonGeoj.isValid(geometry), `geo ${geometry} not valid gj`)

                return {
                  type: 'Feature',
                  geometry: geometry,
                  properties: {},
                }
              },
              eonode: function (ani, props) {
                let coords = [0, 0, 0]
                if (props.key === 'init') { // INIT
                // coords is ani's transformed eonode

                  coords = [0, 0, 0]
                } else if (props.key === 'auto') { // AUTO
                  coords = [0, 0, 0]
                } else if (props.key === 'event') { // EVENT
                  let grabbed = ctlRayder.getGrabbed()
                  if (grabbed !== undefined) {
                    let x = grabbed[0]
                    let y = grabbed[1]
                    let z = 0
                    coords = {x, y, z }
                  }
                }

                let coordinates = coords
                let res = {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: coordinates,
                  },
                  properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
                }
                return res
              },

            },
          },
        }
        let scene = {
          geoLined,
        }
        return scene
      }
      let enty = () => {}
      enty.z = z
      return enty
    }

    let __eo = await xEonify.eonit({anitem: anitem})
    __eo = await xEonify.eocharge(__eo)
    let muonAnimation = await __eo('xs').m('animation')

    jest.useFakeTimers()
    const callback = jest.fn()
    let gjfc = {}, times = 0, dt = 100, t = 0, ntimes = 3 
    async function aniTimer (callback) {
      await callback()
      setTimeout(() => {
        t = times * dt
        ++times
        gjfc = muonAnimation.animier(t) // animier
        aniTimer(callback)
      }, dt)
    }
    await aniTimer(callback)
    for (let i = 0; i < ntimes; i++) {
      jest.advanceTimersByTime(dt)
      await Promise.resolve() // allow any pending jobs in the PromiseJobs queue to run
    }

    console.log(gjfc.features[0].geometry)

    expect(callback).toHaveBeenCalledTimes(ntimes + 1) // 4
    expect(t).toBe((ntimes - 1) * dt) // ([0, ntimes - 1] + 1) * dt
    expect(gjfc.type).toBe('FeatureCollection')
    expect(gjfc.features.length).toBe(1)
    expect(gjfc.features[0].geometry.type).toEqual('LineString')
    expect(gjfc.features[0].geometry.coordinates.length).toEqual(1)
  })
})

//
// anima paces animas auto
// eon-z-419e-pacer-nat-eoload-anify
//
describe('2 anima paces animas auto', () => {
  test('test anima.pacer with eoload.pacer ', async () => {

  // .................. anitem
  async function anitem (__eo) {
    // .................. eons
      let [
        ctlRayder,
        ctlWen,
        eohalNatform,
        eohalMars,
        eohalPacer,
        eohalTextform,
        muonEoric,
        muonNatform,
        muonProps,
        muonStace,
        protonUniwen,
        renderSvg,
      ] = await Promise.all([
        __eo('xs').c('rayder'),
        __eo('xs').c('wen'),
        __eo('xs').e('natform'),
        __eo('xs').e('mars'),
        __eo('xs').e('pacer'),
        __eo('xs').e('textform'),
        __eo('xs').m('eoric'),
        __eo('xs').m('natform'),
        __eo('xs').m('props'),
        __eo('xs').m('stace'),
        __eo('xs').p('uniwen'),
        __eo('xs').r('svg'),
      ])
  
      let muonStore = __eo('muonStore')
      try { renderSvg.scenecolor('black') } catch (e) {}
      // .................. animas
      let z = function () {
      // .................. pics
        let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}
        // ....................... pacerNat
        let pacerNat = {
  
          eohal: eohalPacer,
          eotim: eotim,
          eoric: { gid: 'pacer', cid: 'pacer', fid: 'pacer' },
  
          eofold: {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0], },
            properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
          },
          eonode: {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0], },
            properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
          },
          eomot: {
            proform: {
              projection: 'uniwen',
              translate: [ [[[0, 250]]], 0, 0], // mot
              scale: 1,
              rotate: [ 0, 0, 0 ],
              lens: [0, 1, Infinity],
              addNodeToTranslate: 1, // eonode
            },
          },
          eocrom: { 'csx': 0, 'cf': 777, 'co': 1, 'cs': 666 + 200 * (0.5 - Math.random()), 'cw': 1.5, 'cp': 1},
          eoform: {
            x: {
              'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
              'ra2': [[[6, 60]]], 'v0': 0, 'v1': 1, 'seg5': 36, 'w4': 0, 'pa6': 0, 'pb7': 360,
            },
            y: {
              'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
              'ra2': [[[6, 60]]], 'v0': 0, 'v1': 1, 'seg5': 36, 'w4': 0, 'pa6': 0, 'pb7': 360,
            },
          },
  
          eoload: {
            pacer: {
  
              initN: 2, eventN: 0, autoN: 1, autoP: 0.1, outtimed: 0, maxN: 60, geospan: 0,
              pacedAnisort: 'anima',
              basePaceOnAniView: '',
              addItemToPacer: 0,
  
              eohal: eohalMars,
  
              eoric: function (ani, props) {
                let eoric = muonProps.clone(ani.eoric)
  
                if (props.key === 'init') { // INIT
                  let q = muonStore.animasInClassHowMany(eoric)
                  let nextq = q + props.counter
                  eoric.fid = muonEoric.idify(eoric.fid, props.key, nextq)
                } else if (props.key === 'auto') { // AUTO
                  let q = muonStore.animasInClassHowMany(eoric)
                  let nextq = q + props.counter
                  eoric.fid = muonEoric.idify(eoric.fid, props.key, nextq)
                } else if (props.key === 'event') { // EVENT
                  let q = muonStore.animasInClassHowMany(eoric)
                  let nextq = q + props.counter
                  eoric.fid = muonEoric.idify(eoric.fid, props.key, nextq)
                }
  
                eoric.uid = muonEoric.getuid(eoric)
                return eoric
              },
  
              eofold: function (ani, props) {
                let neweofold = ani => muonNatform.natMultiLineString({eoform: ani.eoform})
                return neweofold
              },
  
              eonode: function (ani, props) {
                let stace = [0, 0, 0]
                if (props.key === 'init') { // INIT
                  let autocount = props.counter
                  let C1 = 50
                  let C2 = 2
                  stace = [0, Math.pow(-1, autocount) * C1 * Math.max(1, autocount % C2), 0]
                } else if (props.key === 'auto') { // AUTO
                  stace = [ 0 + 20 * Math.random(), 0 + 20 * Math.random(), 0]
                } else if (props.key === 'event') { // EVENT
                  if (ctlRayder.grabbed() !== undefined) {
                    let grabbed = ctlRayder.grabbed()
                    let x = grabbed[0]
                    let y = grabbed[1]
                    let z = 0
                    stace = {x, y, z }
                  }
                }
                let coordinates = stace
                let res = {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: coordinates,
                  },
                  properties: {orgen: null, velin: [0, 0, 0], velang: [0, 0, 0], prevous: null, geodelta: null},
                }
                return res
              },
            },
          },
        }
  
        // .................. animas
        let animas = [
          pacerNat, // h.pacer
        ]
        return animas
      }
      let enty = () => {}
      enty.z = z
      return enty
    }

    let __eo = await xEonify.eonit({anitem: anitem})
    __eo = await xEonify.eocharge(__eo)
    let muonAnimation = await __eo('xs').m('animation')

    jest.useFakeTimers()
    const callback = jest.fn()
    let gjfc = {}, times = 0, dt = 100, t = 0, ntimes = 3 
    async function aniTimer (callback) {
      await callback()
      setTimeout(() => {
        t = times * dt
        ++times
        gjfc = muonAnimation.animier(t) // animier
        aniTimer(callback)
      }, dt)
    }
    await aniTimer(callback)
    for (let i = 0; i < ntimes; i++) {
      jest.advanceTimersByTime(dt)
      await Promise.resolve() // allow any pending jobs in the PromiseJobs queue to run
    }

    expect(callback).toHaveBeenCalledTimes(ntimes + 1) // 4
    expect(t).toBe((ntimes - 1) * dt) // ([0, ntimes - 1] + 1) * dt
    expect(gjfc.type).toBe('FeatureCollection')
    expect(gjfc.features.length).toBe(3)
    expect(gjfc.features[0].geometry.type).toEqual('Point')
    expect(gjfc.features[0].geometry.coordinates).toEqual([0, 0, 0])
    expect(gjfc.features[1].geometry.type).toEqual('MultiLineString')
    expect(gjfc.features[1].geometry.coordinates[0][0]).toEqual([-3.6666666666666665, 50, 0])
  })
})
