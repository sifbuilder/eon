/***************************
 *        @renderRenderport
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.renderRenderport = global.renderRenderport || {})))
}(this, function (exports) {
  'use strict'

  let renderRenderport = function renderRenderport (__mapper = {}) {
    
    let props = __mapper('props')()

    let margin = {top: 0, right: 0, bottom: 0, left: 0},
      viewWidth = props.viewWidth || 600,
      viewHeight = props.viewHeight || 400,
      scaleView = Math.min(viewWidth / 2, viewHeight) / Math.PI,
      width = viewWidth - margin.left - margin.right,
      height = viewHeight - margin.top - margin.bottom

    let prjdef = {
      projection: 'uniwen',
      prerotate: [0, 0, 0],
      translate: [width / 2, height / 2, 0],
      rotate: [0, 0, 0],
      scale: [1, -1, 1],
      lens: [0, 1, Infinity]
    }

    // ............................. enty
    let enty = function () {}

    enty.width = _ => (_ === undefined) ? width : (width = _, enty)
    enty.height = _ => (_ === undefined) ? height : (height = _, enty)
    enty.margin = _ => (_ === undefined) ? margin : (margin = _, enty)
    enty.scaleView = () => scaleView


    // ............................. cameraProjer    
    enty.cameraProjer = _ => (_ != undefined) ? __mapper('xs').g(_.projection)(_) : __mapper('xs').g(prjdef.projection)(prjdef)

    // ............................. xydirs    
    enty.xydirs = function () {
      let orig = enty.cameraProjer().invert([0, 0])
      let xyvector = enty.cameraProjer().invert([1, 1])

      let dirs = []
      dirs[0] = Math.sign(xyvector[0] - orig[0])
      dirs[1] = Math.sign(xyvector[1] - orig[1])

      return dirs
    }

    // ............................. getPos    
    enty.getPos = function (signal) {
      let pos

      if (Array.isArray(signal)) { // coordinates
        pos = [signal[0], signal[1]]
        pos = enty.cameraProjer().invert(pos)
      } else if (typeof signal === 'object') { // event
        if (signal.touches && signal.touches.length) {
          signal = signal.touches[0]
          pos = [signal.x, signal.y]

          pos = enty.cameraProjer().invert(pos)
        } else {
          pos = [signal.x, signal.y]

          pos = enty.cameraProjer().invert(pos)
        }
      }

      pos = [ pos[0], pos[1] ]

      return pos
    }

    // ............................. projection    
    enty.projection = _ => _ !== undefined ? (projection = _, enty) : projection

    return enty
  }

  exports.renderRenderport = renderRenderport
}))
