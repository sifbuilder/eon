/****************************
 *      @haloQuadric
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloQuadric = global.haloQuadric || {})))
}(this, function (exports) {
  'use strict'


  // md: # md:{filename}
  // md: **expose nat form**
  // md: h.ent with  anima.geofold : `mnat.natFeature(p.payload.form)`
  // md:
  // md: # license
  // md: MIT


  let haloQuadric = function haloQuadric (__mapper = {}) {
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem'),
      mnat = __mapper('xs').m('nat')

    let pow = Math.pow
    
    let functor = d => Array.isArray(d) ? d : Array.of(d)
    
    let ft = p => a => p.reduce( (acc,cur,i) => acc + cur * pow(a,i) , 0)
    
    let fn = form =>    // form has defined a1, a2, a3, a4  , q1, q2, q3, q4
      (q=0,s=0,u=0,v=0,a=1,b=1,c=1,d=1) => {
        // let ret =   a * form.c1 * ft(functor(form.e1))(q) + 
                    // b * form.c2 * ft(functor(form.e2))(s) + 
                    // c * form.c3 * ft(functor(form.e3))(u) + 
                    // d * form.c4 * ft(functor(form.e4))(v)
            
       let ret =    ft(functor(form.c1))(a) * ft(functor(form.e1))(q) * 
                    ft(functor(form.c2))(b) * ft(functor(form.e2))(s) * 
                    ft(functor(form.c3))(c) * ft(functor(form.e3))(u) * 
                    ft(functor(form.c4))(d) * ft(functor(form.e4))(v)
            
        return ret
      }

    // .................... gramm
    let gramm = function (anima, newAnigrams = []) {

      let anigram = manitem(anima).anigram() // anigram
      let form = anigram.payload.form
      if (form !== undefined && typeof form === 'object') {
        let entries =  Object.entries(form)
        for (let i=0; i < entries.length; i++) {
          let entry = entries[i]
          let dax = entry[0]
          let formDax = entry[1]

          if (formDax.fn0 === undefined && (
            formDax.e1 !== undefined ||
            formDax.e2 !== undefined ||
            formDax.e3 !== undefined ||
            formDax.e4 !== undefined ||
            formDax.c1 !== undefined ||
            formDax.c2 !== undefined ||
            formDax.c3 !== undefined ||
            formDax.c4 !== undefined )) {

            
             formDax.e1  = (formDax.e1 === undefined) ? functor(1) : functor(formDax.e1)
             formDax.e2  = (formDax.e2 === undefined) ? functor(1) : functor(formDax.e2)
             formDax.e3  = (formDax.e3 === undefined) ? functor(1) : functor(formDax.e3)
             formDax.e4  = (formDax.e4 === undefined) ? functor(1) : functor(formDax.e4)
             
             formDax.c1  = (formDax.c1 === undefined) ?         1  : formDax.c1
             formDax.c2  = (formDax.c2 === undefined) ?         1  : formDax.c2
             formDax.c3  = (formDax.c3 === undefined) ?         1  : formDax.c3
             formDax.c4  = (formDax.c4 === undefined) ?         1  : formDax.c4


             formDax.fn0 = fn(formDax)

          } else {
              // let default to h.nat
          }


        }
      }


      anigram.halo = 'nat' // halo
      anigram.payload.form = form // fn0

      newAnigrams = __mapper('xs').h('nat').gramm(anigram)

      return newAnigrams

    }

    // .................... enty
    let haloNat_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloNat_gramm = anima => gramm(anima)

    let haloQuadric = {}
    haloQuadric.ween = anima => haloNat_ween(anima)
    haloQuadric.gramm = anima => haloNat_gramm(anima)

    let enty = haloQuadric

    return enty
  }

  exports.haloQuadric = haloQuadric
}))
