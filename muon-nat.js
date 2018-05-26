/***************************
 *        @muonNat
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonNat = global.muonNat || {})))
}(this, function (exports) {
  'use strict'

  // md: # md:{filename}
  // md: **returns nat mesh**
  // md:
  // md: ### properties
  // md:
  // md: ### methods
  // md: natFeature
  // md: `coordinates = Array.of(__mapper("xs").m("nat").natFeature(p.form))`
  // md:
  // md: natNform
  // md:  compleate form for natform
  // md:
  // md: # license
  // md: MIT   
  
  let muonNat = function muonNat (__mapper = {}) {
    let f = __mapper('props')(),
      mlacer = __mapper('xs').m('lacer'),
      mgraticule = __mapper('xs').m('graticule'),
      mprofier = __mapper('xs').m('profier'),
      mproj3ct = __mapper('xs').m('proj3ct')

    let cache = {} // feature, form

    const cos = Math.cos, sin = Math.sin,
      neg = x => x < 0 || (x === 0 && (1 / x < 0)),
      pos = x => x > 0 || (x === 0 && (1 / x > 0)),
      radians = Math.PI / 180,
      degrees = 180 / Math.PI,
      tau = 2 * Math.PI

  // ............................. natNform
    let natNform = function (form, nformed = {}) {
      let defs = {'v0': 0, 'v1': 1, 'ra2': 120, 'w4': 0, 'seg5': 360, 'pa6': 0, 'pb7': -1} // defs

      if (form && typeof form === 'object' && // {nat}
            (form.x === undefined && form.y === undefined && form.z === undefined)) {

        nformed.x = Object.assign({}, defs, form)
        nformed.y = Object.assign({}, defs, form)
        
      } else if (form && typeof form === 'object' && // {x,y}
            (form.x !== undefined && form.y !== undefined)) {
        nformed.x = Object.assign({}, defs, form.x)

        nformed.y = Object.assign({}, defs, form.y)

        if (form.z !== undefined && form.r !== undefined) { // {x,y,z,r}
          nformed.z = Object.assign({}, defs, form.z)

          nformed.r = form.r
          
        } else if (form.z !== undefined && form.r === undefined) { // {x,y,z}
        
          nformed.z = Object.assign({}, defs, form.z)

          nformed.r = Object.assign({}, defs)
          
        }
      } else if (form && typeof form === 'object' && // form:{x:obj}
            (form.x !== undefined && form.y === undefined)) {
        nformed.x = Object.assign({}, defs, form.x)

        nformed.y = Object.assign({}, defs, (form.y || form.x))

        if (form.z !== undefined && form.r !== undefined) { // {x,y,z,r}
          nformed.z = form.z
          nformed.r = form.r
        } else if (form.z !== undefined && form.r === undefined) { // {x,y,z}
          nformed.z = Object.assign({}, defs, form.z)

          nformed.r = Object.assign({}, defs, form.z)
        }
      } else if (form && Array.isArray(form)) { // [x,y]
        nformed.x = form[0]
        nformed.y = form[1] || Object.assign({}, defs, form[0])

        if (form[2] !== undefined && form[3] !== undefined) { // [x,y,z,r]
          nformed.z = form[2]
          nformed.r = form[3]
        } else if (form[2] !== undefined && form[3] === undefined) { // [x,y,z]
          nformed.z = Object.assign({}, defs, form[2])
          nformed.r = Object.assign({}, defs, form[2])
        }
      }

      let formkeys = Object.keys(nformed)
      for (let i = 0; i < formkeys.length; i++) {
        let key = formkeys[i]
        let form = nformed[key]

        // dom3 --- axis domain
        if (i === 0 && form.dom3 === undefined) form.dom3 = [-180, 180]
        if (i === 1 && form.dom3 === undefined) form.dom3 = [-180, 180]
        if (i === 2 && form.dom3 === undefined) form.dom3 = [-90, 90]
        if (i === 3 && form.dom3 === undefined) form.dom3 = [-90, 90]


        // fn0 --- dimension function
        if (i === 0 && form.fn0 === undefined) form.fn0 = (r,s,u,v, a,b,c=1,d=1) => a * cos(r) * c * cos(u)
        if (i === 1 && form.fn0 === undefined) form.fn0 = (r,s,u,v, a,b,c=1,d=1) => b * sin(r) * c * cos(u)
        if (i === 2 && form.fn0 === undefined) form.fn0 = (r,s,u,v, a,b,c=1,d=1) =>              d * sin(v)
        if (i === 3 && form.fn0 === undefined) form.fn0 = (r,s,u,v, a,b,c=1,d=1) =>              c * cos(u)
      }
   
      return nformed
    }


  // ............................. natFeature
    let natFeature = function (form) {
      
      let feature
  
      if (f.isSame(form, cache.form)) {
        
        feature = cache.feature
        
      } else {  
    

              let nformed = natNform(form) // NFORM

              let geometry
              let dx, dy, sx, sy

              if (Object.keys(nformed).length > 2) { // 3d
                dx = 360 / nformed.x.seg5 // x
                dy = 360 / nformed.z.seg5 // z
                sx = dx
                sy = dy

                
                let graticule = {frame: [ [ [-180, 180, sx, dx], [-90, 90, sy, dy] ] ]} // x, y
                
                
                geometry = mgraticule.gedges(graticule).geometry
                
                
              } else { // 2d
              
                dx = 360 / nformed.x.seg5 // x
                dy = 360 / nformed.y.seg5 // y
                sx = 360
                sy = 360
                
                // _e_
                let graticule = {frame: [ [ [-180, 180, sx, dx], [-180, 180, sy, dy] ] ]} // x, y
                geometry = mgraticule.gedges(graticule).geometry // geometry.type: MultiLineString
                
                let p = geometry.coordinates[1].slice(0, -1)
                
                // p = [...p, p[0]]  // close

                geometry.coordinates = Array.of(p)
              }



              let gj = {
                type: 'Feature',
                geometry: geometry,
                properties: {
                  doc: 'nat',
                  geonode: {
                    type: 'Feature',
                    geometry: {type: 'Point',coordinates: [0, 0, 0]},
                    properties: {
                      orgen: [0, 0, 0],velin: [0, 0, 0],velang: [0, 0, 0],prevous: [0, 0, 0],geodelta: [0, 0, 0]
                    }
                  }
                }
              }

              let projection = mprofier.formion({
                    projection: 'natform', 
                    form: nformed
              })

              feature = mproj3ct(gj, projection)

         cache.form = form
         cache.feature = feature  

         
      }               
      
      return feature
    }
    
 

  // ............................. closeFeature
    let closeFeature = function (feature) {
      if (1 && 1) console.log('feature', feature)

      let newFeature = Object.assign({},feature)
      if (feature.type === 'Feature' && feature.geometry.type === 'MultiLineString') {
        
        newFeature.geometry.type = 'Polygon'
        newFeature.geometry.coordinates = newFeature.geometry.coordinates.map(line => [...line, line[0]])
        
      } else if (feature.type === 'Feature' && feature.geometry.type === 'LineString') {
        
        newFeature.geometry.type = 'Polygon'
        let line = newFeature.geometry.coordinates
        let closedline = [...line, line[0]]
        newFeature.geometry.coordinates = Array.of(closedline)
        
      }
      
      return newFeature
    }   
    
  // ............................. enty
    let enty = function () {}

    enty.natFeature = natFeature
    enty.natNform = natNform
    enty.closeFeature = closeFeature

    return enty
  }

  exports.muonNat = muonNat
}))
