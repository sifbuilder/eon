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

    let width = props.width || 600,
      height = props.height || 400,
      margin = {top: 20, right: 10, bottom: 20, left: 10},
      scaleView = Math.min(width / 2, height) / Math.PI
    
 /***************************
 *        @enty
 */
    let enty = function () {}

    enty.width = _ => (_ === undefined) ? width - margin.left - margin.right : (width = _, enty)
    enty.height = _ => (_ === undefined) ? height - margin.top - margin.bottom : (height = _, enty)
    enty.margin = _ => (_ === undefined) ? margin : (margin = _, enty)
    enty.scaleView = () => scaleView

    return enty
  }

  exports.renderRenderer = renderRenderer
}))
