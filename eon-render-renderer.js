/***************************
 *        @renderRenderer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.renderRenderer = global.renderRenderer || {})))
}(this, function (exports) {
  'use strict'

  async function renderRenderer (__eo = {}) {
    let renderSvg = __eo('renderSvg')
    let renderWebgl = __eo('renderWebgl')

    if (!renderSvg && !renderWebgl) {
      console.info('r.renderer no renderers')
    }
    // ............................. render
    const render = function (featurecollection, elapsed) {
      if (renderSvg) renderSvg.render(featurecollection)
      if (renderWebgl) renderWebgl.render(featurecollection)
    }

    // ............................. enty
    let enty = function () {}
    enty.render = render
    return enty
  }

  exports.renderRenderer = renderRenderer
}))
