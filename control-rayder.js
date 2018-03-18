/***********
   *    @controlRayder
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.controlRayder = global.controlRayder || {})))
}(this, function (exports) {
  'use strict'

  // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
  
  
  var controlRayder = function controlRayder (__mapper = {}) {
    
    let f = __mapper('props')(),
          mproj3ct = __mapper('xs').m('proj3ct')

    let r = __mapper('xs').r('renderport'),
      width = r.width(),
      height = r.height()
      
    let state = {
      
      pointer: {},    // 
      
      mouse: {},
      touch: {},
      
      
      domNode: null
    }
    state.mouse.x = -2
    state.mouse.y = -2
   
    state.pointer.x = -2
    state.pointer.y = -2
   

      let toviewproj = r.toviewproj()


      
      // proj
      let proj = function (event) {
        
        if (0 && 1) console.log(" **** event type", event.type)        
          
        if (event.type === "mousemove") {


              let t = toviewproj.invert([event.x, event.y])
          
              state.mouse.x = t[0]
              state.mouse.y = t[1]
  
              state.pointer.x = t[0]   // 
              state.pointer.y = t[1]   // 
            
 
  
        }  else if (event.type === "touchmove") {

        
             let touch =  event.changedTouches[0]
        
        if (0 && 1) console.log("touch", touch)
        
             // let t = toviewproj.invert([touch.screenX, touch.screenY])
             let t = toviewproj.invert([touch.clientX, touch.clientY])
        
         
              state.mouse.x = t[0]
              state.mouse.y = t[1]        
         
              state.pointer.x = t[0]   // 
              state.pointer.y = t[1]   // 
            
            
        }

      }
    
    
      // ///
      // //
      // touch start
      let touchStartListener = function (event) {
        event.preventDefault()
        enty.touchStart(1)
        enty.touchStartShared(1)
        enty.event(event)
      }
     
      // touch move
      let touchMoveListener = function (event) {
        event.preventDefault()        
        enty.touchMove(1)
        enty.touchStartShared(1)
        enty.event(event)
        proj(event)
      }
   
 
      // touch up
      let touchEndListener = function (event) {
        enty.touchStart(0)
        enty.touchStartShared(0)
        enty.event(event)
      }      
    
    
    
      // ///
      // //
      // mouse down
      let mouseDownListener = function (event) {
        enty.mouseDown(1)
        enty.mouseDownShared(1)
        enty.event(event)
      }
      
      // mouse move
      let mouseMoveListener = function (event) {
        enty.mouseMove(1)
        enty.mouseDownShared(1)
        enty.event(event)
        proj(event)
      }

      // mouse up
      let mouseUpListener = function (event) {
        enty.mouseDown(0)
        enty.mouseDownShared(0)
        enty.event(event)
      }    
      
      
      
      // ///
      // //     
      // subscribe
      let subscribe = function  (listener, domNode, sensor) {
        if (typeof listener !== 'function') throw new Error('Listener to be function')
        domNode.node().addEventListener(sensor, listener) // mounseUp, mouseUpListener
      }
    
    /*******************************************
   *      @enty
   *
   */
    let enty = () => enty
    
    enty.domNode = _ => (_ !== undefined) ? (state.domNode = _, enty) : state.domNode    
    
    enty.mouse = () => state.mouse
    enty.touch = () => state.touch
    enty.pointer = () => state.pointer  // 
    
    enty.control = function (domNode) {
      subscribe(mouseDownListener, __mapper('renderSvg').svg(), 'mousedown')
      subscribe(mouseUpListener, __mapper('renderSvg').svg(), 'mouseup')
      subscribe(mouseMoveListener, __mapper('renderSvg').svg(), 'mousemove')
      
      subscribe(touchStartListener, __mapper('renderSvg').svg(), 'touchstart')
      subscribe(touchMoveListener, __mapper('renderSvg').svg(), 'touchmove')
      subscribe(touchEndListener, __mapper('renderSvg').svg(), 'touchend')
      
    }   
    
    enty.event = _ => _ !== undefined ? (state.event = _, enty) : state.event
    
    enty.mouseDown = _ => (_ !== undefined) ? (state.mouseDown = _, enty) : state.mouseDown
    enty.mouseDownShared = _ => (_ !== undefined) ? (state.mouseDownShared = _, enty) : state.mouseDownShared
    enty.mouseMove = _ => (_ !== undefined) ? (state.mouseMove = _, enty) : state.mouseMove
    enty.mouseUp = _ => (_ !== undefined) ? (state.mouseUp = _, enty) : state.mouseUp
    
    enty.touchStart = _ => (_ !== undefined) ? (state.touchStart = _, enty) : state.touchStart
    enty.touchStartShared = _ => (_ !== undefined) ? (state.touchStartShared = _, enty) : state.touchStartShared
    enty.touchMove = _ => (_ !== undefined) ? (state.touchMove = _, enty) : state.touchMove
    enty.touchEnd = _ => (_ !== undefined) ? (state.touchEnd = _, enty) : state.touchEnd
    
   
    
    enty.mouseProps = _ => (_ !== undefined) ? (state.mouseProps = _, enty) : state.mouseProps
    
    
    
    
    // mouseDownListener, __mapper('renderSvg').svg(), 'mouseDown'
    enty.subscribe = subscribe
    

    
    return enty
    
  }

  exports.controlRayder = controlRayder
}))
