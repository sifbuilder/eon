/**********************
 *    @linkform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.linkform = global.linkform || {})))
}(this, function (exports) {
  'use strict'

  async function linkform (__mapper = {}) {
    let [
      muonEoric,
      muonProps,
    ] = await Promise.all([
      __mapper('xs').m('eoric'),
      __mapper('xs').m('props'),
    ])

    var state = {}

    // ............................. breed
    function breed (anima) {
      let newItems = []

      let fromAnima = muonStore.findAnimaFromUid(avatar.eoload.from)
      let toAnima = muonStore.findAnimaFromUid(avatar.eoload.to)

      let form = {
        source: {x: fromAnima.x, y: fromAnima.y},
        target: {x: toAnima.x, y: toAnima.y},
        // source: {x:100, 	y:100},
        // target: {x:200, 	y:200},
      }

      let linkItem = {}
      let eoric = avatar.eoric
      linkItem.eoric = eoric
      linkItem.sort = 'curve'
      linkItem.eotim = avatar.eotim
      let lf 	= linkItem.pic.form.lf || 0

      linkItem.stream = props.lib.diagonalp(form, lf)

      linkItem.csx 	= linkItem.eochrom.csx
      linkItem.cf 	= linkItem.eochrom.cf
      linkItem.cs 	= linkItem.eochrom.cs
      linkItem.cw 	= linkItem.eochrom.cw
      linkItem.co 	= linkItem.eochrom.co
      linkItem.cp 	= linkItem.eochrom.cp

      newItems = [...newItems, linkItem]

      return newItems
    }

    // ....................... ween
    let ween = anitem => (anitem.inited !== 1) ? (anitem.inited = anitem.gelded = 1, Array.of(anitem)) : []

    // ....................... gramm
    let gramm = anitem => Array.of(anitem)

    // ....................... linkform
    let linkform = {
      ween: anitem => ween(anitem),
      gramm: anitem => gramm(anitem),
    }

    // ....................... enty
    let enty = linkform
    return enty
  }

  exports.linkform = linkform
}))
