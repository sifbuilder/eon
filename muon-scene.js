/*******************************************
 *    @muonScene
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonScene = global.muonScene || {})))
}(this, function (exports) {
  'use strict'

  let muonScene = function (__mapper = {}) {
    
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
      stats: 0
    }
    
    // .................. scene
    let scene = function (p) {
      if (1 && 1) console.log(' ----------------', p)
      if (p.canvas && p.canvas !== state.scene.canvas) {
        state.scene.canvas = 1

        __mapper({'renderCanvas': renderCanvas.renderCanvas(__mapper)})
      }

      if (p.svg && p.svg !== state.scene.svg) {
        state.scene.svg = 1


        __mapper({'renderSvg': renderSvg.renderSvg(__mapper)})
      }

     if (p.bck && p.bck !== state.scene.bck) {
        state.scene.bck = 1

        __mapper('xs').m('image')(state.scene.img)
      }

      if (p.svg && p.wen && p.wen !== state.scene.wen) {
        state.scene.wen = 1

        __mapper('xs').c('wen').control(__mapper('renderSvg').svg())
      }

      if (p.svg && p.versor && p.versor !== state.scene.versor) {
        state.scene.versor = 1

        __mapper('xs').c('versor').control(__mapper('renderSvg').svg())
      }

      if (p.webgl && p.webgl !== state.scene.webgl) {
        state.scene.webgl = 1

        __mapper({'renderWebgl': renderWebgl.renderWebgl(__mapper)})
      }

      if (p.gui && p.gui !== state.scene.gui) {
        state.scene.gui = 1

        gui = new dat.GUI(); gui.add(window, 'restart')
      }

      if (p.key && p.key !== state.scene.key) {
        state.scene.key = 1

        __mapper('xs').c('key').start() // KEYBRD CONTROLS

        if (__mapper('controlKey') !== undefined) {
          let controltimerLeftArrowAlt = () => { // LEFT ARROW
            if (__mapper('bosonAnimation').animationStop !== undefined) {
              console.log('controltimerLeftArrowAlt')
              if (__mapper('controlTimer').started()) {
                __mapper('controlTimer').stop()
              } else {
                __mapper('controlTimer').resume()
              }
            }
          }
          __mapper('controlKey').subscribe(controltimerLeftArrowAlt, 'leftArrowAlt')
        }

        if (__mapper('controlKey') !== undefined) {
          let controltimerUpArrowAlt = () => { // UP ARROW
            console.log('controltimerUpArrowAlt')
            __mapper('controlWen').control(__mapper('renderSvg').svg()) // SVG WEN
          }
          __mapper('controlKey').subscribe(controltimerUpArrowAlt, 'upArrowAlt')
        }

        let controltimerRightArrowAlt = () => { // RIGHT ARROW
          if (__mapper('bosonAnimation').animationStop !== undefined) {
            if (__mapper('controlTimer').started()) {
              __mapper('controlTimer').stop()
            } else {
              __mapper('controlTimer').resume()
            }
          }
        }
        __mapper('xs').c('key').subscribe(controltimerRightArrowAlt, 'rightArrowAlt')
      }

      if (p.ray && p.ray !== state.scene.ray) {
        state.scene.ray = 1

        __mapper('xs').c('rayder').control(__mapper('renderSvg').svg())
      }

      if (p.fps && p.fps !== state.scene.fps) {
        state.scene.fps = 1

        const fpsdiv = d3.select('body').append('div').attr('id', 'fps')
        __mapper('xs').m('fps').init()
      }

      if (p.stats && p.stats !== state.scene.stats) {
        state.scene.stats = 1

        let stats = __mapper('xs').m('stats')() // new Stats();
        stats.showPanel(-1) // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(stats.dom)
        function animate () {
          stats.begin(); stats.end()
          requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }

    
    let enty = function (p) {
      
      scene(p)
      if (__mapper('animation') === undefined)  __mapper({'bosonAnimation': bosonAnimation.bosonAnimation(__mapper)})

    }
    enty.scene = _ => _ !== undefined ? (state.scene = _, enty) : state.scene
    return enty
  }

  exports.muonScene = muonScene
}))
