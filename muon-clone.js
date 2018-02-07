/***********
 *    @muonClone
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonClone = global.muonClone || {})))
}(this, function (exports) {
  'use strict'

  let muonClone = function muonClone (__mapper = {}) {
    let f = __mapper('props')()

    /***********
   *    @clone : anigram
   */
    let clone = function (v) {
      if (v === null) return null // 00 _____ o
      else if (typeof (v) === 'number') return v // 02 _____ num
      else if (typeof (v) === 'string') return v // 03 _____ str
      else if (f.isArray(v) && v.length === 0) return v // 04 _____ []
      else if (typeof (v) === 'function') return v //  v(t)    //01 _____ fn

      else if (f.isObject(v) // 06 ___ v :: {}
      ) {
        let r = {}
        for (let y of Reflect.ownKeys(v)) {
          r[y] = clone(v[y]) // reenter
        }
        return r
      } else if (f.isArray(v) // 09 ____ [[[ ], {}]] // last chance for the array

      ) {
        let ws = v.map(d => clone(d))
        return ws
      } else {
        return v
      }
    }

    /***********
  *   @enty
  */
    let enty = v => clone(v)

    return enty
  }

  exports.muonClone = muonClone
}))
