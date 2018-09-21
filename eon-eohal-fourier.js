/****************************
 *      @eohalFourier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalFourier = global.eohalFourier || {})))
}(this, function (exports) {
  'use strict'

  // ## h.fourier
  // h.fourier anigrams per frequency cycloid
  // cycloids in eoload.fourier.transforms resulting from m.fourier.complexify
  // anigrams turned to h.turnform

  // ### h.fourier.gramm
  // eoload.fourier.transforms, gj featurized, complexified, ntimed
  // eoload.fourier.maglast pencil radio
  // eoload.fourier.interval [0,1] delete anigrams outside
  // eoload.fourier.tolerance 1 remove sinusoids below
  // eoload.fourier.dotgeochrom style of pencil dot
  // eoload.fourier.avatars.traceline  form trace
  // eoload.fourier.avatars.line  sinusoid ray

  async function eohalFourier (__mapper = {}) {
    let [
      muonProps,
      muonEoric,
      Complex,
      eohalTurnform,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('eoric'),
      __mapper('xs').l('complex'),
      __mapper('xs').e('turnform'),
    ])

    // ............................. gramm
    let gramm = function (ani, newAnigrams = []) {
      let anigram = ani,
        eohal = anigram.eohal, // eohal
        eofold = anigram.eofold, // eofold
        eoric = anigram.eoric, // eoric
        eotim = anigram.eotim, // eotim
        parentuid = anigram.parentuid, // parentuid
        eocrom = anigram.eocrom // eocrom

      let eoload = anigram.eoload, // eoload
        fourier = eoload.fourier // fourier

      let path = fourier.path,
        transforms = fourier.transforms,
        maglast = fourier.maglast || 3, // pencil radio
        interval = fourier.interval || [0, 1], // fourier.period
        tolerance = fourier.tolerance || 0.5

      transforms = eofold.features

      // md:   time in period is (t - t0) / (t1 - t0), with t unit time

      let t = eotim.unitTime // time % period; i,[0,vertices] => t,[0,T]
      let t0 = interval[0],
        t1 = interval[1],
        period = t1 - t0,
        tRelToPeriod = (t - t0) / period, // time relative to interval
        tInPeriod = (t < interval[0] || t > interval[1]) ? 0 : 1, // time in of interval
        tNotInPeriod = (t < interval[0] || t > interval[1]) ? 1 : 0 // time out of interval

      // md:   fidder(j,i) per feature and sinusoid

      let fidder = (d, i, j) => d + '_' + i + '_' + j

      // md:   features are rendered simultaneously on time period

      let anitems = []
      for (let j = 0; j < transforms.length; j++) { // FOR EACH FEATURE in time
        let tfeature = transforms[j]
        let coordinates = tfeature.geometry.coordinates //
        var N = coordinates.length // number of fequencies
        var nyquist = Math.floor(N / 2) // nyquist frequency
        var w = 0 // frequency associated to cycloid index (for sorted)

        let transformSorted = coordinates.slice() // sort coordinates coefs by norm
          .map((d, i) => Object.assign(d, {w: i})) // frequency on index
          .filter(d => Complex(d).abs() / N > tolerance) // filter per amplitude
          .sort((a, b) => Complex(b).abs() - Complex(a).abs()) // sort per amplitude

        //  M: number of cycloids

        let M = transformSorted.length

        var acci = Complex(0, 0) // summatory
        let xn = [], yn = [], magn = [], iAnitems = []

        //  for EACH sinusoid, generate a new anitem

        for (let i = 0; i <= M; i++) {
          let gid = eoric.gid // from ava eoric
          let cid = eoric.cid
          let fid = fidder(eoric.fid, j, i)

          //  del item if outside time period (eoric.eodelled = 1)

          let _ric = {gid, cid, fid} // is DELLED ?
          let _uid = muonEoric.getuid(_ric) // uid

          //  each newItem is cloned from the h.fourier anigram

          let newItem = muonProps.cloneObj(anigram)

          newItem.eohal = 'natform' // eohal.turnform
          newItem.eodelled = tNotInPeriod

          newItem.eofold = {
            type: 'Feature', // tfeature
            geometry: { type: 'Point', coordinates: [] },
            properties: {
              pointRadius: 1, // d.eoload.fourier.rad,

            },
          }

          newItem.eonode = {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0] },
            properties: { // eofold coindices with eonode
              orgen: [0, 0], velin: [0, 0], velang: [0, 0], prevous: [0, 0], geodelta: [0, 0],
            },
          }

          // for each cycloid < M (nyquist frequency)
          //     beyond nyquist w frequency is aliased by -N

          if (i < M) {
            if (transformSorted[i].w >= nyquist) transformSorted[i].w -= N // nyquist

            // md:   sinusoid is Sum( Xi * e^i2[pi]w[i]n/N )
            // md:   The sinusoid's frequency is w cycles per N samples

            let phasei = Complex(0, 2 * Math.PI * transformSorted[i].w * tRelToPeriod)
            let unitRooti = phasei.exp() // complex sinusoidal component e^i2[pi]w[i]n/N
            let ci = unitRooti.mul(transformSorted[i]) // Xi * root(i)
            acci = acci.add(ci) // add component

            xn[i] = transformSorted[i].re
            yn[i] = transformSorted[i].im
            magn[i] = Math.sqrt(xn[i] * xn[i] + yn[i] * yn[i]) // amplitude of frequency
            newItem.eofold.properties.pointRadius = magn[i] / N // sinusoid amplitude

            // to all cycloids, add __RAY__ avatar

            if (i > 0) { // add ray avatar
              let rayline = muonProps.cloneObj(eoload.fourier.avatars.rayline) // rayline line
              rayline.eofold.geometry.coordinates = [
                [acci.re / N, acci.im / N], // from this cycloid
                [xn[i - 1], yn[i - 1]], // to prevous cycloid
              ]

              let gid = rayline.eoric.gid // from ava eoric
              let cid = rayline.eoric.cid
              let fid = fidder(rayline.eoric.fid, j, i)

              // md: del item outside time period (eoric.eodelled = 1)
              let _ric = {gid, cid, fid} // is DELLED ?
              let uid = muonEoric.getuid(_ric) // uid
              rayline.eoric = _ric
              rayline.eodelled = tNotInPeriod

              // newItem.avatars = {rayline: rayline} // ADD RAYLINE
            }
          }

          xn[i] = acci.re / N // average the summatory
          yn[i] = acci.im / N

          // if last sinusoid, then add __TRACE__ avatar

          if (i === M) {
            let riccer = eoload.fourier.riccer || function (ani) { return ani.eoload.fourier.avatars.traceline.eoric }

            // PENCIL radio magnitude of last
            newItem.eofold.properties.pointRadius = maglast

            // init PACER clonned from fourier avatar
            // traceline

            let traceline = muonProps.cloneObj(eoload.fourier.avatars.traceline)
            console.assert(traceline !== undefined, 'traceline undefined')
            if (traceline) { // if pacer avatar
              // md: no add segments ourside time period (pacer.autoN = 0)
              // add no segments ourside period

              if (tNotInPeriod) traceline.eoload.pacer.autoN = 0

              //  traceline eoric

              traceline.eoric = riccer(newItem)
              traceline.uid = muonEoric.getuid(traceline.eoric)

              newItem.avatars = {traceline: traceline}
            }
          }

          newItem.eotim = eotim // eotim
          newItem.eoric = _ric // eoric
          newItem.uid = _uid // uid
          newItem.eocrom = eocrom // eocrom

          newItem.eofold.geometry.coordinates = [xn[i], yn[i]]
          newItem.eonode.geometry.coordinates = [xn[i], yn[i]]
          newItem.eonode.properties.orgen = [xn[i], yn[i]]

          iAnitems[i] = newItem
        }

        // md:   each point/circle anigram has radius of next sinusoid amplitude

        for (let i = 0; i < iAnitems.length - 1; i++) { //  for each anitem
          let pointRadius = iAnitems[i].eofold.properties.pointRadius
          let nextPointRadius = iAnitems[i + 1].eofold.properties.pointRadius
          iAnitems[i].eofold.properties.pointRadius = nextPointRadius
        }

        anitems = [...anitems, ...iAnitems]
      }

      let anigramLists = anitems.map(ani => eohalTurnform.gramm(ani))
      let anigrams = anigramLists.reduce((p, q) => Array.isArray(q) ? [...p, ...q] : [...p, q], [])

      return anigrams
    }
    // .................... ween
    let ween = anitem => (anitem.eoinited !== 1) ? (anitem.eoinited = anitem.gelded = 1, [anitem]) : []

    // .................... eohal
    let eohal = {
      ween: anitem => ween(anitem),
      gramm: anitem => gramm(anitem),
    }

    let enty = eohal
    return enty
  }

  exports.eohalFourier = eohalFourier
}))
