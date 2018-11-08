/*******************************************
   *    @muonWen
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonWen = global.muonWen || {})))
}(this, function (exports) {
  'use strict'

  // ... # eon-muon-wen
  // ... **wen functions**
  // ... ref.: https://github.com/wenliang-developer
  // ... ref.: https://codepen.io/wenliang-developer/pen/gMwvXR
  // ... ref.: https://github.com/wenliang-developer/web-developer-site
  // ... # license
  // ... MIT

  async function muonWen (__mapper = {}) {
    function clip (n, m, M) { return n < M ? n > m ? n : m : M }
    function comeCloser (n, goal, factor, limit) {
      return (limit && Math.abs(goal - n) < limit) ? goal : n + (goal - n) / (factor || 10)
    }
    function dist (a, b) {
      let dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2]
      return Math.sqrt(dx * dx + dy * dy + dz * dz)
    }
    function normalize (v) {
      let l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
      return [v[0] / l, v[1] / l, v[2] / l]
    }
    function projection (p, d, s) { // distance, focale, scale
      // let f = (s || 1) / (1 - p[2] / d);
      // return [p[0]*f, p[1]*f, p[2]];
      let h = Array.isArray(s) ? s : Array.of(s)
      let f0 = (h[0] || 1) / (1 - p[2] / d)
      let f1 = (h[1] || h[0]) / (1 - p[2] / d)
      let f2 = h[2] || 1    // _e_
      return [p[0] * f0, p[1] * f1, p[2] * f2]
    }
    function rotateX (p, a) {
      let d = Math.sqrt(p[2] * p[2] + p[1] * p[1]),
        na = Math.atan2(p[2], p[1]) + a
      return [p[0], d * Math.cos(na), d * Math.sin(na)]
    }
    function rotateY (p, a) {
      let d = Math.sqrt(p[2] * p[2] + p[0] * p[0]),
        na = Math.atan2(p[0], p[2]) + a
      return [d * Math.sin(na), p[1], d * Math.cos(na)]
    }
    function rotateZ (p, a) {
      let d = Math.sqrt(p[1] * p[1] + p[0] * p[0]),
        na = Math.atan2(p[1], p[0]) + a
      return [d * Math.cos(na), d * Math.sin(na), p[2]]
    }
    function rotateMatrix (p, m) {
      return [
        p[0] * m[0] + p[1] * m[3] + p[2] * m[6],
        p[0] * m[1] + p[1] * m[4] + p[2] * m[7],
        p[0] * m[2] + p[1] * m[5] + p[2] * m[8],
      ]
    }
    function transpose33 (m) { // invert rotation
      return [
        m[0], m[3], m[6],
        m[1], m[4], m[7],
        m[2], m[5], m[8],
      ]
    }
    function rotate3dMatrix (x, y, z, a) {
      let c = 1 - Math.cos(a), s = Math.sin(a)
      return [
        1 + c * (x * x - 1), x * y * c + z * s, x * z * c - y * s,
        x * y * c - z * s, 1 + c * (y * y - 1), y * z * c + x * s,
        x * z * c + y * s, y * z * c - x * s, 1 + c * (z * z - 1),
      ]
    }
    function mul33 (m, n) {
      let m1 = m[0], m2 = m[1], m3 = m[2],
        m4 = m[3], m5 = m[4], m6 = m[5],
        m7 = m[6], m8 = m[7], m9 = m[8]

      let n1 = n[0], n2 = n[1], n3 = n[2],
        n4 = n[3], n5 = n[4], n6 = n[5],
        n7 = n[6], n8 = n[7], n9 = n[8]

      return [
        m1 * n1 + m4 * n2 + m7 * n3, m2 * n1 + m5 * n2 + m8 * n3, m3 * n1 + m6 * n2 + m9 * n3,
        m1 * n4 + m4 * n5 + m7 * n6, m2 * n4 + m5 * n5 + m8 * n6, m3 * n4 + m6 * n5 + m9 * n6,
        m1 * n7 + m4 * n8 + m7 * n9, m2 * n7 + m5 * n8 + m8 * n9, m3 * n7 + m6 * n8 + m9 * n9,
      ]
    }
    function chainMul33 (base) {
      for (let i = 1, l = arguments.length; i < l; i++) { base = mul33(base, arguments[i]) }
      return base
    }
    function dot (a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
    }
    function cross (a, b) {
      return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
      ]
    }
    function sub (a, b) {
      return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
    }

    function add (a, b) {
      return a.map((d, i) => d + b[i])
    }

    function matrix (rotate, rotBase = [1, 0, 0, 0, 1, 0, 0, 0, 1]) {
      let mx = rotate3dMatrix(1, 0, 0, rotate[0]),
        my = rotate3dMatrix(0, 1, 0, rotate[1]),
        mz = rotate3dMatrix(0, 0, 1, rotate[2])
      let rotMatrix = chainMul33(mx, my, mz, rotBase)
      return rotMatrix
    }

    // ...................... enty
    let enty = function enty () {}

    enty.clip = clip
    enty.comeCloser = comeCloser
    enty.dist = dist
    enty.normalize = normalize
    enty.projection = projection
    enty.rotateX = rotateX
    enty.rotateY = rotateY
    enty.rotateZ = rotateZ
    enty.rotateMatrix = rotateMatrix
    enty.transpose33 = transpose33
    enty.rotate3dMatrix = rotate3dMatrix
    enty.mul33 = mul33
    enty.chainMul33 = chainMul33
    enty.dot = dot
    enty.cross = cross
    enty.sub = sub
    enty.add = add
    enty.matrix = matrix

    return enty
  }

  exports.muonWen = muonWen
}))
