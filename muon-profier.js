/****************************
 *      @muonProfier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonProfier = global.muonProfier || {})))
}(this, function (exports) {
  'use strict'

  
//md: # md:{filename}
//md: build geo projections

//md: ## functions
//md: * ### getProj 
//md: 
//md: ## methods
//md: * ### formion
//md: `formion (projdef, anigram)`
//md: **get projection from projdef and apply projection properties**
//md:  if `@projdef` or `@projdef.projection` are not defined, assume `p.uniwen` identity
//md:  if `@projdef.translate != undefined` 
//md:  * if pure array, translate to position
//md:  * if non-pure array, add translate positions
//md:  * if a position, `object` translate to position
//md:  * if other `object`, process as `stace.spot`
//md:  
//md:  if `@projdef.anod == 1` add `geofold.properties.geonode.geometry.coordinates` to translate
//md:
//md:  if `@projdef.rotate != undefined` 
//md:  * if is pure array, apply rotation
//md:  * if is 2d, apply z rotation
//md:  * if non-pure array, add multi-rotations
//md:  
//md:  if `@projdef.prerotation [[[ control:wen ]]]` apply wen control rotation
//md:  if `@projdef.prerotation [[[ control:versor ]]]` apply versor control rotation
//md:  if `@projdef.control:wen` apply wen control rotation
//md:  if `@projdef.control:versor` apply versor control rotation
//md:  
//md: ### projer
//md: use: `mprofier.projer(prodef, anigram)(gj)
//md: *get formion projector on gj*
//md: 
//md: ### conformer
//md: use: `mprofier.conformer (anigram)`
//md: **get formion projector**
//md: assumes `projection != undefined`
//md: ```
//md:  projection: {
//md:   projection: 'natform',
//md:   form: anigram.payload.conform
//md:  }
//md: ```
//md: 
//md: ### proformion
//md: call `mprofier.proformion (anigram)`
//md: calls `formion(anigram.payload.proform, anigram)`
//md: **get proform projection from projdef**
//md: 
//md: ### proformer
//md: 
//md: 
//md: ### ereformion
//md: ### ereformer
//md: 

  let muonProfier = function muonProfier (__mapper = {}) {
    let f = __mapper('props')(),
      cwen = __mapper('xs').c('wen')(),
      cversor = __mapper('xs').c('versor'),
      mwen = __mapper('xs').m('wen'),
      mstace = __mapper('xs').m('stace'),
      mproj3ct = __mapper('xs').m('proj3ct'),
      mgeom = __mapper('xs').m('geom'),
      guniwen = __mapper('xs').g('uniwen')

      //  getProj
      let getProj = function (projdef) {

          if (0 && 1) console.log( 'projdef', projdef)

          let geoproj

          if (projdef === undefined) {

              if (2 && 2) console.log("** m.profier.formion projdef undefined", projdef)
              geoproj = formion({projection: 'uniwen',})
              geoproj = guniwen({})

          } else if (typeof projdef === 'function') {
            geoproj = projdef

          } else if (Array.isArray(projdef)) {

              for (let i=0; i<projdef.length; i++) {  // projdef is now object

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



    // formion
    let formion = function (projdef, anigram = {}) {


      let projection
      let projname

      let geofold = anigram.geofold,
        payload = anigram.payload

      let translation, rotation
        
        
      if (typeof projdef === 'object') {  // projdef is object

          projection =  getProj(projdef)

        
          if (projdef.translate) {    // TRANSLATE proj method

            if (f.isPureArray(projdef.translate)) {
                translation = projdef.translate
                
            } else if (Array.isArray(projdef.translate)) {
              let _trans = []
              for (let k = 0; k < projdef.translate.length; k++) {
                _trans = mgeom.add(_trans, projdef.translate[k])
              }
              translation = _trans
              
            } else if (typeof projdef.translate === 'object' && f.isPosition(projdef.translate)) {
               translation = Object.values(projdef.translate)
                
            } else if (typeof projdef.translate === 'object') {
              
               translation = mstace.getTranspot(projdef.translate, anigram.payload) 
            }              
            


            if (projdef.anod && geofold.properties && geofold.properties.geonode) {
              let geonode = geofold.properties.geonode  // geonode
              let nodetranslate = geonode.geometry.coordinates  // geonode coords
              translation = mgeom.add(translation, nodetranslate)

            }
          }          
          
          if (projection.rotate !== undefined) {  // ROTATE proj method

            let rot = [0,0] // projection.rotate()

            let projrot = projdef.rotate || [0,0,0] // default to 3d
            if (f.isPureArray(projrot)) {
                projrot = projrot
            } else { // if multi rotates
              let _rot = []
              for (let k = 0; k < projrot.length; k++) {
                _rot = mgeom.add(_rot, projrot[k])
              }
              projrot = _rot
            }
            rot = mgeom.add(rot, projrot)

            let control = (projdef.control === 'wen') ? cwen
              : (projdef.control === 'versor') ? cversor
              : undefined


            if (control !== undefined)  {

              let controlRotation = control
                .projection(projection) // invert on projection
                .rotation() // rotation from control wen

              if (controlRotation) rot = mgeom.add(rot, controlRotation)

            }


            let prerotate = projdef.prerotate
if (0 && 1) console.log("prerotate",projdef, prerotate)            
            if (prerotate) rot = mgeom.add(rot, prerotate) // ADD prerotate


            let dims = projrot.length   // planar or spherical geometry
            if (dims == 2)  rot = mwen.cross([rot[0], 0, 0], [0, rot[1], 0]) // planar rot

            rotation = rot
          }


          for (let [key, value] of Object.entries(projdef)) { // projdef is now object

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
    
    // projer
    let projer = (prodef, anigram) => // projer is fenrir if no prodef
      json => (prodef) ? mproj3ct(json, formion(prodef)) : json


    // conformer
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

    //  proformion
    let proformion = anigram => formion(anigram.payload.proform , anigram)
    let proformer = anitem => json => mproj3ct(json, proformion(anitem))

    //  ereformion
    let ereformion = anigram => formion(anigram.payload.ereform , anigram)
    let ereformer = anitem => json => mproj3ct(json, ereformion(anitem))


   // enty
   let enty = function () {}
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
