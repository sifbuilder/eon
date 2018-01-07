/***********
 *    @muonStore
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonStore = global.muonStore || {})))
}(this, function (exports) { "use strict"

// ref: https://bl.ocks.org/mbostock/6081914 transitions
//      https://github.com/d3/d3-ease#easeElasticOut

  let muonStore = function muonStore(__mapper) {

    let f = __mapper("props")()
    let local = {}
    local.animas = []     // animas array
    local.aniset = {}   // animas by uid
    local.anigrams = []   // behavior - an anigram may have many avatars

    let apply = function apply (action = {}) {

      /***************************
 *        @UPDANIMA
 */
      if (action.type === "UPDANIMA") {

        let updAnimas = f.fa(action.animas)   // get new animas as array
        let elapsed = action.elapsed || 0

        for (let i=0; i < updAnimas.length; i++) {

          let updAnima = f.o(updAnimas[i])                      // each new anima


          let uid = (updAnima.uid !== undefined)                // uid
            ? updAnima.uid
            : __mapper("xs").m("ric").buildUID(updAnima)

          let index = enty.findFromUid(uid, local.animas)
          if (index !== -1) {                                 // anima exists

            if (updAnima.delled === 1 ) {

              local.animas.splice(index, 1)                   // delete anima

            } else {

              local.animas[index] = updAnima                    // replace
            }

          } else {                                             // new anima

            updAnima.tim =  __mapper("xs").b("tim")(updAnima.tim, elapsed) // set tim elapsed
            updAnima.uid = uid                                // set uid if new anima
            updAnima.nid = __mapper("xs").m("store").getNid() // node id in animas collection

            local.aniset[updAnima.uid] = updAnima             // set new anima by uid
            local.animas[local.animas.length] = updAnima      // register new anima

          }

        }

        return local.animas
      }
      /***************************
 *        @UPDANIGRAM
 */
      if (action.type === "UPDANIGRAM") {
				let newAnigrams = action.anigrams
        
        for (let i=0; i<newAnigrams.length; i++) {

          if (newAnigrams[i] !== undefined) {
            let newItem = newAnigrams[i]                        // new anigram
						let uid = newItem.uid
            let index = enty.findFromUid(uid, local.anigrams)     // find index from d.uid
if (0 && 1) console.log("UPDANIGRAM newItem", uid, index, newItem)
            if (index === -1) index = local.anigrams.length           // add holder if new
            local.anigrams[index] = newItem                           // replace anigram
          }

        }

        return local.anigrams

      }
    }

    /* **************************
 *        @ween
 *        ween every generation
 */
    let ween = function (anima, newItems = []) {
      let anigram = __mapper("xs").m("anitem").anigram(anima)

      if (anigram.halo === undefined) console.error("halo not defined")
      if (anigram.halo === null)  console.error("halo is null")
      let halo = (anigram.halo !== undefined  && typeof anigram.halo === "object")
        ? anigram.halo                    // halo in anima
        : __mapper("xs").h(anigram.halo)  // halo in store

      let weened = halo.ween(anima)         // ANIMA HALO.WEEN
      weened.forEach(d =>  {              // qualify each ween

        d.uid = __mapper("xs").m("ric").buildUID(d) // uid for children
        newItems.push(d)

      })

      return newItems
    }

    /* **************************
 *        @gramn
 *        gramn when rendering
 */
    let gramn = function (anima, newItems = []) {

      let anigram = __mapper("xs").m("anitem").anigram(anima)

      let tim = anigram.tim,
        elapsed = tim.elapsed,
        wait = tim.wait

      let newAnigrams = []
      let halo

      if (  anima && (elapsed || elapsed >=  wait )) {  // anima just born or beyond wait time

        halo = (anigram.halo !== undefined && typeof anigram.halo === "object")
          ? anigram.halo                                    // halo in anima
          : __mapper("xs").h(anigram.halo)                  // or halo in store

        if (halo) newAnigrams = halo.gramn(anima)       // ANIMA HALO.GRAMN
        else console.log("form ", halo, " not defined")

        if (newAnigrams !== null) newItems = newItems.concat(f.a(newAnigrams))
        else console.error("avatar gramn ", halo, " returns null")

      }
      if (newAnigrams !== undefined && newAnigrams.length > 0) {  // check if avatars in new animas
        for (let i=0; i<newAnigrams.length; i++) {
          let newItem = newAnigrams[i]                            // each new item
          if (newItem.avatars !== undefined) {                // AVATARS
            let avatars = (typeof newItem.avatars === "object") ? Object.values(newItem.avatars) : newItem.avatars
            for (let j=0; j<avatars.length; j++) {
              let newSubItems = []
              let avatar = avatars[j]
              avatar.uid = __mapper("xs").m("ric").buildUID(avatar) // uid for children
              avatar.tim = anigram.tim                                // time from anima
              avatar.parent = __mapper("xs").m("anitem").getCore(newItem)  // parent is newItem
              avatar.parentuid = newItem.uid                        // parentuid from newItem

              newSubItems = enty.gramn(avatar)                          // AVATAR GRAMN halogram
              newItems = newItems.concat(f.a(newSubItems))

            }
          }

        }
      }

      return newItems
    }
    /***************************
 *        @enty
 */
    function enty() {}

    enty.apply = apply
    enty.gramn = gramn
    enty.ween = ween

    enty.animasInGroupHowMany = anima =>
      (anima === undefined)
        ? 0
        : enty.animasLive()
          .filter(d => d.ric.gid === anima.ric.gid).length

    enty.animasInClassHowMany = anima =>
      (anima === undefined)
        ? 0
        : enty.animasLive()
          .filter(d => (d.ric.gid === anima.ric.gid
                    && d.ric.cid === anima.ric.cid)).length

    enty.findIndex = (item, list) =>
      list.findIndex(d =>
        d.ric.gid === item.ric.gid &&
                d.ric.cid === item.ric.cid &&
                d.ric.fid === item.ric.fid
      )

    enty.findIndexFromRic = (ric, list) =>
      list.findIndex(d =>
        d.ric.gid === ric.gid &&
                d.ric.cid === ric.cid &&
                d.ric.fid === ric.fid
      )

    enty.findByUid = (item, list) => {
      let uid =  __mapper("xs").m("ric").buildUID(item)
      return  enty.findFromUid(uid, list)
    }

    enty.findFromUid = (uid, list) => list.findIndex(d => d.uid === uid )

    enty.findIndexAnigramFromUid = uid => enty.anigrams().findIndex(d => d.uid === uid)
    enty.findAnigramFromUid = uid => local.anigrams.find(d => d.uid === uid)
    enty.findAnimaFromUid = uid => local.animas.find(d => d.uid === uid)

    enty.born = d =>d.tim !== undefined && d.tim.unitElapsed !== undefined && d.tim.unitElapsed > f.epsilon
    enty.unborn = d => d.tim === undefined && d.tim.elapsed === undefined && d.tim.unitElapsed === undefined && d.tim.unitElapsed < f.epsilon
    enty.getAnimaByUID = uid => local.animas.find(d => d.uid === uid)

    enty.animas = () => local.animas
    enty.anigrams = () => local.anigrams
    enty.animasAll = () => local.animas   // animas including delled
    enty.animasLive = () => local.animas.filter(d=>d.delled !==1 && d.delled !== true)
    enty.token = () => local.animas.length + 1
    enty.getNid = () => local.animas.length + 1

    enty.getAnigramIdx = ric => enty.getAnitemIndex(local.anigrams,ric.gid,ric.cid,ric.fid)
    enty.getAnigram = ric => local.anigrams[enty.getAnigramIdx(ric)] || null

    return enty
  }

  exports.muonStore = muonStore

}))
