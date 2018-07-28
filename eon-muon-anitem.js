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
      mprops,
    ] = await Promise.all([
      __mapper('xs').m('snap'),
      __mapper('xs').m('props'),
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

    // ............................. functorgeofold
    let functorgeofold = function (anitem, t) {
      let newAnitem = mprops.clone(anitem)

      console.assert(anitem !== undefined)
      console.assert(anitem.geofold !== undefined, anitem.payload.uid + ' geofold undefined')

      let geofold = functor((anitem.geofold), anitem) // geofold

      newAnitem.geofold = geofold

      return newAnitem
    }

    // ............................. functorpayload
    let functorpayload = function (anitem, t) {
      let newAnitem = mprops.clone(anitem)

      console.assert(anitem !== undefined)
      console.assert(anitem.payload !== undefined, anitem.payload.uid + ' payload undefined')

      if (anitem.payload.ereform !== undefined) {
        let ereform = functor(anitem.payload.ereform, anitem) // ereform
        newAnitem.payload.ereform = ereform
      } else if (anitem.payload.conform !== undefined) {
        let conform = functor(anitem.payload.conform, anitem) // conform
        newAnitem.payload.conform = conform
      } else if (anitem.payload.proform !== undefined) {
        let proform = functor(anitem.payload.proform, anitem) // proform
        newAnitem.payload.proform = proform
      }

      return newAnitem
    }

    // ............................. enty
    let enty = () => {}
    enty.snapani = snapani
    enty.functorize = functorize
    enty.functorgeofold = functorgeofold
    enty.functorpayload = functorpayload
    return enty
  }

  exports.muonAnitem = muonAnitem
}))
