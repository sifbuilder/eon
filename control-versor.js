// https://github.com/Fil/d3-inertia Version 0.0.5. Copyright 2017 Philippe Riviere.

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.controlVersor = global.controlVersor || {})))
}(this, function (exports) {
  'use strict'

   /*******************************************
   *    @nuon
   */
  let controlVersor = function (__mapper = {}) {

    let r = __mapper('xs').r('renderport'),
      mversor = __mapper('xs').m('versor')(),
      mgeom = __mapper('xs').m('geom')

    let versor = mversor // fil
    let d3Drag = d3
    let d3Selection = d3
    let d3Timer = d3

    // let projection
    let projection = d3.geoOrthographic()
        .rotate([0, 0])
        .translate([0, 0])
        .scale(1)

    let format2dv = d => d.map(d => d.toFixed(2))
    let inertia // enty.inertia => state.inertia

       let state = {
          rotation: [0, 0, 0],
       }

   /*******************************************
   *    @geoVersor
   */
  function geoVersor (opt) {
    var v0, // Mouse position in Cartesian coordinates at start of drag gesture.
      r0, // Projection rotation as Euler angles at start.
      q0, // Projection rotation as versor at start.

      v1, // Mouse position in Cartesian coordinates during move

      v10, // Mouse position in Cartesian coordinates just before end of drag gesture.
      v11, // Mouse position in Cartesian coordinates at end.
      q10 // Projection rotation as versor at end.

   /*******************************************
   *    @inertia dragHelper
   */
    let inertia = dragHelper({

      start: function () {

        let t1 = inertia.position
        let t2 = projection.invert(t1)

        v0 = versor.cartesian(t2 )

        r0 = projection.rotate()
        q0 = versor(r0) // start quaternion
        opt.start && opt.start()
      },

      move: function () {

        projection = projection.rotate(r0)    // apply rotate r0 to projection
        let t1 = inertia.position
        let t2 = projection.invert(t1); if (isNaN(t2[0])) return

        v1 = versor.cartesian(t2 )

        let delta = versor.delta(v0, v1)

        let q1 = versor.multiply(q0, delta) // quaternion on move

        let r1 = versor.rotation(q1)  // rotation on move


            state.rotation = r1 // set global rotate

        opt.render(r1)
        opt.move && opt.move()
      },

      end: function () {

        let t1 = inertia.position.map(function (d, i) {
              return d - inertia.velocity[i] / 1000 // velocity
            })
        let t2 = projection.invert(t1)

        v10 = versor.cartesian(t2 )
        q10 = versor(projection.rotate())


        let t11 = inertia.position
        let t12 = projection.invert(t11)

        v11 = versor.cartesian(t2)


        opt.end && opt.end()
      },

      render: function (t) {
        var rotation = versor.rotation(
          versor.multiply(q10, versor.delta(v10, v11, t * 1000))
        )

                   if (1 && 1) console.log("-- end", format2dv(rotation))


        opt.render && opt.render(rotation)
      },
      time: opt.time
    })

    return inertia
  }



   /*******************************************
   *    @geoInertialControl
   */
  function geoInertialControl (target, render, proj, opt) {

    // use the "global" projection function if none given
    if (!proj && typeof projection === 'function') {
      proj = projection
    }
    if (!opt) opt = {}

    // complete params: (projection, render, startDrag, dragging, endDrag, time)
    var inertia = geoVersor({
      projection: proj,
      render: function (rotation) {

        proj.rotate(rotation)


           if (1 && 1) console.log(" ** proj rotation", proj.rotate())
           if (1 && 1) console.log(" ** projection rotation", projection.rotate())

state.rotation = proj.rotate()

        render && render()
      },
      start: opt.start,
      move: opt.move,
      end: opt.end,
      time: opt.time
    })
    target.call(
      d3Drag.drag()
        .on('start', inertia.start)
        .on('drag', inertia.move)
        .on('end', inertia.end)
    )
    return inertia
  }



   /*******************************************
   *    @dragHelper
   */
  function dragHelper (opt) {
    var A = opt.time || 5000 // reference time in ms
    var limit = 1.0001
    var B = -Math.log(1 - 1 / limit)
    var inertia = {

      start: function () {
        var position = r.getPos(d3Selection.mouse(this))
        inertia.position = position
        inertia.velocity = [0, 0]
        if (inertia.timer) inertia.timer.stop(), inertia.timer = null, this.classList.remove('inertia')
        this.classList.add('dragging')
        opt.start && opt.start.call(this, position)
      },

      move: function () {
        var position = r.getPos(d3Selection.mouse(this))
if (1 && 1) console.log("position", position)
        var time = performance.now()
        var deltaTime = time - inertia.time
        var decay = 1 - Math.exp(-deltaTime / 1000)
        inertia.velocity = inertia.velocity.map(function (d, i) {
          var deltaPos = position[i] - inertia.position[i],
            deltaTime = time - inertia.time
          return 1000 * (1 - decay) * deltaPos / deltaTime + d * decay
        })
        inertia.time = time
        inertia.position = position
        opt.move && opt.move.call(this, position)
      },

      end: function () {
        var v = inertia.velocity
        if (v[0] * v[0] + v[1] * v[1] < 100) return inertia.timer = null, this.classList.remove('inertia')

        this.classList.remove('dragging')
        this.classList.add('inertia')

        opt.end && opt.end()

        var me = this
        inertia.timer = d3Timer.timer(function (e) {
          inertia.t = limit * (1 - Math.exp(-B * e / A))
          opt.render && opt.render(inertia.t)
          if (inertia.t > 1) {
            inertia.timer.stop(), inertia.timer = null, me.classList.remove('inertia')
            inertia.velocity = [0, 0]
            inertia.t = 1
          }
        })
      },
      position: [0, 0],
      velocity: [0, 0], // in pixels/s
      timer: null,
      time: 0
    }

    return inertia
  }


   // start drag control
    let control = function(target, render, proj, opt) {
        // target.call(drag.on('start', dragstarted).on('drag', dragged).on('end', dragended))

        inertia = geoInertialControl(target) // state inertia
    }

    // stop drag control
    let reset = target => target.call(drag.on('start', null).on('drag', null).on('end', null))


    let enty = function enty () {}

      enty.control = control
      enty.reset = reset

      enty.projection = _ => _ !== undefined ? (projection = _, enty) : projection
      // enty.rotation = () => {
          // if (1 && 1) console.log(" ------------ rotation", projection.rotate())
          // return projection ? projection.rotate() : null
      // }
      enty.rotation = (_) => {
          // if (1 && 1) console.log(" ------------ rotation", _)
          // if (_) {
            // state.rotation = _
            // return enty
          // } else {
            return state.rotation
          // }
      }
    // enty.rotation = _ => _ !== undefined ? (state.rotation = _, enty) : state.rotation

      enty.geoVersor = geoVersor
      enty.geoInertialControl = geoInertialControl
      enty.inertia = dragHelper


    return enty
  }

  exports.controlVersor = controlVersor


  Object.defineProperty(exports, '__esModule', { value: true })
}))
