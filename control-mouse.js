/***********
   *    @controlMouse
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.controlMouse = global.controlMouse || {})))
}(this, function (exports) {
  'use strict'

  var controlMouse = function controlMouse (__mapper = {}) {
    let local = {}

    /***********
  *   @enty
  */
    let enty = function () { return enty }

    enty.event = _ => {
      if (_ !== undefined) local.event = _
      else return local.event
    }

    enty.mouseMove = _ => {
      if (_ !== undefined) local.mouseMove = _
      else return local.mouseMove
    }

    enty.mouseDown = _ => {
      if (_ !== undefined) local.mouseDown = _
      else return local.mouseDown
    }

    enty.mouseDownShared = _ => {
      if (_ !== undefined) local.mouseDownShared = _
      else return local.mouseDownShared
    }

    enty.mouseUp = _ => {
      if (_ !== undefined) local.mouseUp = _
      else return local.mouseUp
    }

    enty.mouseProps = _ => {
      if (_ !== undefined) local.mouseProps = _
      else return local.mouseProps
    }

    return enty
  }

  exports.controlMouse = controlMouse
}))
