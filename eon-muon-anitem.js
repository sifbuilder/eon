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
        t = t || ani.tim.unitTime
        r = Promise.resolve(msnap.snap(ani, t))
      }
      return r
    }

    // ............................. functorize
    let functorize = function (anitem, t) {
      let newAnitem = mprops.clone(anitem)

      console.assert(anitem !== undefined)
      console.assert(anitem.payload !== undefined, anitem.uid + ' payload undefined')
      console.assert(anitem.geofold !== undefined, anitem.uid + ' geofold undefined')

      if (newAnitem.payload === undefined) newAnitem.payload = {}
      if (newAnitem.geodrift === undefined) newAnitem.geodrift = {}

      let geodrift = anitem.geodrift || {}
      if (geodrift.ereform !== undefined) {
        let ereform = functor(geodrift.ereform, anitem) // ereform
        newAnitem.geodrift.ereform = ereform
      } else if (geodrift.conform !== undefined) {
        let conform = functor(geodrift.conform, anitem) // conform
        newAnitem.geodrift.conform = conform
      } else if (geodrift.proform !== undefined) {
        let proform = functor(geodrift.proform, anitem) // proform
        newAnitem.geodrift.proform = proform
      }
      if (anitem.geofold !== undefined) {
        newAnitem.geofold = functor(anitem.geofold, anitem) // geofold
      }

      return newAnitem
    }

    // ............................. functorgeofold
    let functorgeofold = function (anitem, t) {
      let newAnitem = mprops.clone(anitem)

      console.assert(anitem !== undefined)
      console.assert(anitem.geofold !== undefined, anitem.uid + ' geofold undefined')

      let geofold = functor((anitem.geofold), anitem) // geofold

      newAnitem.geofold = geofold

      return newAnitem
    }

    // ............................. functorpayload
    let functorpayload = function (anitem, t) {
      let newAnitem = mprops.clone(anitem)

      console.assert(anitem !== undefined)
      console.assert(anitem.payload !== undefined, anitem.uid + ' payload undefined')

      if (anitem.geodrift.ereform !== undefined) {
        let ereform = functor(anitem.geodrift.ereform, anitem) // ereform
        newAnitem.geodrift.ereform = ereform
      } else if (anitem.geodrift.conform !== undefined) {
        let conform = functor(anitem.geodrift.conform, anitem) // conform
        newAnitem.geodrift.conform = conform
      } else if (anitem.geodrift.proform !== undefined) {
        let proform = functor(anitem.geodrift.proform, anitem) // proform
        newAnitem.geodrift.proform = proform
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
