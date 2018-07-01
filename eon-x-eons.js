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

['controlWen' , './eon-control-wen.js'],
['controlVersor' , './eon-control-versor.js'],
['controlTouchMove' , './eon-control-touchMove.js'],
['controlTouchEnd' , './eon-control-touchEnd.js'],
['controlTimer' , './eon-control-timer.js'],
['controlRayder' , './eon-control-rayder.js'],
['controlPos' , './eon-control-pos.js'],
['controlKey' , './eon-control-key.js'],
['geoUniwen' , './eon-geo-uniwen.js'],
['geoNatform' , './eon-geo-natform.js'],
['haloTextform' , './eon-halo-textform.js'],
['haloScene' , './eon-halo-scene.js'],
['haloPacer' , './eon-halo-pacer.js'],
['haloNat' , './eon-halo-nat.js'],
['haloImg' , './eon-halo-img.js'],
['haloFormed' , './eon-halo-formed.js'],
['haloEnt' , './eon-halo-ent.js'],
['haloCore' , './eon-halo-core.js'],
['muonWen' , './eon-muon-wen.js'],
['muonVersor' , './eon-muon-versor.js'],
['muonTimer' , './eon-muon-timer.js'],
['muonTim' , './eon-muon-tim.js'],
['muonStore' , './eon-muon-store.js'],
['muonStace' , './eon-muon-stace.js'],
['muonSnap' , './eon-muon-snap.js'],
['muonSim' , './eon-muon-sim.js'],
['muonScene' , './eon-muon-scene.js'],
['muonRic' , './eon-muon-ric.js'],
['muonProps' , './eon-muon-props.js'],
['muonProj3ct' , './eon-muon-proj3ct.js'],
['muonProfier' , './eon-muon-profier.js'],
['muonPacer' , './eon-muon-pacer.js'],
['muonNat' , './eon-muon-nat.js'],
['muonLacer' , './eon-muon-lacer.js'],
['muonGraticule' , './eon-muon-graticule.js'],
['muonGeonode' , './eon-muon-geonode.js'],
['muonGeom' , './eon-muon-geom.js'],
['muonGeoj' , './eon-muon-geoj.js'],
['muonBoform' , './eon-muon-boform.js'],
['muonAnitem' , './eon-muon-anitem.js'],
['muonAnimation' , './eon-muon-animation.js'],
['muonAnimas' , './eon-muon-animas.js'],
['renderSvg' , './eon-render-svg.js'],
['renderRenderport' , './eon-render-renderport.js'],

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
