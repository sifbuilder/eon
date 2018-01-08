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

      // if (d && d.form                // form:{x,y,z}
      // && typeof d.form === "object"
      // && ( d.form.x !== undefined && d.form.y !== undefined && d.form.z !== undefined )) {
      // a.form = d.form
      // } else if (d                       // form:{}
      // && d.form
      // && typeof d.form === "object"
      // && ( d.form.x === undefined && d.form.y === undefined && d.form.z === undefined )) {
      // a.form = {}
      // a.form.x = Object.assign( {}, d.form,  {fas8: (d.form.fas8 || 0)} )  // set fas8 0
      // a.form.y = Object.assign( {}, (d.form.y || d.form) , {fas8: d.form.fas8 - 90})
      // a.form.z = Object.assign( {}, (d.form.z || d.form) )
      // } else if (d                       // form:{x:}
      // && d.form
      // && typeof d.form === "object"
      // && ( d.form.x !== undefined || d.form.y !== undefined || d.form.z !== undefined )) {
      // a.form = {}
      // a.form.x = Object.assign({}, d.form.x )    // defined
      // a.form.y = Object.assign({}, (d.form.y || d.form.x) , {fas8: d.form.x.fas8 - 90})
      // a.form.z = Object.assign({}, (d.form.z || d.form.x) )
      // } else if (d                       // form:[{},{},{}]
      // && d.form
      // && Array.isArray(d.form)) {
      // a.form = {}
      // a.form.x = d.form[0]
      // a.form.y = d.form[1] ||  Object.assign({}, d.form[0], {fas8: d.form.fas8 - 90})
      // a.form.z = d.form[2] ||  Object.assign({}, d.form[0])
      // } else {
      // a.form = {}
      // a.form.x = {}
      // a.form.y = {}
      // a.form.z = {}
      // }

      let c = {
				
        halo: d.halo,        // d.halo, //
				
        geoform: (d||{}).geoform,   // geoform()
				
        payload: d.payload,   // {initN,eventN,autoN,autoP,outed,maxN}
				
				x: d.x,                   //
        y: d.y,                   //
        z: d.z,                   //
				
			}

      a = Object.assign(a, c)
      return a

    }
    /***************************************
 *        getNode
 *
 */
    let getNode = function getNode(anitem = {}) {

      let node = {
        x: anitem.x,
        y: node.y,
        z: anitem.z,
        _x: anitem._x,     // past location
        _y: anitem._y,     // past location
        _z: anitem._z,     // past location
        vx: anitem.vx,
        vy: anitem.vy,
        vz: anitem.vz,
      }
      return node

    }

    /***************************************
 *        getCore
 *
 */
    let getCore = function (anitem = {}) {

      let core = {}

      core.x =  anitem.x
      core.y =  anitem.y
      core.z =  anitem.z
      core._x = anitem._x     // past location
      core._y = anitem._y     // past location
      core._z = anitem._z     // past location
      core.vx = anitem.vx
      core.vy = anitem.vy
      core.vz = anitem.vz

      core.gelded = 		anitem.payload.gelded
      core.inited = 		anitem.payload.inited
      core.feature = 		anitem.payload.feature
      core.uid = 				anitem.payload.uid
      core.parentuid = 	anitem.payload.parentuid

      return core

    }

    /***********
  *   @parentCoords
  */
    let parentCoords = function( anitem, coords = [] ) {
      let parentGeometry
      let parent = anitem.payload.parent || __mapper("xs").m("store").findAnigramFromUid(ani.payload.parentuid)

      if (parent !== undefined) {
        let geoj = parent.feature
        coords = __mapper("xs").m("geoj").getCoords(geoj)
      }

      return coords
    }



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
    enty.getCore = getCore                        // anitem => core
    enty.getNode = getNode                        // anitem => node

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


    return enty

  }

  exports.muonAnitem = muonAnitem

}))
