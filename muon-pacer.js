/**********************
 *    @muonPacer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonPacer = global.muonPacer || {})))
}(this, function (exports) {
  'use strict'

  let muonPacer = function muonPacer (__mapper = {}) {
    let f = __mapper({'props': muonProps.muonProps()}).props(),
      mgeom = __mapper('xs').m('geom'),
      mwen = __mapper('xs').m('wen'),
      mmouse = __mapper('xs').m('mouse'),
      cwen = __mapper('xs').c('wen'),
      cversor = __mapper('xs').c('versor'),
      mstace = __mapper('xs').m('stace'),
      manitem = __mapper('xs').m('anitem'),
      mric = __mapper('xs').m('ric'),
      mstore = __mapper('xs').m('store'),
      svg = __mapper('renderSvg').svg()

    let r = __mapper('xs').r('renderer'),
      width = r.width(),
      height = r.height()

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

      let initSitus, eventSitus, autoSitus, fider, geojsor

      /* ****
       *    count
       */
      let count = {} // items in cycle

      /* ****
       *    controls
       */
      let mouse = {} // mouse control

      mouse.mouseDown = mmouse.mouseDown() // down
      mouse.mouseUp = mmouse.mouseUp() // up
      mouse.mouseMove = mmouse.mouseMove() // move
      mouse.mouseDownShared = mmouse.mouseDownShared() // shareddown
      mouse.event = mmouse.event() // event

      if (mouse.event && mouse.event.type === 'mouseup') { // if mouse up then reset
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

      if (cycletime >= pacer.autoP) { // if cycle time above autopath
        count.auto = Math.floor(pacer.autoN) // count AUTO
        pacer.outtimed = tim.unitPassed // updated with anima
         
        anima.payload.inited = 1 // 
        anima.payload.gelded = 1 // 
        anima.payload.pacer.outted = 1 // off
        anima.payload.pacer.outtimed = pacer.outtimed //  outtimed at time units
        let animas = Array.of(anima) // upd ANIMA
        __mapper('xs').m('store').apply({'type': 'UPDANIMA', 'caller': 'h.pacer', animas})
        
      }


      if (Object.keys(count).length > 0) { // on pace count
      
        for (let i = 0; i < Object.keys(count).length; i++) { // for each COUNT
        
          let key = Object.keys(count)[i] // count sort

          if (count[key] > 0) { // if count on this sort
          
            let newItem = {}


            for (let j=0; j<count[key]; j++) {
                  
              newItem =  payload.pacer.geojsor(payload, j, key) 

               
              console.log("m.pacer:key", key, count[key], j, newItem.payload.ric)

 
              newItems.push(newItem)
            }
          }
        }
      }

      console.log('m.pacer:newItems', newItems)
      return newItems
    }

    /**********************
   *    @enty
   */
    let enty = pacer

    return enty
  }

  exports.muonPacer = muonPacer
}))
