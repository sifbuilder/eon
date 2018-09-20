/*******************************************
 *    @muonScene
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonScene = global.muonScene || {})))
}(this, function (exports) {
  'use strict'

  async function muonScene (__mapper = {}) {
    let [
      renderSvg,
      ctlWen,
      ctlVersor,
      ckey,
      ctimer,
      ctlRayder,
    ] = await Promise.all([
      __mapper('xs').r('svg'),
      __mapper('xs').c('wen'),
      __mapper('xs').c('versor'),
      __mapper('xs').c('key'),
      __mapper('xs').c('timer'),
      __mapper('xs').c('rayder'),
    ])

    let manimation = __mapper('muonAnimation')

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
      if (p.svg && p.wen && p.wen !== state.scene.wen) {
        state.scene.wen = 1
        let svg = renderSvg.svg()
        ctlWen.control(svg)
      }

      if (p.svg && p.versor && p.versor !== state.scene.versor) {
        state.scene.versor = 1
        let svg = renderSvg.svg()
        ctlVersor.control(svg)
      }

      // ............................. ray control animation
      // if ray, add ray controls to svg
      if (p.ray && p.ray !== state.ray) {
        state.ray = 1
        let svg = renderSvg.svg()
        ctlRayder.control(svg)
      }

      // ............................. key control animation
      if (p.key && p.key !== state.scene.key) {
        state.scene.key = 1

        if (ckey !== undefined) {
          ckey.start() // KEYBRD CONTROLS
          let controltimerLeftArrowAlt = () => { // LEFT ARROW
            if (manimation.animationStop !== undefined) {
              console.log('controltimerLeftArrowAlt')
              if (ctimer.started()) {
                ctimer.stop()
              } else {
                ctimer.resume()
              }
            }
          }
          ckey.subscribe(controltimerLeftArrowAlt, 'leftArrowAlt')
        }

        if (ckey !== undefined) {
          let controltimerUpArrowAlt = () => { // UP ARROW
            console.log('controltimerUpArrowAlt')
            ctlWen.control(renderSvg.svg()) // SVG WEN
          }
          ckey.subscribe(controltimerUpArrowAlt, 'upArrowAlt')
        }

        let controltimerRightArrowAlt = () => { // RIGHT ARROW
          if (manimation.animationStop !== undefined) {
            if (ctimer.started()) {
              ctimer.stop()
            } else {
              ctimer.resume()
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

  exports.muonScene = muonScene
}))
