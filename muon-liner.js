/***********
 *    @muonLiner
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonLiner = global.muonLiner || {})))
}(this, function (exports) { "use strict"


  let muonLiner = function muonLiner(__mapper = {}) {

    let f = __mapper("props")()

    let r = __mapper("xs").r("renderer"),
      width = r.width(),
      height = r.height()

    let radians = Math.PI / 180,
      degrees = 180 / Math.PI
      
    let rotate = 0,
      rotations =0
    
    
    /**********************
   * 		@orientate

   */
    let orientate = function (anima) {

      let ani = __mapper("xs").m("anitem")(anima),
        anigram = ani.anigram(),             // anigram
        uid = anigram.payload.uid,                       // uid
        parentuid = anigram.payload.parentuid


      let parentAnigram = __mapper("xs").m("store").findAnigramFromUid(parentuid)
      let preAnigram = __mapper("xs").m("store").findAnigramFromUid(uid)  // pre anigram

      let  rotations = 0
      if (preAnigram) {

        rotations = preAnigram.payload.rotations || 0

      }


      if (parentAnigram) {

        if ( parentAnigram.feature && parentAnigram.feature.geometry && parentAnigram.feature.geometry.coordinates) {

          let parentCoordinates = parentAnigram.feature.geometry.coordinates

          let parentCoordsDims = f.unslide(parentCoordinates)

          let posx = f.posInStream(stace.x.pos, parentCoordsDims[0])
          let posy = f.posInStream(stace.y.pos, parentCoordsDims[1])

          let x, y    // avaform position
          let _x, _y  // previous avaform position

          _x = parentCoordsDims[0][posx - 1]
          x = parentCoordsDims[0][posx]

          _y = parentCoordsDims[1][posy - 1]
          y = parentCoordsDims[1][posy]


          let _ang = 0, dang = 0, dcos
          if (_x && x && _y && y) {

            _ang = Math.atan2( y - _y, x - _x ) * degrees   // -1 ang


            let __x, __y, __ang  // two steps ahead

            __x = parentCoordsDims[0][posx - 2]        // -2 x
            __y = parentCoordsDims[1][posy - 2]        // -2 y


            if (__x && __y) {
                
              __ang = Math.atan2( _y - __y, _x - __x ) * degrees  // -2 ang
            
              dang = _ang - __ang                   // delta ang

              dcos = Math.cos(dang * radians)     // cos of delta ang

              if (dcos < -0.66) {

                rotations += 1                     // rotations

              }


            }

            rotations = rotations
            rotate = _ang - 180  * rotations

          }

        }
      }



      return anigram


    }
  
    /**********************
   *    @enty
   */
    let enty = function() {}

    enty.orientate = orientate
    enty.rotations = () => rotations
    enty.rotate = () => rotate


    return enty

  }

  exports.muonLiner = muonLiner

}))
