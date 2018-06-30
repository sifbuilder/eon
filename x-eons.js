/*******************************************
*      @xEons
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xEons = global.xEons || {})))
}(this, function (exports) {
  'use strict'



// _parts
let parts = [

/* boson*/
/* control*/
['controlWen' , './control-wen.js'],
['controlVersor' , './control-versor.js'],
['controlTouchMove' , './control-touchMove.js'],
['controlTouchEnd' , './control-touchEnd.js'],
['controlTimer' , './control-timer.js'],
['controlRayder' , './control-rayder.js'],
// ['controlRaycaster' , './control-raycaster.js'],
['controlPos' , './control-pos.js'],
['controlKey' , './control-key.js'],

/* force*/
// ['forceZ' , './force-z.js'],
// ['forceY' , './force-y.js'],
// ['forceX' , './force-x.js'],
// ['forceManybody' , './force-manybody.js'],
// ['forceMagnetic' , './force-magnetic.js'],
// ['forceLink' , './force-link.js'],
// ['forceEnergy' , './force-energy.js'],
// ['forceCurb' , './force-curb.js'],
// ['forceCrop' , './force-crop.js'],
// ['forceCrash' , './force-crash.js'],
// ['forceCollide' , './force-collide.js'],
// ['forceCenter' , './force-center.js'],
// ['forceBox' , './force-box.js'],
// ['forceBowl' , './force-bowl.js'],
/* geo*/
['geoUniwen' , './geo-uniwen.js'],
['geoNatform' , './geo-natform.js'],
// ['geoUnimercator' , './geo-unimercator.js'],
// ['geoTetra' , './geo-tetra.js'],
// ['geoMyriad' , './geo-myriad.js'],
// ['geoHedrals' , './geo-hedrals.js'],
// ['geoFuturi' , './geo-futuri.js'],
// ['geoCox' , './geo-cox.js'],
/* lib*/
// ['libTurf' , './lib-turf.js'],
// ['libPapaparse' , './lib-papaparse.js'],
// ['libMath' , './lib-math.js'],
// ['libDat.Gui' , './lib-dat.gui.js'],
// ['libComplex' , './lib-complex.js'],
/* muon*/
['muonWen' , './muon-wen.js'],
// ['muonVoro' , './muon-voro.js'],
['muonVersor' , './muon-versor.js'],
['muonTimer' , './muon-timer.js'],
['muonTim' , './muon-tim.js'],
// ['muonSvg' , './muon-svg.js'],
['muonStore' , './muon-store.js'],
// ['muonStats' , './muon-stats.js'],
['muonStace' , './muon-stace.js'],
['muonSnap' , './muon-snap.js'],
['muonSim' , './muon-sim.js'],
['muonScene' , './muon-scene.js'],
['muonRic' , './muon-ric.js'],
// ['muonQuaternion' , './muon-quaternion.js'],
// ['muonQuad' , './muon-quad.js'],
['muonProps' , './muon-props.js'],
// ['muonPromise' , './muon-promise.js'],
['muonProj3ct' , './muon-proj3ct.js'],
['muonProfier' , './muon-profier.js'],
// ['muonPolyhedral' , './muon-polyhedral.js'],
['muonPacer' , './muon-pacer.js'],
['muonNat' , './muon-nat.js'],
// ['muonMath' , './muon-math.js'],
// ['muonLiner' , './muon-liner.js'],
['muonLacer' , './muon-lacer.js'],
// ['muonKruskal' , './muon-kruskal.js'],
// ['muonImage' , './muon-image.js'],
// ['muonGratitem' , './muon-gratitem.js'],
['muonGraticule' , './muon-graticule.js'],
// ['muonGeonode' , './muon-geonode.js'],
['muonGeom' , './muon-geom.js'],
['muonGeoj' , './muon-geoj.js'],
// ['muonFourier' , './muon-fourier.js'],
// ['muonForces' , './muon-forces.js'],
// ['muonFibonat' , './muon-fibonat.js'],
// ['muonEventDispatcher' , './muon-eventDispatcher.js'],
// ['muonDelaunay' , './muon-delaunay.js'],
// ['muonDelaunator' , './muon-delaunator.js'],
// ['muonClone' , './muon-clone.js'],
['muonBoform' , './muon-boform.js'],
// ['muonBezierjs' , './muon-bezierjs.js'],
// ['muonAudio' , './muon-audio.js'],
['muonAnitem' , './muon-anitem.js'],
['muonAnimation' , './muon-animation.js'],
// ['muonAnimas' , './muon-animas.js'],
/* halo*/
// ['haloTiles' , './halo-tiles.js'],
['haloTextform' , './halo-textform.js'],
['haloScene' , './halo-scene.js'],
['haloPacer' , './halo-pacer.js'],
// ['haloNumform' , './halo-numform.js'],
['haloNat' , './halo-nat.js'],
['haloImg' , './halo-img.js'],
// ['haloFuel' , './halo-fuel.js'],
// ['haloFractal' , './halo-fractal.js'],
// ['haloFourier' , './halo-fourier.js'],
['haloFormed' , './halo-formed.js'],
['haloEnt' , './halo-ent.js'],
['haloCore' , './halo-core.js'],
// ['haloCamera' , './halo-camera.js'],
// ['haloAxis' , './halo-axis.js'],
/* render*/
// ['renderWebgl' , './render-webgl.js'],
['renderSvg' , './render-svg.js'],
['renderRenderport' , './render-renderport.js'],
// ['renderCanvas' , './render-canvas.js'],


    ]
    // -parts





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
