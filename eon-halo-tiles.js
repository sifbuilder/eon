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
    let hent = await __mapper('xs').h('ent'),
      mprops = await __mapper('xs').m('props'),
      mgraticule = await __mapper('xs').m('graticule')

    // .................. sequence
    function sequence (items, fromitem) {
      function chain (items, index) {
        return (index === items.length)
          ? Promise.resolve()
          : Promise.resolve(fromitem(items[index])).then(() => chain(items, index + 1))
      }
      return chain(items, 0)
    }

    function getTiles (anigram, newItems = []) {
      let geofold = anigram.geofold, // geofold
        payload = anigram.payload, // payload
        ric = payload.ric // ric

      let gj = mprops.v(geofold, anigram) // get geofold
      gj.properties = gj.properties || {} // recall genode
      gj.properties.geonode = gj.properties.geonode || {}

      let graticule = payload.graticule

      let range = (anigram.range !== undefined) ? anigram.range : null
      let tile = (anigram.tile !== undefined) ? anigram.tile : null
      let verts = mgraticule.gvertices(graticule) // Feature.LineString
      let vertices = verts.geometry.coordinates
      let faces = mgraticule.gfaces(graticule) // faces

      for (let i = 0; i < faces.length; i++) { // single ring polygon
        let idx = i
        let gid = ric.gid // from ava ric
        let cid = ric.cid
        let fid = ric.cid + '_' + idx
        let _ric = {gid, cid, fid}

        let newItem = Object.assign({}, anigram)
        newItem.halo = 'ent'
        newItem.payload = Object.assign({}, anigram.payload)
        newItem.payload.ric = _ric

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
      return Promise.all(getTiles(anigram).map(ani => hent.gramm(ani)))
    }

    // .................... enty
    let haloNat_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloNat_gramm = anima => gramm(anima)

    let haloTiles = {}
    haloTiles.ween = anima => haloNat_ween(anima)
    haloTiles.gramm = anima => haloNat_gramm(anima)

    let enty = haloTiles

    return enty
  }

  exports.haloTiles = haloTiles
}))
