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




  let featurize = function(json, interval) {

        // return on rgj
        // let json = transform
        let tfeatures = []
        if (json.type == 'Feature') {
          let geometry = json.geometry
          if (geometry !== null) coords = [...coords, ...getCoords(geometry)]
        } else if (json.type == 'FeatureCollection') {
          for (let feature_num = 0; feature_num < json.features.length; feature_num++) {
            let feature = json.features[feature_num]
            getCoords(feature, coords)
          }
        } else if (json.type == 'GeometryCollection') {
          for (let geom_num = 0; geom_num < json.coords.length; geom_num++) {
            let geometry = json.coords[geom_num]
            coords.push(geometry)
          }
        } else if (json.type === 'Point') {
          let geometry = json
          coords = [...coords, geometry.coordinates]  // if Point, return array

        } else if (json.type === 'LineString') {

          let tfeature = {
            type: 'Feature',
            geometry: {type: 'LineString',coordinates: json.coordinates},
            properties: {interval: interval}
          }
          tfeatures.push(tfeature)


        } else if (json.type === 'MultiPoint') {
          let geometry = json
          coords.push(geometry)


        } else if (json.type === 'Polygon') {

          let rings = json.coordinates
          for (let i=0; i<rings.length; i++) {
            let line = rings[i]

            let tfeature = {
              type: 'Feature',
              geometry: {type: 'LineString',coordinates: line},
              properties: {interval: interval}
            }
            tfeatures.push(tfeature)
          }

        } else if (json.type === 'MultiLineString') {

          let lines = json.coordinates
          for (let i=0; i<lines.length; i++) {
            let line = lines[i]

            let tfeature = {
              type: 'Feature',
              geometry: {type: 'LineString',coordinates: line},
              properties: {interval: interval}
            }
            tfeatures.push(tfeature)
          }



        } else if (json.type === 'MultiPolygon') {
          
          let polygons = json.coordinates
          for (let i=0; i<polygons.length; i++) {
            let polygon = polygons[i]

            let tfeature = {
              type: 'Feature',
              // geometry: {type: 'Polygon',coordinates: polygon},
              geometry: {type: 'LineString',coordinates: polygon[0]},
              properties: {interval: interval}
            }
            tfeatures.push(tfeature)
          }
          
        } else if (json.type === 'Sphere') {
            let geometry = json
            coords.push(geometry)
        } else {
          throw new Error('json type not identified.')
        }

        return tfeatures
  }


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


      let tfeatures = featurize(transform, interval)


        let anitems = []
        for (let j=0; j<tfeatures.length; j++) {  // FOR EACH FEATURE in time

            var acc = Complex (0, 0)  
              
            let tfeature = tfeatures[j]
            transform = tfeature.geometry.coordinates //

            var N = transform.length
            var nyquist = Math.floor (N / 2)
            var w = 0 // frequency associated to cycloid index (for sorted)


            let transformSorted = transform.slice() // sort transform coefs by norm
              .map( (d,i) => Object.assign(d, {w:i})) // frequency on index
              .filter(d => Complex(d).abs() > 0.1)
              .sort((a,b) => Complex(b).abs() - Complex(a).abs())
            let M = transformSorted.length

            let xn = [], yn = [], magn = [], iAnitems = []
            for (let i = 0; i <= M; i++) { //  FOR EACH ITEM in space

              let gid = ric.gid // from ava ric
              let cid = ric.cid
              let fid = ric.fid + '_' + j + '_' + i // fid(j, i)
              let delled = (t < interval[0] || t > interval[1]) ? 1 : 0

              let _ric = {gid, cid, fid, delled}
              let uid = mric.getuid(_ric) // uid

              let newItem = f.cloneObj(anigram) // anitems h.nat
              newItem.halo = 'ent' // halo


              if (i < M) { // for each cycloid

                if (transformSorted[i].w >= nyquist) transformSorted[i].w -= N  // nyquist
                let phase = Complex (0, (2) * Math.PI * transformSorted[i].w * tInPeriod) 
                                          // The sinusoid's frequency is w cycles per N samples
                let unitRoot = phase.exp() // complex sinusoidal component e^i2[pi]w[i]n/N 
                let ci = unitRoot.mul(transformSorted[i]) // Xi * root(i)
                acc = acc.add(ci) // add component



                // sinusoid amplitude
                xn[i] = transformSorted[i].re
                yn[i] = transformSorted[i].im
                magn[i] = Math.sqrt (xn[i] * xn[i] + yn[i]* yn[i]) // amplitude of frequency
                newItem.geofold.properties.pointRadius = magn[i] / N

                if (i > 0) {  // add ray avatar 
                
                
                    let avaLine = f.cloneObj(payload.fourier.avatars.line)
                    avaLine.geofold.geometry.coordinates = [
                        [acc.re / N, acc.im / N],   // from this cycloid
                        [xn[i-1], yn[i-1]]          // to prevous cycloid
                    ]                 
                    avaLine.payload.ric.fid += '_' + j + '_' + i
                    
                    
                    newItem.payload.avatars = Array.of(avaLine)
                }
              
              
              }
              
              xn[i] = acc.re / N  // averate the summatory
              yn[i] = acc.im / N
              
             if (i === M) {   // after last sinusoid

                newItem.geofold.properties.pointRadius = maglast  // pencil radio
                let a = f.cloneObj(payload.fourier.avatars.fourierPacer)
                if (a) {  // if pacer avatar
                  let gid = a.payload.ric.gid // from ava ric
                  let cid = a.payload.ric.cid
                  let fid = a.payload.ric.fid + '_' + j + '_' + i
                  let _ric = {gid, cid, fid}
                  let uid = mric.getuid(_ric)
                  a.payload.ric  = _ric
                  a.payload.uid  = uid
                  a.payload.boform  = payload.fourier.dotboform
                  newItem.payload.avatars = Array.of(a)
                }
              }


              newItem.payload.tim = tim
              newItem.payload.ric = _ric
              newItem.payload.uid = uid
              newItem.payload.boform = boform

              newItem.geofold.geometry.coordinates = [xn[i], yn[i]]
              newItem.geofold.properties.geonode.geometry.coordinates = [xn[i], yn[i]]
              newItem.geofold.properties.geonode.properties.orgen = [xn[i], yn[i]]

              iAnitems[i] = newItem

            }

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
