/****************************
 *      @muonProfier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonProfier = global.muonProfier || {})))
}(this, function (exports) {
  'use strict'

  async function muonProfier (__mapper = {}) {
    let [
      mprops,
      mwen,
      mstace,
      mproj3ct,
      mgeom,
      cwen,
      cversor,
      puniwen,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('wen'),
      __mapper('xs').m('stace'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').m('geom'),
      __mapper('xs').c('wen'),
      __mapper('xs').c('versor'),
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
          let prjItem = projdef.projection
          let prj = __mapper(prjItem) // try eg. uniwen

          if (typeof projdef.projection === 'function') {
            geoproj = prj(projdef)
          } else {
            let ceon = __mapper('xs').ceonize(prjItem, 'prj')
            let prj = __mapper(ceon)

            console.assert(typeof prj === 'function', `prj ${prj} is not a function`)
            geoproj = prj(projdef)
          }
        } else if (mprops.isFunction(projdef.projection)) { // if is projection
          geoproj = projdef.projection // props passed to projection _
        }
      }

      return geoproj
    }

    // ............................. formion
    function formion (projdef, anigram = {}) {
      let projection
      let projname

      let payload = anigram.payload,
        geofold = payload.geofold,
        geonode = payload.geonode

      let translation, rotation

      if (typeof projdef !== 'object') { // projdef is object
        projection = d => d
        return projection // id
      }
      projection = getPrt(projdef)

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
          translation = mstace.getTranspot(projdef.translate, anigram) // get transpot - anigram
        }

        if (projdef.anod && geofold.properties && geofold.properties.geonode) {
          if (geonode.geometry && geonode.geometry.coordinates !== undefined) {
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

      return projection
    }

    // ............................. projer_
    function projer_ (prodef, anigram) { // projer_ is fenrir if no prodef
      return json => mproj3ct.project(json, formion(prodef))
    }

    // ............................. uniweon
    let uniweon = projdef => puniwen(projdef)

    // ............................. conformion
    function conformion (anigram) {
      console.assert(typeof anigram === 'object', 'anigram is not object')

      let prj = anigram.payload.conform

      let res = null
      if (typeof prj === 'object' && prj.projection === undefined) {
        prj = {
          projection: 'natform',
          form: prj,
        }
        res = formion(prj, anigram)
      }

      if (typeof prj === 'function') {
        res = formion(prj, anigram)
      }

      return res
    }

    const conformer = anitem => json => mproj3ct.project(json, conformion(anitem))

    // ............................. ereformion
    function ereformion (anigram) {
      console.assert(typeof anigram === 'object', 'anigram is not object')

      let prj = anigram.payload.ereform

      let res = null
      if (prj) {
        res = formion(prj, anigram)
      }
      return res
    }

    const ereformer = anitem => json => mproj3ct.project(json, ereformion(anitem))

    // ............................. proformion
    function proformion (anigram) {
      console.assert(typeof anigram === 'object', 'anigram is not object')

      let prj = anigram.payload.proform

      let res = null
      if (prj) {
        res = formion(prj, anigram)
      }
      return res
    }

    const proformer = anitem => json => mproj3ct.project(json, proformion(anitem))

    // ............................. enty
    let enty = function () {}
    enty.formion = formion
    enty.projer_ = projer_

    enty.proformion = proformion
    enty.proformer = proformer

    enty.ereformion = ereformion
    enty.ereformer = ereformer

    enty.conformion = conformion
    enty.conformer = conformer

    enty.uniweon = uniweon

    return enty
  }

  exports.muonProfier = muonProfier
}))
