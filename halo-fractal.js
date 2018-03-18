/****************************
 *      @haloFractal
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.haloFractal = global.haloFractal || {})))
}(this, function (exports) {
  'use strict'

  let haloFractal = function haloFractal (__mapper = {}) {
    let f = __mapper('props')(),
      manitem = __mapper('xs').m('anitem'),
      mnat = __mapper('xs').m('nat')

    let r = __mapper('xs').r('renderport'),
      width = r.width(),
      height = r.height()

  const pi = Math.PI, pi2 = 2 * pi,
      turn = 2 * Math.PI // 360

      
    /****************************
   *    @gramm
   */
    let gramm = function (anima, newAnigrams = []) {

      let anigram = manitem(anima).anigram() // anigram
      let fractal = anigram.payload.fractal
      
      let _NAME = fractal.name || 'anitems',
        _DEPTH = fractal.depth || 2,
        _CF = fractal.cf || (d => 222 * 1), // cf color onlevel
        _SIDES = fractal.sides || 5,
        _RAD = fractal.rad || 90
        
        
        
      let radOnLevel = d => (d === 0) ? _RAD : _RAD / (Math.pow(2, d)) // rad(level)
      let zcoef = (rad, ang) => Complex({ re: rad * Math.cos(ang), im: rad * Math.sin(ang) })      
      
      
      
      let anitems = []
      
      // ///
      //  for each level
      // //
      for (let i = 0; i < _DEPTH; i++) {
        let newAnitem = anitems[i]
        
        newAnitem = f.cloneObj(anitems[i - 1] || anigram) // anitems h.nat
        newAnitem.halo = 'ent' // halo
        
        newAnitem.payload.ric = {gid: 'nat', cid: _NAME + i, fid: _NAME + i}
        newAnitem.payload.fractal.an = [] // [0..._DEPTH)
        for (let j = 0; j < i; j++) {
          
          let ang = fractal.angOnLevel(j) 

          let rad = fractal.radOnLevel(j)
          
          newAnitem.payload.fractal.an[j] = {rad, ang}
          
        }

        newAnitem.payload.fractal.coef = d => { // fractal coef(i)
          let z = d.payload.fractal.an.reduce((p, q) => {
            let aj = zcoef(q.rad, q.ang) // q
            return p.add(aj)
          }, Complex({re: 0, im: 0}))
          return z
        }
        newAnitem.payload.fractal.rad = radOnLevel(i) // rad
        newAnitem.payload.boform.cf = _CF(i) // boform
        if (i === _DEPTH - 1) { // add avatars to last ani fractal
          newAnitem.payload.avatars = newAnitem.payload.fractal.avatars
        }
        
        newAnitem.geofold = d => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              
              // ///
              // the geoform coincides with te geonode
              // //
              coordinates: [0,0],
            },
            properties: {
               pointRadius: d.payload.fractal.rad,
               
               // ///
               // the geonode reflects the geoform situs where it is created
               // the geonode returns the coordinates to unpositioned avatar
               // //
               geonode: {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: Complex({re:0,im:0})
                    .add(
                    
                      d.payload.fractal.coef(d)
                      
                    )
                    .toVector()
                },
                properties: { // geofold coindices with geonode
                
                
               // ///
               // the geonode is affected by forces
               // maintains original situs
               // //                
                  orgen: Complex({re:0,im:0})
                    .add(
                    
                      d.payload.fractal.coef(d)
                      
                    )
                    .toVector(),
                  velin: [0, 0],
                  velang: [0, 0],
                  prevous: [0, 0],
                  geodelta: [0, 0]
                }
              },
            }
          })
        
        anitems[i] = newAnitem
        
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

    let haloFractal = {}
    haloFractal.ween = anima => haloNat_ween(anima)
    haloFractal.gramm = anima => {
      let r = haloNat_gramm(anima)
      return r
    }

    let enty = haloFractal

    return enty
  }

  exports.haloFractal = haloFractal
}))
