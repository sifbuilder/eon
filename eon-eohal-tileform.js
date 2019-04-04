/****************************
 *      @eohalTileform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalTileform = global.eohalTileform || {})))
}(this, function (exports) {
  'use strict'

  async function eohalTileform (__eo = {}) {
    let [
      eohalSol,
      eohalNatform,
      eohalMars,
      muonProps,
      muonGraticule,
    ] = await Promise.all([
      __eo('xs').e('sol'),
      __eo('xs').e('natform'),
      __eo('xs').e('mars'),
      __eo('xs').m('props'),
      __eo('xs').m('graticule'),
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
      let verts = muonGraticule.gjfMultiPoint(graticule) // Feature.LineString
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

    // .................... anify
    function anify (anima) {
      return (anima.eoinited !== 1) ? (anima.eoinited = anima.eogelded = 1, [anima]) : []
    }

    // .................... gramify
    function gramify (anigram) {
      return Promise.all(getTiles(anigram).map(ani => eohalMars.gramify(ani)))
    }

    // .................... enty
    let eohalNat_anify = anima => anify(anima)
    let eohalNat_gramify = anima => gramify(anima)

    let eohalTileform = {}
    eohalTileform.anify = anima => eohalNat_anify(anima)
    eohalTileform.gramify = anima => eohalNat_gramify(anima)

    let enty = eohalTileform

    return enty
  }

  exports.eohalTileform = eohalTileform
}))
