/***********
 *    @muonAnitem
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonAnitem = global.muonAnitem || {})))
}(this, function (exports) { "use strict"


  let muonAnitem = function muonAnitem(__mapper = {}) {

    let f = __mapper("props")()

    /***************************************
 *        @anitem
 *
 */
    let anitem = {}

    let setAnitem = function (d = {}) {
      let a = anitem = {}

      let c = {

        halo: d.halo,        // type

        geoform: d.geoform,   // geometry

        payload: d.payload,   // properties

			}

      a = Object.assign(a, c)
      return a

    }
    /***************************************
 *        node
 *
 */
    let node = function () {
			if (0 && 1) console.log("anitem", anitem)
			if (anitem.payload === undefined) anitem.payload = {}

      let node = {
         x: anitem.payload.x,
         y: anitem.payload.y,
         z: anitem.payload.z,
        _x: anitem.payload._x,     // past
        _y: anitem.payload._y,     // past
        _z: anitem.payload._z,     // past
        vx: anitem.payload.vx,
        vy: anitem.payload.vy,
        vz: anitem.payload.vz,
        fx: anitem.payload.fx,
        fy: anitem.payload.fy,
        fz: anitem.payload.fz,
        dx: anitem.payload.dx,
        dy: anitem.payload.dy,
        dz: anitem.payload.dz,
       }

      return node

    }

    /***********
  *   @parentCoords
  */
    let parentCoords = function( anitem, coords = [] ) {
      let parentGeometry
			let parentuid = anitem.payload.parentuid
      let parent = __mapper("xs").m("store").findAnigramFromUid(parentuid)

      if (parent !== undefined) {
        let geoj = parent.payload.feature
        coords = __mapper("xs").m("geoj").getCoords(geoj)
      }

      return coords
    }


    /***********
  *   @coreGeoform
  */
    let coreGeoform = () => p => ({     // geoform
      type:  "Feature",
      geometry: { type: "Point", coordinates: null},
      properties: {sort: "feature", }})
			

    /***********
  *   @coreGeonode
  */
    let coreGeonode = () => ({
			type: "Feature",
			geometry: { type: "Point", coordinates: null },
			properties: {orgin: null, velin: null, velang: null, prevous: null, geodelta: null,}
		})		
		
    /***********
  *   @enty
  */
    let enty = function( anima, t ) {
      let anigram = {}
      if (anima !== undefined) {
        if (t !== undefined) {
          anigram = __mapper("xs").b("snap")(anima, t)
        } else if (anima.payload.tim.unitTime !== undefined) {
          let t = anima.payload.tim.unitTime
          anigram = __mapper("xs").b("snap")(anima, t)
        }
				if (anigram.payload === undefined) anigram.payload = {}
        setAnitem(anigram)
      }
      return enty
    }

    enty.halo = (_) => {  return _ !== undefined ? (anitem.halo = _, anitem) : anitem.halo }
    enty.geoform = (_) => {  return _ !== undefined ? (anitem.geoform = _, anitem) : anitem.geoform }
    enty.payload = (_) => { return _ !== undefined ? (anitem.payload = _, anitem) : anitem.payload }

		enty.coreGeoform = coreGeoform			// default halo geoform
		enty.coreGeonode = coreGeonode			// default halo geonode
		
    enty.anigram = (ani,t) => {
      if (ani !== undefined) {                    // if give anima
        if (t !== undefined) {                  // if given time
          ani  = __mapper("xs").b("snap")(ani, t)  // anima snap  to anigram
        }
        setAnitem(ani)                            // build anitem
      }
      return anitem                             // give anitem back
    }

    enty.parentCoords = parentCoords
    enty.node = node                        // anitem => node

    enty.conform = _ => { return _ !== undefined ? (anitem.payload.conform = _, anitem) : anitem.payload.conform }
    enty.conform$2 = _ => { return _ !== undefined ? (anitem.payload.conform = _, anitem) : (delete anitem.payload.conform.z, anitem.payload.conform)}

    enty.form = (_) => { return _ !== undefined ? (anitem.payload.form = _, anitem) : anitem.payload.form }
    enty.form$2 = (_) => { return _ !== undefined ? (anitem.payload.form = _, anitem) : (delete anitem.payload.form.z, anitem.payload.form)}

    enty.ereform = (_) => {  return _ !== undefined ? (anitem.payload.ereform = _, anitem) : anitem.payload.ereform }


    enty.proform = (_) => { return _ !== undefined ? (anitem.payload.proform = _, anitem) : anitem.payload.proform }

    enty.ric = (_) => { return _ !== undefined ? (anitem.payload.ric = _, anitem) : anitem.payload.ric }
    enty.tim = (_) => { return _ !== undefined ? (anitem.payload.tim = _, anitem) : anitem.payload.tim }
    enty.boform = (_) => { return _ !== undefined ? (anitem.payload.boform = _, anitem) : anitem.payload.boform }

    enty.avatars = (_) => { return _ !== undefined ? (anitem.payload.avatars = _, anitem) : anitem.payload.avatars }
    enty.parentuid = (_) => { return _ !== undefined ? (anitem.payload.parentuid = _, anitem) : anitem.payload.parentuid }
    enty.uid = (_) => { return _ !== undefined ? (anitem.payload.uid = _, anitem) : anitem.payload.uid }

    enty.dims = () => ["x","y","z"]
    enty.anilocation = a => [ a.x, a.y, a.z ]
    enty.x = a => a.x
    enty.y = a => a.y
    enty.z = a => a.z

		enty.iscoord = _ => _.x !== undefined || _.y !== undefined || _.z !== undefined
		enty.isnat = _ => _.m1 !== undefined && _.n1 !== undefined && _.a !== undefined
		enty.basicclone = anigram => {
				let clone = {}
					clone.payload = {}
					clone.payload.tim = anigram.payload.tim
					clone.payload.ric = {}
					clone.payload.ric.gid = anigram.payload.ric.gid
					clone.payload.ric.cid = anigram.payload.ric.cid
					clone.payload.ric.fid = anigram.payload.ric.fid
				return clone
		}

    return enty

  }

  exports.muonAnitem = muonAnitem

}));
