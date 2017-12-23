/***************************
 *        @muonNat
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonNat = global.muonNat || {})))
}(this, function (exports) { "use strict"

  let muonNat = function muonNat(__mapper = {}) {

    let f = __mapper("props")()


    const cos = Math.cos, sin = Math.sin
    const neg = x =>  x < 0 || (x === 0 && (1/x < 0))
    const pos = x =>  x > 0 || (x === 0 && (1/x > 0))
    const radians = Math.PI / 180
    const tau = 2 * Math.PI  
    
    /* **************************
     *        @rador : seg5 unit circle rador
     *          m.snap.snap (dim form => rador)
     */
    let rador = function rador(form) {
      let pts = []

      const {m1,m2,n1,n2,n3,a,b,v0,v1,seg5} = form
      const angUnit = tau / seg5    // dots per period

      let angi = (form.angi) ? form.angi : (i, ang) => (i * ang) - Math.PI
      let radi = (form.radi) ? form.radi : (i, rad, mult) => rad * ( 1 + mult * i )
      let abs  = (form.abs)  ? form.abs  : Math.abs
      let nat = function (m1,m2,n1,n2,n3,a,b) {
        return function(ang) {

          let t1 = m1 * ang / 4
          let t2 = m2 * ang / 4

          let t = Math.pow(

            Math.pow(abs(Math.cos(t1) / a), n2)  // n2
                 +
                 Math.pow(abs(Math.sin(t2) / b), n3), // n3

            -1 / n1)                                // n1

          return t
        }
      }

      for (let i = 0; i < seg5; i++) {
        let ang = angi(i, angUnit * v1) // [0,360] => [-180,180]
        let t   = nat(m1,m2,n1,n2,n3,a,b)(ang)
        let r   = radi( i, t, v0) // increment radius with ang

        pts.push(r)
      }

      return pts          // dots in path: [0,...,seg5] => [0,1]
    }

    /* **************************
     *        @radorm
     *            g.natform
     */
    let radorm = function radorm(form, s1extent=[-1,1]) { //  radorm: [-1,1) => [-1,1]

      let radorPts = f.norma(rador(form))       //  rador:  [-1,1] => [0,seg5)
      let s1range = [0,radorPts.length-1]     // [0, seg5]

      let s2extent = d3.range(0,radorPts.length-1)  // [0,...,seg5]
      let s2range = radorPts                        // mormed form

      let s1 = d3.scaleLinear().domain(s1extent).range(s1range) // [-1,1] => [0,seg5]
      let s2 = d3.scaleLinear().domain(s2extent).range(s2range) // [0,..,seg5] => rador

      return p => s2(s1(p))     //  [0,1) =s1=> [0,seg5) =rador=> [0,1]
    }

    /* **************************
     *        @polarCoords
     *           m.nat.multiconform: form => dimstream
     */
    let polarCoords = function (params) {         // stream of scalars
      let m1 =  params.m1
      let m2 =  params.m2
      let n1 =  params.n1
      let n2 =  params.n2
      let n3 =  params.n3
      let a =   params.a
      let b =   params.b

      let v0 =  (params.v0 !== undefined) ? params.v0 : 0
      let seg5 = Math.abs( params.seg5)       // neg makes clockwise, 0 is ring, <0 text

      let angUnit = 2 * Math.PI / seg5    // sector in RADs per symmetry
      let t = 0
      let maxRadio = 0
      let pts = []                                // points in path

      for (let i = 0; i < seg5; i++) {
        let ang = i * angUnit   - Math.PI

        let t1 = m1 * ang  / 4             // m1, ngx
        let t2 = m2 * ang  / 4             // m2, ngy

        t = Math.pow(
          Math.pow(Math.abs(Math.cos(t1) / a), n2) // n2
               +
               Math.pow(Math.abs(Math.sin(t2) / b), n3), // n3

          -1 / n1)                                          // n1

        t = t * ( 1 + v0 * i )      // increment radius with ang

        if (t > maxRadio) maxRadio = t
        pts.push(t)
      }

      let radUnit = 1 / maxRadio // * Math.SQRT1_2 / maxRadio   normalize
      pts = pts.map (d => d * radUnit )

      return pts
    }


    /**********************
     *    @multiconform
     *       coordinates = Array.of(__mapper("xs").m("nat").multiconform(p.form))
     */
    let multiconform = function(form) {
      let radians = Math.PI / 180
      let tau = 2 * Math.PI
      let dimstreams  = Object.keys(form)

      dimstreams = dimstreams
        .map(d => __mapper("xs").m("nat").polarCoords(form[d]))   // conform

      dimstreams = dimstreams
        .map((d,i) => d.map(p => p * form[ Object.keys(form)[i]].ra2))  // size

      dimstreams = dimstreams
        .map((d,i) => d.map((p,j) => {                        // rotation
          let formdim = form[Object.keys(form)[i]]
          let angUnit = tau / d.length
          let refAng = (formdim.w4 + formdim.fas8) * radians
          let v1 =  formdim.v1
          let ang = ((j * angUnit * v1) - refAng  + tau) % tau  // j point
          let r = p * Math.cos(ang)                         // each point
          return r
        }))

      let streams = dimstreams
        .map( (d,i) => {
          let dim = Object.keys(form)[i]
          let pa6 = form[dim].pa6
          let pb7 = form[dim].pb7
          return f.streamRange(d, pa6, pb7)
        })

      streams = f.slide(streams, "min")
      return streams
    }
    /**********************
   *    @nform
   *      compleate form for natform
   */
    let nform = function(form) {
      let nform = {}
      if (form                // form:{x,y,z}
            && typeof form === "object"
            && ( form.x !== undefined && form.y !== undefined && form.z !== undefined )) {
        nform = form
      } else if (form
            && typeof form === "object"
            && ( form.x === undefined && form.y === undefined && form.z === undefined )) {
        nform = {}
        nform.x = Object.assign( {}, form,  {fas8: (form.fas8 || 0)} )  // set fas8 0
        nform.y = Object.assign( {}, (form.y || form) , {fas8: form.fas8 - 90})
        nform.z = Object.assign( {}, (form.z || form) )
      } else if (form
            && typeof form === "object"
            && ( form.x !== undefined || form.y !== undefined || form.z !== undefined )) {
        nform = {}
        nform.x = Object.assign({}, form.x )    // defined
        nform.y = Object.assign({}, (form.y || form.x) , {fas8: form.x.fas8 - 90})
        nform.z = Object.assign({}, (form.z || form.x) )
      } else if (form
            && Array.isArray(form)) {
        nform = {}
        nform.x = form[0]
        nform.y = form[1] ||  Object.assign({}, form[0], {fas8: form.fas8 - 90})
        nform.z = form[2] ||  Object.assign({}, form[0])
      } else {
        nform = {}
        nform.x = {}
        nform.y = {}
        nform.z = {}
      }
      return nform

    }
   

    let natform = function(form) {
      let radioform = Object.values(form).map( (d,i) => {
          let ret
          if (i < 2 ) {
              ret = p =>  radorm(d,[-Math.PI, Math.PI])(p)
          } else if (i === 2 ) {
              ret = radorm(d,[-Math.PI, Math.PI])
          }
          return ret
      })

      let scale = [1,1,1], rotation = [0,0,0],  location = [0,0,0]
      if (form) scale =   Object.values(form).map(dim => dim.ra2)
      if (form) rotation =  Object.values(form).map(dim => dim.w4 * radians)
      let coForm = {location, scale, rotation}

      return function (l, p, radio=1) {    // spherical degrees

        let lambda = l * radians
        let phi = p * radians

        let c = coForm
        
        let x = c.scale[0] * radioform[0](lambda) * cos(lambda + c.rotation[0]) * cos(phi) * radioform[2](phi)
        let y = c.scale[1] * radioform[1](lambda) * sin(lambda + c.rotation[1]) * cos(phi) * radioform[2](phi)
        let z = c.scale[2]       * radioform[2](phi) * sin(phi + c.rotation[2]) 
        
        return [x,y,z]
      }
    }   
    
    /***************************
     *        @enty
     */
    let enty = function () {}

    enty.rador = rador        // form => pts (domain form.seg5 to [0,1] range)
    enty.radorm = radorm      // [0,1) =s1=> [0,seg5) =rador=> [0,1]
    enty.polarCoords = polarCoords  //
    enty.multiconform = multiconform  //
    enty.nform = nform  //
    enty.natform = natform 

    return enty

  }

  exports.muonNat = muonNat

}))
