/****************************
 *      @haloFourier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloFourier = global.haloFourier || {})))
}(this, function (exports) {
  'use strict'

// ## h.fourier
   // h.fourier anigrams per frequency cycloid
   // cycloids in payload.fourier.transforms resulting from m.fourier.complexify
   // anigrams turned to h.ent

// ### h.fourier.gramm
  // payload.fourier.transforms, gj featurized, complexified, ntimed
  // payload.fourier.maglast pencil radio
  // payload.fourier.interval [0,1] delete anigrams outside
  // payload.fourier.tolerance 1 remove sinusoids below
  // payload.fourier.dotboform style of pencil dot
  // payload.fourier.avatars.traceline  form trace
  // payload.fourier.avatars.line  sinusoid ray
  
  async function haloFourier (__mapper = {}) {
    let [
      mprops,
      mric,
      Complex,
      hent,
    ] = await Promise.all([
      __mapper('xs').m('props'),
      __mapper('xs').m('ric'),
      __mapper('xs').l('complex'),
      __mapper('xs').h('ent'),
    ])

    // ............................. gramm
    async function gramm (ani, newAnigrams = []) {
      let anigram = ani,
        halo = anigram.halo, // halo
        geofold = anigram.payload.geofold // geofold

      let payload = anigram.payload, // payload
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        parentuid = payload.parentuid, // parentuid
        fourier = payload.fourier,
        boform = payload.boform

      let path = fourier.path,
        transforms = fourier.transforms,
        maglast = fourier.maglast || 3, // pencil radio
        interval = fourier.interval || [0, 1], // fourier.period
        tolerance = fourier.tolerance || 0.5

      transforms = geofold.features //

      // md:   time in period is (t - t0) / (t1 - t0), with t unit time
      let t = tim.unitTime // time % period; i,[0,vertices] => t,[0,T]
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

        //
        //  M: number of cycloids
        //
        let M = transformSorted.length

        var acci = Complex(0, 0) // summatory
        let xn = [], yn = [], magn = [], iAnitems = []

        //
        //  for EACH sinusoid, generate a new anitem
        //
        for (let i = 0; i <= M; i++) {
          let gid = ric.gid // from ava ric
          let cid = ric.cid
          let fid = fidder(ric.fid, j, i)

          //
          //  del item if outside time period (ric.delled = 1)
          //
          let _ric = {gid, cid, fid, delled: tNotInPeriod} // is DELLED ?
          let _uid = mric.getuid(_ric) // uid

          //
          //  each newItem is cloned from the h.fourier anigram
          //
          let newItem = mprops.cloneObj(anigram)

          newItem.halo = 'ent' // halo.ent

          newItem.payload.geofold = {
            type: 'Feature', // tfeature
            geometry: { type: 'Point', coordinates: [] },
            properties: {
              pointRadius: 1, // d.payload.fourier.rad,
              geonode: {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [0, 0] },
                properties: { // geofold coindices with geonode
                  orgen: [0, 0], velin: [0, 0], velang: [0, 0], prevous: [0, 0], geodelta: [0, 0],
                },
              },
            },
          }

          //
          // for each cycloid < M (nyquist frequency)
          //     beyond nyquist w frequency is aliased by -N
          //
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
            newItem.payload.geofold.properties.pointRadius = magn[i] / N // sinusoid amplitude

            //
            // to all cycloids, add __RAY__ avatar
            //
            if (i > 0) { // add ray avatar
              let rayline = mprops.cloneObj(payload.fourier.avatars.rayline) // rayline line
              rayline.payload.geofold.geometry.coordinates = [
                [acci.re / N, acci.im / N], // from this cycloid
                [xn[i - 1], yn[i - 1]], // to prevous cycloid
              ]

              let gid = rayline.payload.ric.gid // from ava ric
              let cid = rayline.payload.ric.cid
              let fid = fidder(rayline.payload.ric.fid, j, i)

              // md: del item outside time period (ric.delled = 1)
              let _ric = {gid, cid, fid, delled: tNotInPeriod} // is DELLED ?
              let uid = mric.getuid(_ric) // uid
              rayline.payload.ric = _ric
              // newItem.avatars = {rayline: rayline} // ADD RAYLINE
            }
          }

          xn[i] = acci.re / N // average the summatory
          yn[i] = acci.im / N

          //
          // if last sinusoid, then add __TRACE__ avatar
          //
          if (i === M) {
            let riccer = payload.fourier.riccer || function (ani) { return ani.payload.fourier.avatars.traceline.payload.ric }

            newItem.payload.geofold.properties.pointRadius = maglast // PENCIL radio magnitude of last

            //
            // init PACER clonned from fourier avatar
            //
            let traceline = mprops.cloneObj(payload.fourier.avatars.traceline) // traceline
            console.assert(traceline !== undefined, 'traceline undefined')
            if (traceline) { // if pacer avatar
              // md: no add segments ourside time period (pacer.autoN = 0)
              if (tNotInPeriod) traceline.payload.pacer.autoN = 0 // add no segments ourside period

              //
              //  traceline ric
              //
              traceline.payload.ric = riccer(newItem)
              traceline.payload.uid = mric.getuid(traceline.payload.ric)

              newItem.avatars = {traceline: traceline}
            }
          }

          newItem.payload.tim = tim // tim
          newItem.payload.ric = _ric // ric
          newItem.payload.uid = _uid // uid
          newItem.payload.boform = boform // boform

          newItem.payload.geofold.geometry.coordinates = [xn[i], yn[i]]
          newItem.payload.geofold.properties.geonode.geometry.coordinates = [xn[i], yn[i]]
          newItem.payload.geofold.properties.geonode.properties.orgen = [xn[i], yn[i]]

          iAnitems[i] = newItem
        }

        // md:   each point/circle anigram has radius of next sinusoid amplitude
        for (let i = 0; i < iAnitems.length - 1; i++) { //  for each anitem
          let pointRadius = iAnitems[i].geofold.properties.pointRadius
          let nextPointRadius = iAnitems[i + 1].geofold.properties.pointRadius
          iAnitems[i].geofold.properties.pointRadius = nextPointRadius
        }

        anitems = [...anitems, ...iAnitems]
      }
      return Promise.all(anitems.map(ani => hent.gramm(ani)))
        .then(anigramLists => {
          let anigrams = anigramLists.reduce((p, q) => Array.isArray(q) ? [...p, ...q] : [...p, q], [])

          return anigrams
        })
    }

    // .................... enty
    let haloNat_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
    let haloNat_gramm = anima => gramm(anima)

    let haloFourier = {}
    haloFourier.ween = anima => haloNat_ween(anima)
    haloFourier.gramm = anima => {
      let r = haloNat_gramm(anima)
      return r
    }

    let enty = haloFourier

    return enty
  }

  exports.haloFourier = haloFourier
}))
