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
      mric = __mapper('xs').m('ric')

//md: h.fourier h.ent
//md:    h.fourier anigrams per frequency cycloid 
//md:    cycloids in payload.fourier.transform resulting from m.fourier.complexify


    /****************************
   *    @gramm
   */
    let gramm = function (anima, newAnigrams = []) {

      var acc = Complex (0, 0)

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
        transform = fourier.transform,
        maglast = fourier.maglast || 3,  // pencil radio
        interval = fourier.interval || [0,1] // fourier.period

      let t = tim.unitTime // time % period; i,[0,vertices] => t,[0,T]
      
      let t0 =  interval[0],
        t1 = interval[1],
        period = t1 - t0,
        tInPeriod = (t - t0) / period


        let anitems = []
        
        for (let j=0; j<1; j++) {
            var N = transform.length
            var nyquist = Math.floor (N / 2)
            var w = 0 // frequency associated to cycloid index (for sorted)


            let transformSorted = transform.slice() // sort transform coefs by norm
              .map( (d,i) => Object.assign(d, {w:i}))
              .sort((a,b) => Complex(b).abs() - Complex(a).abs())

            for (var i = 0; i <= N; w++, i++) { //  for each cycloid

              let idx = i
              let gid = ric.gid // from ava ric
              let cid = ric.cid
              let fid = ric.fid + '_' + idx

              let delled = (t < interval[0] || t > interval[1]) ? 1 : 0

              let _ric = {gid, cid, fid, delled}
              let uid = mric.getuid(_ric) // uid

              let newItem = f.cloneObj(anigram) // anitems h.nat
              newItem.halo = 'ent' // halo

              let x, y, mag
              if (i < N) {

                  x = transformSorted[i].re / transformSorted.length
                  y = transformSorted[i].im / transformSorted.length

                  mag = Math.sqrt (x * x + y * y) // amplitude of frequency
                  newItem.geofold.properties.pointRadius = mag

                  if (transformSorted[i].w >= nyquist) transformSorted[i].w -= N

                  var coef = Complex (0, (-2) * Math.PI * transformSorted[i].w * tInPeriod)
                  acc = acc.add(coef.exp().mul(transformSorted[i]))

              } else {  // last cycloid

                  newItem.geofold.properties.pointRadius = maglast  // pencil radio
                  newItem.payload.avatars = payload.fourier.avatars // add line pacer

              }

              x = acc.re / N  //
              y = acc.im / N  //


              newItem.payload.tim = tim
              newItem.payload.ric = _ric
              newItem.payload.uid = uid
              newItem.payload.boform = boform

              newItem.geofold.geometry.coordinates = [x, y]
              newItem.geofold.properties.geonode.geometry.coordinates = [x, y]
              newItem.geofold.properties.geonode.properties.orgen = [x, y]

              anitems[i] = newItem

            }
        
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
