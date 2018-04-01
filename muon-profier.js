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
 *      @mappion
 *        get projection from projdef and apply projection properties
 *        if control:wen  wen rotation and if 2d: wen z rotation
 *        if control:versor   versor rotation
 */
 
     let mappion = projdef => formion(projdef) 
 

      let getProj = function(projdef) {
   
          let geoproj
   
          if (f.isString(projdef.projection)) { // if _projection singular name

            let projname = projdef
            geoproj = __mapper('xs').g(projdef.projection)(projname)

          }  else if (f.isArray(projdef.projections)) { // if plural select one

            geoproj = projdef.projections[ Math.round(projdef.projectidx || 0) ]

            if (f.isString(geoproj)) { // if name in array


              geoproj = __mapper('xs').g(geoproj)(projdef) // get projection from name

            } else {

              if (2 && 2) console.log("m.profier.mappion index proj not name", projdef)
              geoproj = guniwen({})
              return geoproj        
              
            }

          } else if (f.isFunction(projdef.projection)) { // if is projection

            geoproj = projdef.projection // props passed to projection

          } else {

            
            let projname = 'uniwen'  // default to uniwen projection
            geoproj = __mapper('xs').g(projdef.projection)(projname) // get projection from name

          }   
   
        return geoproj
      }
 
 
    /****************************
 *       @proformion
 */
    let formion = (projdef, anigram = {}) => {

      if (0 && 1) console.log("projdef", projdef.rotate)
    
      let projection, geoproj, projname

      // projection definition comes with the payload
      let geofold = anigram.geofold,
        payload = anigram.payload


      if (projdef === undefined || projdef.projection === undefined) {

        // if projection is not defined, default to uniwen with default configuration
        //
          if (2 && 2) console.log("m.profier.mappion projdef undefined", projdef)
          geoproj = mappion({projection: 'uniwen',})
          geoproj = guniwen({})

      } else {

        /****************************
         *      @TRANSLATE
         */
          let translate = []

          // if translate, then translate
          //
          if (projdef.translate) {
              if (typeof projdef.translate === 'object' && f.isPosition(projdef.translate)) {
                  projdef.translate = Object.values(projdef.translate)
              }
              // translate = mstace.getTranspot(projdef.translate, payload) // _e_
              translate = projdef.translate
          }

          // ///
          // if projection includes anod, translate geofold by geonode
          //
          if (projdef.anod && geofold.properties && geofold.properties.geonode) {
            let geonode = geofold.properties.geonode  // geonode
            let nodetranslate = geonode.geometry.coordinates  // geonode coordinates for translate

            let daxes = Math.max(translate.length, nodetranslate.length)
            let addtranslate = d3.range(0, daxes, 1).map( (d,i) => (translate[i] || 0) + ((nodetranslate[i] || 0)))
            translate = addtranslate
            projdef.translate = translate

          }

          
        /****************************
         *      @ROTATE
         */
          let rotate, prerotate = [] // initialize rotate for projection definition


          if (projdef.rotate) { rotate = projdef.rotate } // if rotate, then rotate
          if (projdef.prerotate) { prerotate = projdef.prerotate }


          geoproj = getProj(projdef)
 
          if (geoproj.rotate === undefined) { // NO rotation in projection
            
            if (2 && 2) console.log("m.profier.mappion rotate undefined", geoproj)
            
          } 
          let control // rotation control
           
          if (projdef.control === 'wen') control = cwen // WEN
          else if (projdef.control === 'versor') control = cversor // VERSOR
          else control = cwen // WEN
            
          let projrot = projdef.rotate ? projdef.rotate : [0, 0, 0]
          let dims = projrot.length   // planar or spherical geometry
          if (dims == 2)  rot = mwen.cross([rot[0], 0, 0], [0, rot[1], 0]) // planar rot

          
          projdef.projection = geoproj    // projdef has geoproj
          let controlRotation = control
            .projection(projdef) // invert on projection
            .rotation() // rotation from control wen
     
  if (1 && 1) console.log("controlRotation", controlRotation)   
  
          // let rot = mgeom.add(projrot, controlRotation) // ADD rotations
          let rot = controlRotation // ADD rotations
          projdef.rotate = rot

      }
     
     
        delete projdef.projection
        delete projdef.control
        
   
        for (let [key, value] of Object.entries(projdef)) {
       
          if (f.isFunction(geoproj[key]) && value !== null) geoproj[key](value)
        }      
      
      return geoproj
    }
   /* ***************************
 *       @projer
 *       json = mprofier.projer(f.v(prodef, anigram), anigram)(json)
 */
    let projer = (prodef, anigram) => // projer is fenrir if no prodef
      json => (prodef) ? mproj3ct(json, mappion(prodef)) : json


    /****************************
 *       @conformer
 */
    let conformer = anigram => {

      let projdef = anigram.payload.conform
      let projion

      if (projdef === undefined) {

        projion = d => d  // identity if conformed undefined

      }  else {

        if (projdef.projection === undefined) {
          projdef = {     // natform if projection undefined
            projection: 'natform', // default to natform
            form: projdef  // form is conform
          }

        }

        let projection = mappion(projdef)
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
    enty.mappion = mappion
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
