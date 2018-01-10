/*******************************************
 *    @geoUniwen
 *
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.geoUniwen = global.geoUniwen || {})))
}(this, function (exports) { "use strict"

  let geoUniwen = function geoUniwen(__mapper = {}) {

    let g = __mapper("xs").m("geom")
    let mwen = __mapper("xs").m("wen")
    let cwen = __mapper("xs").c("wen")

    let state = {},
      scale  = [1, 1, 1],
      rotate = [0, 0, 0],
      // center = [0, 0, 0],
      transpose = [0, 0, 0],
      translate = [0, 0, 0],
      focale = Infinity,
      zafin = [0,1]

    let wenRotation = function(rot) {
      let rox = mwen.matrix(rot !== undefined ? g.to_radians(rot) : cwen.rotInDrag())
      return function(x, y, z=0) {
        return mwen.rotateMatrix([x, y, z], rox)
      }
    }

    let pointStream = function(x, y, z=0) {
if (0 && 1) console.log(" ---------- g.uniwen pointStream", x,y,z)
      let c = [x, y, z]
      c = wenRotation(rotate)(...c)														// rotate
      z = (c[2] * zafin[1]) + zafin[0]
      c = mwen.projection([ c[0], c[1], z ] , focale, scale )	// scale
      c = c.map( (d,i) => d + (translate[i] || 0))						// translate
      // c = c.map( (d,i) => d + (center[i] || 0))						// center
      c = c.map( (d,i) => d + (transpose[i] || 0))						// transpose

      this.stream.point(...c)
    }


    let proform = function() {
      let geoTrans = d3.geoTransform({
        point: pointStream,
				sphere: d => d 							// 
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
      // m.center = _ => _ !== undefined ? (center = _, m) : m
      m.transpose = _ => _ !== undefined ? (transpose = _, m) : m
      m.rotate = _ => _ !== undefined ? (rotate = _, m) : m

      m.scale = _ => _ !== undefined ? (scale = _, m) : m
      m.focale = _ => _ !== undefined ? (focale = _, m) : m
      m.zafin = _ => _ !== undefined ? (zafin = _, m) : m

      return m

    }

    return enty
  }

  exports.geoUniwen = geoUniwen

}));
