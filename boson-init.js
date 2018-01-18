/*******************************************
 *    @bosonInit
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.bosonInit = global.bosonInit || {})))
}(this, function (exports) {
  'use strict'

  /*******************************************
 *    @bosonInit
 */
  let bosonInit = function bosonInit (__mapper = {}) {
    /*******************************************
 *    @enty
 */
    let enty = function (p) {
      if (p.canvas) __mapper({'renderCanvas': renderCanvas.renderCanvas(__mapper)})

      if (p.svg) __mapper({'renderSvg': renderSvg.renderSvg(__mapper)}) // SVG
      if (p.pos) __mapper('xs').c('pos')(__mapper('renderSvg').svg()) // SVG POSITION
      if (p.img) __mapper('xs').b('image')('zimg-black.jpg') // BCK IMAGE

      if (p.svg && p.wen) __mapper('xs').c('wen').control(__mapper('renderSvg').svg()) // SVG WEN
      if (p.svg && p.versor) __mapper('xs').c('versor').control(__mapper('renderSvg').svg()) // SVG VERSOR

      if (p.webgl) __mapper({'renderWebgl': renderWebgl.renderWebgl(__mapper)}) // WEBGL

      __mapper({'muonAnimation': muonAnimation.muonAnimation(__mapper)}) // ANIMATION
      __mapper({'muonStore': muonStore.muonStore(__mapper)}) // STORE

      if (p.gui) { gui = new dat.GUI(); gui.add(window, 'restart') } // GUI https://github.com/dataarts/dat.gui

      if (p.key) {
        __mapper('xs').c('key').start() // KEYBRD CONTROLS

        let controltimerRightArrowAlt = () => { // ARROW
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

      let mouseMoveListener = function (event) {
        let mmouse = __mapper('xs').m('mouse')
        mmouse.mouseMove(1)
        mmouse.mouseDownShared(1)
        mmouse.event(event)
      }

      let mouseDownListener = function (event) {
        let mmouse = __mapper('xs').m('mouse')
        mmouse.mouseDown(1)
        mmouse.mouseDownShared(1)
        mmouse.event(event)
      }

      let mouseUpListener = function (event) {
        let mmouse = __mapper('xs').m('mouse')
        mmouse.mouseDown(0)
        mmouse.mouseDownShared(0)
        mmouse.event(event)
      }

      if (__mapper('renderSvg')) __mapper('xs').c('mouseDown').control(__mapper('renderSvg').svg()).subscribe(mouseDownListener, __mapper('renderSvg').svg())
      if (__mapper('renderSvg')) __mapper('xs').c('mouseUp').control(__mapper('renderSvg').svg()).subscribe(mouseUpListener, __mapper('renderSvg').svg())
      if (__mapper('renderSvg')) __mapper('xs').c('mouseMove').control(__mapper('renderSvg').svg()).subscribe(mouseMoveListener, __mapper('renderSvg').svg())

      if (p.fps) { // FPS
        const fpsdiv = d3.select('body').append('div').attr('id', 'fps')
        __mapper('xs').m('fps').init()
      }

      if (p.stats) { // STATS
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

    return enty
  }

  exports.bosonInit = bosonInit
}))
