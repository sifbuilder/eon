/****************************
 *      @muonProfier
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonProfier = global.muonProfier || {})))
}(this, function (exports) { "use strict"

  let muonProfier = function muonProfier(__mapper = {}) {

    let f = __mapper("props")()

    let mwen = __mapper("xs").m("wen")
    let cwen = __mapper("xs").c("wen")() //let wen = __mapper("controlWen")   //
    let bversor = __mapper("xs").b("versor")()
    let cversor = __mapper("xs").c("versor")

    /****************************
 *      @projier
 *        get projection from proform and apply projection properties
 *        if control:wen  wen rotation and if 2d: wen z rotation
 *        if control:versor   versor rotation
 */
    let getProjion = function  (p = {}, prj) {

      let rot = [0,0,0]

      if (f.isString(p.projection)) prj = __mapper("xs").g(p.projection)(p) // props passed to projection
			else if (f.isFunction(p.projection)) prj = p.projection  // if is projection
			else if (f.isArray(p.projections)) 					{  // if plural select one

        prj = p.projections[ Math.round(p.projectidx || 0) ]
        if (f.isString(prj)) prj = __mapper("xs").g(prj)(p)   // if name in array projection from name

      }

      if (prj === undefined || prj === null) prj =  d3.geoIdentity() // console.error("prj not defined")
			

      if (prj.rotate !== undefined) {
        rot = (p.rotate) ? p.rotate : rot

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

				p.rotate = rot
				
      }

			let translate = p.translate
			if (f.isObject(translate) && f.isPosition(translate)) {
					translate = Object.values(translate)		// translate is {x,y,z}
					p.translate = translate
			}
			
			let center = p.center
			if (f.isObject(center) && f.isPosition(center) ) {
					center = Object.values(center)					// center is {x,y,z}
					p.center = center
			}
			
			
      for (let [key, value] of Object.entries(p)) {

        if (f.isFunction(prj[key]))  prj[key](value)

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
