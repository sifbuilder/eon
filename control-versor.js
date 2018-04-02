/*******************************************
   *    @controlVersor
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.controlVersor = global.controlVersor || {})))
}(this, function (exports) {
  'use strict'

  let controlVersor = function (__mapper = {}) {


    let r = __mapper('xs').r('renderport'),
      mversor = __mapper('xs').m('versor')(),
      mgeom = __mapper('xs').m('geom')

    let versor = mversor // fil
    let d3Drag = d3
    let d3Selection = d3
    let d3Timer = d3

    let drag = d3.drag()


    let getPos = e => (e.touches && e.touches.length) ? (e = e.touches[0], [e.x, e.y]) : [e.x, e.y]
    getPos = r.getPos

    // start drag control
    let control = elem => elem.call(drag.on('start', dragstarted).on('drag', dragged).on('end', dragended))

    // stop drag control
    let reset = elem => elem.call(drag.on('start', null).on('drag', null).on('end', null))

   /*******************************************
   *    @state
   *
   */   
    let state = {

      projection: d3.geoOrthographic(),

      rotation: [0, 0, 0],

      inve0_cart: null, // Mouse cartesian position invprojected
      r0: null, // Projection rotation as Euler angles at start
      q0: null, // Quaternion. Projection rotation
      p0: null, // Mouse position (polar)
      dtc: null, // Distance initial dot to center untransformed
      
      grabbed: false,
      moved: false,      
      rotInit: [0, 0, 0],
      rotAccum: [0, 0, 0],
      rotInDrag: [0, 0, 0], // rotInDrag in radians
    }
  /*******************************************
   *    @versorControl
   *
   */
    let versorControl = {
      dragstarted,
      dragged,
      dragended
      
    }
   
   
  /*******************************************
   *    @dragstarted
   *
   */
    function dragstarted () {

      let e = d3.event
      state.proj = state.projection
    
      
      // if (state.grabbed) return // drag ongoing
      state.moved = false // not moved yet       // stopMomentum()
      state.grabbed = true
       
      // -----------------          
      state.p0 = getPos(e) // d3.mouse(this)

      let inve0_spher = state.proj.invert(state.p0)
      state.inve0_cart = mgeom.cartesian(inve0_spher)

      state.r0 = state.proj.rotate() // rotation in projection
      state.q0 = mversor(state.r0) // versor takes degrees
      // -----------------

      state.rotAccum = mgeom.add(state.rotAccum, state.rotInDrag) // rotation
      state.rotInDrag = [0, 0, 0] // rebase()
      
    }

  /*******************************************
   *    @dragged
   *
   */
    function dragged () {
      
      let e = d3.event
      
      state.proj = state.projection
      
      if (!state.grabbed) return
      if (!state.moved) {
        state.moved = true // moved // state.autoRot = false
        
        state.rotInDrag = state.rotInit
        state.rotInDrag = [0, 0, 0] // rebase()
      }

      
      // -----------------    
      let inve1_spher = state.proj.rotate(state.r0).invert(getPos(e))
      let inve1_cart = mgeom.cartesian(inve1_spher)

      let q1 = mversor.multiply(state.q0, mversor.delta(state.inve0_cart, inve1_cart))
      let r1 = mversor.rotation(q1) // in degrees
      // -----------------    
      
      state.rotation = r1 // set global rotation in degrees

    }

  /*******************************************
   *    @dragended
   *
   */
    function dragended () {
       
    }

    /*******************************************
   *    @enty
   */
    let enty = function enty () {}

    enty.dragstarted = dragstarted
    enty.dragged = dragged
    enty.control = control
    enty.reset = reset

    enty.projection = _ => {
      if (_ !== undefined) {
          state.projection = _.projection
          
if (0 && 1) console.log("state.projection", state.projection.rotate())
          
          return enty
      } else {
        return state.projection
      }
    }
    enty.rotation = _ => _ !== undefined ? (state.rotation = _, enty) : state.rotation

    return enty
  }

  exports.controlVersor = controlVersor
}))
