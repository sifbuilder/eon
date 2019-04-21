/****************************
 *      @eonEohalTileform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonEohalTileform = global.eonEohalTileform || {})))
}(this, function (exports) {
  'use strict'

  async function eonitem (__eo = {}) {
    let [
      eonEohalSol,
      eonEohalNatform,
      eonEohalMars,
      eonMuonProps,
      eonMuonGraticule,
    ] = await Promise.all([
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-eohal-natform'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-muon-graticule'),
    ])

    // .................... getTiles
    function getTiles (anigram) {
      let newItems = []

      let eoric = anigram.eoric, // eoric
        eofold = anigram.eofold, // eofold
        eonode = anigram.eonode, // eonode
        eoload = anigram.eoload // eoload

      let gj = eonMuonProps.v(eofold, anigram) // get eofold
      gj.properties = gj.properties || {} // recall genode

      let graticule = eoload.graticule

      let range = (anigram.range !== undefined) ? anigram.range : null
      let tile = (anigram.tile !== undefined) ? anigram.tile : null
      let verts = eonMuonGraticule.gjfMultiPoint(graticule) // Feature.LineString
      let vertices = verts.geometry.coordinates
      let faces = eonMuonGraticule.gfaces(graticule) // faces

      for (let i = 0; i < faces.length; i++) { // single ring polygon
        let face = faces[i]

        let newItem = eonMuonProps.clone(anigram)
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
      return Promise.all(getTiles(anigram).map(ani => eonEohalMars.gramify(ani)))
    }

    // .................... enty
    let eohalNat_anify = anima => anify(anima)
    let eohalNat_gramify = anima => gramify(anima)

    let eonEohalTileform = {}
    eonEohalTileform.anify = anima => eohalNat_anify(anima)
    eonEohalTileform.gramify = anima => eohalNat_gramify(anima)

    let enty = eonEohalTileform

    return enty
  }

  exports.eonEohalTileform = eonitem
}))
