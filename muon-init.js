/*******************************************
 *    @muonInit
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonInit = global.muonInit || {})))
}(this, function (exports) {
  'use strict'

  let muonInit = function (__mapper = {}) {
    
    let state = {
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
    
    // .................. setContext
    let setContext = function (p) {
      if (p.canvas && p.canvas !== state.canvas) {
        state.canvas = 1

        __mapper({'renderCanvas': renderCanvas.renderCanvas(__mapper)})
      }

      if (p.svg && p.svg !== state.svg) {
        state.svg = 1

        __mapper({'renderSvg': renderSvg.renderSvg(__mapper)})
      }

     if (p.bck && p.bck !== state.bck) {
        state.bck = 1

        __mapper('xs').m('image')(state.img)
      }

      if (p.svg && p.wen && p.wen !== state.wen) {
        state.wen = 1

        __mapper('xs').c('wen').control(__mapper('renderSvg').svg())
      }

      if (p.svg && p.versor && p.versor !== state.versor) {
        state.versor = 1

        __mapper('xs').c('versor').control(__mapper('renderSvg').svg())
      }

      if (p.webgl && p.webgl !== state.webgl) {
        state.webgl = 1

        __mapper({'renderWebgl': renderWebgl.renderWebgl(__mapper)})
      }

      if (p.gui && p.gui !== state.gui) {
        state.gui = 1

        gui = new dat.GUI(); gui.add(window, 'restart')
      }

      if (p.key && p.key !== state.key) {
        state.key = 1

        __mapper('xs').c('key').start() // KEYBRD CONTROLS

        if (__mapper('controlKey') !== undefined) {
          let controltimerLeftArrowAlt = () => { // LEFT ARROW
            if (__mapper('muonAnimation').animationStop !== undefined) {
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
          if (__mapper('muonAnimation').animationStop !== undefined) {
            if (__mapper('controlTimer').started()) {
              __mapper('controlTimer').stop()
            } else {
              __mapper('controlTimer').resume()
            }
          }
        }
        __mapper('xs').c('key').subscribe(controltimerRightArrowAlt, 'rightArrowAlt')
      }

      if (p.ray && p.ray !== state.ray) {
        state.ray = 1

        __mapper('xs').c('rayder').control(__mapper('renderSvg').svg())
      }

      if (p.fps && p.fps !== state.fps) {
        state.fps = 1

        const fpsdiv = d3.select('body').append('div').attr('id', 'fps')
        __mapper('xs').m('fps').init()
      }

      if (p.stats && p.stats !== state.stats) {
        state.stats = 1

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
      
      setContext(p)
      if (__mapper('animation') === undefined)  __mapper({'muonAnimation': muonAnimation.muonAnimation(__mapper)})

    }
    enty.setContext = setContext
    return enty
  }

  exports.muonInit = muonInit
}))
