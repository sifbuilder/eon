/* ******************************************
   *    @eonZ725aGeofuel
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ725aGeofuel = global.eonZ725aGeofuel || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    muonNatform,
    eohalFuel,
    eohalMars,
    eohalNatform,
    renderSvg,
  ] = await Promise.all([
    __eo('xs').m('natform'),
    __eo('xs').e('fuel'),
    __eo('xs').e('mars'),
    __eo('xs').e('natform'),
    __eo('xs').r('svg'),
  ])
  try { renderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1}
    let formFuel = {

      'x': {
        'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
        'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[48, 48]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
      },

      'y': {
        'm1': 5, 'm2': 5, 'n1': 30, 'n2': 100, 'n3': 100, 'a': 1, 'b': 1,
        'ra2': 6, 'v0': 0, 'v1': 1, 'seg5': [[[48, 48]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
      },

    }

    let form = {

      'x': {

        'm1': 3, 'm2': 3, 'n1': 1, 'n2': 1.2, 'n3': 1.2, 'a': 1, 'b': 1, // reaulaux
        'ra2': 60, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
      },

      'y': {

        'm1': 3, 'm2': 3, 'n1': 1, 'n2': 1.2, 'n3': 1.2, 'a': 1, 'b': 1, // reaulaux

        'ra2': 60, 'v0': 0, 'v1': 1, 'seg5': [[[360, 360]]], 'w4': 0, 'pa6': 0, 'pb7': 360,
      },

    }

    let stace = {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 4, 'b': 2, // circle
      'ra2': 30, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
    }

    let proform = {

      projection: 'uniwen',
      translate: [ [ 0, 0 ], [[[ stace ]]] ],
      scale: 1,
      rotate: [ 0, 0, 0 ],
      lens: [0, 1, Infinity],

    }

    let proformFlat = {

      projection: 'uniwen',
      translate: [ [ -100, -100 ], [[[ stace ]]] ],
      scale: 1,
      rotate: [ 0, 0 ],
      lens: [0, 1, Infinity],

    }

    let eocrom = { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.29, 0.29]]], 'cs': [[[555, 666]]], 'cw': [[[0.9, 0.9]]], 'cp': [[[0.7, 0.9]]]}
    let eocromFuel = { 'csx': 0, 'cf': [[[777, 777]]], 'co': [[[0.9, 0.9]]], 'cs': [[[777, 777]]], 'cw': [[[0.1, 0.1]]], 'cp': [[[0.99, 0.99]]]}

    // .................. animas
    let nat = {

      eohal: eohalNatform,
      eoric: {'gid': 'nat', 'cid': 'nat', 'fid': 'nat'},
      eotim,

      eofold: null,
      eocrom,
      eomot: {
        proform,
      },
      eoform: form,
      eoload: {
      },

    }

    let natFlat = {

      eohal: eohalNatform,
      eoric: {'gid': 'nat', 'cid': 'nat', 'fid': 'natFlat'},
      eotim,

      eofold: null,
      eocrom,
      eomot: {
        proform: proformFlat,
      },
      eoform: form,
      eoload: {
      },

    }

    let fuelnat = {

      eohal: 'fuel',
      eofold: ani => muonNatform.natMultiLineString({eoform: ani.eoform}),
      eotim,
      eoric: {'gid': 'fuel', 'cid': 'fuel'},
      eocrom: eocromFuel,
      eoform: formFuel,
      eoload: {
        fuel: {
          ra2: 3,
          candidates: 5,
          sample: 20,
          goal: 10,
          f: 1, // 2, 3
        },
      },

    }

    // .................. animas
    nat.avatars = {
      fuelnat, // h.fuel
    }

    natFlat.eoload.avatars = {
      fuelnat, // h.fuel
    }

    let animas = [
      nat, // h.natform
      // natFlat, // h.natform

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ725aGeofuel = anitem
}))