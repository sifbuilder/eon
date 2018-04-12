/****************************
 *      @muonProfier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonProfier = global.muonProfier || {})))
}(this, function (exports) {
  'use strict'

  let muonProfier = function muonProfier (__mapper = {}) {
    let f = __mapper('props')(),
      cwen = __mapper('xs').c('wen')(),
      cversor = __mapper('xs').c('versor'),
      mwen = __mapper('xs').m('wen'),
      mstace = __mapper('xs').m('stace'),
      mproj3ct = __mapper('xs').m('proj3ct'),
      mgeom = __mapper('xs').m('geom'),
      guniwen = __mapper('xs').g('uniwen')



    /* ***************************
 *      ##getProj
 *       - get projection from projdef and apply projection properties

 */
      let getProj = function (projdef) {

					if (1 && 1) console.log( 'projdef', projdef)

          let geoproj

					if (projdef === undefined) {

							if (2 && 2) console.log("** m.profier.formion projdef undefined", projdef)
							geoproj = formion({projection: 'uniwen',})
							geoproj = guniwen({})

					} else if (typeof projdef === 'function') {
						geoproj = projdef

					}	else if (Array.isArray(projdef)) {

							for (let i=0; i<projdef.length; i++) {	// projdef is now object

								let prop = projdef[i]
								if (prop.projection !== undefined) geoproj = getProj(prop.projection)
								break

							}


					} else if (typeof projdef === 'object') {
							if (f.isString(projdef.projection)) { // if _projection singular name


								geoproj = __mapper('xs').g(projdef.projection)(projdef)

							}  else if (f.isArray(projdef.projections)) { // if plural select one

								geoproj = projdef.projections[ Math.round(projdef.projectidx || 0) ]

								if (f.isString(geoproj)) { // if name in array


									geoproj = __mapper('xs').g(geoproj)(projdef) // get projection from name

								} else {

									if (2 && 2) console.log("m.profier.formion index proj not name", projdef)
									geoproj = guniwen({})
									return geoproj

								}

							} else if (f.isFunction(projdef.projection)) { // if is projection

								geoproj = projdef.projection // props passed to projection

							} else {


								let projname = 'uniwen'  // default to uniwen projection
								geoproj = __mapper('xs').g(projdef.projection)(projname) // get projection from name

							}
					}

        return geoproj
      }


		// ***************************
		// // ##formion
		// // - projdef
		// // - anigram
		// // get projection from projdef and apply projection properties
    // //  if projdef is not defined, uniwen with default configuration
    // //  if projdef.projection is not defined, idem.
		// //
		// //  if projdef includes anod, add geonode location to translate
		// //
    // //  if control:wen, wen control rotation
    // //  if control:versor, versor control rotation
		// //  if projdef.rotate is 2d, z rotation
		// //
		// //  if projdef.rotate is defined, projection rotation is calculated


    let formion = function (projdef, anigram = {}) {

if (1 && 1) console.log('projdef', anigram, projdef)

			let projection
      let projname

      let geofold = anigram.geofold,
        payload = anigram.payload


			if (Array.isArray(projdef)) {	// projdef is array of property objects

				let anod = 0
				for (let i=0; i<projdef.length; i++) {	// projdef is now object

					let prop = projdef[i]

					if (2 && 2 & typeof prop !== 'object') console.log("* prop not object", prop)
					if (prop['production'] !== undefined) projection =  getProj(prop['production'])
					break
				}
				for (let i=0; i<projdef.length; i++) {	// get anod

					let prop = projdef[i]
					if (2 && 2 & typeof prop !== 'object') console.log("* prop not object", prop)
					if (prop['anod'] !== undefined) anod =  prop['anod']
					break
				}

				for (let i=0; i<projdef.length; i++) {	// projdef is now object
					let prop = projdef[i]
					if (1 && 1) console.log('prop', prop)



				}

			}


			if (typeof projdef === 'object') {	// projdef is object

					projection =  getProj(projdef)

          let translation, rotation

          if (projdef.translate) {		// TRANSLATE
						if (typeof projdef.translate === 'object' && f.isPosition(projdef.translate)) {
								projdef.translate = Object.values(projdef.translate)
						}
						translation = projdef.translate

						if (projdef.anod && geofold.properties && geofold.properties.geonode) {
							let geonode = geofold.properties.geonode  // geonode
							let nodetranslate = geonode.geometry.coordinates  // geonode coordinates for translate

							let daxes = Math.max(translate.length, nodetranslate.length)
							let addtranslate = d3.range(0, daxes, 1).map( (d,i) => (translate[i] || 0) + ((nodetranslate[i] || 0)))
							translation = addtranslate

						}
          }


					if (projection.rotate !== undefined) { 	// ROTATE


						let rot = [0,0,0] // projection.rotate()

						let projrot = projdef.rotate || [0,0,0]	// default to 3d

						if (projrot) rot = mgeom.add(rot, projrot)

						let control = (projdef.control === 'wen') ? cwen
							: (projdef.control === 'versor') ? cversor
							: undefined


						if (control !== undefined)  {


							let controlRotation = control
								.projection(projection) // invert on projection
								.rotation() // rotation from control wen

							if (controlRotation) rot = mgeom.add(rot, controlRotation) // ADD controlRotation

						}


						let prerotate = projdef.prerotate
						if (prerotate) rot = mgeom.add(rot, prerotate) // ADD prerotate


						let dims = projrot.length   // planar or spherical geometry
						if (dims == 2)  rot = mwen.cross([rot[0], 0, 0], [0, rot[1], 0]) // planar rot

						rotation = rot
					}


					for (let [key, value] of Object.entries(projdef)) {	// projdef is now object

						if (key === 'projection') { // bypass projection
						} else if (key === 'control') { // bypass control
						} else if (key === 'rotate') { // rotate rotation
							projection.rotate(rotation)
						} else if (key === 'translate') { // translate translation
							projection.translate(translation)
						} else if (f.isFunction(projection[key]) && value !== null) {
							projection[key](value)
						}

				}


			}



      return projection
    }
   /* ***************************
 *       @projer
 *       json = mprofier.projer(f.v(prodef, anigram), anigram)(json)
 */
    let projer = (prodef, anigram) => // projer is fenrir if no prodef
      json => (prodef) ? mproj3ct(json, formion(prodef)) : json


    /****************************
 *       @conformer
 */
    let conformer = anigram => {

      let projion
      let projdef = anigram.payload.conform

      if (projdef === undefined) {

        projion = d => d  // identity if conformed undefined

      }  else {

        if (projdef.projection === undefined) {
          projdef = {     // natform if projection undefined
            projection: 'natform', // default to natform
            form: projdef  // form is conform
          }

        }

        let projection = formion(projdef)
        projion = json => mproj3ct(json, projection)
      }

      return projion
    }

    /****************************
 *       @proform
 */
    let proformion = anigram => formion(anigram.payload.proform , anigram)
    let proformer = anitem => json => mproj3ct(json, proformion(anitem))

    /****************************
 *       @ereform
 */
    let ereformion = anigram => formion(anigram.payload.ereform , anigram)
    let ereformer = anitem => json => mproj3ct(json, ereformion(anitem))

    /****************************
 *      @enty
 */

   let enty = function () {}
    enty.formion = formion
    enty.formion = formion
    enty.projer = projer

    enty.proformion = proformion
    enty.proformer = proformer

    enty.ereformion = ereformion
    enty.ereformer = ereformer

    enty.conformer = conformer

    return enty
  }

  exports.muonProfier = muonProfier
}))
