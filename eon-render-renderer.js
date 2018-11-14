/***************************
 *        @renderRenderer
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.renderRenderer = global.renderRenderer || {})))
}(this, function (exports) {
  'use strict'

  async function renderRenderer (__mapper = {}) {


    // ............................. render
    const render = function (featurecollection) {
      
      let renderSvg = __mapper("renderSvg")
      let renderWebgl = __mapper("renderWebgl")
      let renderCanvas = __mapper("renderCanvas")
      
      // console.assert(renderSvg || renderWebgl || renderCanvas, `renderer not defined`)
      
      if (renderSvg) renderSvg.render(featurecollection)
      if (renderWebgl) renderWebgl.render(featurecollection)
      if (renderCanvas) renderCanvas.render(featurecollection)
    }

    // ............................. enty
    let enty = function () {}
    enty.render = render

    return enty
  }

  exports.renderRenderer = renderRenderer
}))
