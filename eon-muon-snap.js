/***********
 *    @muonSnap
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonSnap = global.muonSnap || {})))
}(this, function (exports) {
  'use strict'

  async function muonSnap (__mapper = {}) {
    let [
      mprops,
      mnat,
      mlacer,
      mgeoj,
      // d3,
      d3scale,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('nat'),
      __mapper('xs').m('lacer'),
      __mapper('xs').m('geoj'),
      // __mapper('xs').b('d3'),
      __mapper('xs').b('d3-scale'),
    ])

    // .................. snap  value (anima), t (unit time), snap flag, parent
    let snap = function (v, t = 0, g = 0, p = undefined) {
      // ____________________________________________________ un-tagged
      if (v === null) return null // 00 _____ o
      else if (typeof (v) === 'number') return v // 02 _____ num
      else if (typeof (v) === 'string') return v // 03 _____ str
      else if (mprops.isArray(v) && v.length === 0) return v // 04 _____ []
      else if (typeof (v) === 'function' &&
        g !== 1) {
        return v // 01 _____ fn v(t)
      } else if (mprops.isArray(v) && // 05 ____ [[ [ pure ] ]]  intra array interpolation
        mprops.isDoubleSingleArray(v) && // double array with single elem
        mprops.isPureArray(v[0][0]) && // single elem in double array is pure
        g !== 1
      ) {
        let ws = snap(v[0][0], t, 1)
        return ws
      } else if (mprops.isObject(v) && // 06 ___ v :: {}
          g !== 1) {
        let r = {}
        for (let y of Reflect.ownKeys(v)) {
          r[y] = snap(v[y], t, g, v) // reenter object
        }
        return r
      } else if (mprops.isDoubleArray(v) && // 07 [[ [ [], [] ] ]]   inter arrays interpolation
        mprops.isQuasiPureArray(v[0][0]) && // double array with array of arrays elem
        v[0][0].length === 1 &&
        g !== 1
      ) {
        let na = []
        for (let i = 0; i < v[0][0].length; i++) {
          let comp = v[0][0][i]

          let intra = snap(comp, t, 1)
          na.push(intra)
        }
        let ws = snap(na, t, 1) // scales of internal array

        return ws
      } else if (mprops.isArray(v) && // 08a ____ [[[ fn() ]]]
        mprops.isTripleArray(v) &&
        typeof v[0][0][0] === 'function' &&
        g !== 1
      ) {
        let fn = v[0][0][0]
        let ws
        if (typeof p === 'object') { // if method, call as object.method
          p.fn = fn
          ws = snap(p.fn(t), t, 0)
        } else {
          ws = snap(fn, t, 1) // snap function value
        }

        return ws
      } else if (mprops.isArray(v) && // 08 ____ [ [[ [ ], {} ]] ]
        mprops.isTripleArray(v) &&
        g !== 1
      ) {
        let ws = snap(v[0][0][0], t, 1) // scales of internal array

        return ws
      } else if (mprops.isArray(v) && // 09 ____ [[[ ], {}]] // last chance for the array
        g !== 1
      ) {
        let ws = v.map(d => snap(d, t, 0))
        return ws
      }

      // ____________________________________________________ tagged

      else if (typeof (v) === 'function' && // 01 _____ fn snappable time function
                                      g === 1) {
        return snap(v(t), t, 0)
      } else if (mprops.isObject(v) && // 10 ___ v :: {b, c, d ...}*
                                      g === 1) { // assume nat on object
        let ws

        let feature = mnat.natFeature(v) // async
        if (!mgeoj.isValid(feature)) console.error('gj not valid', v, feature)
        let geometry = feature.geometry
        let natRing
        if (geometry.type === 'LineString') {
          natRing = geometry.coordinates
        } else if (geometry.type === 'MultiLineString') {
          natRing = geometry.coordinates[0] // first line
        } else if (geometry.type === 'Polygon') {
          natRing = geometry.coordinates[0] // outer ring
        } else if (geometry.type === 'MultiPolygon') {
          natRing = geometry.coordinates[0][0] // outer ring of first polygon
        } else {
          console.log(`g type ${geometry.type} not supported`)
        }
        ws = snap(natRing, t, 1) // (13) snap [[x1,y1,z1],...,[xn,yn,zn]]
        return ws
      } else if (mprops.isArray(v) && // 11_____ [v]*
          mprops.isPureArray(v) &&
          v.length === 1 &&
          g === 1) {
        let d = [0, 1],
          r = [v[0], v[0]]
        let w = d3scale.scaleLinear().domain(d).range(r)
        return w(t)
      } else if (mprops.isArray(v) && // 12 _____ [v1,v2,v3]*
          mprops.isPureArray(v) &&
          v.length > 1 &&
          g === 1) {
        let d = v.map((item, idx) => idx / (v.length - 1))
        let r = v
        let w = d3scale.scaleLinear()
          .domain(d)
          .range(r)
        return w(t)
      } else if (mprops.isArray(v) && // 13 _____ [[a1,a2,a3],[b1,b2]]*
          mprops.isQuasiPureArray(v) && // => [[a1,b1],[a2,b1'],[a3,b2]]
          g === 1) { // [][] dosnap qualifier
        let ws = mlacer.unslide(v).filter(d => d.length > 0).map(d => snap(d, t, 1))
        return ws
      } else {
        return v
      }
    }

    // .................. enty
    let enty = {}
    enty.snap = snap

    return enty
  }

  exports.muonSnap = muonSnap
}))
