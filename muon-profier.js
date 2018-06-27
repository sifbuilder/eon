/****************************
 *      @muonProfier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonProfier = global.muonProfier || {})))
}(this, function (exports) {
  'use strict'

  // md: # md:{filename}
  // md: build geo projections

  // md: ## functions
  // md: * ### getProj_
  // md:
  // md: ## methods
  // md: * ### formion_
  // md: `formion_ (projdef, anigram)`
  // md: **get projection from projdef and apply projection properties**
  // md:  if `@projdef` or `@projdef.projection` are not defined, assume `p.uniwen` identity
  // md:  if `@projdef.translate != undefined`
  // md:  * if pure array, translate to position
  // md:  * if non-pure array, add translate positions
  // md:  * if a position, `object` translate to position
  // md:  * if other `object`, process as `stace.spot`
  // md:
  // md:  if `@projdef.anod == 1` add `geofold.properties.geonode.geometry.coordinates` to translate
  // md:
  // md:  if `@projdef.rotate != undefined`
  // md:  * if is pure array, apply rotation
  // md:  * if is 2d, apply z rotation
  // md:  * if non-pure array, add multi-rotations
  // md:
  // md:  if `@projdef.prerotation [[[ control:wen ]]]` apply wen control rotation
  // md:  if `@projdef.prerotation [[[ control:versor ]]]` apply versor control rotation
  // md:  if `@projdef.control:wen` apply wen control rotation
  // md:  if `@projdef.control:versor` apply versor control rotation
  // md:
  // md: ### projer_
  // md: use: `mprofier.projer_(prodef, anigram)(gj)
  // md: *get formion_ projector on gj*
  // md:
  // md: ### conformer_
  // md: use: `mprofier.conformer_ (anigram)`
  // md: **get formion_ projector**
  // md: assumes `projection != undefined`
  // md: ```
  // md:  projection: {
  // md:   projection: 'natform',
  // md:   form: anigram.payload.conform
  // md:  }
  // md: ```
  // md:
  // md: ### proformion_
  // md: call `mprofier.proformion_ (anigram)`
  // md: calls `formion_(anigram.payload.proform, anigram)`
  // md: **get proform projection from projdef**
  // md:
  // md: ### proformer
  // md:
  // md:
  // md: ### ereformion_
  // md: ### ereformer
  // md:

  async function muonProfier (__mapper = {}) {

    let [
            cwen,
            cversor,
            mprops,
            mwen,
            mstace,
            mproj3ct,
            mgeom,
            guniwen,
       ] = await Promise.all([
          __mapper('xs').c('wen'),          
          __mapper('xs').c('versor'),          
          __mapper('xs').m('props'),
          __mapper('xs').m('wen'),
          __mapper('xs').m('stace'),
          __mapper('xs').m('proj3ct'),
          __mapper('xs').m('geom'),
          __mapper('xs').g('uniwen')

       ])


    // ............................. getProj_
    async function getProj_(projdef) {
      let geoproj

      if (projdef === undefined) {
        
        if (2 && 2) console.log('** m.profier.formion_ projdef undefined', projdef)
        geoproj = formion_({projection: 'uniwen'})
        geoproj = guniwen({})
        
      } else if (typeof projdef === 'function') {
        
        geoproj = projdef
        
      } else if (Array.isArray(projdef)) {
        for (let i = 0; i < projdef.length; i++) { // projdef is now object
          let prop = projdef[i]
          if (prop.projection !== undefined) geoproj = getProj_(prop.projection)
          break
        }
        
      } else if (typeof projdef === 'object') {
        
        if (mprops.isString(projdef.projection)) { // if _projection singular name
        
          // let mapperName = __mapper('xs').eonize(projdef.projection, 'geo')
          // if (1 && 1) console.log('mapperName', mapperName)
          // geoproj = __mapper(mapperName)
            // .then(prj => prj(projdef))
            // if (1 && 1) console.log('geoproj', geoproj)
          
          let prj = await __mapper('xs').g(projdef.projection)         
          geoproj = prj(projdef)
          
        } else if (mprops.isArray(projdef.projections)) { // if plural select one
        
          geoproj = projdef.projections[ Math.round(projdef.projectidx || 0) ]

          if (mprops.isString(geoproj)) { // if name in array
          
            geoproj = await __mapper('xs').g(geoproj)(projdef) // get projection from name
            
          } else {
            
            if (2 && 2) console.log('m.profier.formion_ index proj not name', projdef)
            geoproj = guniwen({})
            return geoproj
            
          }
          
        } else if (mprops.isFunction(projdef.projection)) { // if is projection
        
          geoproj = projdef.projection // props passed to projection
          
        } else {
          
          let projname = 'uniwen' // default to uniwen projection
          
          geoproj =await  __mapper('xs').g(projdef.projection)(projname) // get projection from name
          
        }
      }

      return geoproj
    }

    // ............................. formion_
    async function formion_(projdef, anigram = {}) {
        let projection
        let projname

        let geofold = anigram.geofold,
          payload = anigram.payload

        let translation, rotation

        if (typeof projdef !== 'object') { // projdef is object
        
            // if (2 && 2) console.log('getProj_ is not object', projdef)
            projection = d => d 
            return  projection // id
            
        }
        projection = await getProj_(projdef)

        if (projdef.translate) { // TRANSLATE proj method
          if (mprops.isPureArray(projdef.translate)) {
            translation = projdef.translate
          } else if (Array.isArray(projdef.translate)) {
            let _trans = []
            for (let k = 0; k < projdef.translate.length; k++) {
              _trans = mgeom.add(_trans, projdef.translate[k])
            }
            translation = _trans
          } else if (typeof projdef.translate === 'object' && mprops.isPosition(projdef.translate)) {
            translation = Object.values(projdef.translate)
          } else if (typeof projdef.translate === 'object') {
            translation = mstace.getTranspot(projdef.translate, anigram)
          }

          if (projdef.anod && geofold.properties && geofold.properties.geonode) {
            let geonode = geofold.properties.geonode // geonode
            if (geonode.geometry && geonode.geometry.coordinate !== undefined) {
              let nodetranslate = geonode.geometry.coordinates // geonode coords
              translation = mgeom.add(translation, nodetranslate)
            }
          }
        }

        if (projection.rotate !== undefined) { // ROTATE proj method
          let rot = [0, 0] // projection.rotate()

          let projrot = projdef.rotate || [0, 0, 0] // default to 3d
          if (mprops.isPureArray(projrot)) {
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

          if (control !== undefined) {
            let controlRotation = control
              .projection(projection) // invert on projection
              .rotation() // rotation from control wen

            if (controlRotation) rot = mgeom.add(rot, controlRotation)
          }

          let prerotate = projdef.prerotate

          if (prerotate) rot = mgeom.add(rot, prerotate) // ADD prerotate

          let dims = projrot.length // planar or spherical geometry
          if (dims == 2) rot = mwen.cross([ Math.sqrt(rot[0]), 0, 0], [0, Math.sqrt(rot[1]), 0]) // planar rot

          rotation = rot
        }

        for (let [key, value] of Object.entries(projdef)) { // object
          if (key === 'projection') { // bypass projection
          } else if (key === 'control') { // bypass control
          } else if (key === 'rotate') { // rotate rotation
            projection.rotate(rotation)
          } else if (key === 'translate') { // translate translation
            projection.translate(translation)
          } else if (mprops.isFunction(projection[key]) && value !== null) {
            projection[key](value)
          }
        }
      // }

      return projection
    }

    // ............................. projer_
    function projer_ (prodef, anigram) { // projer_ is fenrir if no prodef
      return json => mproj3ct.project(json,  formion_(prodef))
    }
    
    // ............................. conformer_
    async function conformer_ (anigram) {
      
      let projion = null
      
      let projdef = anigram.payload.conform
      if (projdef === undefined) {
        
        projion = d => d // identity if conformed undefined
        
      } else {
        if (projdef.projection === undefined) {
          projdef = { // natform if projection undefined
            projection: 'natform', // default to natform
            form: projdef // form is conform
          }
        }

        let projection = await formion_(projdef)
        projion = json => mproj3ct.project(json, formion_(projdef))
      }

      return projion
    }

    // ............................. proformion_
    function proformion_(anigram) {
      
        if (1 && 1) console.log('proformion_', anigram.payload.proform)

        let res = null
        let prj = anigram.payload.proform
        if (prj) {
          return formion_(prj, anigram)
        } else {
          return res
        }
        
    }
    
    const proformer = anitem => json => mproj3ct.project(json, proformion_(anitem))

    // ............................. ereformion_
    function ereformion_(anigram) {
       
      let res = null
      let prj = anigram.payload.ereform
      if (prj) {
        return formion_(prj, anigram)
      } else {
        return res
      }
        
    }   
    const ereformer = anitem => json => mproj3ct.project(json, ereformion_(anitem))

    // ............................. enty
    let enty = function () {}
    enty.formion_ = formion_ 
    enty.projer_ = projer_ 

    enty.proformion_ = proformion_ 
    enty.proformer = proformer 

    enty.ereformion_ = ereformion_ 
    enty.ereformer = ereformer 

    enty.conformer_ = conformer_  

    return enty
  }

  exports.muonProfier = muonProfier
}))
