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
        r = msnap.snap(ani, t)
      }
      return r
    }

    // ............................. functorize
    function functorize (ani, t) {

      return snapani(ani, t)
        .then(anigram => Promise.resolve(functor(anigram.geofold, anigram))
          .then(geofold => {


            anigram.geofold = geofold
  if (1 && 1) console.log('geofold', anigram.geofold)
            if (anigram.payload === undefined) anigram.payload = {}
            anigram.payload.conform = functor(anigram.payload.conform, anigram)
            anigram.payload.ereform = functor(anigram.payload.ereform, anigram)
            anigram.payload.proform = functor(anigram.payload.proform, anigram)

            return {
              halo: anigram.halo, // halo
              geofold: anigram.geofold, // geofold
              payload: anigram.payload, // payload
              avatars: anigram.avatars, // avatars

            }

        }))

    }

    // ............................. enty
    let enty = () => {}
    enty.snapani = snapani
    enty.functorize = functorize
    return enty
  }

  exports.muonAnitem = muonAnitem
}))
