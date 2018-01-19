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
			mstace = __mapper('xs').m('stace')

    let r = __mapper('xs').r('renderer'),
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
    let orientate = function (anima) {
      let anigram = manitem(anima).anigram(),										// anigram
        halo = 				anigram.halo, // halo
        geoform = 		anigram.geoform || manitem.coreGeoform(), // geoform
        payload = 		anigram.payload, // payload
        uid = 				payload.uid, // uid
        parentuid = 	payload.parentuid // parentuid

      let parentAnigram = mstore.findAnigramFromUid(parentuid) // parent
      let preAnigram = mstore.findAnigramFromUid(uid) 		// pre-anigram
			

      state.rotate = (preAnigram && preAnigram.payload.rotate) 
								? preAnigram.payload.rotate 
								: state.rotate								

			let parentCoords = manitem.parentCoords(anigram)
			if (0 && 1)	console.log('h.geojson.gramm parentCoords', parentCoords)

      if (parentCoords) {

				let parentCoordsDims = mlacer.unslide(parentCoords)
				if (0 && 1)	console.log('h.geojson.gramm:parentCoordsDims', parentCoordsDims)

				let _posx = mstace.getPosInDim(anigram.payload.proform.translate.x)
				let _posy = mstace.getPosInDim(anigram.payload.proform.translate.y)
				// let _posz = mstace.getPosInDim(anigram.payload.proform.translate.z)

				let posx = f.posInStream(_posx, parentCoordsDims[0])
				let posy = f.posInStream(_posy, parentCoordsDims[1])
				// let posz = f.posInStream(_posy, parentCoordsDims[2])

				if (0 && 1)	console.log('h.geojson.gramm posx, posy', posx, posy)

				if (posx > 1 && posy > 1) {

					let x, y // avaform position
					let _x, _y // previous avaform position

					_x = parentCoordsDims[0][posx - 1]
					x = parentCoordsDims[0][posx]

					_y = parentCoordsDims[1][posy - 1]
					y = parentCoordsDims[1][posy]


					let _ang = 0, dang = 0, dcos
					if (_x && x && _y && y) {
						_ang = Math.atan2(y - _y, x - _x) * degrees // -1 ang

						let __x, __y, __ang // two steps before

						__x = parentCoordsDims[0][posx - 2] // -2 x
						__y = parentCoordsDims[1][posy - 2] // -2 y

						if (__x && __y) {					// after second step ....
							__ang = Math.atan2(_y - __y, _x - __x) * degrees // -2 ang
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

      return anigram
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
