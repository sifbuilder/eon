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
    let control = function(elem, props={}) {
  
      elem.call(drag
        .on('start', versorControl.dragstarted)
        .on('drag', versorControl.dragged)
        .on('end', versorControl.dragended))
      
    }

    // stop drag control
    let reset = elem => elem.call(drag
        .on('start', null)
        .on('drag', null)
        .on('end', null))

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
      
      
      decay: 0.95,
      mult: 2e-3, // rotInDrag_radians factor
      rotInit_radians: [0, 0, 0],
      timeSpan: 200,
      epsilon: 1e-3,
      vel: [0, 0, 0],
      moveSpan: 16,
      autoRot: false,
      lastMoveTime: null,
      timer: null,
      timer: null,
      rotMatrix: null,
      cPos: null,   // current position
      pPos: null   // previous position      
      
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
    
      
      if (state.grabbed) return // drag ongoing
      state.moved = false // not moved yet       // stopMomentum()
      state.grabbed = true
       
      // -----------------          
      state.p0 = getPos(e) // d3.mouse(this)

      let inve0_polar = state.proj.invert(state.p0)
      state.inve0_cart = mgeom.cartesian(inve0_polar)

      state.r0 = state.proj.rotate() // rotation in projection
      state.q0 = mversor(state.r0) // versor takes degrees
      // -----------------

      state.rotAccum = mgeom.add(state.rotAccum, state.rotInDrag) // rotation
      state.rotInDrag = state.rotInit // rebase()
      
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

      }
      
     
      // -----------------    
      let inve1_polar = state.proj.rotate(state.r0).invert(getPos(e))
      let inve1_cart = mgeom.cartesian(inve1_polar)

      let vdelta_cart = mversor.delta(state.inve0_cart, inve1_cart)
      let q1 = mversor.multiply(state.q0, vdelta_cart)
      let r1 = mversor.rotation(q1) // in degrees
      // -----------------    
      
      state.rotation = r1 // set global rotation in degrees
      
      // -----------------    
      state.lastMoveTime = Date.now()
 
    }

  /*******************************************
   *    @dragended
   *
   */
    function dragended () {
       
      if (!state.grabbed) return
      state.grabbed = false
      if (!state.moved) return
      let f = Math.max(0, 1 - (Date.now() - state.lastMoveTime))
      
      state.vel = [ // velocity

        1,
        1
        
      ]
      
      state.timer = requestAnimationFrame(momentum)
    }

    
  /*******************************************
   *    @momentum
   *
   */    
   
    function momentum () {
      if (Math.abs(state.vel[0]) < state.epsilon && Math.abs(state.vel[1]) < state.epsilon) return
        // state.vel[0] *= inits.decay 
        // state.vel[1] *= inits.decay
        
        // state.rotInDrag_radians[0] += state.vel[0] 
        // state.rotInDrag_radians[1] -= state.vel[1]
        
      if (state.timer) state.timer = requestAnimationFrame(momentum)
    }
    
  /*******************************************
   *    @inertiaControl
   *
   */    
   
 
function inertiaHelper(opt) {
  var A = opt.time || 5000; // reference time in ms
  var limit = 1.0001;
  var B = -Math.log(1 - 1 / limit);
  var inertia = {
    start: function() {
      var position = d3Selection.mouse(this);
      inertia.position = position;
      inertia.velocity = [0, 0];
      if (inertia.timer) inertia.timer.stop(), inertia.timer = null, this.classList.remove('inertia');
      this.classList.add('dragging');
      opt.start && opt.start.call(this, position);
    },
    move: function() {
      var position = d3Selection.mouse(this);
      var time = performance.now();
      var deltaTime = time - inertia.time;
      var decay = 1 - Math.exp(-deltaTime / 1000);
      inertia.velocity = inertia.velocity.map(function(d, i) {
        var deltaPos = position[i] - inertia.position[i],
          deltaTime = time - inertia.time;
        return 1000 * (1 - decay) * deltaPos / deltaTime + d * decay;
      });
      inertia.time = time;
      inertia.position = position;
      opt.move && opt.move.call(this, position);
    },
    end: function() {
      var v = inertia.velocity;
      if (v[0] * v[0] + v[1] * v[1] < 100) return inertia.timer = null, this.classList.remove('inertia');

      this.classList.remove('dragging');
      this.classList.add('inertia');
      opt.end && opt.end();

      var me = this;
      inertia.timer = d3Timer.timer(function(e) {
        inertia.t = limit * (1 - Math.exp(-B * e / A));
        opt.render && opt.render(inertia.t);
        if (inertia.t > 1) {
          inertia.timer.stop(), inertia.timer = null, me.classList.remove('inertia');
          inertia.velocity = [0, 0];
          inertia.t = 1;
        }
      });
    },
    position: [0, 0],
    velocity: [0, 0], // in pixels/s
    timer: null,
    time: 0
  };

  return inertia;
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
