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
    function eohale (anima) {
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
      let lf 	= linkItem.eoload.link.lf || 0

      linkItem.stream = props.lib.diagonalp(form, lf)

      linkItem.csx 	= linkItem.eocrom.csx
      linkItem.cf 	= linkItem.eocrom.cf
      linkItem.cs 	= linkItem.eocrom.cs
      linkItem.cw 	= linkItem.eocrom.cw
      linkItem.co 	= linkItem.eocrom.co
      linkItem.cp 	= linkItem.eocrom.cp

      newItems = [...newItems, linkItem]

      return newItems
    }

    // ....................... gramm
    let gramm = anitem => {
      return Array.of(anitem)
    }

    // ....................... ween
    let ween = anitem => {
      let newItems = eohale(anitem)
      return Array.of(newItems)
    }

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
