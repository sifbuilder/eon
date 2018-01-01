/***********
 *    @haloFuel
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.haloFuel = global.haloFuel || {})));
}(this, function (exports) { 'use strict';

let haloFuel = function haloFuel(__mapper = {}) {

    let f = __mapper("props")()

    let r = __mapper("xs").r("renderer"),
      width = r.width(),
      height = r.height()

    let gramn = function (anima, newAnigrams = []) {

        let ani = __mapper("xs").m("anitem")(anima),
          anigram = ani.anigram(),             // anigram
          stace =   ani.stace(),               // stace
          ereform = ani.ereform(),             // ereform
          proform = ani.proform(),             // proform
          conform = ani.conform(),             // conform
          geoform = ani.geoform(),            // geoform
          payload = ani.payload(),
          tim = anigram.tim,                       // tim
          ric = anigram.ric,                       // ric
          uid = anigram.uid,                       // uid
          parentuid = anigram.parentuid,
          fuel = payload.fuel


        let parentAnigram = __mapper("xs").m("store").findAnigramFromUid(parentuid)
        let preAnigram = __mapper("xs").m("store").findAnigramFromUid(uid)  // pre anigram

        // let polygon = anima.stream

        let x0 = anima.x || width/2
        let y0 = anima.y || height/2

        // let r
        // if (anima.r !== undefined) {
          // r = anima.r
        // } else {
          // r = Math.max(anima.form.formA.ra2, anima.form.formB.ra2)
        // }

        let rx = (fuel && fuel.rx) ? fuel.rx : width/2
        let ry = (fuel && fuel.ry) ? fuel.ry : height/2

        // let extent = [
                // [anima.x - r, anima.y - r]
              // , [anima.x + r, anima.y + r]
              // ]

        let extent = [
                [x0 - rx, y0 - ry]
              , [x0 + rx, y0 + ry]
              ]



        let quadtree = d3.quadtree()              // quad
            .extent(extent)
            .x(function(d) {return d[0]})
            .y(function(d) {return d[1]})

        // let quadPlugin = __mapper("pluginQuad").quad(quadtree)
        let mquad = __mapper("xs").m("quad")

        // let ra2 = avatar.form.formA.ra2         // exclusion between sample items
        // let candidates = avatar.pic.kan || 5  // tries to find a free slot
        // let sample = avatar.pic.hsam      // how many hits searched for

        let ra2 = fuel.ra2
        let candidates = fuel.candidates
        let sample = fuel.sample
        let polygon = []
        


        // let foundcandies =  mquad.candysearch(ra2, polygon, candidates, sample)
        
        let foundcandies = []
console.log("parentAnigram", parentAnigram  )
if (parentAnigram
  && parentAnigram.feature 
  && parentAnigram.feature.geometry
  && parentAnigram.feature.geometry.type === "Polygon"
    )  {
      
      
      polygon = parentAnigram.feature.geometry.coordinates[0] // outer ring
      
      foundcandies =  mquad.candysearch(ra2, polygon, candidates, sample)
      
    }


        

        // let newItems = []
        // let remaincandies = []
        // if (avatar.pic.f === 3) {           // 3 - old and new all time
            // remaincandies = state.items
            // newItems =  [...remaincandies, ...foundcandies]
        // } else if (avatar.pic.f === 2)  { // 2 - just new
            // newItems =  foundcandies
        // } else  {                         //  1 - old and new in polygon
            // remaincandies = state.items.filter(c => d3.polygonContains(polygon, c))
            // newItems =  [...remaincandies, ...foundcandies]
        // }


        // let gid = anima.ric.gid
        // let cid = anima.ric.cid
        // let fid = anima.ric.fid
        // for (let i = 0; i < newItems.length; i++) {

            // let newAnima = Object.assign({}, avatar)

                // let ric = avatar.ric        // build on parent id
                // ric.typ = "form"
                // ric.gid = gid + "_fuel"
                // ric.cid = cid + "_fuel"
                // if (avatar.ric.fid === undefined) {                     // __ RIC
                    // ric.fid = ric.cid + "_" +  i    // fid on items per class
                // } else {
                    // ric.fid = avatar.ric.fid
                // }
                // newAnima.ric = ric

            // newAnima.state.stateA = newItems[i][0]
            // newAnima.state.stateB = newItems[i][1]



            // let newAnigrams = __mapper("proxyForms").anima(anima, newAnima)

            // newAnimas = newAnimas.concat(newAnigrams)


        // }




    return newAnigrams

  }

    /***************************
 *        @enty
 */
    let haloFuel = {}
        haloFuel.ween = anima => (anima.inited !== true) ? (anima.inited = true, [anima]) : []
        haloFuel.gramn = anima => gramn(anima)

    let enty = haloFuel

    return enty

}

exports.haloFuel = haloFuel

}));
