/***********
 *    @muonAnitem
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonAnitem = global.muonAnitem || {})))
}(this, function (exports) {
  'use strict'

  async function muonAnitem (__eo = {}) {
    let [
      muonSnap,
      muonProps,
    ] = await Promise.all([
      __eo('xs').m('snap'),
      __eo('xs').m('props'),
    ])

    const functor = (d, ...p) => (typeof d === 'function') ? d(...p) : d

    // ............................. snapani
    function snapaniDyn (ani, t) {
      let r = Promise.resolve()
      if (ani !== undefined) {
        t = t || ani.eotim.unTime
        r = Promise.resolve(muonSnap.snap(ani, t))
      }
      return r
    }

    function snapani (ani, t) {
      let r
      if (ani !== undefined) {
        t = t || ani.eotim.unTime
        r = muonSnap.snap(ani, t)
      }
      return r
    }

    // ............................. functorize
    let functorize = function (anitem, t) {
      let newAnitem = muonProps.clone(anitem)

      console.assert(anitem !== undefined)

      if (newAnitem.eoload === undefined) newAnitem.eoload = {}
      if (newAnitem.eomot === undefined) newAnitem.eomot = {}

      let eomot = anitem.eomot || {}
      if (eomot.ereform !== undefined) {
        let ereform = functor(eomot.ereform, anitem) // ereform
        newAnitem.eomot.ereform = ereform
      } else if (eomot.conform !== undefined) {
        let conform = functor(eomot.conform, anitem) // conform
        newAnitem.eomot.conform = conform
      } else if (eomot.proform !== undefined) {
        let proform = functor(eomot.proform, anitem) // proform
        newAnitem.eomot.proform = proform
      }
      if (anitem.eofold !== undefined) {
        newAnitem.eofold = functor(anitem.eofold, anitem) // eofold
      }

      return newAnitem
    }

    // ............................. functorgeofold
    let functorgeofold = function (anitem, t) {
      let newAnitem = muonProps.clone(anitem)

      console.assert(anitem !== undefined)
      console.assert(anitem.eofold !== undefined, anitem.eoric.uid + ' eofold undefined')

      let eofold = functor((anitem.eofold), anitem) // eofold

      newAnitem.eofold = eofold

      return newAnitem
    }

    // ............................. functorpayload
    let functorpayload = function (anitem, t) {
      let newAnitem = muonProps.clone(anitem)

      console.assert(anitem !== undefined)
      console.assert(anitem.eoload !== undefined, anitem.eoric.uid + ' eoload undefined')

      if (anitem.eomot.ereform !== undefined) {
        let ereform = functor(anitem.eomot.ereform, anitem) // ereform
        newAnitem.eomot.ereform = ereform
      } else if (anitem.eomot.conform !== undefined) {
        let conform = functor(anitem.eomot.conform, anitem) // conform
        newAnitem.eomot.conform = conform
      } else if (anitem.eomot.proform !== undefined) {
        let proform = functor(anitem.eomot.proform, anitem) // proform
        newAnitem.eomot.proform = proform
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
