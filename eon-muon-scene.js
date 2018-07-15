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
      d3,
      rsvg,
      cwen,
      cversor,
      ckey,
    ] = await Promise.all([
      __mapper('xs').b('d3'),
      __mapper('xs').r('svg'),
      __mapper('xs').c('wen'),
      __mapper('xs').c('versor'),
      __mapper('xs').c('key'),
    ])

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
        let svg = rsvg.svg()
        cwen.control(svg)
      }

      if (p.svg && p.versor && p.versor !== state.scene.versor) {
        state.scene.versor = 1
        cversor.control(__mapper('renderSvg').svg())
      }

      // ............................. key control animation
      if (p.key && p.key !== state.scene.key) {
        state.scene.key = 1

        if (__mapper('ctlKey') !== undefined) {
          __mapper('ctlKey').start() // KEYBRD CONTROLS
          let controltimerLeftArrowAlt = () => { // LEFT ARROW
            if (__mapper('muonAnimation').animationStop !== undefined) {
              console.log('controltimerLeftArrowAlt')
              if (__mapper('ctlTimer').started()) {
                __mapper('ctlTimer').stop()
              } else {
                __mapper('ctlTimer').resume()
              }
            }
          }
          __mapper('ctlKey').subscribe(controltimerLeftArrowAlt, 'leftArrowAlt')
        }

        if (__mapper('ctlKey') !== undefined) {
          let controltimerUpArrowAlt = () => { // UP ARROW
            console.log('controltimerUpArrowAlt')
            __mapper('ctlWen').control(__mapper('renderSvg').svg()) // SVG WEN
          }
          __mapper('ctlKey').subscribe(controltimerUpArrowAlt, 'upArrowAlt')
        }

        let controltimerRightArrowAlt = () => { // RIGHT ARROW
          if (__mapper('muonAnimation').animationStop !== undefined) {
            if (__mapper('ctlTimer').started()) {
              __mapper('ctlTimer').stop()
            } else {
              __mapper('ctlTimer').resume()
            }
          }
        }
        __mapper('ctlKey').subscribe(controltimerRightArrowAlt, 'rightArrowAlt')
      }
    }

    let enty = {}
    enty.scenify = scenify
    enty.scene = _ => _ !== undefined ? (state.scene = _, enty) : state.scene
    return enty
  }

  exports.muonScene = muonScene
}))
