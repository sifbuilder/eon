/***********
 *    @bosonSnap
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.bosonSnap = global.bosonSnap || {})))
}(this, function (exports) { "use strict"


  let bosonSnap = function bosonSnap(__mapper = {}) {

    let f = __mapper("props")()


    /***********
   *    @interlace
   */
    let interlace = function interlace (streams, t)  {
      let ww = []
      let ses = []        // scale per position
      let res = []        // scale per position

      let nStreams = streams.length           // number of streams
      let nDots = streams.reduce((p,q) => Math.max(q.length,p),0) // max dots


      for (let i=0; i<nStreams; i++) {      // scales

        let sid = [0,nDots-1]
        let sir = [0,streams[i].length -1]
        let si = d3.scaleLinear()   // argument scale
          .domain( sid )    // from result position
          .range ( sir )    // to strem i position

        ses[i] = si         // ses scale for i stream


        let rid = d3.range(streams[i].length).map((d,i) => i)
        let rir = streams[i]
        let ri = d3.scaleLinear()         // argument scale
          .domain( rid )          // from result position
          .range ( rir )    // to strem i position

        res[i] = ri         // ses scale for i stream

      }

      for (let j=0;j<nDots;j++) {       // each position j

        let rr = []
        let ss = []

        for (let k=0;k<streams.length;k++) {      // each stream
          let vk = ses[k](j)                // postion on stram
          let sk = res[k](vk)               // time stream

          rr.push(vk)   //[0, 0, 0], [0.5, 0.25, 1], [1, 0.5, 2]  positions per stream
          ss.push(sk)   // [2, 33, 5], [2.5, 33.25, 6], [3, 33.5, 7]  values  j
        }

        let d = ss.map( (item, idx) => idx / (ss.length - 1))
        let r = ss

        let ws = d3.scaleLinear()
          .domain(d)
          .range(r)

        ww[j] = ws(t)

      }

      return ww

    }

    /***********
   *    @snap : anigram, t, flag
   */
    let snap = function snap (v, t=0, g=0) {

      if (1 && 1) console.log("b.snap", v)

      // ____________________________________________________ un-tagged
      if (v === null) return null                         //00 _____ o
      else if (typeof(v) === "number") return v           //02 _____ num
      else if (typeof(v) === "string") return v           //03 _____ str
      else if (f.isArray(v) && v.length === 0) return v   //04 _____ []
      else if (typeof(v) === "function"
        && g !== 1) {
          return v                            //01 _____ fn v(t)
       }
      else if (f.isArray(v)             //05 ____ [[ [ pure ] ]]  intra array interpolation
        && f.isDoubleSingleArray(v)             // double array with single elem
        && f.isPureArray(v[0][0])               // single elem in double array is pure
        && g !== 1
      ) {


        let ws = snap(v[0][0],t,1)
        return ws
      }
      else if (f.isObject(v)                        //06 ___ v :: {}
          && g !== 1) {

        let r = {}
        for (let y of Reflect.ownKeys(v)) {
          r[y] = snap(v[y], t)          // reenter
        }
        return r
      }
      else if (f.isDoubleArray(v)     //07 [[ [ [], [] ] ]]   inter arrays interpolation
        && f.isQuasiPureArray(v[0][0])        // double array with array of arrays elem
        && v[0][0].length === 1
        && g !== 1
      ) {

        let na = []
        for (let i=0; i<v[0][0].length; i++) {
          let comp = v[0][0][i]

          let intra = snap(comp, t, 1)
          na.push(intra)
        }
        let ws = snap(na,t,1)         // scales of internal array

        return ws
      }

      else if (f.isArray(v)                       //08a ____ [[[ fn() ]]]
        && f.isTripleArray(v)
        && typeof v[0][0][0]  === "function"
        && g !== 1
      ) {
        let fn = v[0][0][0]
        let ws = snap(  fn, t, 1)    // snap function value
        return ws
      }

      else if (f.isArray(v)                       //08 ____ [ [[ [ ], {} ]] ]
        && f.isTripleArray(v)
        && g !== 1
      ) {

        let ws = snap(  v[0][0][0], t, 1)   // scales of internal array

        return ws
      }

      else if (f.isArray(v)           //09 ____ [[[ ], {}]] // last chance for the array
        && g !== 1
      ) {

        let ws = v.map(d => snap(d,t,0))
        return ws
      }

      // ____________________________________________________ tagged

      else if (typeof(v) === "function"
                                      && g === 1) {

        let ret = snap(v(t), t, 0)
        return ret                    //01 _____ fn
      }

      else if (f.isObject(v)            //10 ___ v :: {b, c, d ...}*
                                      && g === 1) {
        let tau = 2 * Math.PI
        let radians = Math.PI / 180


        if ( v.x === undefined && v.y === undefined && v.z === undefined ) {
          let w = {}                                              // nat on dims
          w.x = Object.assign({}, v)
          w.y = Object.assign({}, w.x, {fas8: v.fas8 - 90}) // set transversal fas8
          w.z = Object.assign({}, v)
          v = w
        }

        // console.log(" --------------- v", v)

        let ws = {}                           // dim nat
        for (let y of Reflect.ownKeys(v)) {
          let d = v[y]
          d = snap(d, t)            // reenter
          let s = __mapper("xs").m("nat").rador(d)
          s = f.streamRange(s,d.pa6,d.pb7)
          s = s.map( (p,i) => {
            let refAng = (d.w4 + d.fas8) * radians
            let angUnit = tau / s.length
            let ang = ((i * angUnit * d.v1) - refAng  + tau) % tau
            return p * Math.cos(ang) * d.ra2
          })
          if (s.length === 1)  {
            let r = [s[0], s[0]],
              d = [0, 1]
            ws[y] = d3.scaleLinear().domain(d).range(r)(t)
          } else {
            let r = s,
              d = d3.range(r.length).map((item, idx) => idx / (r.length - 1))
            ws[y] = d3.scaleLinear().domain(d).range(r)(t)
          }
        }

        // console.log(" --------------- ws", ws)

        return ws


      }

      else if (f.isArray(v)                     //11_____ [v]*
          && f.isPureArray(v)
          && v.length === 1
          && g === 1) {
        let d = [0, 1], r = [v[0], v[0]]
        let w = d3.scaleLinear().domain(d).range(r)
        return w(t)
      }

      else if (f.isArray(v)                   //12 _____ [v1,v2,v3]*
      && f.isPureArray(v)
      && v.length > 1
      && g === 1) {

        let d = v.map( (item, idx) => idx / (v.length - 1))
        let r = v
        let w = d3.scaleLinear()
          .domain(d)
          .range(r)
        return w(t)
      }

      else if (f.isArray(v)                   //13 _____ [[a1,a2,a3],[b1,b2]]*
      && f.isQuasiPureArray(v)              // => [[a1,b1],[a2,b1'],[a3,b2]]
      && g === 1) {

        let streams = v.filter(d => d.length > 0)

        let ww = interlace(streams, t)
        return ww
      }

      else if (f.isArray(v)                   //14 _____ v :: [a, {b}]*
          && !f.isPureArray(v)              // has objects or array elements
          && !f.isDoubleSingleArray(v)      // not double array with single value
          && g === 1) {

        let doSnap = v.filter(d => Array.isArray(d) && d.length === 0).length
        let wss = []
        let was = []

        if (doSnap === 0) {                           // 0[] - time snap and summa
          for (let i = 0; i < v.length; i++) {
            let wsi = snap(v[i], t, 0)

            if (f.isObject(wsi)) {          // {}

              let d = wsi
              d = snap(d, t)            // reenter
              let s = __mapper("xs").m("nat").rador(d)
              s = f.streamRange(s,d.pa6,d.pb7)
              s = s.map( (p,i) => {
                let refAng = (d.w4 + d.fas8) * radians
                let angUnit = tau / s.length
                let ang = ((i * angUnit * d.v1) - refAng  + tau) % tau
                return p * Math.cos(ang) * d.ra2
              })
              if (s.length === 1)  {
                let r = [s[0], s[0]],
                  d = [0, 1]
                wsi = d3.scaleLinear().domain(d).range(r)(t)
              } else {
                let r = s,
                  d = d3.range(r.length).map((item, idx) => idx / (r.length - 1))
                wsi = d3.scaleLinear().domain(d).range(r)(t)
              }

            }
            wss.push(wsi)
          }


        } else if (doSnap === 1) {                    // 1[] - leave expanded array

          let w = v.map(d => snap(d, t))
          for (let i = 0; i < w.length; i++) {

            if (f.isObject(w[i])) {               // {}

              let d = snap(d, t)            // reenter
              was = __mapper("xs").m("nat").rador(d)
              was = f.streamRange(s,d.pa6,d.pb7)
              was = s.map( (p,i) => {
                let refAng = (d.w4 + d.fas8) * radians
                let angUnit = tau / s.length
                let ang = ((i * angUnit * d.v1) - refAng  + tau) % tau
                return p * Math.cos(ang) * d.ra2
              })



            } else if (Array.isArray(w[i]) && w[i].length > 0) {

              let wsi = w[i] // snap(w[i], t)         // was.push(wsi) //
              was = wsi         // was.push(wsi) //

            }
          }

        } else if (doSnap === 2) {                      // 2[] - do not snap --- summa

          for (let i = 0; i < v.length; i++) {


            let wsi = snap(v[i], t)

            if (f.isObject(wsi)) {          // {}


              let d = wsi
              d = snap(d, t)            // reenter
              let s = __mapper("xs").m("nat").rador(d)
              s = f.streamRange(s,d.pa6,d.pb7)
              s = s.map( (p,i) => {
                let refAng = (d.w4 + d.fas8) * radians
                let angUnit = tau / s.length
                let ang = ((i * angUnit * d.v1) - refAng  + tau) % tau
                return p * Math.cos(ang) * d.ra2
              })
              if (s.length === 1)  {
                let r = [s[0], s[0]],
                  d = [0, 1]
                ws[y] = d3.scaleLinear().domain(d).range(r)(t)
              } else {
                let r = s,
                  d = d3.range(r.length).map((item, idx) => idx / (r.length - 1))
                wsi = d3.scaleLinear().domain(d).range(r)(t)
              }



            } else if (Array.isArray(wsi) && wsi.length > 0) {
              was.push(wsi) //
            } else if (typeof wsi === "number") {
              was.push([wsi,wsi])                   // constant path
            }
          }
        }

        let vr = null
        if (doSnap === 0) {

          vr = f.add(wss.map(d => {

            let r = (typeof(d) === "function") ? d(t) : d // d cte: stateA:[[[300, {}]]]
            return r
          }))                                 // summa snaps

        } else if (doSnap === 1) {

          vr = was        // if out of time return array of values

        }else if (doSnap === 2) {
          vr = f.interadd(was)  // summa arrays

        }
        return vr

      }

      else {
        return v
      }
    }



    /***********
  *   @enty
  */
    let enty = function (v, t=0, g=0) {
      return snap (v, t, g)
    }



    return enty

  }

  exports.bosonSnap = bosonSnap

}))
