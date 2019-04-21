/***************************
 *        @eonRenderRenderer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonRenderRenderer = global.eonRenderRenderer || {})))
}(this, function (exports) {
  'use strict'

  async function eonitem (__eo = {}) {
    let eonRenderSvg = __eo('eonRenderSvg')
    let eonRenderWebgl = __eo('eonRenderWebgl')

    if (!eonRenderSvg && !eonRenderWebgl) {
      console.info('r.renderer no renderers')
    }
    // ............................. render
    const render = function (featurecollection, elapsed) {
      if (eonRenderSvg) eonRenderSvg.render(featurecollection)
      if (eonRenderWebgl) eonRenderWebgl.render(featurecollection)
    }

    // ............................. enty
    let enty = function () {}
    enty.render = render
    return enty
  }

  exports.eonRenderRenderer = eonitem
}))
