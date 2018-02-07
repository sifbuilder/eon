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
 *      @protion
 *        get projection from proform and apply projection properties
 *        if control:wen  wen rotation and if 2d: wen z rotation
 *        if control:versor   versor rotation
 */
    let protion = function (prjdef) {
      if (0 && 1) console.log('m.profier.protion:prjdef', prjdef)
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

        if (prj.rotate !== undefined) {
          let rot = (prjdef.rotate) ? prjdef.rotate : [0, 0, 0]

          let dims = rot.length		// planar or spherical geometry
          if (rot.length == 2) rot[2] = 0

          let control
          if (prjdef.projection === 'uniwen' || prjdef.control === 'wen') control = cwen // WEN
          else control = cversor // VERSOR

          let controlRotation = control
            .projection(prj) // tbd
            .rotation() // rotation from control wen

          rot = mgeom.add(rot, controlRotation)

          if (dims == 2) { // planar rotation
            rot = mwen.cross([rot[0], 0, 0], [0, rot[1], 0])
          }

          prjdef.rotate = rot
        }

        let translate = prjdef.translate
        if (f.isObject(translate) && f.isPosition(translate)) {
          translate = Object.values(translate) // translate is {x,y,z}
          prjdef.translate = translate
        }

        let center = prjdef.center
        if (f.isObject(center) && f.isPosition(center)) {
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
 *       @projier
 *       json = mprofier.projier(f.v(prodef, anigram), anigram)(json)
 */
    let projier = (prodef, anigram) => // projer is fenrir if no prodef
      json => (prodef) ? mproj3ct(json, protion(prodef)) : json

    /****************************
 *       @ereformer
 */
    let ereformer = anigram => {
      let projdef = anigram.payload.ereform
      let projer = protion(projdef)

      return json => mproj3ct(json, projer)
    }
    /****************************
 *       @conformer
 */
    let conformer = anigram => {
      let projdef = anigram.payload.conform

      let projer

      if (projdef === undefined) {
        projer = d => d
      } else {
        let projection = protion(projdef)
        projer = json => mproj3ct(json, projection)
      }

      return projer
    }
    /****************************
 *       @proformer
 */
    let proformer = anigram => {
      let uid = anigram.payload.uid
      let projdef = anigram.payload.proform

      let projer
      if (projdef === undefined) {
        projer = d => d
      } else {
        if (projdef.translate) {
          let translates = mstace.getLocations(projdef.translate, anigram)
          let translate = translates[0] // translate is first translate

          projdef.translate = translate
        }

        let projection = protion(projdef)

        projer = json => { // anigram
          let proformed = mproj3ct(json, projection) // proform geoform

          return proformed
        }
      }

      return projer
    }

    /****************************
 *      @enty
 */
    let enty = function () {}
    enty.protion = protion
    enty.projier = projier
    enty.proformer = proformer
    enty.ereformer = ereformer
    enty.conformer = conformer

    return enty
  }

  exports.muonProfier = muonProfier
}))
