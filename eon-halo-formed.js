/**********************
 *    @haloFormed
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloFormed = global.haloFormed || {})))
}(this, function (exports) {
  'use strict'


  async function haloFormed (__mapper = {}) {
    let [
      manitem,
      mric,
      mboform,
      mgeoj
    ] = await Promise.all([
      __mapper('xs').m('anitem'),
      __mapper('xs').m('ric'),
      __mapper('xs').m('boform'),
      __mapper('xs').m('geoj')
    ])

    const functor = (d, ...p) => (typeof d === 'function') ? d(...p) : d

    // ............................. gramm
    async function gramm (anima, newAnigrams = []) {
      let anigram = manitem(anima).anigram(), // anigram
        halo = anigram.halo, // halo
        geofold = anigram.geofold, // geofold
        payload = anigram.payload, // payload
        avatars = anigram.avatars // avatars

      let boform = payload.boform, // boform
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        vim = payload.vim, // vim
        proform = payload.proform, // proform
        conform = payload.conform, // conform
        uid = payload.uid, // uid
        parentuid = payload.parentuid // parentuid

      //  get GEOFORM FeatureCollection
      //
      let gj = functor(geofold, anigram)
      let gjcollection = mgeoj.featurecollect(gj)
      if (2 && 2 && gjcollection.type !== 'FeatureCollection') console.log('** gjcollection is not FeatureCollection', gjcollection)
      gjcollection = mgeoj.zorder(gjcollection) // order features in collection
      gjcollection = mric.enric(ric, anigram, gjcollection) // ric to feature or collection

      newAnigrams = gjcollection.features.map((feature, i) => {
        feature = mboform.boformer(anigram, feature)

        feature.properties.tim = tim // tim in geofold
        feature.properties.vim = vim // vim in geofold to render
        feature.properties.sort = feature.properties.sort || 'feature' // svg sort

        let newAnigram = {
          halo: halo, // inherit halo
          geofold: feature, // inherit geofold
          payload: { // payload is lost in m.animation before rendering
            ric: feature.properties.ric, // hoist ric
            id: feature.properties.uid, // hoist uid
            uid: feature.properties.uid // hoist uid
          },
          avatars: avatars // inherit avatars
        }
        return newAnigram
      })

      return newAnigrams //    new anigrams are stored by m.animation
    }

    // ............................. enty
    let haloGeofold_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloGeofold_gramm = anima => gramm(anima)

    let haloFormed = {}
    haloFormed.ween = anima => haloGeofold_ween(anima)
    haloFormed.gramm = anima => haloGeofold_gramm(anima)

    let enty = haloFormed
    return enty
  }

  exports.haloFormed = haloFormed
}))
