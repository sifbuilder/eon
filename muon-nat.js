/***************************
 *        @muonNat
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonNat = global.muonNat || {})))
}(this, function (exports) {
  'use strict'

  let muonNat = function muonNat (__mapper = {}) {

    let f = __mapper('props')(),
      mlacer = __mapper('xs').m('lacer'),
      mgraticule = __mapper('xs').m('graticule'),
      mprofier = __mapper('xs').m('profier'),
      mproj3ct = __mapper('xs').m('proj3ct')

    let cache = {} // points, form

    const cos = Math.cos, sin = Math.sin,
      neg = x => x < 0 || (x === 0 && (1 / x < 0)),
      pos = x => x > 0 || (x === 0 && (1 / x > 0)),
      radians = Math.PI / 180,
      tau = 2 * Math.PI

   /**********************
   *    @nform
   *      compleate form for natform
   */
    let nform = function (form, nformed = {}) {

      let defs = {"v0":0,"v1":1,"ra2": 120,"w4":0,"seg5":360,"pa6":0,"pb7":-1,} // defs
      let phase = -90
      
      if (form && typeof form === 'object' &&         // {nat}
            (form.x === undefined && form.y === undefined && form.z === undefined)) {

          let fas8x = (form.fas8 !== undefined) ? form.fas8 : 0

          nformed.x = Object.assign({}, defs, form, {fas8: fas8x}) // fas8 def 0
          nformed.y = Object.assign({}, defs, form, {fas8: fas8x - 90})


      } else if (form && typeof form === 'object' && // {x,y}
            (form.x !== undefined && form.y !== undefined)) {

          let fas8x = (form.x.fas8 !== undefined) ? form.x.fas8 : 0
          nformed.x = Object.assign({}, defs, form.x, {fas8: fas8x})

          let fas8y = (form.y.fas8 !== undefined) ? form.y.fas8 : fas8x + phase
          nformed.y = Object.assign({}, defs, form.y, {fas8: fas8y})

          if (form.z !== undefined && form.r !== undefined) { // {x,y,z,r}

            let fas8z = (form.z.fas8 !== undefined) ? form.z.fas8 : 0
            nformed.z = Object.assign({}, defs, form.z, {fas8: fas8z})

            nformed.r = form.r

          } else if (form.z !== undefined && form.r === undefined) {  // {x,y,z}

            let fas8z = (form.z.fas8z !== undefined) ? form.z.fas8 : 0
            nformed.z = Object.assign({}, defs, form.z, {fas8: fas8z})

            nformed.r = Object.assign({}, defs, form.z,
              {fas8: fas8z + phase}) // fas8
          }

      } else if (form && typeof form === 'object' &&        // form:{x:obj}
            (form.x !== undefined && form.y === undefined)) {

            let fas8x = (form.x.fas8 !== undefined) ? form.x.fas8 : 0
            nformed.x = Object.assign({}, defs, form.x, {fas8: fas8x})

            nformed.y = Object.assign({}, defs, (form.y || form.x), {fas8: fas8x + phase}) // fas8

            if (form.z !== undefined && form.r !== undefined) { // {x,y,z,r}

              nformed.z = form.z
              nformed.r = form.r

            } else if (form.z !== undefined && form.r === undefined) {  // {x,y,z}

              let fas8z = (form.z.fas8 !== undefined) ? form.z.fas8 : 0
              nformed.z = Object.assign({}, defs, form.z, {fas8: fas8z})

              nformed.r = Object.assign({}, defs, form.z, {fas8: fas8z + phase}) // fas8
            }

      } else if (form && Array.isArray(form)) {                   // [x,y]

            nformed.x = form[0]
            nformed.y = form[1] || Object.assign({}, defs, form[0], {fas8: form.fas8 + phase})

            if (form[2] !== undefined && form[3] !== undefined) { // [x,y,z,r]

              nformed.z = form[2]
              nformed.r = form[3]

            } else if (form[2] !== undefined && form[3] === undefined) {  // [x,y,z]

              let fas8 = (form[2].fas8 !== undefined) ? form[2].fas8 : 0
              nformed.z = Object.assign({}, defs, form[2], {fas8: fas8})
              nformed.r = Object.assign({}, defs, form[2], {fas8: form[2].fas8 + phase}) // fas8
            }

      }

      let formkeys = Object.keys(nformed)
      for (let i=0; i<formkeys.length; i++) {
        let key = formkeys[i]
        let form = nformed[key]
        // if (form.dom3 === undefined) form.dom3 = [-180,180] // dom3 defs to [-180,180]
        if (i==0 && form.dom3 === undefined) form.dom3 = [-180,180]
        if (i==1 && form.dom3 === undefined) form.dom3 = [-180,180]
        if (i==2 && form.dom3 === undefined) form.dom3 = [-90,90]
        if (i==3 && form.dom3 === undefined) form.dom3 = [-90,90]          
      }
      for (let i=0; i<formkeys.length; i++) {
        let key = formkeys[i]
        let form = nformed[key]
        if (i==0 && form.pr0 === undefined) form.pr0 = Math.cos
        if (i==1 && form.pr0 === undefined) form.pr0 = Math.cos
        if (i==2 && form.pr0 === undefined) form.pr0 = Math.cos
        if (i==3 && form.pr0 === undefined) form.pr0 = Math.cos    
        
      }
      for (let i=0; i<formkeys.length; i++) {     // ext9 defs to spheric exps
        let key = formkeys[i]
        let form = nformed[key]
        if (i==0 && form.fn9 === undefined) form.fn9 = (a,b,c,d) => a**1 * b**0 * c**1 * d**0
        if (i==1 && form.fn9 === undefined) form.fn9 = (a,b,c,d) => a**0 * b**1 * c**1 * d**0
        if (i==2 && form.fn9 === undefined) form.fn9 = (a,b,c,d) => a**0 * b**0 * c**0 * d**1
        if (i==3 && form.fn9 === undefined) form.fn9 = (a,b,c,d) => a**0 * b**0 * c**1 * d**0
      }

      return nformed
    }

    /* **************************
     *        @rador : seg5 unit circle rador
     *          m.snap.snap (dim form => rador)
     */
    let rador = function (forml) {    // polarCoords

      let pts = []
      let t = 0
      let maxRadio = 0

      if (f.isSame(forml, cache.forml)) {
        pts = cache.points

      } else {
        const {m1, m2, n1, n2, n3, a, b, v0, v1, seg5} = forml
        const angUnit = tau / seg5 // dots per period

        let angi = (forml.angi) ? forml.angi : (i, ang) => (i * ang) - Math.PI
        let abs = (forml.abs) ? forml.abs : Math.abs

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

        cache.forml = forml
        cache.points = pts
      }

      return pts // dots in path: [0,...,seg5] => [0,1]
    }


    /* **************************
     *        @radorm
     *            g.natform
     */
    function radorm (form, s1extent = [-1, 1]) { //  radorm: [-1,1) => [-1,1]


      let radorPts = rador(form) //  rador:  [-1,1] => [0,seg5)
      let s1range = [0, radorPts.length - 1] // [0, seg5]

      let s2extent = d3.range(0, radorPts.length - 1) // [0,...,seg5]
      let s2range = radorPts // mormed form

      let s1 = d3.scaleLinear().domain(s1extent).range(s1range) // [-1,1] => [0,seg5]
      let s2 = d3.scaleLinear().domain(s2extent).range(s2range) // [0,..,seg5] => rador

      return p => s2(s1(p)) //  [0,1) =s1=> [0,seg5) =rador=> [0,1]
    }

    /* *********************
   *    @natform
   *      called by g.natform.pointStream to build nat conform point stream
   *      callls m.nat.radorm
   */
    let natform = function (form) {   // getVertex

      let nformed = nform(form)         // nform

      let unfeld = Object.values(nformed)
    if (0 && 1) console.log("m.nat:unfeld", unfeld)

      let dominos = unfeld.map(d => d.dom3) // [ [-180,180], [-180,180], [-90,90], [-90,90] ]

      let radions = unfeld.map((d, i) => radorm(d, dominos[i]))   // radorm

      let radioform = unfeld.map((d, i) => p => radions[i](p))    //


      let scale = [1, 1, 1], rotation = [0, 0, 0], location = [0, 0, 0], rad, wr
      if (nformed) rad = scale = unfeld.map(dim => dim.ra2)
      if (nformed) wr = rotation = unfeld.map(dim => (dim.w4 || 0 + dim.fas8 || 0) * radians)  //  yfase
      let coForm = {location, scale, rotation}


      let vertex = function (lamdaAd, phiBd, radio = 1) { // spherical degrees


      if (0 && 1) if (lamdaAd == 90 || lamdaAd == -90) console.log("vertex", lamdaAd, phiBd)
        let lambdaAr = lamdaAd * radians
        let phiBr = phiBd * radians

        let rs = []
          rs[0] =  radioform[0](lamdaAd) || 1  // -90:0.159
          rs[1] =  radioform[1](lamdaAd) || 1  // 90:1.218
          rs[2] =  radioform[2](phiBd) || 1
          rs[3] =  radioform[3](phiBd) || 1

        // apply fn to period
        let ff = []
          ff[0] =  unfeld[0].pr0(lambdaAr + wr[0]) || 1 // pr0
          ff[1] =  unfeld[1].pr0(lambdaAr + wr[1]) || 1
          ff[2] =  unfeld[2].pr0(phiBr + wr[2])    || 1
          ff[3] =  unfeld[3].pr0(phiBr + wr[3])    || 1

        let pp = []   
          pp[0] =  rs[0] * ff[0]
          pp[1] =  rs[1] * ff[1]
          pp[2] =  rs[2] * ff[2]
          pp[3] =  rs[3] * ff[3]

        let cc = []  
          cc[0] = unfeld[0].fn9
          cc[1] = unfeld[1].fn9
          cc[2] = unfeld[2].fn9
          cc[3] = unfeld[3].fn9
          
        let exps = unfeld.map(d => d.fn9)   // fn9 exponential for feld
        let point = unfeld.map( (d,i) => {
          let r
          if (i === 0) r = rad[0] * cc[0](...pp)
                
          if (i === 1) r = rad[1] * cc[1](...pp)
                
          if (i === 2) r = rad[2] * cc[2](...pp)
                
          if (i === 3) r = rad[3] * cc[3](...pp)
            
          return r
        })

        let projpnt = (point[2] !== undefined) ? [ point[0], point[1], point[2] ] :  [ point[0], point[1] ]
        return projpnt // [x,y,z]
      }

      return vertex
    }


   /**********************
     *    @natFeature
     *       coordinates = Array.of(__mapper("xs").m("nat").natFeature(p.form))
     */
    let natFeature = function (form) {
        let nformed = nform(form)         // NFORM
if (0 && 1) console.log("m.nat.natFeature:nformed", nformed)
        let geometry
        let dx, dy, sx, sy

        if (Object.keys(nformed).length > 2) {    // 3d

            dx = 360 / nformed.x.seg5  // x
            dy = 360 / nformed.z.seg5  // z
            sx = dx
            sy = dy

            let graticule = {frame: [ [ [-180, 180, sx, dx], [-90, 90, sy, dy] ] ],}  // x, y
            geometry = mgraticule.gedges(graticule).geometry

        } else {                                // 2d

            dx = 360 / nformed.x.seg5  // x
            dy = 360 / nformed.y.seg5  // y
            sx = 360
            sy = 360
            // _e_
            let graticule = {frame: [ [ [-180, 180, sx, dx], [-180, 180, sy, dy] ] ],}  // x, y
            geometry = mgraticule.gedges(graticule).geometry
            let p = geometry.coordinates[1].slice(0,-1)
            p = [...p, p[0]]

            geometry.coordinates = Array.of(p)


        }

if (0 && 1) console.log("m.nat.geometry", geometry)

        let feature = {
            type: 'Feature',
            geometry: geometry,
            properties: {
              docnat: '[[long,lat]] def radio:1',
              geonode: {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [0, 0, 0]
                },
                properties: {
                  orgen: [0, 0, 0],
                  velin: [0, 0, 0],
                  velang: [0, 0, 0],
                  prevous: [0, 0, 0],
                  geodelta: [0, 0, 0]
                }
              }
            }
        }


        let projection = mprofier.profiom({'projection': 'natform', 'form': nformed})

        let natgj = mproj3ct(feature, projection)

        return natgj

    }
    /***************************
     *        @enty
     */
    let enty = function () {}

    enty.natFeature = natFeature
    enty.natform   = natform
    enty.nform = nform

    return enty
  }

  exports.muonNat = muonNat
}))
