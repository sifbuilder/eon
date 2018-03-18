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

      let div = fourier.div,
        path = fourier.path,
        period = fourier.period,
        transform = fourier.transform

       if (1 && 1) console.log("transform", transform)


         
       
      var acc = Complex (0, 0);       
      var polyString = "0,0 ";     
     
      var n = tim.unitTime // time % period;
      var N = transform.length;       
     
      var nyquist = Math.floor (N / 2);
        
      var k = 0;
                    


      let anitems = []
      for (var i = 0; i < N; k++, i++) {

        let idx = i
        let gid = ric.gid // from ava ric
        let cid = ric.cid
        let fid = ric.fid + '_' + idx
        let _ric = {gid, cid, fid}
        let uid = mric.getuid(_ric) // uid

        let newItem = mstore.findAnigramFromUid(uid) // anigram DOES exist ??

      
      
      
      
        // if UNDEFINED
      
        if (newItem === undefined) { // if not, create new anigram

         
          var x = transform[i].re / transform.length;
          var y = transform[i].im / transform.length;
          var mag = Math.sqrt (x * x + y * y)        
        
       
        
          newItem = {}
          newItem.halo = 'ent' // halo

          newItem.geofold = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [0,0],
              },
              properties: {
                 pointRadius: mag, // d.payload.fractal.rad,

                 geonode: {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [0,0]
                  },
                  properties: { // geofold coindices with geonode

                    orgen: [0,0],
                    velin: [0, 0],
                    velang: [0, 0],
                    prevous: [0, 0],
                    geodelta: [0, 0]
                    
                  }
                },
              }
            }
            
          newItem.payload = payload // payload
          newItem.payload.uid = uid
          newItem.payload.ric = _ric
          newItem.payload.id = uid

       
           newAnigrams = [...newAnigrams, ...__mapper('xs').h('ent').gramm(newItem)]   

       } 
       

           

            var x = acc.re / N;
            var y = acc.im / N;
            
            polyString += "" + x + "," + y + " ";

            newItem.geofold.geometry.coordinates = [x, y]

            
            if (i === nyquist) {
                k -= N;
            }
            
            var coef = Complex (0, (-2) * Math.PI * k * n / period);
            acc = acc.add(coef.exp().mul(transform[i]));
   
       
       
       
       
       
       
       
       
       
       
       
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
