/*******************************************
*      @xEons
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xEons = global.xEons || {})))
}(this, function (exports) {
  'use strict'

  let parts = [

    'eon-control-wen',
    'eon-control-versor',
    'eon-control-touchMove',
    'eon-control-touchEnd',
    'eon-control-timer',
    'eon-control-rayder',
    'eon-control-pos',
    'eon-control-key',
    'eon-geo-uniwen',
    'eon-geo-natform',
    'eon-halo-textform',
    'eon-halo-scene',
    'eon-halo-pacer',
    'eon-halo-nat',
    'eon-halo-img',
    'eon-halo-formed',
    'eon-halo-ent',
    'eon-halo-core',
    'eon-muon-wen',
    'eon-muon-versor',
    'eon-muon-timer',
    'eon-muon-tim',
    'eon-muon-store',
    'eon-muon-stace',
    'eon-muon-snap',
    'eon-muon-sim',
    'eon-muon-scene',
    'eon-muon-ric',
    'eon-muon-props',
    'eon-muon-proj3ct',
    'eon-muon-profier',
    'eon-muon-pacer',
    'eon-muon-nat',
    'eon-muon-lacer',
    'eon-muon-graticule',
    'eon-muon-geonode',
    'eon-muon-geom',
    'eon-muon-geoj',
    'eon-muon-boform',
    'eon-muon-anitem',
    'eon-muon-animation',
    'eon-muon-animas',
    'eon-render-svg',
    'eon-render-renderport'

  ]

  let xEons = function (__mapper = {}) {
    let state = {
      parts: [...parts]
    }

    let enty = {}
    enty.parts = _ => _ !== undefined ? (state.parts = _, state.parts) : state.parts
    return enty
  }

  exports.xEons = xEons
}))
