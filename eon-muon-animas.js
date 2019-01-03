/******************************************
  *       @muonAnimas
  *
  **/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonAnimas = global.muonAnimas || {})))
}(this, function (exports) {
  'use strict'

  async function muonAnimas (__mapper) {
    let animas = {}

    animas.asterisk = {
      'm1': 12, 'm2': 12, 'n1': 0.3, 'n2': 0, 'n3': 10, 'a': 1, 'b': 1,
      'ra2': 160,
      'w4': 0,
      'seg5': 360,
      'pa6': 0, 'pb7': -1,
      'v0': 0, 'v1': 1,
      'cf': 940, 'cs': 540, 'cw': 0.5, 'co': 1,
      'tx': 360, 'ty': 185,
    }

    animas.circle = {
      'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1,
      'w4': 0,
      'ra2': 160,
    }
    animas.drop2 = {
      't0': 0, 'td': 1000, 't1': 1000, 't2': 100,
      'cid': 'drop2',
      'm1': [[[1.5, 8]]], 'm2': [[[1.5, 8]]], 'n1': [[[0.5, 0.95]]], 'n2': [[[0.5, 0.5]]], 'n3': [[[0.5, 0.5]]], 'a': 1, 'b': 0.1,
      'tx': [[[235, 390]]], 'ty': [[[150, 310]]],
      'w4': 0, 'ra2': [[[180, 80]]], 'seg5': 360,
      'cf': [[[550, 900]]],
    }
    animas.egg1 = { 'm1': -1.47, 'm2': -7.9, 'n1': 0.36, 'n2': -6.79, 'n3': 10.3, 'a': -4.92, 'b': -7.64 }
    animas.egg2 = { 'm1': -0.56, 'm2': -5.95, 'n1': 4.5, 'n2': 2.41, 'n3': 2.98, 'a': -13.25, 'b': 11.67 }
    animas.egg3 = { 'm1': 0.81, 'm2': 5.42, 'n1': -0.98, 'n2': -3.57, 'n3': 11.18, 'a': 14.43, 'b': -19.17 }
    animas.egg4 = { 'm1': -1.74, 'm2': 1.57, 'n1': 1.7, 'n2': -19.58, 'n3': 13.55, 'a': 3.02, 'b': -0.9 }
    animas.fly = {
      'cid': 'fly',
      'm1': 10.07, 'm2': 13.45, 'n1': 0.75, 'n2': 0.32, 'n3': 10, 'a': 1, 'b': 1,
      'pa6': 0, 'pb7': -1,
      'cf': 0,
      'tx': 340, 'ty': 165,
      'w4': 90, 'seg5': 360, 'ra2': 158.11,
      'hc': 0}

    animas.heart1 = {
      'cid': 'heart1',
      't0': 0, 't1': 1000, 't3': 100,
      'm1': [[[1, 1]]], 'm2': [[[1, 1]]], 'n1': [[[1.8, 1.8]]], 'n2': [[[1, 1]]], 'n3': [[[-8, -8]]], 'a': 20, 'b': 0.18,
      'tx': [[[520, 520]]], 'ty': [[[100, 100]]],
      'w4': 100,
      'ra2': [[[90, 40]]],
      'seg5': 360,
      'cf': [[[980, 970]]],
    }

    // ............................. enty
    let enty = {}
    enty.animas = animas
    enty.anima = _ => animas[_] !== undefined ? animas[_] : animas.circle
    return enty
  }

  exports.muonAnimas = muonAnimas
}))
