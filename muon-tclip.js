/***********
 *    @muonTclip
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonTclip = global.muonTclip || {})))
}(this, function (exports) {
  'use strict'

  // ref: https://bl.ocks.org/maartenzam/ec11de22bc8e5608a98f207f1c09bdb6

  let muonTclip = function muonTclip (__mapper = {}) {
    let f = __mapper('props')()

    // https://github.com/mapbox/geojson-normalize/blob/master/index.js
    let types = {
      Point: 'geometry',
      MultiPoint: 'geometry',
      LineString: 'geometry',
      MultiLineString: 'geometry',
      Polygon: 'geometry',
      MultiPolygon: 'geometry',
      GeometryCollection: 'geometry',
      Feature: 'feature',
      FeatureCollection: 'featurecollection'
    }

     
    /**********************
   *    @tclip
   */

    let tclip = function (gj, t=1, interval=[0,1]) {
      let ret = gj
      
      let t0 =  interval[0],
        t1 = interval[1],
        period = t1 - t0,
        tInPeriod = (t - t0) / period      
      
      if (t < interval[0] || t > interval[1]) {
        
          ret = []  // return empty set
        
      } else if (tInPeriod === 1) { // return geojson
      } else if (gj.type && gj.type === 'Point') {
        
        
        ret = gj    // in period
        
      } else if (gj.type && gj.type === 'MultiPoint') {
      } else if (gj.type && gj.type === 'LineString') {
      } else if (gj.type && gj.type === 'MultiLineString') {
      } else if (gj.type && gj.type === 'Polygon') {
          
        let ngj = { type: 'Polygon', coordinates: [] } // return polygon
        
        let rings = gj.coordinates // coords is rings array
        let tnb = rings.reduce( (p,q) => p += q.length, 0) 
        let nb = Math.floor(tnb * tInPeriod)
        
        let outrings = []
        let n = 0
        for (let i=0; i<rings.length; i++) {
            let ring = rings[i]
            let ringLength = ring.length

            if (n + ringLength < nb) {    // if ring in scope
                ngj.coordinates.push(ring)
                n += ringLength
                
            } else {    // complement with part of next ring
                let tmpring = ring.slice(0, nb-n)
                ngj.coordinates.push(tmpring)
                n += (nb-n)
                break
            }

        }        
            
        ret = ngj

        
        
      } else if (gj.type && gj.type === 'MultiPolygon') {
      } else if (gj.type && gj.type === 'GeometryCollection') {
      } else if (gj.type && gj.type === 'Feature') {
        
        
        
       
                     
        
        
      } else if (gj.type && gj.type === 'FeatureCollection') {
      }
      
      
      return ret
      
    }      
    



    /**********************
   *    @enty
   */
    let enty = function () {}

    // enty.resample = resample
    enty.tclip = tclip
    // enty.trim = trim
    // enty.deprop = deprop
    // enty.snip = snip
    // enty.largestPoly = largestPoly
    // enty.lineStringFromStream = lineStringFromStream
    // enty.polygonFromStream = polygonFromStream
    // enty.multLineStringFromStreamArray = multLineStringFromStreamArray
    // enty.featurecollect = featurecollect
    // enty.featurize = featurize
    // enty.zorder = zorder
    // enty.centroid = centroid
    // enty.getCoords = getCoords // get coordinates, eg from parent
    // enty.isValid = isValid // si valid geojson

    return enty
  }

  exports.muonTclip = muonTclip
}))
