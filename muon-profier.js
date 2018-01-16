/****************************
 *      @muonProfier
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonProfier = global.muonProfier || {})))
}(this, function (exports) { "use strict"

  let muonProfier = function muonProfier(__mapper = {}) {

    let f = __mapper("props")(),
			mwen = __mapper("xs").m("wen"),
			cwen = __mapper("xs").c("wen")(),
			bversor = __mapper("xs").b("versor")(),
			cversor = __mapper("xs").c("versor"),
			mstace = __mapper("xs").m("stace"),
			guniwen = __mapper("xs").g("uniwen")

    /****************************
 *      @projion
 *        get projection from proform and apply projection properties
 *        if control:wen  wen rotation and if 2d: wen z rotation
 *        if control:versor   versor rotation
 */
    let projion = function (prjdef, anigram) {
			
				let p = prjdef
				let prj = guniwen(p) // d3.geoIdentity()
			
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
		
 /* ***************************
 *     	 @projier
 *			 json = mprofier.projier(f.v(proform, anigram), anigram)(json)
 */			
    let projier =  (proform, anigram) => json => (proform) ? __mapper("xs").b("proj3ct")(json, projion(proform, anigram)) : json

    /****************************
 *     	 @ereformer
 */		
    let ereformer = anigram => {
			
			let projdef = anigram.payload.ereform
			let projer = projion(projdef, anigram)

			return json => __mapper("xs").b("proj3ct")(json, projer)
			
		}
    /****************************
 *     	 @conformer
 */		
    let conformer = anigram => {
			
			let projdef = anigram.payload.conform
			let projer = projion(projdef, anigram)

			return json => __mapper("xs").b("proj3ct")(json, projer)
			
		}		
    /****************************
 *     	 @proformer
 */		
    let proformer = anigram => {
			let uid = anigram.payload.uid
			let projdef = anigram.payload.proform
			if (projdef !== undefined && projdef.translate) {
				
					if (uid === "avanat_avanat_avaform") if (1 && 1) console.log("m.profier.proformer anigram", uid, projdef.translate.x)
				
					let translate = mstace.getLocations(projdef.translate, anigram)			
					
					if (uid === "avanat_avanat_avaform") if (1 && 1) console.log("..... m.profier.proformer translate", translate)
						projdef.translate = translate
					
			}
			let projer = projion(projdef, anigram)
			return json => __mapper("xs").b("proj3ct")(json, projer)
			
		}				
		
    /****************************
 *      @enty
 */
    let enty = function () {}
    enty.projion = projion
    enty.projier = projier
    enty.proformer = proformer
    enty.ereformer = ereformer
    enty.conformer = conformer

    return enty

  }

  exports.muonProfier = muonProfier

}));
