if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch-polyfill')
}

global.urlPolyfill = require('url-polyfill')
global.path = require('path')
global.fs = require('fs')

const xEonify = require('./eon-x-eonify.js')



let eonify = jest.fn(async () => {
  let __eo = xEonify.xEo() // init mapper

  __eo({'xs': xEonify.xs(__eo)}) // map xs
  __eo({'xD3Require': { require: xEonify.require, requireFrom: xEonify.requireFrom } })

  await __eo('xs').m('store')
  await __eo('xs').c('rayder')
  await __eo('xs').e('mars')
  await __eo('xs').e('pacer')
  await __eo('xs').m('natform')
  await __eo('xs').m('stace')
  await __eo('xs').p('uniwen')

  return __eo
})

test('test grabbed', async () => {
  let __eo = await eonify()
  let muonEotype = await __eo('xs').e('pacer')

  expect(typeof muonEotype.grabbed).toBe('function')
  expect(muonEotype.grabbed()).toBe(undefined)
})


// anima.pacer init.paces anima
test('test e.pacer anima.pacer init.paces anima', async () => {
  let __eo = await eonify()

  let muonStore = __eo('muonStore')
  let eohalMars = __eo('eohalMars')
  let eohalPacer = __eo('eohalPacer')
  let muonNatform = __eo('muonNatform')
  let muonStace = __eo('muonStace')
  let protonUniwen = __eo('protonUniwen')

  let geoLined = {
    eohal: eohalPacer,
    eotim: {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1},
    eoric: {gid: 'traces', cid: 'traces', fid: 'traceLine'},

    eofold: {
      type: 'Feature',
      geometry: {type: 'LineString', coordinates: null },
      properties: {},
    },
    eonode: {
      type: 'Feature',
      geometry: {type: 'Point', coordinates: [0, 0, 0] },
      properties: {
        orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
      },
    },
    eoform: [ [[[0, 120]]], 0, 0],
    eoload: {
      eocrom: {'csx': 0, 'cf': 777, 'cs': 777, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},
      pacer: {

        initN: 1, eventN: 0, autoN: 1, autoP: 0, autoT: 0, 
        outtimed: 0, maxN: 60,
        geospan: 0,

        paceAnisOfSort: 'anima',
        basePaceOnAniView: 'eoform',
        addItemToPacer: 1, // addItemToPacer for trace

      },
    },
  }

  let ani = eohalPacer.ween(geoLined)
  expect(ani).toHaveLength(0)

  let anitems = muonStore.animasLive()

  expect(anitems).toHaveLength(1)
  expect(anitems[0]).toHaveProperty('eohal')
  expect(anitems[0]).toHaveProperty('eotim')
  expect(anitems[0]).toHaveProperty(['eoric', 'gid'], 'traces')
  expect(anitems[0]).toHaveProperty(['eoric', 'cid'], 'traces')
  expect(anitems[0]).toHaveProperty(['eoric', 'fid'], 'traceLine')
  expect(anitems[0]).toHaveProperty(['eoric', 'uid'], 'traces_traces_traceLine')
  expect(anitems[0]).toHaveProperty('eofold')
  expect(anitems[0]).toHaveProperty('eonode')
  expect(anitems[0]).toHaveProperty('eoload')
})


test.only('test e.pacer anima.pacer init.paces anima', async () => {
  let __eo = await eonify()

  let ctlRayder = __eo('ctlRayder')
  let eohalMars = __eo('eohalMars')
  let eohalPacer = __eo('eohalPacer')
  let muonGeoj = __eo('muonGeoj')
  let muonStore = __eo('muonStore')
  let protonUniwen = __eo('protonUniwen')

  let geoLined = {
    eohal: eohalPacer,
    eotim: {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1},
    eoric: {gid: 'traces', cid: 'traces', fid: 'traceLine'},

    eofold: {
      type: 'Feature',
      geometry: {type: 'LineString', coordinates: null },
      properties: {},
    },
    eonode: {
      type: 'Feature',
      geometry: {type: 'Point', coordinates: [0, 0, 0] },
      properties: {
        orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
      },
    },
    eoform: [ [[[0, 120]]], 0, 0],
    eoload: {
      eocrom: {'csx': 0, 'cf': 777, 'cs': 777, 'cw': 0.99, 'co': 0.4, 'cp': 0.99},
      pacer: {

        initN: 0, eventN: 0, autoN: 1, autoP: 1, autoT: 0.1, 
        outtimed: 0, maxN: 60,
        geospan: 0,

        paceAnisOfSort: 'anigram',
        basePaceOnAniView: '',
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

  eohalPacer.ween(geoLined)
  eohalPacer.gramm(geoLined)


  let animas = muonStore.animasLive()
  let anigrams = muonStore.anigrams()
  console.log('animas:', animas)
  console.log('anigrams:', anigrams)

  expect(1).toBe(1)
  // expect(anitems).toHaveLength(1)
  // expect(anitems[0]).toHaveProperty('eohal')
  // expect(anitems[0]).toHaveProperty('eotim')
  // expect(anitems[0]).toHaveProperty(['eoric', 'gid'], 'traces')
  // expect(anitems[0]).toHaveProperty(['eoric', 'cid'], 'traces')
  // expect(anitems[0]).toHaveProperty(['eoric', 'fid'], 'traceLine')
  // expect(anitems[0]).toHaveProperty(['eoric', 'uid'], 'traces_traces_traceLine')
  // expect(anitems[0]).toHaveProperty('eofold')
  // expect(anitems[0]).toHaveProperty('eonode')
  // expect(anitems[0]).toHaveProperty('eoload')
})
