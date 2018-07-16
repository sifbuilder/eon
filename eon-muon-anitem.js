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
    async function snapani (ani, t) {
      let r = Promise.resolve()
      if (ani !== undefined) {
        t = t || ani.payload.tim.unitTime
        r = await msnap.snap(ani, t)
      }

      return r
    }

    // ............................. functorize
    async function functorize (ani, t) {
      let anigram = await snapani(ani, t)
      if (anigram !== undefined) {
        if (anigram.payload === undefined) anigram.payload = {}
        anigram.geofold = functor((anigram.geofold), anigram) // geofold
        anigram.payload.conform = functor(anigram.payload.conform, anigram) // conform
        anigram.payload.proform = functor(anigram.payload.proform, anigram) // proform
      }

      let r = {

        halo: anigram.halo, // halo
        geofold: anigram.geofold, // geofold
        payload: anigram.payload, // payload
        avatars: anigram.avatars, // avatars

      }
      return r
    }

    // ............................. enty
    let enty = () => {}
    enty.snapani = snapani
    enty.functorize = functorize
    return enty
  }

  exports.muonAnitem = muonAnitem
}))
