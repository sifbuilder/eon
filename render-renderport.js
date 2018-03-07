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

    let width = props.width || 600,
      height = props.height || 400,
      margin = {top: 20, right: 10, bottom: 20, left: 10},
      scaleView = Math.min(width / 2, height) / Math.PI
    
    let projection = 'uniwen',
      prerotate = [0,0,0],
      translate = [width/2, height/2, 0],
      rotate = [0,0,0],
      scale = [1,-1,1],
      lens = [0,1,Infinity]    
    
    
 /***************************
 *        @enty
 */
    let enty = function () {}

    enty.width = _ => (_ === undefined) ? width - margin.left - margin.right : (width = _, enty)
    enty.height = _ => (_ === undefined) ? height - margin.top - margin.bottom : (height = _, enty)
    enty.margin = _ => (_ === undefined) ? margin : (margin = _, enty)
    enty.scaleView = () => scaleView

    
    
    enty.toviewproj = () => 
      __mapper('xs').g(projection)({
        projection,
        prerotate,
        translate,
        rotate,
        scale,
        lens
        
      })
    
    return enty
  }

  exports.renderRenderport = renderRenderport
}))
