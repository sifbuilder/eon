/***************************
 *        @muonNat
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonNat = global.muonNat || {})))
}(this, function (exports) {
  'use strict'

  let isSame = function (a, b) {
    let ret = false
    if (a !== undefined && b !== undefined) {
      var aProps = Object.getOwnPropertyNames(a)
      var bProps = Object.getOwnPropertyNames(b)

      if (aProps.length != bProps.length) {
        return false
      }

      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i]

        if (a[propName] !== b[propName]) {
          return false
        }
      }

      ret = true
    }

    return ret
  }

  async function muonNat (__mapper = {}) {
    let [
      mgraticule,
      mprofier,
      mproj3ct,
      d3,
    ] = await Promise.all([
      __mapper('xs').m('graticule'),
      __mapper('xs').m('profier'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').b('d3'),

    ])
    let cache = {} // feature, form

    const cos = Math.cos, sin = Math.sin,
      neg = x => x < 0 || (x === 0 && (1 / x < 0)),
      pos = x => x > 0 || (x === 0 && (1 / x > 0)),
      radians = Math.PI / 180,
      degrees = 180 / Math.PI,
      tau = 2 * Math.PI

    let pow = Math.pow

    let functor = d => Array.isArray(d) ? d : Array.of(d)

    let ft = p => a => p.reduce((acc, cur, i) => acc + cur * pow(a, i), 0)

    let fn = form => // form has defined a1, a2, a3, a4  , q1, q2, q3, q4
      (q = 0, s = 0, u = 0, v = 0, a = 1, b = 1, c = 1, d = 1) => {
        let ret = ft(functor(form.c1))(a) * ft(functor(form.e1))(q) *
                    ft(functor(form.c2))(b) * ft(functor(form.e2))(s) *
                    ft(functor(form.c3))(c) * ft(functor(form.e3))(u) *
                    ft(functor(form.c4))(d) * ft(functor(form.e4))(v)

        return ret
      }

    // ............................. natNform
    let natNform = function (form, nformed = {}) {
      let defs = {'v0': 0, 'v1': 1, 'ra2': 120, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1} // defs

      if (form && typeof form === 'object' && // {nat}
            (form.x === undefined && form.y === undefined && form.z === undefined)) {
        nformed.x = Object.assign({}, defs, form)
        nformed.y = Object.assign({}, defs, form)
      } else if (form && typeof form === 'object' && // {x,y}
            (form.x !== undefined && form.y !== undefined)) {
        nformed.x = Object.assign({}, defs, form.x)

        nformed.y = Object.assign({}, defs, form.y)

        if (form.z !== undefined && form.r !== undefined) { // {x,y,z,r}
          nformed.z = Object.assign({}, defs, form.z)

          nformed.r = form.r
        } else if (form.z !== undefined && form.r === undefined) { // {x,y,z}
          nformed.z = Object.assign({}, defs, form.z)

          nformed.r = Object.assign({}, defs)
        }
      } else if (form && typeof form === 'object' && // form:{x:obj}
            (form.x !== undefined && form.y === undefined)) {
        nformed.x = Object.assign({}, defs, form.x)

        nformed.y = Object.assign({}, defs, (form.y || form.x))

        if (form.z !== undefined && form.r !== undefined) { // {x,y,z,r}
          nformed.z = form.z
          nformed.r = form.r
        } else if (form.z !== undefined && form.r === undefined) { // {x,y,z}
          nformed.z = Object.assign({}, defs, form.z)

          nformed.r = Object.assign({}, defs, form.z)
        }
      } else if (form && Array.isArray(form)) { // [x,y]
        nformed.x = form[0]
        nformed.y = form[1] || Object.assign({}, defs, form[0])

        if (form[2] !== undefined && form[3] !== undefined) { // [x,y,z,r]
          nformed.z = form[2]
          nformed.r = form[3]
        } else if (form[2] !== undefined && form[3] === undefined) { // [x,y,z]
          nformed.z = Object.assign({}, defs, form[2])
          nformed.r = Object.assign({}, defs, form[2])
        }
      }

      let formkeys = Object.keys(nformed)
      for (let i = 0; i < formkeys.length; i++) {
        let key = formkeys[i]
        let formDax = nformed[key]

        // dom3 --- axis domain
        if (i === 0 && formDax.dom3 === undefined) formDax.dom3 = [-180, 180]
        if (i === 1 && formDax.dom3 === undefined) formDax.dom3 = [-180, 180]
        if (i === 2 && formDax.dom3 === undefined) formDax.dom3 = [-90, 90]
        if (i === 3 && formDax.dom3 === undefined) formDax.dom3 = [-90, 90]

        if (formDax.fn0 === undefined && (

          formDax.e1 !== undefined ||
            formDax.e2 !== undefined ||
            formDax.e3 !== undefined ||
            formDax.e4 !== undefined ||

            formDax.c1 !== undefined ||
            formDax.c2 !== undefined ||
            formDax.c3 !== undefined ||
            formDax.c4 !== undefined)) {
          formDax.e1 = (formDax.e1 === undefined) ? functor(1) : functor(formDax.e1)
          formDax.e2 = (formDax.e2 === undefined) ? functor(1) : functor(formDax.e2)
          formDax.e3 = (formDax.e3 === undefined) ? functor(1) : functor(formDax.e3)
          formDax.e4 = (formDax.e4 === undefined) ? functor(1) : functor(formDax.e4)

          formDax.c1 = (formDax.c1 === undefined) ? 1 : formDax.c1
          formDax.c2 = (formDax.c2 === undefined) ? 1 : formDax.c2
          formDax.c3 = (formDax.c3 === undefined) ? 1 : formDax.c3
          formDax.c4 = (formDax.c4 === undefined) ? 1 : formDax.c4

          formDax.fn0 = fn(formDax)
        }

        // fn0 --- dimension function
        if (i === 0 && formDax.fn0 === undefined) formDax.fn0 = (q, s, u, v, a, b, c = 1, d = 1) => a * cos(q) * c * cos(u)
        if (i === 1 && formDax.fn0 === undefined) formDax.fn0 = (q, s, u, v, a, b, c = 1, d = 1) => b * sin(q) * c * cos(u)
        if (i === 2 && formDax.fn0 === undefined) formDax.fn0 = (q, s, u, v, a, b, c = 1, d = 1) => d * sin(v)
        if (i === 3 && formDax.fn0 === undefined) formDax.fn0 = (q, s, u, v, a, b, c = 1, d = 1) => c * cos(u)
      }

      return nformed
    }

    // ............................. natFeature
    let natFeature = function (form) {
      let feature

      if (isSame(form, cache.form)) {
        feature = cache.feature
        return feature
      } else {
        let nformed = natNform(form) // NFORM

        let geometry
        let dx, dy, sx, sy

        // if (Object.keys(nformed).length > 2 ) { // ___ 3d
        if (nformed.z !== undefined) { // ___ 3d
          dx = 360 / nformed.x.seg5 // x
          dy = 360 / nformed.z.seg5 // ____ z ___

          sx = dx
          sy = dy

          let xdomain = form.x.dom3 || [-180, 180]
          let ydomain = form.z.dom3 || [-90, 90] // ____ z ___

          let graticule = {frame: [ [ [...xdomain, sx, dx], [...ydomain, sy, dy] ] ]} // x, y

          geometry = mgraticule.vhMultiLine(graticule).geometry
          // geometry = mgraticule.hMultiLine(graticule).geometry
        } else { // ___ 2d
          dx = 360 / nformed.x.seg5 // x
          dy = 360 / nformed.y.seg5 // y
          sx = 360
          sy = 360

          let xdomain = nformed.x.dom3 || [-180, 180]
          let ydomain = nformed.y.dom3 || [-180, 180]

          // _e_
          let graticule = {frame: [ [ [...xdomain, sx, dx], [...ydomain, sy, dy] ] ]} // x, y
          geometry = mgraticule.vhMultiLine(graticule).geometry // geometry.type: MultiLineString

          let p = geometry.coordinates[1].slice(0, -1)

          // p = [...p, p[0]]  // close

          geometry.coordinates = Array.of(p)
        }

        let gj = {
          type: 'Feature',
          geometry: geometry,
          properties: {
            doc: 'nat',
            geonode: {
              type: 'Feature',
              geometry: {type: 'Point', coordinates: [0, 0, 0]},
              properties: {
                orgen: [0, 0, 0], velin: [0, 0, 0], velang: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
              },
            },
          },
        }

        return mprofier.formion_({ projection: 'natform', form: nformed })
          .then(projection => mproj3ct(gj, projection))
          .then(feature => {
            cache.form = form
            cache.feature = feature
            return feature
          })

        // let projection = mprofier.formion_({ projection: 'natform', form: nformed })
        // feature = mproj3ct(gj, projection)
        // cache.form = form
        // cache.feature = feature
        // return feature
      }
    }

    // ............................. closeFeature
    let closeFeature = function (feature) {
      let newFeature = Object.assign({}, feature)
      if (feature.type === 'Feature' && feature.geometry.type === 'MultiLineString') {
        newFeature.geometry.type = 'Polygon'
        newFeature.geometry.coordinates = newFeature.geometry.coordinates.map(line => [...line, line[0]])
      } else if (feature.type === 'Feature' && feature.geometry.type === 'LineString') {
        newFeature.geometry.type = 'Polygon'
        let line = newFeature.geometry.coordinates
        let closedline = [...line, line[0]]
        newFeature.geometry.coordinates = Array.of(closedline)
      }

      return newFeature
    }

    // ............................. rador  
    let rador = function (form) { // polarCoords
      let pts = []
      let t = 0
      let maxRadio = 0

      const {m1, m2, n1, n2, n3, a, b, v0, v1, seg5} = form
      const bform = {m1, m2, n1, n2, n3, a, b, v0, v1, seg5}

      if (isSame(bform, cache.bform)) {
        pts = cache.points
      } else {
        const angUnit = tau / seg5 // dots per period

        let angi = (form.angi) ? form.angi : (i, ang) => (i * ang) - Math.PI
        let abs = (form.abs) ? form.abs : Math.abs

        for (let i = 0; i < seg5; i++) {
          let ang = angi(i, angUnit * v1) // [0,360] => [-180,180] // v1

          let t1 = m1 * ang / 4
          let t2 = m2 * ang / 4

          t = Math.pow(

            Math.pow(abs(Math.cos(t1) / a), n2) // n2
                     +
                     Math.pow(abs(Math.sin(t2) / b), n3), // n3

            -1 / n1) // n1

          t = t * (1 + v0 * i)

          if (t > maxRadio) maxRadio = t
          pts.push(t)
        }

        let radUnit = 1 / maxRadio //  Math.SQRT1_2 / maxRadio  normalize
        pts = pts.map(d => d * radUnit)

        cache.bform = bform
        cache.points = pts
      }

      return pts // dots in path: [0,...,seg5] => [0,1]
    }

    // ............................. radorm     
    function radorm (form, s1extent = [-1, 1]) { //  radorm: [-1,1) => [-1,1]
      let radorPts = rador(form) //  rador:  [-1,1] => [0,seg5)
      let s1range = [0, radorPts.length - 1] // [0, seg5]

      let s2extent = d3.range(0, radorPts.length - 1) // [0,...,seg5]
      let s2range = radorPts // mormed form

      let s1 = d3.scaleLinear().domain(s1extent).range(s1range) // [-1,1] => [0,seg5]
      let s2 = d3.scaleLinear().domain(s2extent).range(s2range) // [0,..,seg5] => rador

      return p => s2(s1(p)) //  [0,1) =s1=> [0,seg5) =rador=> [0,1]
    }

    // ............................. natVertex
    let natVertex = function (form) { // getVertex
      let nformed = natNform(form) // natNform
      let unfeld = Object.values(nformed)
      let dominos = unfeld.map(d => d.dom3) // [ [-180,180], [-180,180], [-90,90], [-90,90] ]
      let radions = unfeld.map((d, i) => radorm(d, dominos[i])) // radorm
      let rayscale = unfeld.map((d, i) => p => radions[i](p * degrees)) // rayscale on degres

      let scale = [1, 1, 1], rotation = [0, 0, 0], location = [0, 0, 0], rad, wr, wd
      if (nformed) rad = scale = unfeld.map(dax => dax.ra2)
      if (nformed) wd = rotation = unfeld.map(dax => (dax.w4 || 0)) //  yfase

      let vertex = function (lambdaD, phiD = 0, radio = 1) { // spherical degrees
        let ppD = [] // pars in degrees
        ppD[0] = lambdaD + wd[0]
        ppD[1] = lambdaD + wd[1]
        ppD[2] = phiD + (wd[2] || 0)
        ppD[3] = phiD + (wd[3] || 0)

        let ppR = ppD.map(d => d * radians) // r,s,u,v : pars in radians per dax
        let rs = unfeld.map((d, i) => rayscale[i](ppR[i]) || 1) // a,b,c,d : radorn on dax par

        let rr = unfeld.map((d, i) => d.fn0(...ppR, ...rs)) // form.fn0 takes radians and radorns

        let point = unfeld.map((d, i) => radio * rad[i] * rr[i])

        let projpnt = (point[2] !== undefined)
          ? [ point[0], point[1], point[2] ] // 3D
          : [ point[0], point[1] ] // 2D
        return projpnt // [x,y,z]
      }

      return vertex
    }

    // ............................. enty
    let enty = function () {}

    enty.natFeature = natFeature
    enty.natNform = natNform
    enty.closeFeature = closeFeature
    enty.natVertex = natVertex
    enty.rador = rador
    enty.radorm = radorm

    return enty
  }

  exports.muonNat = muonNat
}))
