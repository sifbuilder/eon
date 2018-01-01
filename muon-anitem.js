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

        stace: f.v((d||{}).stace),  // stace: {a,b,c}

        avatars: d.avatars,         // avatars: {}
        fields: d.fields,           // fields: {pic, field}

        form: d.form,

        from: d.from,           // from form in tern
        fuel: d.fuel,           // fuel

        ereform: (d||{}).ereform,   // ereform()

        _feature: d._feature,       // _feature   -- from f.gramn
        feature: d.feature,       // feature    -- from f.gramn
        // geometry: d.geometry,        // geometry   -- from f.gramn

        geoform: (d||{}).geoform,   // geoform()

        graticule: d.graticule, // extent: {}
        payload: d.payload,   // {initN,eventN,autoN,autoP,outed,maxN}
        nums: d.nums,   // {ra2, pos, fas, step, dist, div, mod, z}
        parent: d.parent || {}, // parent - default to empty object
        parentuid: d.parentuid,     // parentuid
        pic: d,                 // pic:{}

        coform: d.coform,   // projection, scale, translate, rotate
        conform: d.conform,

        proform: d.proform, // projection, scale, translate, rotate

        reticule: d.reticule, //
        msg: d.msg,           //

        ric: d.ric,           // {type, gid, cid, fid}
        tim: d.tim,           // tim: {t0,t1,t2,t3}

        to: d.to,             // to form in tern
        trace: d.trace,       // trace: {hquan, hmod}
        boform: d.boform,         // {csx,cf,cs,cw
        voro: d.voro,         // {hsamp, f, t}
        vorts: d.vorts,       // {pos,fas,step,dist,div,mod,z}

        halo: d.halo,        // d.halo, //

        nid: d.nid,               // nid
        uid: d.uid,               // uid
        x: d.x,                   //
        y: d.y,                   //
        z: d.z,                   //

        sort: d.sort,             // sort

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

    core.gelded = anitem.gelded
    core.inited = anitem.inited
    core.feature = anitem.feature
    core.uid = anitem.uid
    core.parentuid = anitem.parentuid

    return core

  }
   /***********
  *   @enty
  */

    let enty = function( anima, t ) {
      let anigram = {}
      if (anima !== undefined) {
        if (t !== undefined) {
          anigram = __mapper("xs").b("snap")(anima, t)
        } else if (anima.tim.unitTime !== undefined) {
          let t = anima.tim.unitTime
          anigram = __mapper("xs").b("snap")(anima, t)
        }
        setAnitem(anigram)
      }
      return enty
    }

    enty.anigram = (ani,t) => {
      if (ani !== undefined) {                    // if give anima
        if (t !== undefined) {                  // if given time
             ani  = __mapper("xs").b("snap")(ani, t)  // anima snap  to anigram
        }
        setAnitem(ani)                            // build anitem
      }
      return anitem                             // give anitem back
    }

    enty.getCore = getCore                        // anitem => core
    enty.getNode = getNode                        // anitem => node

    enty.conform = (_) => { return _ !== undefined ? (anitem.conform = _, anitem) : anitem.conform }
    enty.conform$2 = (_) => { return _ !== undefined ? (anitem.conform = _, anitem) : (delete anitem.conform.z, anitem.conform)}


    enty.dims = () => ["x","y","z"]

    enty.form = (_) => { return _ !== undefined ? (anitem.form = _, anitem) : anitem.form }
    enty.form$2 = (_) => { return _ !== undefined ? (anitem.form = _, anitem) : (delete anitem.form.z, anitem.form)}


    enty.from = (_) => { return _ !== undefined ? (anitem.from = _, anitem) : anitem.from }
    enty.fuel = (_) => { return _ !== undefined ? (anitem.fuel = _, anitem) : anitem.fuel }

    enty.ereform = (_) => {  return _ !== undefined ? (anitem.ereform = _, anitem) : anitem.ereform }

    enty._geometry = (_) => {  return _ !== undefined ? (anitem._feature.geometry = _, anitem) : anitem._feature.geometry }
    enty.geometry = (_) => {  return _ !== undefined ? (anitem.feature.geometry = _, anitem) : anitem.feature.geometry }
    enty._feature = (_) => {  return _ !== undefined ? (anitem._feature = _, anitem) : anitem._feature }
    enty.feature = (_) => {  return _ !== undefined ? (anitem.feature = _, anitem) : anitem.feature }

    enty.geoform = (_) => {  return _ !== undefined ? (anitem.geoform = _, anitem) : anitem.geoform }

    enty.graticule = (_) => { return _ !== undefined ? (anitem.graticule = _, anitem) : anitem.graticule }
    enty.nums = (_) => { return _ !== undefined ? (anitem.nums = _, anitem) : anitem.nums }
    enty.payload = (_) => { return _ !== undefined ? (anitem.payload = _, anitem) : anitem.payload }

    enty.proform = (_) => { return _ !== undefined ? (anitem.proform = _, anitem) : anitem.proform }

    enty.reticule = (_) => { return _ !== undefined ? (anitem.reticule = _, anitem) : anitem.reticule }
    enty.ric = (_) => { return _ !== undefined ? (anitem.ric = _, anitem) : anitem.ric }
    enty.stace = (_) => { return _ !== undefined ? (anitem.stace = _, anitem) : anitem.stace }
    enty.tim = (_) => { return _ !== undefined ? (anitem.tim = _, anitem) : anitem.tim }
    enty.boform = (_) => { return _ !== undefined ? (anitem.boform = _, anitem) : anitem.boform }
    enty.trace = (_) => { return _ !== undefined ? (anitem.trace = _, anitem) : anitem.trace }
    enty.to = (_) => { return _ !== undefined ? (anitem.to = _, anitem) : anitem.to }

    enty.avatars = (_) => { return _ !== undefined ? (anitem.avatars = _, anitem) : anitem.avatars }
    enty.parent = (_) => { return _ !== undefined ? (anitem.parent = _, anitem) : anitem.parent }

    enty.segs = () => {
      let segs = 0
      segs = Math.max((anitem.form.x.seg5 || 0), segs)
      segs = Math.max((anitem.form.y.seg5 || 0), segs)
      segs = Math.max(((anitem.form.z||{}).seg5 || 0), segs)
      return segs
    }

    enty.anilocation = a => [ a.x, a.y, a.z ]
    enty.x = a => a.x
    enty.y = a => a.y
    enty.z = a => a.z
    enty.fixedLocation = a => a.stace.f  // f: 1/0 _e_

    return enty

  }

  exports.muonAnitem = muonAnitem

}))
