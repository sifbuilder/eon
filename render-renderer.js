/***************************
 *        @renderRenderer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.renderRenderer = global.renderRenderer || {})))
}(this, function (exports) {
  'use strict'

  let renderRenderer = function renderRenderer (__mapper = {}) {
    let props = __mapper('props')()

    let width = props.width || 600
    let height = props.height || 400

    /***************************
 *        @enty
 */
    let enty = function () {}

    enty.width = function (_) {
      if (_ === undefined) {
        return width
      } else {
        width = _
        return enty
      }
    }

    enty.height = function (_) {
      if (_ === undefined) {
        return height
      } else {
        height = _
        return enty
      }
    }

    return enty
  }

  exports.renderRenderer = renderRenderer
}))
