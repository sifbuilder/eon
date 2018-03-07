/***********
 *    @muonLiner
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonLiner = global.muonLiner || {})))
}(this, function (exports) {
  'use strict'

  let muonLiner = function muonLiner (__mapper = {}) {
    let f = __mapper('props')(),
      mlacer = __mapper('xs').m('lacer'),
      manitem = __mapper('xs').m('anitem'),
      mstore = __mapper('xs').m('store'),
      mstace = __mapper('xs').m('stace'),
      mgeoj = __mapper('xs').m('geoj')

    let r = __mapper('xs').r('renderport'),
      width = r.width(),
      height = r.height()

    let radians = Math.PI / 180,
      degrees = 180 / Math.PI

    let state = {}
    state.rotate = 0

		 let rotations = 0

    /**********************
   * 		@orientate

   */
    let orientate = function (anigram) {
      let payload = 		anigram.payload, // payload
        uid = 				payload.uid

      let preAnigram = mstore.findAnigramFromUid(uid) 		// pre-anigram

      state.rotate = (preAnigram && preAnigram.payload.rotate)
        ? preAnigram.payload.rotate
        : state.rotate

      let refCoords = []
      let parentuid = anigram.payload.parentuid
      let parent = mstore.findAnigramFromUid(parentuid)
      if (parent !== undefined) {
        let gj = parent.geofold
        refCoords = mgeoj.getCoords(gj)

        if (refCoords && refCoords.length > 2) {		// two points to set direction
          let refCoordsDims = mlacer.unslide(refCoords)

          let _posx = mstace.getPosInDim(anigram.payload.proform.translate.x)
          let _posy = mstace.getPosInDim(anigram.payload.proform.translate.y)
          // let _posz = mstace.getPosInDim(anigram.payload.proform.translate.z)

          let posx = f.posInStream(_posx, refCoordsDims[0])
          let posy = f.posInStream(_posy, refCoordsDims[1])
          // let posz = f.posInStream(_posy, refCoordsDims[2])

          if (posx > 1 && posy > 1) {
            let x, y // avaform position
            let _x, _y // previous avaform position

            _x = refCoordsDims[0][posx - 1]
            x = refCoordsDims[0][posx]

            _y = refCoordsDims[1][posy - 1]
            y = refCoordsDims[1][posy]

            let _ang = 0, dang = 0, dcos
            if (_x && x && _y && y) {
              _ang = Math.atan2(-(y - _y), x - _x) * degrees // inverse ang -1

              let __x, __y, __ang // two steps before

              __x = refCoordsDims[0][posx - 2] // -2 x
              __y = refCoordsDims[1][posy - 2] // -2 y

              if (__x && __y) {					// after second step ....
                __ang = Math.atan2(-(_y - __y), _x - __x) * degrees // inverse ang -2

                dang = _ang - __ang 						// delta ang
                dcos = Math.cos(dang * radians) // cos of delta ang

                if (dcos < -0.66) {
                  rotations += 1 // rotations
                }
              }
            }

            state.rotate = _ang + 180 * rotations
          }
        }
      } else if (preAnigram !== undefined) {

        if (preAnigram.geofold && preAnigram.payload.preani) {		// two points to set direction
          let _c = preAnigram.payload.geonode.geometry.coordinates
          let __c = preAnigram.payload.preani.payload.geonode.geometry.coordinates

          let refCoordsDims = mlacer.unslide(refCoords)

          let x, y // avaform position
          let _x, _y // previous avaform position

          _x = __c[0]
          x = _c[0]

          _y = __c[1]
          y = _c[1]

          let _ang = 0, dang = 0, dcos
          if (_x && x && _y && y) {
            _ang = Math.atan2(-(y - _y), x - _x) * degrees // inverse ang -1

            dang = _ang 						// delta ang
            dcos = Math.cos(dang * radians) // cos of delta ang
          }

          state.rotate = _ang + 180 * rotations
        }
      }

      return enty
    }

    /**********************
   *    @enty
   */
    let enty = function () {}

    enty.orientate = orientate
    enty.rotate = () => state.rotate

    return enty
  }

  exports.muonLiner = muonLiner
}))
