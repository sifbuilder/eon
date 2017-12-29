/*******************************************
 *    @geoAniwen
 *
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.geoAniwen = global.geoAniwen || {})))
}(this, function (exports) { "use strict"

  let geoAniwen = function geoAniwen(__mapper = {}) {

    let g = __mapper("xs").m("geom")
    let mwen = __mapper("xs").m("wen")
    let cwen = __mapper("xs").c("wen")

    let state = {},
      scale  = [1, 1, 1],
      rotate = [0, 0, 0],
      translate = [0, 0, 0],
      focale = Infinity,
      zafin = [0,1]

    let wenRotation = function(rot) {
      let rox = mwen.matrix(rot !== undefined ? g.to_radians(rot) : cwen.rotInDrag())
      return function(x, y, z=0) {
        return mwen.rotateMatrix([x, y, z], rox)
      }
    }



          let projectionInverse = function (p, d, s) {
            let h = Array.isArray(s) ? s : Array.of(s)
            let f0 = (h[0] || 1) / (1 - p[2] / d)
            let f1 = (h[1] || h[0]) / (1 - p[2] / d)
            return [p[0]/f0, p[1]/f1, p[2]]
          }

          let rotationInverse = function(rot) {
            let rox = mwen.matrix(rot !== undefined ? g.to_radians(rot) : cwen.rotInDrag())
            return function(x, y, z=0) {
              return mwen.transpose33([x, y, z], rox)
            }
          }

          let pointStreamInverse = function(x, y, z=0) {
              let c = [x, y, z]
              c = c.map( (d,i) => d - (translate[i] || 0))    //   inverse translation
                        z = (c[2] - zafin[0]) / zafin[1]        // inverse perspective
              c = mwen.projectionInverse([ c[0], c[1], z ] , focale, scale ) //   inverse projection
              c = wenRotationInverse(rotate)(...c)              //   inverse rotation

              this.stream.point(...c)
          }






    let pointStream = function(x, y, z=0) {

      let c = [x, y, z]
      c = wenRotation(rotate)(...c)
      z = (c[2] * zafin[1]) + zafin[0]
      c = mwen.projection([ c[0], c[1], z ] , focale, scale )
      c = c.map( (d,i) => d + (translate[i] || 0))

      this.stream.point(...c)
    }


    let proform = function() {
      let geoTrans = d3.geoTransform({
        point: pointStreamInverse // pointStream // inverse stream
      })
      let geoProj = p => geoTrans(p)
      geoProj.stream = s =>  geoTrans.stream(s)
      return geoProj
    }


    /****************************
   *    @enty
   */
    let enty = function (p={}) {
      let m =  proform(p)
      m.translate = _ => _ !== undefined ? (translate = _, m) : m
      m.rotate = _ => _ !== undefined ? (rotate = _, m) : m

      m.scale = _ => _ !== undefined ? (scale = _, m) : m
      m.focale = _ => _ !== undefined ? (focale = _, m) : m
      m.zafin = _ => _ !== undefined ? (zafin = _, m) : m

      return m

    }

    return enty
  }

  exports.geoAniwen = geoAniwen

}));
