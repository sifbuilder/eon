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
    let protion = function (prjdef, anigram) {
      let p = prjdef
      let prj = guniwen(p)

      if (p !== undefined) {
        if (f.isString(p.projection)) { // if _projection singular name
          prj = __mapper('xs').g(p.projection)(p) // props
        } else if (f.isFunction(p.projection)) { // if is projection
          prj = p.projection // props passed to projection
        } else if (f.isArray(p.projections)) { // if plural select one
          prj = p.projections[ Math.round(p.projectidx || 0) ]

          if (f.isString(prj)) { // if name in array
            prj = __mapper('xs').g(prj)(p) // get projection from name
          }
        }

        if (prj.rotate !== undefined) {
          let rot = (p.rotate) ? p.rotate : [0, 0, 0]
          let controlRotation = mgeom.zerovector(rot)

          let control
          if (p.control === 'versor') control = cversor // VERSOR
          else control = cwen // WEN

          controlRotation = control
            .projection(prj) // tbd
            .rotation() // rotation from control wen

          if (controlRotation.length == 2) { // planar form
            if (controlRotation[0] * controlRotation[1] !== 0) {
              controlRotation = mwen.cross([controlRotation[0], 0, 0], [0, controlRotation[1], 0])
            }
          }

          rot = mgeom.add(rot, controlRotation)

          p.rotate = rot
        }

        let translate = p.translate
        if (f.isObject(translate) && f.isPosition(translate)) {
          translate = Object.values(translate) // translate is {x,y,z}
          p.translate = translate
        }

        let center = p.center
        if (f.isObject(center) && f.isPosition(center)) {
          center = Object.values(center) // center is {x,y,z}
          p.center = center
        }

        for (let [key, value] of Object.entries(p)) {
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
      json => (prodef) ? mproj3ct(json, protion(prodef, anigram)) : json

    /****************************
 *       @ereformer
 */
    let ereformer = anigram => {
      let projdef = anigram.payload.ereform
      let projer = protion(projdef, anigram)

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
        let projection = protion(projdef, anigram)
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

        let projection = protion(projdef, anigram)

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
