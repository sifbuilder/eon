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

    let f = __mapper("props")(),
			g = __mapper("xs").m("geom"),
			mwen = __mapper("xs").m("wen"),
			cwen = __mapper("xs").c("wen")

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
      let c = [x, y, z]
      c = wenRotation(rotate)(...c)														// rotate
      z = (c[2] * zafin[1]) + zafin[0]
      c = mwen.projection([ c[0], c[1], z ] , focale, scale )	// scale
			
			if (f.isPureArray(translate)) {
				
					c = c.map( (d,i) => d + (translate[i] || 0))						// translate
				
			}	else {																		// assume multiple translates
				
					for (let k=0; k<translate.length; k++) {
							let trans = translate[k]									// if {} assume {x,y,z} => [,,]
							if (typeof trans === "object") trans = Object.values(trans).map(d => d || 0)
							c = c.map( (d,i) => d + (trans[i] || 0))						// translate
					}
				
			}



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
