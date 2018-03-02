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

    /****************************
 *      @profion
 *        get projection from proform and apply projection properties
 *        if control:wen  wen rotation and if 2d: wen z rotation
 *        if control:versor   versor rotation
 */
    let profion = function (prjdef) {
      let prj = guniwen(prjdef)

      if (prjdef !== undefined) {
        if (f.isString(prjdef.projection)) { // if _projection singular name
          prj = __mapper('xs').g(prjdef.projection)(prjdef) // props

        } else if (f.isFunction(prjdef.projection)) { // if is projection
          prj = prjdef.projection // props passed to projection

        } else if (f.isArray(prjdef.projections)) { // if plural select one
          prj = prjdef.projections[ Math.round(prjdef.projectidx || 0) ]

          if (f.isString(prj)) { // if name in array
            prj = __mapper('xs').g(prj)(prjdef) // get projection from name
          }
        }

        // if (prj.rotate !== undefined) {
          // let rot = (prjdef.rotate) ? prjdef.rotate : [0, 0, 0]

          // let dims = rot.length   // planar or spherical geometry
          // if (rot.length == 2) rot[2] = 0

          // let control
          // if (prjdef.projection === 'uniwen' || prjdef.control === 'wen') control = cwen // WEN
          // else control = cversor // VERSOR

          // let controlRotation = control
            // .projection(prj) // tbd
            // .rotation() // rotation from control wen

          // rot = mgeom.add(rot, controlRotation)

          // if (dims == 2) { // planar rotation
            // rot = mwen.cross([rot[0], 0, 0], [0, rot[1], 0])
          // }

          // prjdef.rotate = rot
        // }


        let translate = prjdef.translate
        if (translate && f.isObject(translate) && f.isPosition(translate)) {
          translate = Object.values(translate) // translate is {x,y,z}
          prjdef.translate = translate
        }

        let center = prjdef.center
        if (translate && f.isObject(center) && f.isPosition(center)) {
          center = Object.values(center) // center is {x,y,z}
          prjdef.center = center
        }

        for (let [key, value] of Object.entries(prjdef)) {
          if (f.isFunction(prj[key])) prj[key](value)
        }
      }
      return prj
    }

    /* ***************************
 *       @projer
 *       json = mprofier.projer(f.v(prodef, anigram), anigram)(json)
 */
    let projer = (prodef, anigram) => // projer is fenrir if no prodef
      json => (prodef) ? mproj3ct(json, profion(prodef)) : json

    /****************************
 *       @ereformer
 */
    let ereformer = anigram => {
      let projdef = anigram.payload.ereform
      let projion = profion(projdef)

      return json => mproj3ct(json, projion)
    }
    /****************************
 *       @conformer
 */
    let conformer = anigram => {
      let projdef = anigram.payload.conform

      let projion

      if (projdef === undefined) {
        
        projion = d => d
        
      } else {
        
        let projection = profion(projdef)
        projion = json => mproj3ct(json, projection)
        
      }

      return projion
    }
    /****************************
 *       @proformion
 */
    let proformion = anigram => {

      let projection
    
      // the proform projection defintion is in the payload
      
      let projdef =  anigram.payload.proform
      
      if (projdef === undefined) {
        
        // if projection is not define, 
        //    default to uniwen with default configuration
        
        projection = profion({ 
          'projection': 'uniwen',
        })
      
      } else {

          let geofold = anigram.geofold

          
          // initialize translate for projection definition
          //
          
          let translate = []

          // if translate, then
          //      translate to translate
          
          if (projdef.translate) {
              translate = mstace.getTranspot(projdef.translate, anigram)
          }

          
          // if geonode defined, then
          //      translate geofold by geonode location
          
          if (geofold.properties && geofold.properties.geonode) { 
            let geonode = geofold.properties.geonode
            let nodetranslate = geonode.geometry.coordinates
            
            let daxes = Math.max(translate.length, nodetranslate.length)
            let addtranslate = d3.range(0, daxes, 1).map( (d,i) => (translate[i] || 0) + ((nodetranslate[i] || 0)))
            translate = addtranslate
            projdef.translate = translate
            
          }
          
          
          // initialize rotate for projection definition
          //
          
          let rotate, prerotate = []

          // if rotate, then
          //        rotate
          
          if (projdef.rotate) {
              rotate = projdef.rotate
          }
          
          if (projdef.prerotate) {
              prerotate = projdef.prerotate
          }

          // if projection not uniwen, then
          //        prerotate to be added to rotate
          
          if (projdef.projection !== 'uniwen') {

            let daxes = Math.max(rotate.length, prerotate.length)
            let addrotate = d3.range(0, daxes, 1).map( (d,i) => (rotate[i] || 0) + ((prerotate[i] || 0)))
            rotate = addrotate          
            projdef.rotate = rotate            
            
          }
          
          
          projection = profion(projdef)

      }
 
      return projection
    }
    
    /****************************
 *       @proformer
 */
    let proformer = anitem => json => mproj3ct(json, proformion(anitem))
 
 
    /****************************
 *      @enty
 */
    let enty = function () {}
    enty.profion = profion
    enty.projer = projer
    
    enty.proformion = proformion
    enty.proformer = proformer
    
    enty.ereformer = ereformer
    
    enty.conformer = conformer

    return enty
  }

  exports.muonProfier = muonProfier
}))
