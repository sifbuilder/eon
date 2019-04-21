/****************************
 *    @eonEohalAxis
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonEohalAxis = global.eonEohalAxis || {})))
}(this, function (exports) {
  'use strict'

  async function eonitem (__eo = {}) {
    let [
      eonMuonProps,
      d3Axis,
      d3Scale,
      d3Format,
      eonEohalMars,
      eonMuonAnitem,
    ] = await Promise.all([
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('d3-axis'),
      __eo('xs').b('d3'),
      __eo('xs').b('d3-format'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-anitem'),
    ])

    // ............................. gramify
    function gramify (anitem) {
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

      let newAnigram = eonMuonProps.clone(anigram) // clone
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
      return eonEohalMars.gramify(newAnigram)
    }

    // ............................. enty
    let eonEohalAxis = {}
    eonEohalAxis.anify = anima => Array.of(anima)
    eonEohalAxis.gramify = anima => gramify(anima)

    let enty = eonEohalAxis

    return enty
  }

  exports.eonEohalAxis = eonitem
}))
