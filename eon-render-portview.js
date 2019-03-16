/***************************
 *        @renderPortview
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.renderPortview = global.renderPortview || {})))
}(this, function (exports) {
  'use strict'

  async function renderPortview (__eo = {}) {
    let margin = {top: 0, right: 0, bottom: 0, left: 0},
      viewWidth = 600,
      viewHeight = 400,
      scaleView = Math.min(viewWidth / 2, viewHeight) / Math.PI,
      width = viewWidth - margin.left - margin.right,
      height = viewHeight - margin.top - margin.bottom

    let prtdef = {
      projection: 'uniwen',
      prerotate: [0, 0, 0],
      translate: [width / 2, height / 2, 0],
      rotate: [0, 0, 0],
      scale: [1, -1, 1],
      lens: [0, 1, Infinity],
    }

    // ............................. viewScreenPrt
    const viewScreenPrt = function (p = prtdef) {
      let proton = __eo('protonUniwen')
      return proton(p)
    }

    // ............................. xydirs
    const xydirs = function () {
      let orig = enty.viewScreenPrt().invert([0, 0])
      let xyvector = enty.viewScreenPrt().invert([1, 1])

      let dirs = []
      dirs[0] = Math.sign(xyvector[0] - orig[0])
      dirs[1] = Math.sign(xyvector[1] - orig[1])

      return dirs
    }

    // ............................. getPos
    const getPos = function (signal) {
      let pos
      let projer = enty.viewScreenPrt()

      if (Array.isArray(signal)) { // coordinates
        pos = [signal[0], signal[1]]
        pos = projer.invert(pos)
      } else if (typeof signal === 'object') { // event
        if (signal.touches && signal.touches.length) {
          signal = signal.touches[0]
          pos = [signal.x, signal.y]

          pos = projer.invert(pos)
        } else {
          pos = [signal.x, signal.y]

          pos = projer.invert(pos)
        }
      }

      pos = [ pos[0], pos[1] ]

      return pos
    }

    // ............................. enty
    let enty = function () {}

    enty.width = _ => (_ === undefined) ? width : (width = _, enty)
    enty.height = _ => (_ === undefined) ? height : (height = _, enty)
    enty.margin = _ => (_ === undefined) ? margin : (margin = _, enty)
    enty.scaleView = () => scaleView

    enty.xydirs = xydirs
    enty.viewScreenPrt = viewScreenPrt
    enty.getPos = getPos
    enty.prtdef = () => prtdef
    return enty
  }

  exports.renderPortview = renderPortview
}))
