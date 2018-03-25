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
 *        get projection from prjdef and apply projection properties
 *        if control:wen  wen rotation and if 2d: wen z rotation
 *        if control:versor   versor rotation
 */
    let mappion = function (prjdef) {
      
      if (0 && 1) console.log("prjdef", prjdef)
      
      let prj, prjname  // projection and projection name

      if (prjdef !== undefined) {
        
        if (f.isString(prjdef.projection)) { // if _projection singular name
        
          prjname = prjdef
          prj = __mapper('xs').g(prjdef.projection)(prjname)

        }  else if (f.isArray(prjdef.projections)) { // if plural select one
        
          prj = prjdef.projections[ Math.round(prjdef.projectidx || 0) ]

          if (f.isString(prj)) { // if name in array
          
              prjname = prjdef
              prj = __mapper('xs').g(prjdef.projection)(prjname) // get projection from name
            
          }
          
        } else if (f.isFunction(prjdef.projection)) { // if is projection
        
          prj = prjdef.projection // props passed to projection

        } else {
          
          // default to uniwen projection
          prjname = 'uniwen'
          prj = __mapper('xs').g(prjdef.projection)(prjname) // get projection from name          
          
        }


        
        // if not uniwen, rotation and prerotation must be combined
        if (prjname !== 'uniwen' && prj.rotate !== undefined) {
          
          let rot = (prjdef.rotate) ? prjdef.rotate : [0, 0, 0]

          let dims = rot.length   // planar or spherical geometry
          if (rot.length == 2) rot[2] = 0

          let control
          if (prjdef.control === 'wen') control = cwen // WEN
          else if (prjdef.control === 'versor') control = cversor // VERSOR

          if (control !== undefined) {
            
         
              let controlRotation = control
                .projection(prj) // tbd
                .rotation() // rotation from control wen
if (1 && 1) console.log("control controlRotation", controlRotation)  
              rot = mgeom.add(rot, controlRotation)
 
              if (dims == 2) { // planar rotation
                rot = mwen.cross([rot[0], 0, 0], [0, rot[1], 0])
              }
              
              prjdef.rotate = rot
          }

        }

        
        let translate = prjdef.translate
        if (translate && f.isObject(translate) && f.isPosition(translate)) {
          translate = Object.values(translate) // translate {x,y,z} => [x,y,z]
          prjdef.translate = translate
        }

        
        for (let [key, value] of Object.entries(prjdef)) {
          if (f.isFunction(prj[key]) && value !== null) prj[key](value)
        }
      }
      return prj
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
 *       @proformion
 */
    let formion = (projdef, anigram = {}) => {

      let projection
    
      // the projection definition is in the payload
      
      let geofold = anigram.geofold,
        payload = anigram.payload
      
      
      if (projdef === undefined) {
        
        // if projection is not defined, default to uniwen with default configuration
        //
        projection = mappion({ 
          projection: 'uniwen',
        })
      
      } else {

          // initialize translate for projection definition
          //
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
if (0 && 1) console.log(" ****** anod", geofold.properties.uid, geofold.properties)          
            let geonode = geofold.properties.geonode  // geonode
            let nodetranslate = geonode.geometry.coordinates  // geonode coordinates for translate
            
            let daxes = Math.max(translate.length, nodetranslate.length)
            let addtranslate = d3.range(0, daxes, 1).map( (d,i) => (translate[i] || 0) + ((nodetranslate[i] || 0)))
            translate = addtranslate
            projdef.translate = translate
            
          }
          
          
          let rotate, prerotate = [] // initialize rotate for projection definition

          
          if (projdef.rotate) { rotate = projdef.rotate } // if rotate, then rotate
          
          if (projdef.prerotate) { prerotate = projdef.prerotate }

          if (projdef.projection !== 'uniwen') { // if not uniwen, add prerotate to rotate

            let daxes = Math.max(rotate.length, prerotate.length)
            let addrotate = d3.range(0, daxes, 1).map( (d,i) => (rotate[i] || 0) + ((prerotate[i] || 0)))
            rotate = addrotate          
            projdef.rotate = rotate     

            
          }
          
          projection = mappion(projdef)

      }
 
      return projection
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
