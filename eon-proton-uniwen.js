/*******************************************
 *    @eonProtonUniwen
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonProtonUniwen = global.eonProtonUniwen || {})))
}(this, function (exports) {
  'use strict'

  async function eonitem (__eo = {}) {
    let [
      d3Geo,
      eonMuonGeom,
      eonMuonProps,
      eonMuonWen,
    ] = await Promise.all([
      __eo('xs').b('d3-geo'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-muon-wen'),
    ])

    const init = {}
    init.scale = [1, 1, 1]
    init.prerotate = [0, 0, 0]
    init.rotate = [0, 0, 0]
    init.translate = [0, 0, 0]
    init.center = [0, 0, 0]
    init.lens = [0, 1, Infinity]

    let state = {}
    state.scale = init.scale
    state.rotate = init.rotate
    state.translate = init.translate
    state.center = init.center
    state.lens = init.lens

    let wenRotation = function (rot) {
      console.assert(rot !== undefined, `p.uniwen.wenRotation rot undefined`)

      let rox = eonMuonWen.matrix(eonMuonGeom.to_radians(rot))
      return function (x, y, z = 0) {
        return eonMuonWen.rotateMatrix([x, y, z], rox)
      }
    }

    let wenRotInverse = function (rot) {
      console.assert(rot !== undefined, `p.uniwen.wenRotation rot undefined`)
      let rox = eonMuonWen.matrix(eonMuonGeom.to_radians(rot))
      let invrox = eonMuonWen.transpose33(rox)
      return function (x, y, z = 0) {
        return eonMuonWen.rotateMatrix([x, y, z], invrox)
      }
    }

    let wenFocalInverse = function (p, d, s) {
      let h = Array.isArray(s) ? s : Array.of(s)
      let f0 = (h[0] || 1) / (1 - p[2] / d)
      let f1 = (h[1] || h[0]) / (1 - p[2] / d)
      return [p[0] / f0, p[1] / f1, p[2]]
    }

    // .................. wenProjInvert
    let wenProjInvert = function (point) {
      let rotate = state.rotate,
        scale = state.scale,
        translate = state.translate || [0, 0, 0],
        lens = state.lens

      let x = point[0]
      let y = point[1]
      let z = point[2] || 0

      let c = [x, y, z]

      if (eonMuonProps.isPureArray(translate)) {
        c = c.map((d, i) => d - (translate[i] || 0)) // inverse translate
      } else { // assume multiple translates
        for (let k = 0; k < translate.length; k++) {
          let trans = translate[k] // if {} assume {x,y,z} => [,,]
          if (typeof trans === 'object') trans = Object.values(trans).map(d => d || 0)
          c = c.map((d, i) => d - (trans[i] || 0)) // translate
        }
      }

      c = wenFocalInverse([ c[0], c[1], z ], lens[2], scale) //   inverse projection

      c = [ c[0], c[1], (c[2] - lens[0]) / lens[1] ] // inverse focus

      c = wenRotInverse(rotate)(...c) //   inverse rotation

      return c
    }

    // .................. pointStream
    let pointStream = function (x, y, z) {
      let rotate = state.rotate,
        scale = state.scale,
        translate = state.translate || [0, 0, 0],
        lens = state.lens

      let c = [x, y, z]
      let rot = []
      if (eonMuonProps.isPureArray(rotate)) {
        rot = rotate
      } else { // assume multiple translates
        for (let k = 0; k < rotate.length; k++) {
          rot = eonMuonGeom.add(rot, rotate[k])
        }
      }

      c = wenRotation(rot)(...c) // rotate

      c = [ c[0], c[1], (c[2] * lens[1]) + lens[0] ] // focus
      c = eonMuonWen.projection(c, lens[2], scale) // project

      if (eonMuonProps.isPureArray(translate)) {
        c = c.map((d, i) => d + (translate[i] || 0)) // translate
      } else { // assume multiple translates
        let trans = []
        for (let k = 0; k < translate.length; k++) {
          trans = eonMuonGeom.add(trans, translate[k])
        }
      }

      this.stream.point(...c)
    }

    // .................. uniprofion
    let uniprofion = () => {
      let geoTrans = d3Geo.geoTransform({
        point: pointStream,
        sphere: d => d })

      let geoProj = p => geoTrans(p)

      geoProj.stream = s => geoTrans.stream(s)

      geoProj.invert = wenProjInvert

      return geoProj
    }

    // .................. enty
    let enty = function (prtdef = {}) {
      let m = uniprofion(prtdef)

      state = Object.assign({}, init, prtdef) // reste proj state

      m.translate = _ => (_ !== undefined) ? (state.translate = _, m) : state.translate
      m.rotate = _ => (_ !== undefined) ? (state.rotate = _, m) : state.rotate
      m.scale = _ => (_ !== undefined) ? (state.scale = _, m) : state.scale
      m.lens = _ => (_ !== undefined) ? (state.lens = _, m) : state.lens

      return m
    }

    return enty
  }

  exports.eonProtonUniwen = eonitem
}))
