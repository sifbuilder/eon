/****************************
 *      @eonEohalFourier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonEohalFourier = global.eonEohalFourier || {})))
}(this, function (exports) {
  'use strict'

  // ... h.fourier anigrams per frequency cycloid
  // ... cycloids in eoload.fourier.transforms resulting from m.fourier.complexify
  // ... anigrams turned to h.mars
  // ...
  // ... ### h.fourier.gramify
  // ... eoload.fourier.transforms, gj featurized, complexified, ntimed
  // ... eoload.fourier.maglast pencil radio
  // ... eoload.fourier.interval [0,1] delete anigrams outside
  // ... eoload.fourier.tolerance 1 remove sinusoids below
  // ... eoload.fourier.doteocrom style of pencil dot
  // ... eoload.fourier.avatars.traceline  form trace
  // ... eoload.fourier.avatars.line  sinusoid ray

  async function eonitem (__eo = {}) {
    let [
      eonEohalMars,
      Complex,
      eonMuonEoric,
      eonMuonNatform,
      eonMuonProps,
    ] = await Promise.all([
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-lib-complex'),
      __eo('xs').b('eon-muon-eoric'),
      __eo('xs').b('eon-muon-natform'),
      __eo('xs').b('eon-muon-props'),
    ])

    // ............................. eohale
    let eohale = function (ani) {
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
        pacedAnisort = fourier.pacedAnisort || 'anigram'

      // ... time in period is (t - t0) / (t1 - t0), with t unit time

      let t = eotim.unTime // time % period; i,[0,vertices] => t,[0,T]
      let t0 = interval[0],
        t1 = interval[1],
        period = t1 - t0,

        // ... t relative in period
        // ... if t our of period, dell anitem

        tRelToPeriod = (t - t0) / period, // time relative to interval
        tNotInPeriod = (t < interval[0] || t > interval[1]) ? 1 : 0 // time out of interval

      // ...   features are rendered simultaneously on time period

      let natAni1 = {
        eohal: eonEohalMars,
        eofold: p => eonMuonNatform.natMultiLineString({eoform: p.eoform}),
        eotim: eotim,
        eoric: {gid: 'g', cid: 'c', fid: 'f1'},
        eocrom: {'csx': 0, 'cf': 999, 'cs': 777, 'cw': 0.6, 'co': 0.0099, 'cp': 0.999},

        eoform: {
          'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
          'ra2': 30, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1,
          'dom3': [ -180, 180 ],
        },
        eoload: {},
      }

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
            fid = eonMuonEoric.idify(eoric.fid, j, i),
            uid = eonMuonEoric.idify(gid, cid, fid),
            pid = eoric.uid
          let _ric = {gid, cid, fid, uid, pid} // is DELLED ?

          // ...  each newItem is cloned from the h.fourier anigram

          let newItem = eonMuonProps.cloneObj(anigram)
          newItem.eohal = eonEohalMars

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

          newItem.avatars = {}

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
            newItem.eofold.properties.sort = 'void' // not render three points

            // ... add __RAY__ avatar to each cycloids

            if (i > 0 && eoload.fourier.avatars && eoload.fourier.avatars.rayline) {
              // ... add ray avatar

              let rayline = eonMuonProps.cloneObj(eoload.fourier.avatars.rayline) // rayline line
              rayline.eofold.geometry.coordinates = [
                [acci.re / N, acci.im / N], // from this cycloid
                [xn[i - 1], yn[i - 1]], // to prevous cycloid
              ]

              let gid = rayline.eoric.gid // from ava eoric
              let cid = rayline.eoric.cid
              let fid = eonMuonEoric.idify(rayline.eoric.fid, j, i)

              // ... del item outside time period (eoric.eodelled = 1)

              let _ric = {gid, cid, fid} // is DELLED ?
              _ric.uid = eonMuonEoric.getuid(_ric) // uid
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

            let traceline = eonMuonProps.cloneObj(eoload.fourier.avatars.traceline)
            console.assert(traceline !== undefined, 'traceline undefined')
            if (traceline) {
              // ... if pacer avatar
              // ... no add segments ourside time period (pacer.autoN = 0)
              // ... add no segments outside period

              if (tNotInPeriod) traceline.eoload.pacer.autoN = 0

              //  traceline eoric

              traceline.eoric = riccer(newItem)
              traceline.eoric.uid = eonMuonEoric.getuid(traceline.eoric)

              newItem.avatars = {
                traceline: traceline,
              }
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
          let nextPointRadius = iAnitems[i + 1].eofold.properties.pointRadius // _e_
          iAnitems[i].eofold.properties.pointRadius = nextPointRadius

          let cycloid = eonMuonProps.cloneObj(natAni1)
          let gid = cycloid.eoric.gid // from ava eoric
          let cid = cycloid.eoric.cid
          let fid = eonMuonEoric.idify(cycloid.eoric.fid, i)
          let _ric = {gid, cid, fid} // is DELLED ?
          _ric.uid = eonMuonEoric.getuid(_ric) // uid
          cycloid.eoric = _ric
          cycloid.eoform.ra2 = iAnitems[i].eofold.properties.pointRadius

          let delta = iAnitems[i].eofold.geometry.coordinates
          let eomot = {
            proform: {

              projection: 'uniwen',
              translate: delta,
              scale: [ 1, 1, 1 ],
              rotate: [ 0, 0, 0 ],
              lens: [0, 1, Infinity ],

            },
          }
          cycloid.eomot = eomot

          iAnitems[i].avatars.cycloid = cycloid
        }

        newItems = [...newItems, ...iAnitems]
      }

      return newItems
    }

    // ............................. anify
    function anify (anitem) {
      console.assert(anitem.eoload.fourier !== undefined, `anitem.eoload.fourier undefined ${anitem}`)
      if (anitem.eoload.fourier.pacedAnisort === 'anima') {
        let newItems = eohale(anitem)

        let anilists = newItems.map(ani => eonEohalMars.anify(ani))
        let anis = anilists.reduce((p, q) => Array.isArray(q) ? [...p, ...q] : [...p, q], [])

        return anis
      } else {
        return Array.of(anitem)
      }
    }

    // ............................. gramify
    function gramify (anitem) {
      let newAnigrams = []
      console.assert(anitem.eoload.fourier !== undefined, `anitem.eoload.fourier undefined ${anitem}`)
      if (anitem.eoload.fourier.pacedAnisort === 'anima') {
        newAnigrams = Array.of(anitem)
      } else {
        let newItems = eohale(anitem)
        let anilists = newItems.map(ani => eonEohalMars.gramify(ani))

        for (let i = 0; i < anilists.length; i++) {
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
      anify: anitem => anify(anitem),
      gramify: anitem => gramify(anitem),
    }

    let enty = eohal
    return enty
  }

  exports.eonEohalFourier = eonitem
}))
