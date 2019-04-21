/****************************
 *      @eonMuonProfier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonMuonProfier = global.eonMuonProfier || {})))
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
  // ... **addNodeToTranslate**: if `@projdef.addNodeToTranslate : 1` add `eonode.geometry.coordinates` to proton.translate
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
  // ... use: `eonMuonProfier.projer_(prodef, anigram)(gj)
  // ... *get formion projector on gj*

  async function eonitem (__eo = {}) {
    let [
      eonMuonProps,
      eonMuonWen,
      eonMuonStace,
      eonMuonProj3ct,
      eonMuonGeom,
      eonProtonUniwen,
    ] = await Promise.all([
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-muon-wen'),
      __eo('xs').b('eon-muon-stace'),
      __eo('xs').b('eon-muon-proj3ct'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-proton-uniwen'),

    ])

    // ............................. getPrt
    function getPrt (projdef) {
      console.assert(!Array.isArray(projdef))

      let geoproj = null

      if (projdef === undefined) {
        geoproj = eonProtonUniwen({})
      } else if (typeof projdef === 'string') {
        let proton = __eo(projdef) || __eo([projdef, 'proton'])
        if (proton !== null) {
          geoproj = proton({})
        }
      } else if (typeof projdef === 'function') {
        geoproj = projdef
      } else if (typeof projdef === 'object') {
        if (typeof projdef.projection === 'string') { // if string
          let prtItem = projdef.projection
          let proton = __eo(prtItem) || __eo([prtItem, 'proton'])
          if (proton !== null) { // try eg. eonProtonUniwen
            geoproj = proton(projdef)
          } else {
            geoproj = null
          }
        } else if (typeof projdef.projection === 'function') { // if projection _e_
          // let proton = projdef.projection // props passed to projection _
          // geoproj = proton(projdef)
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

      projection = getPrt(projdef)

      if (projdef.translate) { // TRANSLATE proj method
        if (eonMuonProps.isPureArray(projdef.translate)) {
          translation = projdef.translate
        } else if (Array.isArray(projdef.translate)) {
          let _trans = []
          for (let k = 0; k < projdef.translate.length; k++) {
            _trans = eonMuonGeom.add(_trans, projdef.translate[k])
          }
          translation = _trans
        } else if (typeof projdef.translate === 'object' && eonMuonProps.isPosition(projdef.translate)) {
          translation = Object.values(projdef.translate)
        } else if (typeof projdef.translate === 'object') {
          translation = eonMuonStace.getTranspot(projdef.translate, anigram) // get transpot - anigram
        }

        if (projdef.addNodeToTranslate && eonode) {
          if (eonode.geometry && eonode.geometry.coordinates !== undefined) {
            let nodetranslate = eonode.geometry.coordinates // eonode coords

            translation = eonMuonGeom.add(translation, nodetranslate)
          }
        }
      }

      if (projection.rotate !== undefined) { // ROTATE proj method
        let rot = [0, 0] // projection.rotate()

        let projrot = projdef.rotate || [0, 0, 0] // default to 3d
        if (eonMuonProps.isPureArray(projrot)) {
          //
        } else { // if multi rotates
          let _rot = []
          for (let k = 0; k < projrot.length; k++) {
            _rot = eonMuonGeom.add(_rot, projrot[k])
          }
          projrot = _rot
        }
        rot = eonMuonGeom.add(rot, projrot)
        let control = projdef.control

        if (control !== undefined) {
          let controlRotation = control
            .projection(projection) // invert on projection
            .rotation() // rotation from control wen

          if (controlRotation) rot = eonMuonGeom.add(rot, controlRotation)
        }

        let prerotate = projdef.prerotate
        if (prerotate) rot = eonMuonGeom.add(rot, prerotate) // ADD prerotate

        let dims = projrot.length // planar or spherical geometry
        if (dims === 2) rot = eonMuonWen.cross([Math.sqrt(rot[0]), 0, 0], [0, Math.sqrt(rot[1]), 0]) // planar rot

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
          if (eonMuonProps.isFunction(projection[key]) && value !== null) {
            projection[key](value)
          }
        }
      }

      return projection
    }

    // ............................. projer_
    function projer_ (prodef, anigram) { // projer_ is fenrir if no prodef
      return json => eonMuonProj3ct.project(json, formion(prodef))
    }

    // ............................. uniweon
    let uniweon = projdef => eonProtonUniwen(projdef)

    // ............................. enty
    let enty = () => { }
    enty.formion = formion
    enty.getPrt = getPrt
    enty.projer_ = projer_
    enty.uniweon = uniweon

    return enty
  }

  exports.eonMuonProfier = eonitem
}))
