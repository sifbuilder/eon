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
		let mstace = __mapper("xs").m("stace")
		let guniwen = __mapper("xs").g("uniwen")

    /****************************
 *      @projier
 *        get projection from proform and apply projection properties
 *        if control:wen  wen rotation and if 2d: wen z rotation
 *        if control:versor   versor rotation
 */
    let getProjion = function  (p, anigram) {
				let prj = guniwen() // d3.geoIdentity()
				if (p !== undefined) { 
			
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


							if (prj.rotate !== undefined) {
								let rot = (p.rotate) ? p.rotate : [0,0,0]

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
				}

				return prj

    }
		
    /****************************
 *     	 @projier
 */			
    let projier =  (proform, anigram) => json => (proform) ? __mapper("xs").b("proj3ct")(json, getProjion(proform, anigram)) : json

    /****************************
 *     	 @getEreformer
 */		
    let getEreformer = (ereform, anigram) => {
			
			ereform = ereform || anigram.ereform
			let translate = ereform.translate
			let locus = mstace.getLocus(translate, anigram)
					ereform.translate = locus
			let profier = projier(ereform, anigram)
			
			return profier
			
		}
		
    /****************************
 *     	 @proformer
 */		
    let proformer = (proform, anigram) => {
			proform = proform || anigram.payload.proform
			let profier = d => d 
			if (proform !== undefined) {
				let center = proform.center
				let translate = proform.translate
						// proform.translate = mstace.getLocus(translate, anigram)
						// proform.center = mstace.getLocus(center, anigram)
				
				profier = projier(proform, anigram)
			}
			return profier
			
		}
		
		
    /****************************
 *      @enty
 */
    let enty = function () {}
    enty.getProjion = getProjion
    enty.projier = projier
    enty.proformer = proformer
    // enty.getEreformer = getEreformer

    return enty

  }

  exports.muonProfier = muonProfier

}));
