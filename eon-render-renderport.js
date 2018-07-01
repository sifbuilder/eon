/***************************
 *        @renderRenderport
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.renderRenderport = global.renderRenderport || {})))
}(this, function (exports) {
  'use strict'

  async function renderRenderport (__mapper = {}) {
    // let cellpromises = 	[
      // __mapper('xs').m('scene')
      // __mapper('xs').r('svg')
    // ]

    // let [
      // mscene
      // rsvg
    // ] = await Promise.all(
      // cellpromises
    // )

    // let mscene = 	__mapper('xs').m('scene')

    let margin = {top: 0, right: 0, bottom: 0, left: 0},
      viewWidth = 600,
      viewHeight = 400,
      scaleView = Math.min(viewWidth / 2, viewHeight) / Math.PI,
      width = viewWidth - margin.left - margin.right,
      height = viewHeight - margin.top - margin.bottom

    let prjdef = {
      projection: 'uniwen',
      prerotate: [0, 0, 0],
      translate: [width / 2, height / 2, 0],
      rotate: [0, 0, 0],
      scale: [1, -1, 1],
      lens: [0, 1, Infinity]
    }

    // ............................. enty
    let enty = function () {}

    enty.render = function (elapsed, featurecollection) {
      // let scene = mscene.scene()

      // if (__mapper('renderSvg') !== undefined) __mapper('renderSvg').render(elapsed, featurecollection)

      // __mapper('renderSvg')['renderSvg'](__mapper)
        // .then((rsvg) => {
          // if (1 && 1) console.log('renderSvg', rsvg)
          // rsvg.render(elapsed, featurecollection)
        // })

        rsvg.render(elapsed, featurecollection)

      // if (__mapper('xs').r('webgl') !== undefined) __mapper('xs').r('webgl').render(elapsed, featurecollection)

      // if (__mapper('renderCanvas') !== undefined) __mapper('xs').r('canvas').render(elapsed, featurecollection)
    }

    enty.width = _ => (_ === undefined) ? width : (width = _, enty)
    enty.height = _ => (_ === undefined) ? height : (height = _, enty)
    enty.margin = _ => (_ === undefined) ? margin : (margin = _, enty)
    enty.scaleView = () => scaleView

    // ............................. cameraProjer
    const cameraProjer = function (p = prjdef) {

      let geo = __mapper('geoUniwen')(p)
      return geo

    }

    // ............................. xydirs
    const xydirs = function () {
      let orig = enty.cameraProjer().invert([0, 0])
      let xyvector = enty.cameraProjer().invert([1, 1])

      let dirs = []
      dirs[0] = Math.sign(xyvector[0] - orig[0])
      dirs[1] = Math.sign(xyvector[1] - orig[1])

      return dirs
    }

    //............................. getPos
    const getPos = function (signal) {
      let pos
      let projer = enty.cameraProjer()

      if (Array.isArray(signal)) { // coordinates
        pos = [signal[0], signal[1]]
        pos = projer.invert(pos)
      } else if (typeof signal === 'object') { // event
        if (signal.touches && signal.touches.length) {
          signal = signal.touches[0]
          pos = [signal.x, signal.y]

          pos = projer.invert(pos)

        } else {

          pos = [signal.x, signal.y]

          pos = projer.invert(pos)
        }
      }

      pos = [ pos[0], pos[1] ]

      return pos
    }



    // ............................. projection
    enty.projection = _ => _ !== undefined ? (projection = _, enty) : projection
    enty.cameraProjer = cameraProjer
    enty.getPos = getPos
    enty.prjdef = () => prjdef
    return enty
  }

  exports.renderRenderport = renderRenderport
}))
