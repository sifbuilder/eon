/****************************
 *      @muonProfier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonProfier = global.muonProfier || {})))
}(this, function (exports) {
  'use strict'

  // ... **build geo projections**
  // ...
  // ... ## functions
  // ... * ### getPrt
  // ...
  // ...
  // ... ## methods
  // ... * ### formion
  // ... `formion (projdef, anigram)`
  // ... **get projection from projdef and apply projection properties**
  // ... if `@projdef` or `@projdef.projection` are not defined, assume `p.uniwen` identity
  // ... if `@projdef.translate != undefined`
  // ... * if pure array, translate to position
  // ... * if non-pure array, add translate positions
  // ... * if a position, `object` translate to position
  // ... * if other `object`, process as `stace.spot`
  // ...
  // ... **geoanod**: if `@projdef.geoanod : 1` add `eonode.geometry.coordinates` to prt.translate
  // ...
  // ... if `@projdef.rotate != undefined`
  // ... * if is pure array, apply rotation
  // ... * if is 2d, apply z rotation
  // ... * if non-pure array, add multi-rotations
  // ...
  // ... if `@projdef.prerotation [[[ control:wen ]]]` apply wen control rotation
  // ... if `@projdef.prerotation [[[ control:versor ]]]` apply versor control rotation
  // ... if `@projdef.control:wen` apply wen control rotation
  // ... if `@projdef.control:versor` apply versor control rotation
  // ...
  // ... * ### projer_
  // ... use: `muonProfier.projer_(prodef, anigram)(gj)
  // ... *get formion projector on gj*

  async function muonProfier (__eo = {}) {
    let [
      muonProps,
      muonWen,
      muonStace,
      muonProj3ct,
      muonGeom,
      puniwen,
    ] = await Promise.all([
      __eo('xs').m('props'),
      __eo('xs').m('wen'),
      __eo('xs').m('stace'),
      __eo('xs').m('proj3ct'),
      __eo('xs').m('geom'),
      __eo('xs').p('uniwen'),

    ])

    // ............................. getPrt
    function getPrt (projdef) {
      console.assert(!Array.isArray(projdef))

      let geoproj = puniwen() // default to p.uniwen
      console.assert(projdef !== undefined, 'm.profier.formion projdef undefined')

      if (projdef === undefined) {
        geoproj = puniwen({})
      } else if (typeof projdef === 'function') {
        geoproj = projdef
      } else if (typeof projdef === 'object') {
        if (typeof projdef.projection === 'string') { // if string
          let prtItem = projdef.projection
          let prt = __eo(prtItem) // try eg. uniwen

          if (typeof projdef.projection === 'function') {
            geoproj = prt(projdef)
          } else {
            let ceon = __eo('xs').ceonize(prtItem, 'prt')
            let prt = __eo(ceon)

            console.assert(typeof prt === 'function', `prt ${prt} in ${projdef} from __eo is not a function`)
            geoproj = prt(projdef)
          }
        } else if (muonProps.isFunction(projdef.projection)) { // if projection
          geoproj = projdef.projection // props passed to projection _
        }
      }

      return geoproj
    }

    // ............................. formion
    function formion (projdef, anigram = {}) {
      let projection
      let projname

      let eoload = anigram.eoload,
        eofold = anigram.eofold,
        eonode = anigram.eonode

      let translation, rotation

      if (typeof projdef !== 'object') { // projdef is object
        projection = d => d
        return projection // id
      }
      projection = getPrt(projdef)

      if (projdef.translate) { // TRANSLATE proj method
        if (muonProps.isPureArray(projdef.translate)) {
          translation = projdef.translate
        } else if (Array.isArray(projdef.translate)) {
          let _trans = []
          for (let k = 0; k < projdef.translate.length; k++) {
            _trans = muonGeom.add(_trans, projdef.translate[k])
          }
          translation = _trans
        } else if (typeof projdef.translate === 'object' && muonProps.isPosition(projdef.translate)) {
          translation = Object.values(projdef.translate)
        } else if (typeof projdef.translate === 'object') {
          translation = muonStace.getTranspot(projdef.translate, anigram) // get transpot - anigram
        }

        if (projdef.geoanod && eonode) {
          if (eonode.geometry && eonode.geometry.coordinates !== undefined) {
            let nodetranslate = eonode.geometry.coordinates // eonode coords
            translation = muonGeom.add(translation, nodetranslate)
          }
        }
      }

      if (projection.rotate !== undefined) { // ROTATE proj method
        let rot = [0, 0] // projection.rotate()

        let projrot = projdef.rotate || [0, 0, 0] // default to 3d
        if (muonProps.isPureArray(projrot)) {
          projrot = projrot
        } else { // if multi rotates
          let _rot = []
          for (let k = 0; k < projrot.length; k++) {
            _rot = muonGeom.add(_rot, projrot[k])
          }
          projrot = _rot
        }
        rot = muonGeom.add(rot, projrot)
        let control = projdef.control

        if (control !== undefined) {
          let controlRotation = control
            .projection(projection) // invert on projection
            .rotation() // rotation from control wen

          if (controlRotation) rot = muonGeom.add(rot, controlRotation)
        }

        let prerotate = projdef.prerotate

        if (prerotate) rot = muonGeom.add(rot, prerotate) // ADD prerotate

        let dims = projrot.length // planar or spherical geometry
        if (dims == 2) rot = muonWen.cross([ Math.sqrt(rot[0]), 0, 0], [0, Math.sqrt(rot[1]), 0]) // planar rot

        rotation = rot
      }

      for (let [key, value] of Object.entries(projdef)) { // object
        if (key === 'projection') { // bypass projection

        } else if (key === 'control') { // bypass control

        } else if (key === 'rotate') { // rotate rotation
          projection.rotate(rotation)
        } else if (key === 'translate') { // translate translation
          projection.translate(translation)
        } else {
          if (muonProps.isFunction(projection[key]) && value !== null) {
            projection[key](value)
          }
        }
      }

      return projection
    }

    // ............................. projer_
    function projer_ (prodef, anigram) { // projer_ is fenrir if no prodef
      return json => muonProj3ct.project(json, formion(prodef))
    }

    // ............................. uniweon
    let uniweon = projdef => puniwen(projdef)

    // ............................. enty
    let enty = function () {}
    enty.formion = formion
    enty.projer_ = projer_
    enty.uniweon = uniweon

    return enty
  }

  exports.muonProfier = muonProfier
}))
