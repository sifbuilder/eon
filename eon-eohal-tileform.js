/****************************
 *      @eohalTileform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalTileform = global.eohalTileform || {})))
}(this, function (exports) {
  'use strict'

  async function eohalTileform (__mapper = {}) {
    let [
      eohalPetiole,
      eohalNatform,
      eohalSol,
      muonProps,
      muonGraticule,
    ] = await Promise.all([
      __mapper('xs').e('petiole'),
      __mapper('xs').e('natform'),
      __mapper('xs').e('sol'),
      __mapper('xs').m('props'),
      __mapper('xs').m('graticule'),
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
        newItem.eohal = 'natform'
        newItem.eofold = {type: 'Polygon', coordinates: []}

        let facering = [vertices[face[0]], vertices[face[1]], vertices[face[2]]]
        newItem.eofold.coordinates = Array.of([...facering, facering[0]])

        newItems.push(newItem)
      }

      return newItems
    }

    // .................... ween
    function ween (anima) {
      return (anima.eoinited !== 1) ? (anima.eoinited = anima.eogelded = 1, [anima]) : []
    }

    // .................... gramm
    function gramm (anigram) {
      return Promise.all(getTiles(anigram).map(ani => eohalSol.gramm(ani)))
    }

    // .................... enty
    let eohalNat_ween = anima => ween(anima)
    let eohalNat_gramm = anima => gramm(anima)

    let eohalTileform = {}
    eohalTileform.ween = anima => eohalNat_ween(anima)
    eohalTileform.gramm = anima => eohalNat_gramm(anima)

    let enty = eohalTileform

    return enty
  }

  exports.eohalTileform = eohalTileform
}))
