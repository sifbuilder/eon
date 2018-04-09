/*******************************************
 * 			@muonSvg
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonSvg = global.muonSvg || {})))
}(this, function (exports) {
  'use strict'

  var muonSvg = function muonSvg (__mapper = {}) {

    let mbezierjs = __mapper('xs').m('bezierjs')
    
    
    // source: https://github.com/d3/d3-array/blob/master/src/range.js  
    // license: https://github.com/d3/d3-array/blob/master/LICENSE
    let d3range = function (start, stop, step) {
      start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

      var i = -1,
          n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
          range = new Array(n);

      while (++i < n) {
        range[i] = start + i * step;
      }

      return range;
    }      
    
    
 /*******************************************
 * 			@castels
 *
 */   
 
 
    let castels = function(svgdata, frame={start:0, stop:1, step:0.33} ) {
      let pathdata  = []
      let range = d3range(frame.start, frame.stop, frame.step)

      let re = /C/      
      let str = svgdata.path.d
      let a = []
      
let rings =   str.trim().split('M')

      
    
    let ncas = []   
    for (let i=0; i<rings.length; i++) {
      
      
      let c0 = str.substring(str.lastIndexOf("M")+1,str.lastIndexOf("C")).split(',').map(Number);
      let cn = str.substring(str.lastIndexOf("C")+1,str.lastIndexOf("Z")).split(/\r?\n/)
          .map(d => d.trim())
          .map(d => d.split(' '))
          .map(d => d.map(c => c.split(',').map(Number)))
          .map( d => d.reduce( (p,q) => [...p, ...q] ,[]))  // 
      
      
      let cas = []
      cas[0] = [...c0, ...cn[0]]
      for (let i=0; i<cn.length-1; i++) {
        cas[i+1] = [ ...cn[i].slice(-2), ...cn[i+1] ]
      }
      let m = cn.length-2
      cas[m] = [ ...cn[m].slice(-2), ...cn[m+1] ] // close      
      
      ncas = [ ...ncas, ...cas ]
      
    }
 if (1 && 1) console.log("ncas", ncas.length, ncas)   
    
      // let c0 = str.substring(str.lastIndexOf("M")+1,str.lastIndexOf("C")).split(',').map(Number);
      // let cn = str.substring(str.lastIndexOf("C")+1,str.lastIndexOf("Z")).split(/\r?\n/)
          // .map(d => d.trim())
          // .map(d => d.split(' '))
          // .map(d => d.map(c => c.split(',').map(Number)))
          // .map( d => d.reduce( (p,q) => [...p, ...q] ,[]))  // 
          
      // let cas = []
      // cas[0] = [...c0, ...cn[0]]
      // for (let i=0; i<cn.length-1; i++) {
        // cas[i+1] = [ ...cn[i].slice(-2), ...cn[i+1] ]
      // }
      // let m = cn.length-2
      // cas[m] = [ ...cn[m].slice(-2), ...cn[m+1] ] // close
      
    
      // for (let i=0; i<cn.length-1; i++) {
      for (let i=0; i<ncas.length-1; i++) {
        let curve = new mbezierjs.Bezier(ncas[i])  // one cast

        let points = []
        for (let j=0; j<range.length; j++) {
          let point = Object.values(curve.compute(range[j]))  // each point in cast
          points.push(point)
        }

        pathdata = [...pathdata, ...points] // is ring or line string
        
      }      
      
      let curves = []
      curves.push(pathdata)
 
      return curves      
      
    }
 /*******************************************
 * 			@castel
 *
 */   
    let castel = function(svgdata, pathdata) {
      
      return castels (svgdata, pathdata)[0]
      
    }
    /*******************************************
	 * 			@enty
	 */
    var enty = function () {}
    
    enty.castels = castels
    enty.castel = castel
    
    return enty
  }

  exports.muonSvg = muonSvg
}))
