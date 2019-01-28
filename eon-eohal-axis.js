/****************************
 *    @eohalAxis
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalAxis = global.eohalAxis || {})))
}(this, function (exports) {
  'use strict'

  async function eohalAxis (__eo = {}) {
    let [
      muonProps,
      d3Axis,
      d3Scale,
      d3Format,
      eohalMars,
      muonAnitem,
    ] = await Promise.all([
      __eo('xs').m('props'),
      __eo('xs').b('d3-axis'),
      __eo('xs').b('d3'),
      __eo('xs').b('d3-format'),
      __eo('xs').e('mars'),
      __eo('xs').m('anitem'),
    ])

    // ............................. gramm
    function gramm (anitem) {
      let eoload = anigram.eoload, // eoload
        eoric = anigram.eoric, // eoric
        uid = eoric.uid, // uid
        axis = eoload.axis // axis

      let range = axis.range || [0, 1],
        domain = axis.domain || [0, 1],
        rotate = axis.rotate || 0,
        tickSize = axis.tickSize || 2,
        tickPadding = axis.tickPadding || 20,
        tickFormat = axis.tickFormat || '',
        scaleType = axis.scaleType,
        orient = axis.orient
      console.assert(orient !== undefined, 'axis orientation undefined')

      let _scale = (scaleType) ? d3Scale[scaleType]() : d3Scale['scaleTime']()

      let newAnigram = muonProps.clone(anigram) // clone
      newAnigram.eofold.properties = {
        sort: 'axis',
        eoric: eoric,
        // uid: uid,
        axis: Object.assign(axis, {
          scale: _scale.domain(domain).range(range),
          rotate: rotate,
          d3Axis: d3Axis[orient](_scale.domain(domain).range(range))
            .tickFormat((tickFormat === '') ? '' : d3Format.format(tickFormat))
            .tickSizeOuter(0)
            .tickSize(tickSize)
            .tickPadding(tickPadding),
          style: {
            'text-anchor': 'middle',
            'font-size': 12,
            'font-family': 'sans-serif',
          },
        }),
      }
      delete newAnigram.eoload.axis
      return eohalMars.gramm(newAnigram)
    }

    // ............................. enty
    let eohalAxis = {}
    eohalAxis.ween = anima => Array.of(anima)
    eohalAxis.gramm = anima => gramm(anima)

    let enty = eohalAxis

    return enty
  }

  exports.eohalAxis = eohalAxis
}))
