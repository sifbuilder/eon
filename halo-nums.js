/* *********************
*				@haloNums
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.haloNums = global.haloNums || {})));
}(this, function (exports) { 'use strict';

var haloNums = function (__mapper = {}) {

	let f = __mapper("props")()

	/* *********************
	 *		@gramn
	 */
	let gramn = function (anima, newAnigrams = []) {
    
    let anigram = manitem(anima).anigram(),   // anigram
      halo =       anigram.halo,             // halo
      geoform =     anigram.geoform           // geoform

    let payload =   anigram.payload,          // payload 
      boform =      payload.boform,           // boform
      ric =         payload.ric,              // ric
      tim =         payload.tim,              // tim
      proform =     payload.proform,          // proform
      conform =     payload.conform,          // conform
      uid =         payload.uid,              // uid
      parentuid =   payload.parentuid,        // parentuid
      nums =        payload.nums || {},       // nums payload
      text =        payload.text || {}        // nums payload
  
    let parentCoords
    let parentAnigram = mstore.findAnigramFromUid(parentuid)
    if (parentAnigram) {
      let geometry = parentAnigram.geoform.geometry
      if (!mgeoj.isValid(geometry)) { console.error("h.geofold:gj not valid", geometry)}
      parentCoords = mgeoj.getCoords(geometry)           // outer ring
    } 
      

				
		let locations = []
		if (nums.pos !== undefined && parentCoords !== undefined)		{				
			if (Array.isArray(nums.pos)) {							// pos is array
				locations = d3.range(nums.pos[0], nums.pos[1], nums.step)
						.map(d => d % parentCoords.length)					// mod
			} else if (typeof(pos) === "number") {					// one position
					locations = [Math.floor(nums.pos  % parentCoords.length)]
			}					
		}
		
		for (let i=0; i<locations.length; i++) {
      
        let idx = i
        let gid = ric.gid                             // from ava ric
        let cid = ric.cid
        let fid = (ric.fid === undefined) ? ric.cid + '_' + idx : ric.fid
        let _ric = {gid, cid, fid}
    
        let _proform = {                        // proform each candy
          'projection': 'uniwen',
          'translate': locations[i]     // translate each candy to candy location
        }    
    
        let _text = Object.assign({}, text, {text: position} )


			let newAnigram = {}                 // new anigram per fuel nat
        newAnigram.halo = 'nat'
        newAnigram.geoform = geoform
        newAnigram.payload = payload
        newAnigram.payload.ric = _ric           // identify each fuel nat
        newAnigram.payload.proform = _proform     // proform of each fuel nat
        newAnigram.payload.text = _text     // 
        

			
        let avaAnigrams = __mapper('xs').h('text').gramm(newAnigram)
        newAnigrams = [...newAnigrams, ...avaAnigrams]
			
		}
		return newAnigrams
	}	
	
		/**********************
		 *		@enty
		 */
    let haloNums_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloNums_gramm = anima => gramm(anima)

    let haloNums = {}
    haloNums.ween = anima => haloNums_ween(anima)
    haloNums.gramm = anima => haloNums_gramm(anima)

    let enty = haloNums

    return enty

}

exports.haloNums = haloNums

}));
