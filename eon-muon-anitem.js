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
    function snapaniDyn (ani, t) {
      let r = Promise.resolve()
      if (ani !== undefined) {
        t = t || ani.eotim.unitTime
        r = Promise.resolve(msnap.snap(ani, t))
      }
      return r
    }

    function snapani (ani, t) {
      let r
      if (ani !== undefined) {
        t = t || ani.eotim.unitTime
        r = msnap.snap(ani, t)
      }
      return r
    }

    // ............................. functorize
    let functorize = function (anitem, t) {
      let newAnitem = mprops.clone(anitem)

      console.assert(anitem !== undefined)

      if (newAnitem.eoload === undefined) newAnitem.eoload = {}
      if (newAnitem.eodrift === undefined) newAnitem.eodrift = {}

      let eodrift = anitem.eodrift || {}
      if (eodrift.ereform !== undefined) {
        let ereform = functor(eodrift.ereform, anitem) // ereform
        newAnitem.eodrift.ereform = ereform
      } else if (eodrift.conform !== undefined) {
        let conform = functor(eodrift.conform, anitem) // conform
        newAnitem.eodrift.conform = conform
      } else if (eodrift.proform !== undefined) {
        let proform = functor(eodrift.proform, anitem) // proform
        newAnitem.eodrift.proform = proform
      }
      if (anitem.eofold !== undefined) {
        newAnitem.eofold = functor(anitem.eofold, anitem) // eofold
      }

      return newAnitem
    }

    // ............................. functorgeofold
    let functorgeofold = function (anitem, t) {
      let newAnitem = mprops.clone(anitem)

      console.assert(anitem !== undefined)
      console.assert(anitem.eofold !== undefined, anitem.uid + ' eofold undefined')

      let eofold = functor((anitem.eofold), anitem) // eofold

      newAnitem.eofold = eofold

      return newAnitem
    }

    // ............................. functorpayload
    let functorpayload = function (anitem, t) {
      let newAnitem = mprops.clone(anitem)

      console.assert(anitem !== undefined)
      console.assert(anitem.eoload !== undefined, anitem.uid + ' eoload undefined')

      if (anitem.eodrift.ereform !== undefined) {
        let ereform = functor(anitem.eodrift.ereform, anitem) // ereform
        newAnitem.eodrift.ereform = ereform
      } else if (anitem.eodrift.conform !== undefined) {
        let conform = functor(anitem.eodrift.conform, anitem) // conform
        newAnitem.eodrift.conform = conform
      } else if (anitem.eodrift.proform !== undefined) {
        let proform = functor(anitem.eodrift.proform, anitem) // proform
        newAnitem.eodrift.proform = proform
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
