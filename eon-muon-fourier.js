/***********
 *    @muonFourier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonFourier = global.muonFourier || {})))
}(this, function (exports) {
  'use strict'

  // https://raw.githubusercontent.com/andymac-2/fourier-polygon/master/fourier-polygon.js
  // https://github.com/andymac-2/fourier-polygon
  // (C) 2018 Andrew Pritchard (MIT License)
  // https://www.youtube.com/watch?v=2hfoX51f6sg

  // ... m.fourier : fourier transform
  async function muonFourier (__eo = {}) {
    let [
      muonGeoj,
      lcomplex,
    ] = await Promise.all([
      __eo('xs').m('geoj'),
      __eo('xs').l('complex'),
    ])

    let Complex = lcomplex

    // fourierTransform
    var fourierTransformObjectType = {
      Feature: function (object) {
        return fourierTransformGeometry(object.geometry)
      },
      FeatureCollection: function (object) {
        var features = object.features

        let ret = object
        ret.features = features.map(feature => fourierTransformGeometry(feature.geometry))
        return ret
      },
    }

    var fourierTransformGeometryType = {
      Sphere: function () {
        // return true;
      },
      Point: function (object) {
        return fourierTransformPoint(object.coordinates)
      },
      MultiPoint: function (object) {
        var coordinates = object.coordinates.map(coords => fourierTransformPoint(coords))
        let ret = object
        ret.coordinates = coordinates
        return ret
      },
      LineString: function (object) {
        let ret = object
        ret.coordinates = fourierTransformLine(object.coordinates)
        return ret
      },
      MultiLineString: function (object) {
        var coordinates = object.coordinates

        let ret = object
        ret.coordinates = coordinates.map(line => fourierTransformLine(line))
        return ret
      },
      Polygon: function (object) {
        var coordinates = object.coordinates

        let ret = object
        ret.coordinates = coordinates.map(line => fourierTransformLine(line))
        return ret
      },
      MultiPolygon: function (object) {
        var polygons = object.coordinates.map(
          polygon => polygon.map(
            ring => fourierTransformLine(ring)))

        let ret = object
        ret.coordinates = polygons
        return ret
      },
      GeometryCollection: function (object) {
        var geometries = object.geometries.map(
          geometry => fourierTransformGeometry(geometry))
        return geometries
      },
    }

    function fourierTransformGeometry (geometry) {
      return geometry && fourierTransformGeometryType.hasOwnProperty(geometry.type)
        ? fourierTransformGeometryType[geometry.type](geometry)
        : false
    }

    function fourierTransform (object) {
      return (object && fourierTransformObjectType.hasOwnProperty(object.type)
        ? fourierTransformObjectType[object.type]
        : fourierTransformGeometry)(object)
    }

    function fourierTransformPoint (coordinates) {
      // return Complex(coordinates[0], coordinates[1])
    }

    function fourierTransformLine (coordinates) {
      let ret = []
      let N = coordinates.length // N coefficients
      for (let k = 0; k < N; k++) { // k coefficient
        let q = Complex(0, 0)
        for (let n = 0; n < N; n++) { // each is sum of integrals
          let coef = Complex(0, (-2) * Math.PI * k * n / N)
          let ck = coef.exp().mul(coordinates[n]) // x[n].e^-i2[pi]kn/N
          q = q.add(ck) // sum n component
        }
        ret.push(q)
      }
      return ret
    }

    // ... m.fourier.transformedCoefs : get fourier transform coefficients
    // ...    transformedCoefs(geojson)
    // ...    return geojson
    let transformedCoefs = function (gj) {
      let gjc = muonGeoj.complexify(gj)
      return fourierTransform(gjc)
    }

    // ............................. enty
    let enty = () => {}
    enty.transformedCoefs = transformedCoefs
    return enty
  }

  exports.muonFourier = muonFourier
}))
