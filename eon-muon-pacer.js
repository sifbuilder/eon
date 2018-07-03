/**********************
 *    @muonPacer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonPacer = global.muonPacer || {})))
}(this, function (exports) {
  'use strict'

  // md: # md:{filename}
  // md: ** **
  // md:
  // md: # license
  // md: MIT

  async function muonPacer (__mapper = {}) {
    let [
      crayder,
      cwen,
      cversor
    ] = await Promise.all([
      __mapper('xs').c('rayder'),
      __mapper('xs').c('wen'),
      __mapper('xs').c('versor')
    ])

    // -------------------------------  muonPacerHalo_gramm
    let pacer = function (payload, newItems = []) {
      let boform = payload.boform, // boform
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        proform = payload.proform, // proform
        conform = payload.conform, // conform
        uid = payload.uid, // uid
        parentuid = payload.parentuid, // parentuid
        inited = payload.inited, // inited
        gelded = payload.gelded // gelded

      let pacer = payload.pacer || {}, // pacer
        mousesignal = pacer.mousesignal || 0, // mousesignal
        span = pacer.span || 0, // span between items
        aad = pacer.aad || 0, // aad to previtem
        outted = pacer.outted || 0 // outted

      let initSitus, eventSitus, autoSitus, fidder, geojsor

      let count = {} // items in cycle

      let mouse = {} // mouse control

      mouse.mouseDown = crayder.mouseDown() // down
      mouse.mouseUp = crayder.mouseUp() // up
      mouse.mouseMove = crayder.mouseMove() // move
      mouse.mouseDownShared = crayder.mouseDownShared() // shareddown
      mouse.event = crayder.event() // event

      if (mouse.event && mouse.event.type === 'mouseup') { // if mouse up then reset
        let svg = __mapper('renderSvg').svg()
        cwen.reset(svg)
        cversor.reset(svg)
      }

      if (mouse.event !== undefined && mouse.mouseDown === 1) { // on mouse DOWN
        if (mousesignal === 0 || mouse.event.type === 'mousedown') { //
          count.event = Math.floor(pacer.eventN) //  if in state or was event
        }
      }

      if (outted === undefined || outted !== 1) {
        count.init = Math.floor(pacer.initN) // count INIT
      }

      let cycletime = tim.unitPassed - (pacer.outtimed || 0)

      if (cycletime >= pacer.autoP &&
            tim.unitPassed > (pacer.autoT || 0)
      ) { // if cycle time above autopath
        count.auto = Math.floor(pacer.autoN) // count AUTO
      }

      newItems = payload.pacer.geojsor(payload, count) // new geoItems

      return newItems
    }

    // ....................... enty
    let enty = pacer
    return enty
  }

  exports.muonPacer = muonPacer
}))
