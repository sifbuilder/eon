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
      mnat = __mapper('xs').m('nat'),
      mric = __mapper('xs').m('ric')

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
        
       
      let anitems = []
      for (let i = 0; i < _DEPTH; i++) {  // for LEVEL i in [0, _DEPTH)
        let newAnitem = {} // 
        
        newAnitem = f.cloneObj(anitems[i - 1] || anigram) // anitems h.nat
        
        newAnitem.halo = 'ent' // halo
        
        newAnitem.payload.ric = {gid: 'nat', cid: _NAME + i, fid: _NAME + i}
        newAnitem.payload.uid = mric.getuid(newAnitem.payload.ric)
        newAnitem.payload.id = newAnitem.payload.uid
        newAnitem.payload.boform.cf = _CF(i) // boform

        // fourier components
        newAnitem.payload.fractal.fouriercomponent = [] // 
        for (let j = 0; j < i; j++) { // for j in [0, i)
          newAnitem.payload.fractal.fouriercomponent[j] = {
              rad: fractal.radOnLevel(j) , // angOnLevel(j)
              ang: fractal.angOnLevel(j)
          }
        }

        // fourier coeficients
        newAnitem.payload.fractal.coef = d => { // fractal coef(i)
          return d.payload.fractal.fouriercomponent.reduce((p, q) => {
            return p.add(f.zcoef(q.rad, q.ang)) // q
          }, Complex({re: 0, im: 0}))
        }
        
        // set rad on fractal form
        //
        let rad = fractal.radOnLevel(i) // rad
        newAnitem.payload.fractal.rad = rad
        newAnitem.payload.form = { // FORM
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circle
            'ra2': rad, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 128, 'pa6': 0, 'pb7': -1
        }
          
        newAnitem.geofold = d => Object.assign(
          {}
          , mnat.natFeature(d.payload.form)   // nat from
          // , {type: 'Feature',geometry: {type: 'Point', coordinates: [0,0], } }
          
          , { properties:  {  // set properties from anigram payload
               pointRadius: d.payload.fractal.rad,  // applies to type Point
               
               geonode: { // geonode reflects geoform situs where created
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  
                  coordinates: Complex({re:0,im:0})
                    .add(d.payload.fractal.coef(d))
                    .toVector() // geonode returns coords to unpositioned avatar
                    
                },

                properties: { // geofold coindices with geonode
                  orgen: [0,0], velin: [0, 0],velang: [0, 0],prevous: [0, 0],geodelta: [0, 0]
                }
              },
            }
          }
          
        ) 
 
        // ///
        //  add avatar to last cycloid
        //
        if (i === _DEPTH - 1) { // add avatars to last ani fractal
        
          newAnitem.payload.avatars = newAnitem.payload.fractal.avatars
          
        }        
        
        
        anitems[i] = newAnitem
        
      }
      
      for (let i=0; i<anitems.length; i++) {  // ent will ereform, proform
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
