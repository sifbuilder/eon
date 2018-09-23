/****************************
 *      @muonProfier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonProfier = global.muonProfier || {})))
}(this, function (exports) {
  'use strict'

  // md: # eon-muon-profier
  // md: build geo projections
  // md:
  // md: ## functions
  // md: * ### getPrt
  // md:
  // md: ## methods
  // md: * ### formion
  // md: `formion (projdef, anigram)`
  // md: **get projection from projdef and apply projection properties**
  // md: if `@projdef` or `@projdef.projection` are not defined, assume `p.uniwen` identity
  // md: if `@projdef.translate != undefined`
  // md: * if pure array, translate to position
  // md: * if non-pure array, add translate positions
  // md: * if a position, `object` translate to position
  // md: * if other `object`, process as `stace.spot`
  // md:
  // md: if `@projdef.anod == 1` add `eofold.properties.eonode.geometry.coordinates` to translate
  // md:
  // md: if `@projdef.rotate != undefined`
  // md: * if is pure array, apply rotation
  // md: * if is 2d, apply z rotation
  // md: * if non-pure array, add multi-rotations
  // md:
  // md: if `@projdef.prerotation [[[ control:wen ]]]` apply wen control rotation
  // md: if `@projdef.prerotation [[[ control:versor ]]]` apply versor control rotation
  // md: if `@projdef.control:wen` apply wen control rotation
  // md: if `@projdef.control:versor` apply versor control rotation
  // md:
  // md: ### projer_
  // md: use: `muonProfier.projer_(prodef, anigram)(gj)
  // md: *get formion projector on gj*
  // md:
  // md: ### conformer_
  // md: use: `muonProfier.conformer_ (anigram)`
  // md: **get formion projector**
  // md: assumes `projection != undefined`
  // md: ```
  // md: projection: {
  // md: projection: 'natform',
  // md: form: anigram.eoload.conform
  // md: }
  // md: ```
  // md:
  // md: ### proformion
  // md: call `muonProfier.proformion (anigram)`
  // md: calls `formion(anigram.eoload.proform, anigram)`
  // md: **get proform projection from projdef**
  // md:
  // md: ### proformer
  // md:
  // md:
  // md: ### ereformion
  // md: ### ereformer

  async function muonProfier (__mapper = {}) {
    let [
      ctlWen,
      ctlVersor,
      muonProps,
      mwen,
      muonStace,
      muonProj3ct,
      muonGeom,
      puniwen,
    ] = await Promise.all([
      __mapper('xs').c('wen'),
      __mapper('xs').c('versor'),
      __mapper('xs').m('props'),
      __mapper('xs').m('wen'),
      __mapper('xs').m('stace'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').m('geom'),
      __mapper('xs').p('uniwen'),

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
        if (typeof projdef.projection === 'string') {
          let prtItem = projdef.projection
          let prt = __mapper(prtItem) // try eg. uniwen

          if (typeof projdef.projection === 'function') {
            geoproj = prt(projdef)
          } else {
            let ceon = __mapper('xs').ceonize(prtItem, 'prt')
            let prt = __mapper(ceon)

            console.assert(typeof prt === 'function', `prt ${prt} in ${projdef} from __mapper is not a function`)
            geoproj = prt(projdef)
          }
        } else if (muonProps.isFunction(projdef.projection)) { // if is projection
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

        if (projdef.anod && eonode) {
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
        let control = (projdef.control === 'wen') ? ctlWen
          : (projdef.control === 'versor') ? ctlVersor
            : undefined

        if (control !== undefined) {
          let controlRotation = control
            .projection(projection) // invert on projection
            .rotation() // rotation from control wen

          if (controlRotation) rot = muonGeom.add(rot, controlRotation)
        }

        let prerotate = projdef.prerotate

        if (prerotate) rot = muonGeom.add(rot, prerotate) // ADD prerotate

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
        } else {
          if (muonProps.isFunction(projection[key]) && value !== null) {
            if (1 && 1) console.log('this', key, value)

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
