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
    async function functorize (anitem, t) {
if (1 && 1) console.log('manitem functorize ani', anitem)

      
      let geofold = await functor(anitem.geofold, anitem)
if (1 && 1) console.log('manitem functorize geofold', geofold)
  
      anitem.geofold = geofold
      
      if (anitem.payload === undefined) anitem.payload = {}
      anitem.payload.conform = functor(anitem.payload.conform, anitem)
      anitem.payload.ereform = functor(anitem.payload.ereform, anitem)
      anitem.payload.proform = functor(anitem.payload.proform, anitem)

      let functorized = {
              halo: anitem.halo, // halo
              geofold: anitem.geofold, // geofold
              payload: anitem.payload, // payload
              avatars: anitem.avatars, // avatars

            }
      return functorized


    }

    // ............................. enty
    let enty = () => {}
    enty.snapani = snapani
    enty.functorize = functorize
    return enty
  }

  exports.muonAnitem = muonAnitem
}))
