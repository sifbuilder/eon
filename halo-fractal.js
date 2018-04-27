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
      mric = __mapper('xs').m('ric'),
      msnap = __mapper('xs').m('snap')

    let r = __mapper('xs').r('renderport'),
      width = r.width(),
      height = r.height()

    const pi = Math.PI, pi2 = 2 * pi,
      turn = 2 * Math.PI // 360
      
    /****************************
   *    @gramm
   */
    let gramm = function (anima, newAnigrams = []) {

      let anigram = manitem(anima).anigram(), // anigram
        halo = anigram.halo, // halo
        geofold = anigram.geofold // geofold
      
      let payload = anigram.payload, // payload
        tim = payload.tim,
        fractal = payload.fractal
      
      let name = fractal.name,
        fider = fractal.fider,
        level = Math.floor(fractal.level) || 2, // level
        cfi = fractal.cf, // cf color onlevel
        sides = fractal.sides || 5,
        rad0 = fractal.rad0 || 90
        
      
      let t = tim.unitPassed // unitElapsed  
    
      let anitems = []
      for (let i = 0; i < level; i++) {  // for LEVEL i in [0, level)
        let newAnitem = {}
        
        newAnitem = f.cloneObj(anitems[i - 1] || anigram) // anitems h.nat
        
        newAnitem.halo = 'ent' // halo
        
        
        // let ric = f.clone(newAnitem.payload.ric)
        // if (ric.fid !== undefined) {
        // } else if (fider !== undefined) {
          // ric.fid = fider(ric.fid, i)
        // } else {
          // ric.fid = name + '_' + i
        // }
        // newAnitem.payload.ric = ric
        
        newAnitem.payload.ric = {gid:'fractal', cid:'fractal', fid:'fractal' + i }
        newAnitem.payload.uid = mric.getuid(newAnitem.payload.ric)
        newAnitem.payload.id = newAnitem.payload.uid
        
        if (cfi !== undefined) newAnitem.payload.boform.cf = cfi(i) // boform

        newAnitem.payload.fractal.fouriercomponent = [] //  fourier components
        for (let j = 0; j < i; j++) { // for j in [0, i)
        
          let radj = fractal.rad(j,rad0)
          let angt = fractal.ang(j, sides)
          let angj = msnap(angt, t)
  if (1 && 1) console.log("t", t, tim)  

        
        
          newAnitem.payload.fractal.fouriercomponent[j] = {
              rad: radj , // angOnLevel(j)
              ang: angj
          }
        }
        if (0 && 1) console.log("fouriercomponent", i, newAnitem.payload.fractal.fouriercomponent)
        newAnitem.payload.fractal.coef = d => { // fourier  coef(i)
          return d.payload.fractal.fouriercomponent.reduce((p, q) => {
            return p.add(f.zcoef(q.rad, q.ang)) // q
          }, Complex({re: 0, im: 0}))
        }
        
        newAnitem.payload.fractal.rad = fractal.rad(i,rad0) // rad on fractal form
          
        
        let sinusLocation =  Complex({re: 0, im: 0})
              .add(newAnitem.payload.fractal.coef(newAnitem))  // set on zcoef = (rad, ang)
              .toVector()        
          
        newAnitem.geofold = d => Object.assign(
          {
              type: 'Feature',
              geometry: {
                type: 'Point', 
                coordinates: sinusLocation, 
              }
             },
             { properties:  {  // set properties from anigram payload
               pointRadius: d.payload.fractal.rad,  // applies to type Point
               
               geonode: { // geonode reflects geoform situs where created
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  
                  coordinates: [0,0] // geonode returns coords to unpositioned avatar
                    
                },

                properties: { // geofold coindices with geonode
                  orgen: [0,0], velin: [0, 0],velang: [0, 0],prevous: [0, 0],geodelta: [0, 0]
                }
              },
            }
          }
          
        ) 
 
        if (i === level - 1) { // add avatars to last cycloid
        
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
