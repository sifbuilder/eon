/***************************
 *        @muonNatform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonNatform = global.muonNatform || {})))
}(this, function (exports) {
  'use strict'

  // ... # eon-muon-natform
  // ... **returns nat mesh**
  // ...
  // ... ref: isSame: http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
  // ...
  // ... ### properties
  // ...
  // ... ### methods
  // ... natFeature
  // ... `coordinates = Array.of(__mapper("xs").m("nat").natFeature(p.form))`
  // ...
  // ... rador
  // ... seg5 unit circle rador
  // ...
  // ... radorm
  // ... called by p.natform
  // ...
  // ... natNform
  // ... compleate form for natform
  // ...
  // ... natVertex
  // ...    called by g.natVertex.pointStream to build nat conform point stream
  // ...    calls m.natform.radorm
  // ...
  // ... natprojection
  // ... returns d3 geo nat projection
  // ... calls p.nat
  // ... breaks circularity m.profier(.natfion --> p.natform)
  // ...    -p.natform(.natprofion -> .pointStream -> m.natform.natVertex)
  // ...    -m.natform(.natFeature -> m.profier.formion)
  // ...
  // ... conforms
  // ... `
  // ... net
  // ... 'fn0': (e,c) => c[0] * e[0] * c[3] * cos(e[3])
  // ... 'fn0': (e, c) => (1 / Math.exp(Math.abs(e[1] / 2))) * cos(9 * e[1]),
  // ... 'fn0': (e,c) => c[0] * e[0] * c[3] * sin(e[3])
  // ... 'fn0': (e,c) => 1
  // ...
  // ... sphere
  // ... 'fn0': (e,c) => c[0] * cos(e[0]) * c[3] * cos(e[3])
  // ... 'fn0': (e,c) => c[0] * sin(e[0]) * c[3] * cos(e[3])
  // ... 'fn0': (e,c) => c[3] * sin(e[3])
  // ... 'fn0': (e,c) => c[3] * cos(e[3])
  // ...
  // ... sphere
  // ... [-180, 180] => c[0] * cos(e[0]) * c[2] * cos(e[3])
  // ... [-180, 180] => c[1] * sin(e[0]) * c[2] * cos(e[3])
  // ... [-180, 180] =>          c[3] * sin(e[2])
  // ... [-180, 180] =>          c[3] * cos(e[2])
  // ...
  // ... hyperbole
  // ... [-180, 180] => e[0] * c[2] * cos(e[3])
  // ... [-180, 180] => e[1] * e[1] * e[1] * c[2] * cos(e[3])
  // ... [-180, 180] =>        c[3] * sin(e[2])
  // ...
  // ... flat reticule
  // ... [-180, 180] => e[0]
  // ... [-180, 180] => 0
  // ... [-180, 180] => e[2]
  // ...
  // ... rectantular parabole
  // ... [-180, 180] => e[0]
  // ... [-180, 180] => e[0] * e[0]
  // ... [-180, 180] => e[2]
  // ...
  // ... envelop parabole
  // ... [-180, 180] => e[0]  * cos(e[3])
  // ... [-180, 180] => e[0] * e[0]
  // ... [-180, 180] => sin(e[3])
  // ...
  // ... parabole
  // ... [-180, 180] => e[0]     * cos(e[3])
  // ... [-180, 180] => e[0] * e[0]
  // ... [-180, 180] => e[0]     * sin(e[3])
  // ...
  // ... spiral
  // ... [-180, 180] => e[0]     * cos(e[3])
  // ... [-180, 180] => e[3]
  // ... [-180, 180] => e[0]     * sin(e[3])
  // ...
  // ... papiro
  // ... [-180, 180] => e[0]     * cos(e[3])
  // ... [-180, 180] => sin( 10 * e[3])
  // ... [-180, 180] => e[0]     * sin(e[3])
  // ...
  // ... cup
  // ... [-180, 180] => cos(e[0])       * c[2] * ( cos(e[2]))
  // ... [-180, 180] => sin(e[0])       * c[2] * ( cos(e[2]))
  // ... [-180, 180] => e[2] * e[2]
  // ...
  // ... lace
  // ... [-180, 180] => cos(e[0])       * c[2] * (  cos(e[2]))
  // ... [-180, 180] => sin(e[0])       * c[2] * ( cos(e[2]))
  // ... [-180, 180] => e[2]
  // ...
  // ... plane
  // ... [-180, 180] => e[1] * e[1] * sin(e[2])
  // ... [-180, 180] => sin(e[0])       * c[2] * ( cos(e[2]))
  // ... [-180, 180] => e[2]
  // ...
  // ... cone 'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'c[0]': 1, 'c[1]': 1,  // circ
  // ... [-180, 180] => e[0]     * cos(e[3])
  // ... [-180, 180] => e[0]
  // ... [-180, 180] => e[0]     * sin(e[3])
  // ...
  // ... form "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"c[0]":1,"c[1]":1,  // drop
  // ... [-180, 180] => sqrt(c[0] * sin(e[0]))    * cos(e[3])
  // ... [-180, 180] => c[0] * sin(e[0])
  // ... [-180, 180] => sqrt(c[0])     * sin(e[3])
  // ...
  // ... bolt "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"c[0]":1,"c[1]":1,  // drop
  // ... [-180, 180] => sqrt(c[0])     *  cos(e[3])
  // ... [-180, 180] =>      c[0]  * sin(e[0])
  // ... [-180, 180] => sqrt(c[0])     * sin(e[3])
  // ...
  // ... vel "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"c[0]":1,"c[1]":1,  // drop
  // ... [-180, 180] => sqrt(c[0] * sin(e[0]))     *  cos(e[3])
  // ... [-180, 180] =>      c[0]  * sin(e[0])
  // ... [-180, 180] => sqrt(c[0] * sin(e[0]))     * sin(e[3])
  // ...
  // ... spil
  // ... [-180, 180] => - e[3],
  // ... [-180, 180] =>  e[3] * cos(e[0]),
  // ... [-180, 180] => sin(e[0]) - 1,
  // ... [-180, 180] =>  1 - sin(e[0])
  // ...
  // ... flat infinite
  // ... [-180, 180] => - 1 - sin(e[0]),
  // ... [-180, 180] =>  1 - sin(e[0]) * cos(e[0]),
  // ... [-180, 180] => sin(e[0]) - 1,
  // ... [-180, 180] =>  1 - sin(e[0])
  // ...
  // ... cone
  // ... [-180, 180] => - (1 - sin(e[0]))
  // ... [-180, 180] =>   (1 - sin(e[0])) * cos(e[3]),
  // ... [-180, 180] => (1 - sin(e[0])) * sin(e[3]),
  // ... [-180, 180] =>  1 - sin(e[0])
  // ...
  // ... flat drop
  // ... [-180, 180] => (sin(e[0]) -1),
  // ... [-180, 180] => - (sin(e[0]) -1) * cos(e[0]),
  // ... [-180, 180] => (sin(e[0]) - 1),
  // ... [-180, 180] => (sin(e[0]) - 1),
  // ...
  // ... vol drop fn
  // ... [-180, 180] => (sin(q) - 1),
  // ... [-180, 180] => - (sin(q) - 1) * cos(q) * cos(v),
  // ... [-180, 180] => - (sin(q) - 1) * cos(q) * sin(v),
  // ... [-180, 180] => (sin(q) - 1),
  // ...
  // ... vol drop nat
  // ... [-180, 180] => a * cos(q) * c * cos(v),    // drop
  // ... [-180, 180] ==> b * sin(q) * c * cos(v),  // drop
  // ... [-90, 90] => d * sin(u),  // circ
  // ... [-90, 90] => v,   // circ
  // ...
  // ... vol drop nat
  // ... [-180, 180] => a * cos(q),    // drop
  // ... [-180, 180] == > b * sin(q) *  cos(v),  // drop
  // ... [-90, 90] => b * sin(q) *  sin(v),  // drop
  // ... [-90, 90] => v,   // drop
  // ...
  // ... `
  // ...
  // ...
  // ... # license
  // ... MIT

  async function muonNatform (__mapper = {}) {
    let [
      glmatrix,
      d3scale,
      d3array,
      d3geo,
      muonProps,
      muonGeom,
      muonGraticule,
      muonProfier,
      muonProj3ct,
    ] = await Promise.all([
      __mapper('xs').b('gl-matrix'),
      __mapper('xs').b('d3-scale'),
      __mapper('xs').b('d3-array'),
      __mapper('xs').b('d3-geo'),
      __mapper('xs').m('props'),
      __mapper('xs').m('geom'),
      __mapper('xs').m('graticule'),
      __mapper('xs').m('profier'),
      __mapper('xs').m('proj3ct'),
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

    let xc = c => c !== undefined ? c : 1
    let xe = e => e !== undefined ? e : 0

    // p:[0,n], v => p[i] * v**i
    let ft = p => v => p.reduce((acc, cur, i) => acc + cur * pow(v, i), 0)

    let tensorize = (d, dim = 4, defv = 0) => Array(dim).fill(defv).map((c, i) => functor(d)[i] !== undefined ? functor(functor(d)[i]) : functor(defv))

    // c[0],c[1],c[2],c[3]: radius (default to 1)
    // e[1] [-2pi,2pi],e[2][-2pi,2pi],e[3][-pi,pi],e4[-pi,pi]: radian-angles (default to 0)
    // fn: c[0][i] * c[0]**i
    let fn = dax =>
      (e = [], c = []) => {
        dax.e[0] = dax.e[0] !== undefined ? dax.e[0] : 1
        dax.e[1] = dax.e[1] !== undefined ? dax.e[1] : 1
        dax.e[2] = dax.e[2] !== undefined ? dax.e[2] : 1
        dax.e[3] = dax.e[3] !== undefined ? dax.e[3] : 1

        dax.c[0] = dax.c[0] !== undefined ? dax.c[0] : 1
        dax.c[1] = dax.c[1] !== undefined ? dax.c[1] : 1
        dax.c[2] = dax.c[2] !== undefined ? dax.c[2] : 1
        dax.c[3] = dax.c[3] !== undefined ? dax.c[3] : 1

        let cf = tensorize(dax.c)
        let ef = tensorize(dax.e)

        let cp = c.map(d => xc(d))
        let ep = e.map(d => xe(d))

        let ret = ft(cf[0])(cp[0]) * ft(ef[0])(ep[0]) *
                  ft(cf[1])(cp[1]) * ft(ef[1])(ep[1]) *
                  ft(cf[2])(cp[2]) * ft(ef[2])(ep[2]) *
                  ft(cf[3])(cp[3]) * ft(ef[3])(ep[3])

        // let tensor = glmatrix.mat4.fromValues(...tensorize(e[0]), ...tensorize(e[1]), ...tensorize(e[2]), ...tensorize(e[3]) )
        // let vector = glmatrix.vec4.fromValues(xe(e[0]), xe(e[1]), xe(e[2]), xe(e[3]) )
        // let position = glmatrix.vec4.transformMat4(glmatrix.vec4.create(), vector, tensor)

        return ret
      }

    let isunpar = formDax => formDax.e === undefined && formDax.c === undefined

    let fndefaults = [
      (e, c) => c[0] * cos(e[0]) * xc(c[2]) * cos(xe(e[2])),
      (e, c) => c[1] * sin(e[0]) * xc(c[2]) * cos(xe(e[2])),
      (e, c) => xc(c[2]) * sin(xe(e[3])),
      (e, c) => xc(c[3]) * cos(xe(e[3])),
    ]

    let domdefaults = [
      [-180, 180],
      [-180, 180],
      [-90, 90],
      [-90, 90],
    ]

    let enformDax = function (formDax) {
      formDax.c = (formDax.c === undefined) ? 1 : formDax.c
      formDax.e = (formDax.e === undefined) ? functor(1) : functor(formDax.e)
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
        }
        formDax = enformDax(formDax) // neutralize undefined cs and es for defined fn0
      }

      return nformed
    }

    // ............................. natFeature
    let natMultiPolygon = function (form, props = {}) {
      let feature

      if (muonProps.isSame(form, cache.form)) {
        feature = cache.feature
        return feature
      } else {
        let nformed = natNform(form) // NFORM

        // let _geofn
        // if (props.h) {
          // _geofn = muonGraticule.hMultiLine
        // } else if (props.v) {
          // _geofn = muonGraticule.vMultiLine
        // } else {
          // _geofn = muonGraticule.vhMultiLine
        // }

        let geometry, graticule, vertices
        let dx, dy, sx, sy

        // if (Object.keys(nformed).length > 2 ) { // ___ 3d
        if (nformed.z !== undefined) { // ___ 3d
          dx = 360 / nformed.x.seg5 // x
          dy = 360 / nformed.z.seg5 // ____ z ___

          sx = dx
          sy = dy

          let xdomain = form.x.dom3 || [-180, 180]
          let ydomain = form.z.dom3 || [-90, 90] // ____ z ___

          graticule = {frame: [ [ [...xdomain, sx, dx], [...ydomain, sy, dy] ] ]} // x, y

          vertices = muonGraticule.gVertices(graticule)
          
          // geometry = _geofn(graticule).geometry
          // geometry = muonGraticule.hMultiLine(graticule).geometry
        } else { // ___ 2d
          dx = 360 / nformed.x.seg5 // x
          dy = 360 / nformed.y.seg5 // y
          sx = 360
          sy = 360

          let xdomain = nformed.x.dom3 || [-180, 180]
          let ydomain = nformed.y.dom3 || [-180, 180]

          graticule = {frame: [ [ [...xdomain, sx, dx], [...ydomain, sy, dy] ] ]} // _e_ x, y
          // geometry = _geofn(graticule).geometry // geometry.type: MultiLineString

          vertices = muonGraticule.gVertices(graticule)
          
          vertices  = vertices[1].slice(0, -1)

          vertices = Array.of(vertices)
        }

let quads = muonGraticule.qfaces(graticule)
let faces = quads.reduce((p, q) => [...p, ...muonGeom.convextriang(q)], [])
// if (1 && 1) console.log('geometry', geometry)


        let gj = {
          type: 'Feature',
          geometry: {
            type: 'MultiPoint',
            coordinates: vertices,
          },
          properties: {
            doc: 'natform',
            sort: 'form',
            eoMultiPolygon: 1,
            eonode: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [0, 0, 0],
              },
              properties: {
                orgen: [0, 0, 0],
                velin: [0, 0, 0],
                velang: [0, 0, 0],
                prevous: [0, 0, 0],
                geodelta: [0, 0, 0],
              },
            },
            faces: faces,
          },
        }

        let projDef = { projection: 'natform', eoform: nformed }
        let projection = natprojection(projDef)

        let feature = muonProj3ct(gj, projection)
        cache.eoform = projDef.eoform
        cache.feature = feature
        
        if (1 && 1) console.log('feature', feature)

        return feature
      }
    }

    // ............................. natFeature
    let natFeature = function (form, props = {}) {
      let feature

      if (muonProps.isSame(form, cache.form)) {
        feature = cache.feature
        return feature
      } else {
        let nformed = natNform(form) // NFORM

        let _geofn
        if (props.h) {
          _geofn = muonGraticule.hMultiLine
        } else if (props.v) {
          _geofn = muonGraticule.vMultiLine
        } else {
          _geofn = muonGraticule.vhMultiLine
        }

        let geometry, graticule
        let dx, dy, sx, sy

        // if (Object.keys(nformed).length > 2 ) { // ___ 3d
        if (nformed.z !== undefined) { // ___ 3d
          dx = 360 / nformed.x.seg5 // x
          dy = 360 / nformed.z.seg5 // ____ z ___

          sx = dx
          sy = dy

          let xdomain = form.x.dom3 || [-180, 180]
          let ydomain = form.z.dom3 || [-90, 90] // ____ z ___

          graticule = {frame: [ [ [...xdomain, sx, dx], [...ydomain, sy, dy] ] ]} // x, y

          geometry = _geofn(graticule).geometry
          // geometry = muonGraticule.hMultiLine(graticule).geometry
        } else { // ___ 2d
          dx = 360 / nformed.x.seg5 // x
          dy = 360 / nformed.y.seg5 // y
          sx = 360
          sy = 360

          let xdomain = nformed.x.dom3 || [-180, 180]
          let ydomain = nformed.y.dom3 || [-180, 180]

          graticule = {frame: [ [ [...xdomain, sx, dx], [...ydomain, sy, dy] ] ]} // _e_ x, y
          geometry = _geofn(graticule).geometry // geometry.type: MultiLineString

          let p = geometry.coordinates[1].slice(0, -1)

          geometry.coordinates = Array.of(p)
        }

// let quads = muonGraticule.qfaces(graticule)
// let faces = quads.reduce((p, q) => [...p, ...muonGeom.convextriang(q)], [])
// if (1 && 1) console.log('geometry', geometry)


        let gj = {
          type: 'Feature',
          geometry: geometry,
          properties: {
            doc: 'natform',
            eonode: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [0, 0, 0],
              },
              properties: {
                orgen: [0, 0, 0],
                velin: [0, 0, 0],
                velang: [0, 0, 0],
                prevous: [0, 0, 0],
                geodelta: [0, 0, 0],
              },
            },
          },
        }

        let projDef = { projection: 'natform', eoform: nformed }
        let projection = natprojection(projDef)

        let feature = muonProj3ct(gj, projection)
        cache.eoform = projDef.eoform
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

      if (muonProps.isSame(bform, cache.bform)) {
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
        let ppR = ppD.map(d => d * radians) // e[0],e[1],e[2],e[3] : pars in radians per dax

        // rs (cs)
        let rs = unfeld.map((d, i) => rayscale[i](ppR[i]) || 1) // c[0],c[1],c[2],c[3] : radorn on dax par

        // fn0
        let rr = unfeld.map((d, i) => d.fn0(ppR, rs, d)) // form.fn0 takes radians and radorns

        let point = unfeld.map((d, i) => radio * rad[i] * rr[i])

        let projpnt = (point[2] !== undefined)
          ? [ point[0], point[1], point[2] ] // 3D
          : [ point[0], point[1] ] // 2D
        return projpnt // [x,y,z]
      }

      return vertex
    }

    // ............................. pointStream
    let pointStream = function (prtdef) {
      let natPoint = natVertex(prtdef.eoform) // m.natform.natVertex (a,b,c) => [a,b,c]
      return function (lambda, phi, radio = 1) { this.stream.point(...natPoint(lambda, phi, radio)) }
    }

    // ............................. natprojection
    let natprojection = prtdef => { // projection:natPoint, form:{x,y,z}
      let geoTrans = d3geo.geoTransform({ point: pointStream(prtdef) })
      let geoProj = p => geoTrans(p)
      geoProj.stream = s => geoTrans.stream(s)
      return geoProj
    }

    // ............................. enty
    let enty = function () {}

    enty.natFeature = natFeature
    enty.natMultiPolygon = natMultiPolygon
    enty.natNform = natNform
    enty.closeFeature = closeFeature
    enty.natVertex = natVertex
    enty.rador = rador
    enty.radorm = radorm
    enty.natprojection = natprojection

    return enty
  }

  exports.muonNatform = muonNatform
}))
