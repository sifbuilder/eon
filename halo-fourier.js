/****************************
 *      @haloFourier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloFourier = global.haloFourier || {})))
}(this, function (exports) {
  'use strict'

  let haloFourier = function haloFourier (__mapper = {}) {
   
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem'),
      mstore = __mapper('xs').m('store'),
      mric = __mapper('xs').m('ric'),
      mgeoj = __mapper('xs').m('geoj')

  //md: ## h.fourier
  //md:    h.fourier anigrams per frequency cycloid
  //md:    cycloids in payload.fourier.transforms resulting from m.fourier.complexify
  //md:    anigrams turned to h.ent


  //md: ### h.fourier.gramm
  //md:   payload.fourier.transforms, gj featurized, complexified, ntimed
  //md:   payload.fourier.maglast pencil radio
  //md:   payload.fourier.interval [0,1] delete anigrams outside
  //md:   payload.fourier.tolerance 1 remove sinusoids below
  //md:   payload.fourier.dotboform style of pencil dot
  //md:   payload.fourier.avatars.fourierPacer  form trace
  //md:   payload.fourier.avatars.line  sinusoid ray
    let gramm = function (anima, newAnigrams = []) {

      let anigram = manitem(anima).anigram(), // anigram
        halo = anigram.halo, // halo
        geofold = anigram.geofold // geofold

      let payload = anigram.payload, // payload
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        parentuid = payload.parentuid, // parentuid
        fourier = payload.fourier,
        boform = payload.boform

      let path = fourier.path,
        transforms = fourier.transforms,
        maglast = fourier.maglast || 3, // pencil radio
        interval = fourier.interval || [0,1], // fourier.period
        tolerance = fourier.tolerance || 0.5

       transforms =  geofold.features // 
        
      //md:   time in period is (t - t0) / (t1 - t0), with t unit time
      let t = tim.unitTime // time % period; i,[0,vertices] => t,[0,T]
      let t0 = interval[0],
        t1 = interval[1],
        period = t1 - t0,
        tRelToPeriod = (t - t0) / period, // time relative to interval
        tInPeriod = (t < interval[0] || t > interval[1]) ? 0 : 1, // time in of interval
        tNotInPeriod = (t < interval[0] || t > interval[1]) ? 1 : 0 // time out of interval

      //md:   fidder(j,i) per feature and sinusoid
      let fidder = (d,i,j) => d + '_' + i + '_' + j

      //md:   features are rendered simultaneously on time period
      let anitems = []
      for (let j=0; j<transforms.length; j++) {  // FOR EACH FEATURE in time

          let tfeature = transforms[j]
          let coordinates = tfeature.geometry.coordinates //
          var N = coordinates.length // number of fequencies
          var nyquist = Math.floor (N / 2)  // nyquist frequency
          var w = 0 // frequency associated to cycloid index (for sorted)

          
          let transformSorted = coordinates.slice() // sort coordinates coefs by norm
            .map( (d,i) => Object.assign(d, {w:i})) // frequency on index
            .filter(d => Complex(d).abs() / N > tolerance)  // filter per amplitude
            .sort((a,b) => Complex(b).abs() - Complex(a).abs())  // sort per amplitude
            
          let M = transformSorted.length

          var acci = Complex (0, 0)  // summatory
          let xn = [], yn = [], magn = [], iAnitems = []
          for (let i = 0; i <= M; i++) { //  FOR EACH sinusoid, new anitem

            let gid = ric.gid // from ava ric
            let cid = ric.cid
            let fid = fidder(ric.fid, j, i)

            //md: del item outside time period (ric.delled = 1)
            let _ric = {gid, cid, fid, delled:tNotInPeriod} // is DELLED ?
            let uid = mric.getuid(_ric) // uid

            let newItem = f.cloneObj(anigram)
            newItem.geofold = 
                // tfeature
                {
                  type: 'Feature',
                  geometry: { type: 'Point',  coordinates: []  },
                  properties: {
                     pointRadius: 1, // d.payload.fourier.rad,
                     geonode: {
                      type: 'Feature',
                      geometry: { type: 'Point', coordinates: [0,0] },
                      properties: { // geofold coindices with geonode
                         orgen: [0,0],velin: [0, 0],velang: [0, 0],prevous: [0, 0],geodelta: [0, 0]
                      }
                    },
                  }
                }
            
            newItem.halo = 'ent' // halo.ent

            if (i < M) { // for each cycloid

              //md:   beyond nyquist w frequency is aliased by -N
              if (transformSorted[i].w >= nyquist) transformSorted[i].w -= N  // nyquist

              //md:   sinusoid is Sum( Xi * e^i2[pi]w[i]n/N )
              //md:   The sinusoid's frequency is w cycles per N samples
              let phasei = Complex (0, 2 * Math.PI * transformSorted[i].w * tRelToPeriod)
              let unitRooti = phasei.exp() // complex sinusoidal component e^i2[pi]w[i]n/N
              let ci = unitRooti.mul(transformSorted[i]) // Xi * root(i)
              acci = acci.add(ci) // add component

              
              xn[i] = transformSorted[i].re
              yn[i] = transformSorted[i].im
              magn[i] = Math.sqrt (xn[i] * xn[i] + yn[i]* yn[i]) // amplitude of frequency
              newItem.geofold.properties.pointRadius = magn[i] / N // sinusoid amplitude

              if (i > 0) {  // add ray avatar

                  let avaLine = f.cloneObj(payload.fourier.avatars.line)
                  avaLine.geofold.geometry.coordinates = [
                      [acci.re / N, acci.im / N],   // from this cycloid
                      [xn[i-1], yn[i-1]]          // to prevous cycloid
                  ]
                  
                  let gid = avaLine.payload.ric.gid // from ava ric
                  let cid = avaLine.payload.ric.cid
                  let fid = fidder(avaLine.payload.ric.fid, j, i)

                  //md: del item outside time period (ric.delled = 1)
                  let _ric = {gid, cid, fid, delled:tNotInPeriod} // is DELLED ?
                  let uid = mric.getuid(_ric) // uid                  
                  avaLine.payload.ric = _ric
                  newItem.payload.avatars = Array.of(avaLine)
              }

            }

           xn[i] = acci.re / N  // averate the summatory
           yn[i] = acci.im / N

           //md: add pencil on last sinusoid and pacer avatar
           if (i === M) {
              
              newItem.geofold.properties.pointRadius = maglast  // PENCIL radio magnitude of last

              let a = f.cloneObj(payload.fourier.avatars.fourierPacer)  // PACER
              if (a) {  // if pacer avatar

                //md: no add segments ourside time period (pacer.autoN = 0)
                if (tNotInPeriod) a.payload.pacer.autoN = 0 // add no segments ourside period

                let gid = a.payload.ric.gid // from ava ric
                let cid = a.payload.ric.cid
                let fid = fidder(a.payload.ric.fid, j, i)
                let _ric = {gid, cid, fid}
                let uid = mric.getuid(_ric)
                a.payload.ric  = _ric
                a.payload.uid  = uid
                newItem.payload.avatars = Array.of(a)
              }
            }


            newItem.payload.tim = tim // tim
            newItem.payload.ric = _ric // ric
            newItem.payload.uid = uid // uid
            newItem.payload.boform = boform // boform

            newItem.geofold.geometry.coordinates = [xn[i], yn[i]]
            newItem.geofold.properties.geonode.geometry.coordinates = [xn[i], yn[i]]
            newItem.geofold.properties.geonode.properties.orgen = [xn[i], yn[i]]

            iAnitems[i] = newItem

          }

          //md:   each point/circle anigram has radius of next sinusoid amplitude
          for (let i = 0; i < iAnitems.length - 1; i++) { //  for each anitem
            let pointRadius = iAnitems[i].geofold.properties.pointRadius
            let nextPointRadius = iAnitems[i+1].geofold.properties.pointRadius
              iAnitems[i].geofold.properties.pointRadius = nextPointRadius
          }


          anitems = [...anitems, ...iAnitems]
      }


      for (let i=0; i<anitems.length; i++) {
        newAnigrams = [...newAnigrams, ...__mapper('xs').h('ent').gramm(anitems[i])]
      }

      return newAnigrams

    }

    /****************************
   *    @enty
   */
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
