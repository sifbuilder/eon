/*******************************************
 *    @eonMuonScene
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonMuonScene = global.eonMuonScene || {})))
}(this, function (exports) {
  'use strict'

  async function eonitem (__eo = {}) {
    let [
      eonCtlEul,
      eonCtlWen,
      eonCtlVersor,
      ckey,
      eonCtlTimer,
      eonCtlRayder,
      eonRenderSvg,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-eul'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-ctl-versor'),
      __eo('xs').b('eon-ctl-key'),
      __eo('xs').b('eon-ctl-timer'),
      __eo('xs').b('eon-ctl-rayder'),
      __eo('xs').b('eon-render-svg'),
    ])

    let manimation = __eo('eonMuonAnimation')

    let state = {}
    state.scene = {
      canvas: 0,
      svg: 0, // SVG
      webgl: 0, // WEBGL
      bck: 0, // BCK IMAGE
      img: 'zimg-black.jpg', // BCK IMAGE
      wen: 0, // SVG WEN
      versor: 0, // SVG VERSOR
      gui: 0, // GUI https://github.com/dataarts/dat.gui
      key: 0, // KEYBRD CONTROLS
      ray: 0, // RAYDER mouse control
      fps: 0,
      stats: 0,
    }

    // .................. scene
    let scenify = function (p) {
      // ............................. ray control animation
      // if ray, add ray controls to svg
      if (p.ray && p.ray !== state.ray) {
        state.ray = 1
        let svg = eonRenderSvg.svg()
        eonCtlRayder.control(svg)
      }

      // ............................. key control animation
      if (p.key && p.key !== state.scene.key) {
        state.scene.key = 1

        if (ckey !== undefined) {
          ckey.start() // KEYBRD CONTROLS
          let controltimerLeftArrowAlt = () => { // LEFT ARROW
            if (manimation.animationStop !== undefined) {
              console.log('controltimerLeftArrowAlt')
              if (eonCtlTimer.started()) {
                eonCtlTimer.stop()
              } else {
                eonCtlTimer.resume()
              }
            }
          }
          ckey.subscribe(controltimerLeftArrowAlt, 'leftArrowAlt')
        }

        if (ckey !== undefined) {
          let controltimerUpArrowAlt = () => { // UP ARROW
            console.log('controltimerUpArrowAlt')
            eonCtlWen.control(eonRenderSvg.svg()) // SVG WEN
          }
          ckey.subscribe(controltimerUpArrowAlt, 'upArrowAlt')
        }

        let controltimerRightArrowAlt = () => { // RIGHT ARROW
          if (manimation.animationStop !== undefined) {
            if (eonCtlTimer.started()) {
              eonCtlTimer.stop()
            } else {
              eonCtlTimer.resume()
            }
          }
        }
        ckey.subscribe(controltimerRightArrowAlt, 'rightArrowAlt')
      }
    }

    let enty = {}
    enty.scenify = scenify
    enty.scene = _ => _ !== undefined ? (state.scene = _, enty) : state.scene
    return enty
  }

  exports.eonMuonScene = eonitem
}))
