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
      turn = 2 * Math.PI,
      tau = 2 * Math.PI

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
        rad0 = fractal.rad0 || 90,
        pencilRadious = fractal.pencilRadious || 3

      let t = tim.unitPassed // unitElapsed

      let fractalZcoef = fractal.zcoef ||  function (idx, arr) { return Complex ({
                    re: arr[idx].rad * Math.cos(arr[idx].ang),
                    im: arr[idx].rad * Math.sin(arr[idx].ang)
      }) }

      let fractalRad = fractal.rad ||  function (idx, arr) { return rad0 / Math.pow(2, idx) }
      let fractalAng = fractal.ang ||  function (idx, arr)  { return (level===0) ?
                      [[[ 0, tau * 1 ]]] :      // begin phase
                      [[[ 0, (-1)**(idx) * (sides-1)**(idx) * tau * 1]]] }
      let fractalDelta = fractal.zdelta ||  function (idx, arr) { return Complex({re: 0,im: 0}) }

      let anitems = []

      let fouriercomponents = [] //  fourier components [0,level-1]
      for (let j = 0; j < level; j++) { // for j in [0, i)

        let rad = msnap(fractalRad(j,rad0), t)  // amp time dependent
        let ang = msnap(fractalAng(j, sides), t)   // phase time dependent

        fouriercomponents[j] = {rad , ang }
      }

      
      //md: define cycloids aggregate components [0,level]
      for (let i = 0; i <= level; i++) {  // for LEVEL i in [0, level-1]
        let newAnitem = f.cloneObj(anitems[i - 1] || anigram) // anitems h.nat
 
        newAnitem.halo = 'ent' // halo
        newAnitem.payload = newAnitem.payload || {}
        newAnitem.payload.avatars = newAnitem.payload.avatars || []
         
        
          let ric = f.clone(anigram.payload.ric)
          if (ric.fid !== undefined) { // ric.fid = ric.fid
          } else if (fider !== undefined) { ric.fid = fider(ric.fid, i)
          } else if (name !== undefined) { ric.fid = name + '_' + i
          } else { ric.fid = 'fractal' + '_' + i
          }
        newAnitem.payload.ric = ric // ric
        newAnitem.payload.uid = mric.getuid(newAnitem.payload.ric)  // uid
        newAnitem.payload.id = newAnitem.payload.uid // id

        if (cfi !== undefined) newAnitem.payload.boform.cf = cfi(i) // boform

     
        
        let coef = Complex({re: 0, im: 0})  // location
          for (let k=0; k<i; k++) {
            
            coef = coef.add(fractalZcoef(k, fouriercomponents))

          }
        let sinusLocation =  coef.toVector()  // location
        let sinusRad = fractalRad(i,rad0) // rad on fractal form
  

  
        newAnitem.geofold = {
              type: 'Feature',
              geometry: {type: 'Point', coordinates: sinusLocation, },
              properties:  {  // set properties from anigram payload
               pointRadius: sinusRad,  // applies to type Point
               geonode: {
                type: 'Feature',
                geometry: {type: 'Point',coordinates: [0,0]},
                properties: {
                  orgen: [0,0], velin: [0, 0],velang: [0, 0],prevous: [0, 0],geodelta: [0, 0]
                }
              }
            }
          }

          
          

       if (i === level) { // add trace avatars to pencil

          if (newAnitem.payload.fractal.traceLine !== undefined) {
            newAnitem.payload.avatars.push(newAnitem.payload.fractal.traceLine)
          }
          newAnitem.geofold.properties.pointRadius = pencilRadious
          
        }


        anitems[i] = newAnitem

      }

          
      if (fractal.rayLine !== undefined) {
          for (let i = 0; i < level; i++) {
          
            let newAnitem = anitems[i]
            
            let rayLine = f.clone(fractal.rayLine)
              let ric = f.clone(rayLine.payload.ric)
              if (ric.fid !== undefined) { // ric.fid = ric.fid
              } else if (fider !== undefined) { ric.fid = fider(ric.fid, i)
              } else if (name !== undefined) { ric.fid = name + '_' + i
              } else { ric.fid = 'fractal' + '_' + i
              }
            rayLine.payload.ric = ric // ric
            rayLine.payload.uid = mric.getuid(newAnitem.payload.ric)  // uid
            rayLine.payload.id = rayLine.payload.uid // id
           
            rayLine.geofold.geometry.coordinates = [
              anitems[i].geofold.geometry.coordinates,
              anitems[i+1].geofold.geometry.coordinates,
            ]

            
            anitems[i].payload.avatars.push(rayLine)
            

        }
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
