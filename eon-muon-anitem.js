/***********
 *    @muonAnitem
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonAnitem = global.muonAnitem || {})))
}(this, function (exports) {
  'use strict'

  async function muonAnitem (__mapper = {}) {
    let [
      msnap,
    ] = await Promise.all([
      __mapper('xs').m('snap'),
    ])

    const functor = (d, ...p) => (typeof d === 'function') ? d(...p) : d

    // ............................. snapani
    function snapani (ani, t) {
      let r = Promise.resolve()
      if (ani !== undefined) {
        t = t || ani.payload.tim.unitTime
        r = Promise.resolve(msnap.snap(ani, t))
      }
      return r
    }

    // ............................. functorize
    let functorize = function (ani, t) {
      // let anigram = snapani(ani, t)
      let anigram = ani

        console.assert(anigram !== undefined)
        anigram.geofold = functor((anigram.geofold), anigram) // geofold
        
        if (anigram.payload === undefined) anigram.payload = {}
        anigram.payload.conform = functor(anigram.payload.conform, anigram) // conform
        anigram.payload.proform = functor(anigram.payload.proform, anigram) // proform

      return {

        halo: anigram.halo, // halo
        geofold: anigram.geofold, // geofold
        payload: anigram.payload, // payload
        avatars: anigram.avatars, // avatars

      }
    }

    // ............................. enty
    let enty = () => {}
    enty.snapani = snapani
    enty.functorize = functorize
    return enty
  }

  exports.muonAnitem = muonAnitem
}))
