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

    let margin = {top: 20, right: 10, bottom: 20, left: 10},
      viewWidth = props.viewWidth || 600,
      viewHeight = props.viewHeight || 400,      
      scaleView = Math.min(viewWidth / 2, viewHeight) / Math.PI,
      width = viewWidth - margin.left - margin.right,
      height = viewHeight - margin.top - margin.bottom
    
    
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

    enty.width = _ => (_ === undefined) ? width : (width = _, enty)
    enty.height = _ => (_ === undefined) ? height : (height = _, enty)
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
