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

    /****************************
   *    @gramm
   */
    let gramm = function (anima, newAnigrams = []) {


      let anigram = manitem(anima).anigram(), // anigram
        halo = anigram.halo, // halo
        geofold = anigram.geofold // geofold

      let payload = anigram.payload, // payload
        ric = payload.ric, // ric
        tim = payload.tim, // tim
        parentuid = payload.parentuid, // parentuid
        fourier = payload.fourier

      let path = fourier.path,
        period = 1, // fourier.period,
        transform = fourier.transform

      var acc = Complex (0, 0)

      // i,[0,vertices] => t,[0,T]

      var t = tim.unitTime // time % period;
      var N = transform.length
      var nyquist = Math.floor (N / 2)
      var w = 0

      // ///
      // // 
      let transformSorted = transform.slice()
        .map( (d,i) => Object.assign(d, {w:i}))
        .sort((a,b) => Complex(b).abs() - Complex(a).abs())
      
      let anitems = []

      // ///
      //  for each cycloid
      // //
      for (var i = 0; i <= N; w++, i++) {

        let newItem = anitems[i]


        let idx = i
        let gid = ric.gid // from ava ric
        let cid = ric.cid
        let fid = ric.fid + '_' + idx
        let _ric = {gid, cid, fid}
        let uid = mric.getuid(_ric) // uid

        let preitem = mstore.findAnigramFromUid(uid) // anigram DOES exist ??
        newItem = f.cloneObj(anigram) // anitems h.nat
        newItem.halo = 'ent' // halo


        let x, y, mag
        if (i < N) {

            // x = transform[i].re / transform.length
            // y = transform[i].im / transform.length
            x = transformSorted[i].re / transformSorted.length
            y = transformSorted[i].im / transformSorted.length

            mag = Math.sqrt (x * x + y * y)
            newItem.geofold.properties.pointRadius = mag

            x = acc.re / N
            y = acc.im / N


            // if (i === nyquist) { w -= N }
            if (transformSorted[i].w >= nyquist) {
                transformSorted[i].w -= N
            } 


            // var coef = Complex (0, (-2) * Math.PI * w * t / period)
            // acc = acc.add(coef.exp().mul(transform[i]))
            var coef = Complex (0, (-2) * Math.PI * transformSorted[i].w * t / period)
            acc = acc.add(coef.exp().mul(transformSorted[i]))

        } else {

            x = acc.re / N
            y = acc.im / N

            mag = 3
            newItem.geofold.properties.pointRadius = mag
            newItem.payload.avatars = payload.fourier.avatars

        }

        newItem.payload.tim = tim
        newItem.payload.ric = _ric
        newItem.payload.uid = uid

        newItem.geofold.geometry.coordinates = [x, y]
        newItem.geofold.properties.geonode.geometry.coordinates = [x, y]
        newItem.geofold.properties.geonode.properties.orgen = [x, y]

        anitems[i] = newItem

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
