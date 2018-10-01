/****************************
 *      @eohalFourier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalFourier = global.eohalFourier || {})))
}(this, function (exports) {
  'use strict'


  // ... h.fourier anigrams per frequency cycloid
  // ... cycloids in eoload.fourier.transforms resulting from m.fourier.complexify
  // ... anigrams turned to h.sol
  // ...
  // ... ### h.fourier.gramm
  // ... eoload.fourier.transforms, gj featurized, complexified, ntimed
  // ... eoload.fourier.maglast pencil radio
  // ... eoload.fourier.interval [0,1] delete anigrams outside
  // ... eoload.fourier.tolerance 1 remove sinusoids below
  // ... eoload.fourier.doteocrom style of pencil dot
  // ... eoload.fourier.avatars.traceline  form trace
  // ... eoload.fourier.avatars.line  sinusoid ray

  async function eohalFourier (__mapper = {}) {
    let [
      eohalSol,
      Complex,
      muonEoric,
      muonProps,
    ] = await Promise.all([
      __mapper('xs').e('sol'),
      __mapper('xs').l('complex'),
      __mapper('xs').m('eoric'),
      __mapper('xs').m('props'),
    ])

    // ............................. eohale
    let eohale = function (ani) {
      if (1 && 1) console.log('h.fourier ani', ani)

      let anigram = ani,
        eoric = anigram.eoric, // eoric
        eotim = anigram.eotim, // eotim
        eocrom = anigram.eocrom, // eocrom
        eoload = anigram.eoload // eoload

      let fourier = eoload.fourier // fourier

      let transforms = fourier.transforms,
        maglast = fourier.maglast || 3, // pencil radio
        interval = fourier.interval || [0, 1], // fourier.period
        tolerance = fourier.tolerance || 0.5,
        geosort = fourier.geosort || 'anigram'

      // ... time in period is (t - t0) / (t1 - t0), with t unit time

      let t = eotim.unitTime // time % period; i,[0,vertices] => t,[0,T]
      let t0 = interval[0],
        t1 = interval[1],
        period = t1 - t0,

        // ... t relative in period
        // ... if t our of period, dell anitem

        tRelToPeriod = (t - t0) / period, // time relative to interval
        tNotInPeriod = (t < interval[0] || t > interval[1]) ? 1 : 0 // time out of interval

      // ...   features are rendered simultaneously on time period

      let newItems = []
      for (let j = 0; j < transforms.length; j++) {
        // ... FOR EACH FEATURE in time

        // ... tfeature is gj LineString with time interval prop

        let tfeature = transforms[j]
        let coordinates = tfeature.geometry.coordinates
        var N = coordinates.length // number of fequencies
        var nyquist = Math.floor(N / 2) // nyquist frequency

        let transformSorted = coordinates.slice() // sort coordinates coefs by norm
          .map((d, i) => Object.assign(d, {w: i})) // frequency on index
          .filter(d => Complex(d).abs() / N > tolerance) // filter per amplitude
          .sort((a, b) => Complex(b).abs() - Complex(a).abs()) // sort per amplitude

        // ...  M: number of cycloids

        let M = transformSorted.length

        var acci = Complex(0, 0) // summatory
        let xn = [], yn = [], magn = [], iAnitems = []

        // ...  for EACH sinusoid, generate a new anitem

        for (let i = 0; i <= M; i++) {
          let gid = eoric.gid, // from ava eoric
            cid = eoric.cid,
            fid = muonEoric.uider(eoric.fid, j, i),
            uid = muonEoric.uider(gid, cid, fid)
          let _ric = {gid, cid, fid, uid} // is DELLED ?

          // ...  each newItem is cloned from the h.fourier anigram

          let newItem = muonProps.cloneObj(anigram)
          newItem.eohal = 'sol'

          // ...  del newitem if outside time period (eoric.eodelled = 1)

          newItem.eodelled = tNotInPeriod

          newItem.eofold = {
            type: 'Feature', // tfeature
            geometry: {
              type: 'Point',
              coordinates: [],
            },
            properties: {
              pointRadius: 1, // d.eoload.fourier.rad,
            },
          }

          newItem.eonode = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0],
            },
            properties: { // eofold coindices with eonode
              orgen: [0, 0], velin: [0, 0], velang: [0, 0], prevous: [0, 0], geodelta: [0, 0],
            },
          }

          // ... for each cycloid < M (nyquist frequency)
          // ...     beyond nyquist w frequency is aliased by -N

          if (i < M) {
            if (transformSorted[i].w >= nyquist) transformSorted[i].w -= N

            // ...   sinusoid is Sum( Xi * e^i2[pi]w[i]n/N )
            // ...   The sinusoid's frequency is w cycles per N samples

            let phasei = Complex(0, 2 * Math.PI * transformSorted[i].w * tRelToPeriod)
            let unitRooti = phasei.exp() // complex sinusoidal component e^i2[pi]w[i]n/N
            let ci = unitRooti.mul(transformSorted[i]) // Xi * root(i)
            acci = acci.add(ci) // add component

            xn[i] = transformSorted[i].re
            yn[i] = transformSorted[i].im
            magn[i] = Math.sqrt(xn[i] * xn[i] + yn[i] * yn[i]) // amplitude of frequency
            newItem.eofold.properties.pointRadius = magn[i] / N // sinusoid amplitude

            // ... add __RAY__ avatar to each cycloids

            if (i > 0 && eoload.fourier.avatars && eoload.fourier.avatars.rayline) {
              // ... add ray avatar

              let rayline = muonProps.cloneObj(eoload.fourier.avatars.rayline) // rayline line
              rayline.eofold.geometry.coordinates = [
                [acci.re / N, acci.im / N], // from this cycloid
                [xn[i - 1], yn[i - 1]], // to prevous cycloid
              ]

              let gid = rayline.eoric.gid // from ava eoric
              let cid = rayline.eoric.cid
              let fid = muonEoric.uider(rayline.eoric.fid, j, i)

              // ... del item outside time period (eoric.eodelled = 1)

              let _ric = {gid, cid, fid} // is DELLED ?
              _ric.uid = muonEoric.getuid(_ric) // uid
              rayline.eoric = _ric
              rayline.eodelled = tNotInPeriod

              newItem.avatars = {rayline: rayline} // ADD RAYLINE
            }
          }

          xn[i] = acci.re / N // average the summatory
          yn[i] = acci.im / N

          if (i === M && eoload.fourier.avatars && eoload.fourier.avatars.traceline) {
            // ... add trace avatar of last sinusoid

            let riccer = eoload.fourier.riccer || function (ani) { return ani.eoload.fourier.avatars.traceline.eoric }

            // PENCIL radio magnitude of last

            newItem.eofold.properties.pointRadius = maglast

            // init PACER clonned from fourier avatar
            // traceline

            let traceline = muonProps.cloneObj(eoload.fourier.avatars.traceline)
            console.assert(traceline !== undefined, 'traceline undefined')
            if (traceline) {
              // ... if pacer avatar
              // ... no add segments ourside time period (pacer.autoN = 0)
              // ... add no segments outside period

              if (tNotInPeriod) traceline.eoload.pacer.autoN = 0

              //  traceline eoric

              traceline.eoric = riccer(newItem)
              traceline.eoric.uid = muonEoric.getuid(traceline.eoric)

              newItem.avatars = {
                traceline: traceline
              }
if (1 && 1) console.log('h.fourier newItem', newItem)


            }
          }

          newItem.eotim = eotim // eotim
          newItem.eoric = _ric // eoric
          newItem.eocrom = eocrom // eocrom

          newItem.eofold.geometry.coordinates = [xn[i], yn[i]]
          newItem.eonode.geometry.coordinates = [xn[i], yn[i]]
          newItem.eonode.properties.orgen = [xn[i], yn[i]]

          iAnitems[i] = newItem
        }

        // ...   each point/circle anigram has radius of next sinusoid amplitude

        for (let i = 0; i < iAnitems.length - 1; i++) { //  for each anitem
          let nextPointRadius = iAnitems[i + 1].eofold.properties.pointRadius
          iAnitems[i].eofold.properties.pointRadius = nextPointRadius
        }

        newItems = [...newItems, ...iAnitems]
      }

      return newItems

    }

    // ............................. ween
    function ween (anitem) {
      if (anitem.eoload.fourier.geosort === 'anima') {
        let newItems = eohale(anitem)

        let anilists = newItems.map(ani => eohalSol.ween(ani))
        let anis = anilists.reduce((p, q) => Array.isArray(q) ? [...p, ...q] : [...p, q], [])
if (1 && 1) console.log('anis', anis)

        return anis

      } else {

        return Array.of(anitem)

      }
    }

    // ............................. gramm
    function gramm (anitem) {
      let newAnigrams = []
      if (anitem.eoload.fourier.geosort === 'anima') {

        newAnigrams = Array.of(anitem)

      } else {

        let newItems = eohale(anitem)
        let anilists = newItems.map(ani => eohalSol.gramm(ani))

        for (let i=0; i<anilists.length; i++) {
            let anilist = anilists[i]
            if (Array.isArray(anilist)) {
              newAnigrams = [...newAnigrams, ...anilist]
            } else {
              newAnigrams = [...newAnigrams, anilist]
            }
        }

        return newAnigrams
      }
    }
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
