/****************************
 *      @haloTileform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloTileform = global.haloTileform || {})))
}(this, function (exports) {
  'use strict'

  async function haloTileform (__mapper = {}) {
    let [
      muonProps,
      muonGraticule,
      haloLeaform,
      haloNatform,
      haloTurnform,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('graticule'),
      __mapper('xs').h('leaform'),
      __mapper('xs').h('natform'),
      __mapper('xs').h('turnform'),

    ])

    // .................... getTiles
    function getTiles (anigram) {
      let newItems = []

      let eoric = anigram.eoric, // eoric
        eofold = anigram.eofold, // eofold
        eonode = anigram.eonode, // eonode
        eoload = anigram.eoload // eoload

      let gj = muonProps.v(eofold, anigram) // get eofold
      gj.properties = gj.properties || {} // recall genode

      let graticule = eoload.graticule

      let range = (anigram.range !== undefined) ? anigram.range : null
      let tile = (anigram.tile !== undefined) ? anigram.tile : null
      let verts = muonGraticule.gvertices(graticule) // Feature.LineString
      let vertices = verts.geometry.coordinates
      let faces = muonGraticule.gfaces(graticule) // faces

      for (let i = 0; i < faces.length; i++) { // single ring polygon
        let face = faces[i]

        let newItem = muonProps.clone(anigram)
        newItem.halo = 'natform'
        newItem.eofold = {type: 'Polygon', coordinates: []}

        let facering = [vertices[face[0]], vertices[face[1]], vertices[face[2]]]
        newItem.eofold.coordinates = Array.of([...facering, facering[0]])

        newItems.push(newItem)
      }

      return newItems
    }

    // .................... ween
    function ween (anima) {
      return (anima.inited !== 1) ? (anima.inited = anima.gelded = 1, [anima]) : []
    }

    // .................... gramm
    function gramm (anigram) {
      return Promise.all(getTiles(anigram).map(ani => haloTurnform.gramm(ani)))
    }

    // .................... enty
    let haloNat_ween = anima => ween(anima)
    let haloNat_gramm = anima => gramm(anima)

    let haloTileform = {}
    haloTileform.ween = anima => haloNat_ween(anima)
    haloTileform.gramm = anima => haloNat_gramm(anima)

    let enty = haloTileform

    return enty
  }

  exports.haloTileform = haloTileform
}))
