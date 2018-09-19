/****************************
 *      @haloTiles
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloTiles = global.haloTiles || {})))
}(this, function (exports) {
  'use strict'

  async function haloTiles (__mapper = {}) {
    let [
      mprops,
      muonGraticule,
      haloLeaform,
      haloNatform,
      haloEoform,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('graticule'),
      __mapper('xs').h('leaform'),
      __mapper('xs').h('natform'),
      __mapper('xs').h('eoform'),

    ])    


    function getTiles (anigram, newItems = []) {
      let geofold = anigram.geofold, // geofold
        geonode = anigram.geonode, // geonode
        ric = anigram.ric, // ric
        payload = anigram.payload // payload

      let gj = mprops.v(geofold, anigram) // get geofold
      gj.properties = gj.properties || {} // recall genode

      let graticule = payload.graticule

      let range = (anigram.range !== undefined) ? anigram.range : null
      let tile = (anigram.tile !== undefined) ? anigram.tile : null
      let verts = muonGraticule.gvertices(graticule) // Feature.LineString
      let vertices = verts.geometry.coordinates
      let faces = muonGraticule.gfaces(graticule) // faces

      for (let i = 0; i < faces.length; i++) { // single ring polygon
        let idx = i
        let gid = ric.gid // from ava ric
        let cid = ric.cid
        let fid = ric.cid + '_' + idx
        let _ric = {gid, cid, fid}

        let newItem = Object.assign({}, anigram)
        newItem.halo = 'natform'
        newItem.payload = Object.assign({}, anigram.payload)
        newItem.ric = _ric

        newItem.geofold = {type: 'Polygon', coordinates: []}

        let face = faces[i]
        let facering = [vertices[face[0]], vertices[face[1]], vertices[face[2]]]
        newItem.geofold.coordinates = Array.of([...facering, facering[0]])

        newItems.push(newItem)
      }

      return newItems
    }

    // .................... gramm
    function gramm (anigram) {
      return Promise.all(getTiles(anigram).map(ani => haloEoform.gramm(ani)))
    }

    // .................... enty
    let haloNat_ween = anima => (anima.inited !== 1) ? (anima.inited = anima.gelded = 1, [anima]) : []
    let haloNat_gramm = anima => gramm(anima)

    let haloTiles = {}
    haloTiles.ween = anima => haloNat_ween(anima)
    haloTiles.gramm = anima => haloNat_gramm(anima)

    let enty = haloTiles

    return enty
  }

  exports.haloTiles = haloTiles
}))
