/***************************
 *        @muonNat
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonNat = global.muonNat || {})))
}(this, function (exports) {
  'use strict'

  async function muonNat (__mapper = {}) {
    let [
      mprops,
      mgraticule,
      mprofier,
      mproj3ct,
      d3scale,
      d3array,
      d3geo,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('graticule'),
      __mapper('xs').m('profier'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').b('d3-scale'),
      __mapper('xs').b('d3-array'),
      __mapper('xs').b('d3-geo'),

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

    // p:[0,n], a => p[i] * a**i
    let ft = p => a => p.reduce((acc, cur, i) => acc + cur * pow(a, i), 0)

    // c0,c1,c2,c3: radius (default to 1)
    // e1 [-2pi,2pi],e2[-2pi,2pi],e3[-pi,pi],e4[-pi,pi]: radian-angles (default to 0)
    // fn: c0[i] * c0**i
    let fn = form =>
      (e0 = 0, e1 = 0, e2 = 0, e3 = 0, c0 = 1, c1 = 1, c2 = 1, c3 = 1) => {
        e0 = form.e0 !== undefined ? form.e0 : 0
        e1 = form.e1 !== undefined ? form.e1 : 0
        e2 = form.e2 !== undefined ? form.e2 : 0
        e3 = form.e3 !== undefined ? form.e3 : 0

        c0 = form.c0 !== undefined ? form.c0 : 1
        c1 = form.c1 !== undefined ? form.c1 : 1
        c2 = form.c2 !== undefined ? form.c2 : 1
        c3 = form.c3 !== undefined ? form.c3 : 1

        let ret = ft(functor(form.c0))(c0) * ft(functor(form.e0))(e0) *
                  ft(functor(form.c1))(c1) * ft(functor(form.e1))(e1) *
                  ft(functor(form.c2))(c2) * ft(functor(form.e2))(e2) *
                  ft(functor(form.c3))(c3) * ft(functor(form.e3))(e3)

        return ret
      }

    let nformparams = form => {
      let e0 = form.e0 !== undefined ? form.e0 : 0
      let e1 = form.e1 !== undefined ? form.e1 : 0
      let e2 = form.e2 !== undefined ? form.e2 : 0
      let e3 = form.e3 !== undefined ? form.e3 : 0

      let c0 = form.c0 !== undefined ? form.c0 : 1
      let c1 = form.c1 !== undefined ? form.c1 : 1
      let c2 = form.c2 !== undefined ? form.c2 : 1
      let c3 = form.c3 !== undefined ? form.c3 : 1

      return [e0, e1, e2, e3, c0, c1, c2, c3]
    }

    let isunpar = formDax => formDax.e0 === undefined &&
                            formDax.e1 === undefined &&
                            formDax.e2 === undefined &&
                            formDax.e3 === undefined &&
                            formDax.c0 === undefined &&
                            formDax.c1 === undefined &&
                            formDax.c2 === undefined &&
                            formDax.c3 === undefined

    let fndefaults = [
      (e0, e1, e2, e3, c0, c1, c2 = 1, c3 = 1) => c0 * cos(e0) * c2 * cos(e2),
      (e0, e1, e2, e3, c0, c1, c2 = 1, c3 = 1) => c1 * sin(e0) * c2 * cos(e2),
      (e0, e1, e2, e3, c0, c1, c2 = 1, c3 = 1) => c2 * sin(e3),
      (e0, e1, e2, e3, c0, c1, c2 = 1, c3 = 1) => c3 * cos(e2),
    ]

    let domdefaults = [
      [-180, 180],
      [-180, 180],
      [-90, 90],
      [-90, 90],
    ]

    let enformDax = function (formDax) {
      formDax.c0 = (formDax.c0 === undefined) ? 1 : formDax.c0
      formDax.c1 = (formDax.c1 === undefined) ? 1 : formDax.c1
      formDax.c2 = (formDax.c2 === undefined) ? 1 : formDax.c2
      formDax.c3 = (formDax.c3 === undefined) ? 1 : formDax.c3

      formDax.e0 = (formDax.e0 === undefined) ? functor(1) : functor(formDax.e0)
      formDax.e1 = (formDax.e1 === undefined) ? functor(1) : functor(formDax.e1)
      formDax.e2 = (formDax.e2 === undefined) ? functor(1) : functor(formDax.e2)
      formDax.e3 = (formDax.e3 === undefined) ? functor(1) : functor(formDax.e3)

      return formDax
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

        if (formDax.dom3 === undefined) formDax.dom3 = domdefaults[i] // dom3 --- axis domain

        if (formDax.fn0 === undefined) { // fn0 not defined
          if (isunpar(formDax)) { // cs and es not defined
            formDax.fn0 = fndefaults[i] // fn0 defauls to sphere
          } else { // some cs and es defined
            formDax = enformDax(formDax)
            formDax.fn0 = fn(formDax) // cs and es series define fn0
          }
        } else {
          formDax = enformDax(formDax) // neutralize undefined cs and es for defined fn0
          // formDax.fn0 = formDax.fn0(...nformparams(formDax))
        }
      }

      return nformed
    }

    // ............................. natFeature
    let natFeature = function (form) {
      let feature

      if (mprops.isSame(form, cache.form)) {
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

          let graticule = {frame: [ [ [...xdomain, sx, dx], [...ydomain, sy, dy] ] ]} // _e_ x, y
          geometry = mgraticule.vhMultiLine(graticule).geometry // geometry.type: MultiLineString

          let p = geometry.coordinates[1].slice(0, -1)

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

        let projDef = { projection: 'natform', form: nformed }
        let projection = natprojection(projDef)
        let feature = mproj3ct(gj, projection)
        cache.form = projDef.form
        cache.feature = feature
        return feature
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

      if (mprops.isSame(bform, cache.bform)) {
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

      let s2extent = d3array.range(0, radorPts.length - 1) // [0,...,seg5]
      let s2range = radorPts // mormed form

      let s1 = d3scale.scaleLinear().domain(s1extent).range(s1range) // [-1,1] => [0,seg5]
      let s2 = d3scale.scaleLinear().domain(s2extent).range(s2range) // [0,..,seg5] => rador

      return p => s2(s1(p)) //  [0,1) =s1=> [0,seg5) =rador=> [0,1]
    }

    // ............................. natVertex
    let natVertex = function (form) { // getVertex
      let nformed = natNform(form) // natNform

      let unfeld = Object.values(nformed) // dax values

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

        // ppR (es) : lambda/phi radians in dom3
        let ppR = ppD.map(d => d * radians) // e0,e1,e2,e3 : pars in radians per dax

        // rs (cs)
        let rs = unfeld.map((d, i) => rayscale[i](ppR[i]) || 1) // c0,c1,c2,c3 : radorn on dax par

        // fn0
        let rr = unfeld.map((d, i) => d.fn0(...ppR, ...rs, d)) // form.fn0 takes radians and radorns

        let point = unfeld.map((d, i) => radio * rad[i] * rr[i])

        let projpnt = (point[2] !== undefined)
          ? [ point[0], point[1], point[2] ] // 3D
          : [ point[0], point[1] ] // 2D
        return projpnt // [x,y,z]
      }

      return vertex
    }

    // ............................. pointStream
    let pointStream = function (prjdef) {
      let natPoint = natVertex(prjdef.form) // m.nat.natVertex (a,b,c) => [a,b,c]
      return function (lambda, phi, radio = 1) { this.stream.point(...natPoint(lambda, phi, radio)) }
    }

    // ............................. natprojection
    let natprojection = prjdef => { // projection:natPoint, form:{x,y,z}
      let geoTrans = d3geo.geoTransform({ point: pointStream(prjdef) })
      let geoProj = p => geoTrans(p)
      geoProj.stream = s => geoTrans.stream(s)
      return geoProj
    }

    // ............................. enty
    let enty = function () {}

    enty.natFeature = natFeature
    enty.natNform = natNform
    enty.closeFeature = closeFeature
    enty.natVertex = natVertex
    enty.rador = rador
    enty.radorm = radorm
    enty.natprojection = natprojection

    return enty
  }

  exports.muonNat = muonNat
}))
