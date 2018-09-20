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
      muonRic,
      mprops,
    ] = await Promise.all([
      __mapper('xs').m('ric'),
      __mapper('xs').m('props'),
    ])

    var state = {}

    // ............................. breed
    function breed (anima) {
      let newItems = []

      let fromAnima = muonStore.findAnimaFromUid(avatar.payload.from)
      let toAnima = muonStore.findAnimaFromUid(avatar.payload.to)

      let form = {
        source: {x: fromAnima.x, y: fromAnima.y},
        target: {x: toAnima.x, y: toAnima.y},
        // source: {x:100, 	y:100},
        // target: {x:200, 	y:200},
      }

      let linkItem = {}
      let ric = avatar.ric
      linkItem.ric = ric
      linkItem.sort = 'curve'
      linkItem.tim = avatar.tim
      let lf 	= linkItem.pic.form.lf || 0

      linkItem.stream = props.lib.diagonalp(form, lf)

      linkItem.csx 	= linkItem.geochrom.csx
      linkItem.cf 	= linkItem.geochrom.cf
      linkItem.cs 	= linkItem.geochrom.cs
      linkItem.cw 	= linkItem.geochrom.cw
      linkItem.co 	= linkItem.geochrom.co
      linkItem.cp 	= linkItem.geochrom.cp

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
