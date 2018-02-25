/***********
   *    @controlRayder
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.controlRayder = global.controlRayder || {})))
}(this, function (exports) {
  'use strict'

  var controlRayder = function controlRayder (__mapper = {}) {
    
    let f = __mapper('props')(),
          mproj3ct = __mapper('xs').m('proj3ct')

    let r = __mapper('xs').r('renderer'),
      width = r.width(),
      height = r.height()
      
    let state = {
      mouse: {},
      domNode: null
    }
    state.mouse.x = -2 // Initialize off canvas
    state.mouse.y = -2

    
    // if (1 && 1) console.log("width", width)
    
    
    
      let toview = { // view projection
        'projection': 'uniwen',
        'prerotate': [0,0,0],
        'translate': [width/2, height/2, 0],
        'rotate': [0,0,0],
        'scale': [1,-1,1],
        'lens': [0,1,Infinity]
      }
      let toviewproj = __mapper('xs').g('uniwen')(toview)

    if (1 && 1) console.log("toviewproj", toviewproj)  
    
      // proj
      let proj = function (event) {
        
        let gj = {
            type: 'Point',
            coordinates: [event.x, event.y],
        }
        
        
        // let domElem = enty.domNode()
        // let width = width // domElem.getBoundingClientRect().width
        // let height = height // domElem.getBoundingClientRect().height

        // const offset = getOffset(domElem),
          // relPos = {
            // x: event.pageX - offset.left,
            // y: event.pageY - offset.top
          // }
          
        // state.mouse.x = (relPos.x / width) * 2 - 1
        // state.mouse.y = -(relPos.y / height) * 2 + 1
        // state.mouse.x = (event.x - width / 2)
        // state.mouse.y = -(event.y - height / 2)

        let t = toviewproj.invert([event.x, event.y])
        state.mouse.x = t[0]
        state.mouse.y = t[1]
        
        // function getOffset (el) {
          // const rect = el.getBoundingClientRect(),
            // scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            // scrollTop = window.pageYOffset || document.documentElement.scrollTop
          // return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        // }
        
        if (1 && 1) console.log("state.event", event.x, event.y)
        if (1 && 1) console.log("state.mouse", state.mouse)
        if (1 && 1) console.log("t", t)
      }
    
    
    
      // mouse move
      let mouseMoveListener = function (event) {
        enty.mouseMove(1)
        enty.mouseDownShared(1)
        enty.event(event)
        proj(event)
      }

      // mouse down
      let mouseDownListener = function (event) {
        enty.mouseDown(1)
        enty.mouseDownShared(1)
        enty.event(event)
      }

      // mouse up
      let mouseUpListener = function (event) {
        enty.mouseDown(0)
        enty.mouseDownShared(0)
        enty.event(event)
      }    
      
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
    enty.control = function (domNode) {
      subscribe(mouseDownListener, __mapper('renderSvg').svg(), 'mousedown')
      subscribe(mouseUpListener, __mapper('renderSvg').svg(), 'mouseup')
      subscribe(mouseMoveListener, __mapper('renderSvg').svg(), 'mousemove')
    }   
    
    enty.event = _ => _ !== undefined ? (state.event = _, enty) : state.event
    enty.mouseMove = _ => (_ !== undefined) ? (state.mouseMove = _, enty) : state.mouseMove
    enty.mouseDown = _ => (_ !== undefined) ? (state.mouseDown = _, enty) : state.mouseDown
    enty.mouseDownShared = _ => (_ !== undefined) ? (state.mouseDownShared = _, enty) : state.mouseDownShared
    enty.mouseUp = _ => (_ !== undefined) ? (state.mouseUp = _, enty) : state.mouseUp
    enty.mouseProps = _ => (_ !== undefined) ? (state.mouseProps = _, enty) : state.mouseProps
    
    // mouseDownListener, __mapper('renderSvg').svg(), 'mouseDown'
    enty.subscribe = subscribe
    

    
    return enty
    
  }

  exports.controlRayder = controlRayder
}))
