/****************************
 *    @haloAxis
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloAxis = global.haloAxis || {})))
}(this, function (exports) {
  'use strict'

  async function haloAxis (__mapper = {}) {
    let [
      mprops,
      d3axis,
      d3scale,
      d3format,
      haloTurnform,
      manitem,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').b('d3-axis'),
      __mapper('xs').b('d3-scale'),
      __mapper('xs').b('d3-format'),
      __mapper('xs').h('turnform'),
      __mapper('xs').m('anitem'),
    ])

    // ............................. gramm
    function gramm (anitem) {
      let eoload = anigram.eoload, // eoload
        eoric = eoric, // eoric
        uid = uid, // uid
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

      let _scale = (scaleType) ? d3scale[scaleType]() : d3scale['scaleTime']()

      let newAnigram = mprops.clone(anigram) // clone
      newAnigram.eofold.properties = {
        sort: 'axis',
        eoric: eoric,
        uid: uid,
        axis: Object.assign(axis, {
          scale: _scale.domain(domain).range(range),
          rotate: rotate,
          d3axis: d3axis[orient](_scale.domain(domain).range(range))
            .tickFormat((tickFormat === '') ? '' : d3format.format(tickFormat))
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
      return haloTurnform.gramm(newAnigram)
    }

    // ............................. enty
    let haloAxis = {}
    haloAxis.ween = anima => (anima.inited !== 1) ? (anima.inited = 1, [anima]) : []
    haloAxis.gramm = anima => gramm(anima)

    let enty = haloAxis

    return enty
  }

  exports.haloAxis = haloAxis
}))
