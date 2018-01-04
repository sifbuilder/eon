/****************************
 *      @muonProfier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.muonProfier = global.muonProfier || {})));
}(this, function (exports) { 'use strict';

let muonProfier = function muonProfier(__mapper = {}) {

  let f = __mapper("props")()

  let mwen = __mapper("xs").m("wen")
  let cwen = __mapper("xs").c("wen")() //let wen = __mapper("controlWen")   //
  let bversor = __mapper("xs").b("versor")()
  let cversor = __mapper("xs").c("versor")

/****************************
 *      @getProjier
 *        get projection from proform
 *        apply projection properties
 *        if control:wen  wen rotation
 *        if control:wen  and 2d: wen z rotation
 *        if control:versor   versor rotation
 */
let getProjion = function  (p = {}, prj) {

    if (f.isString(p.projection)) {       // if _projection singular name

        prj = __mapper("xs").g(p.projection)(p) // props passed to projection

    } else if (f.isFunction(p.projection)) {    // if is projection

        prj = p.projection            // props passed to projection

    } else if (f.isArray(p.projections)) {  // if plural select one

        prj = p.projections[ Math.round(p.projectidx || 0) ]


        if (f.isString(prj)) {        // if name in array

            prj = __mapper("xs").g(prj)(p)    // get projection from name

        }

    }

    if (prj === undefined || prj === null) {

        prj =  d3.geoIdentity() // console.error("prj not defined") //

    }

    if (prj.rotate !== undefined) {
        let rot = p.rotate || [0,0,0]

        if (p.control === "wen") {                    // wen control

            let wenRotation = cwen.rotation()

            if (p.dims === 2) {
                if (wenRotation[0] * wenRotation[1] !== 0)  {
                  wenRotation = mwen.cross( [wenRotation[0], 0, 0], [0, wenRotation[1], 0])
                }
            }

            rot = bversor.add(rot, wenRotation)

        } else if (p.control === "versor") {                // versor control

              let verser = cversor.projection(prj)
              let verRotation = verser.rotation()      // rotation from versor

            rot = bversor.add(rot, verRotation)  // add ani rotation

        }

        prj.rotate(rot) // rotate
    }


    for (let [key, value] of Object.entries(p)) {

console.log("key, value", key, value)
      if (key !== "rotate" && prj[key] !== undefined  && f.isFunction(prj[key]))  prj[key](value)

    }


    return prj


}
let getProjier =  form => json => __mapper("xs").b("proj3ct")(json, getProjion(form))

/****************************
 *      @enty
 */
  let enty = function () {}
  enty.getProjion = getProjion
  enty.getProjier = getProjier

  return enty

}

exports.muonProfier = muonProfier

}));
