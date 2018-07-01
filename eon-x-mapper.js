/*******************************************
*      @xMapper
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.xMapper = global.xMapper || {})))
}(this, function (exports) {
  'use strict'

  let xMapper = function () {
    let state = {}
    const getCell = (e,n,m) => e[n] !== undefined ? e[n](m) : e // eon, name, map muonGraticule['muonGraticule'](__mapper)
    const mapCell = (e,n,m) => m({[n]:e})[n] // eon, name, map __mapper({ muonGraticule: muonGraticule })('muonGraticule')
    const a = d => Array.isArray(d) ? d : Array.of(d)

    // ............................. intermap
    function intermap (_) {

      if (arguments.length < 1) return state
      else if (typeof _ === 'object') return state = Object.assign({}, state, _)
      else if (typeof _ === 'string' && state[_] !== undefined) return state[_]
      else if (typeof _ === 'string' && state[_] === undefined) return null
      
    }

    // ............................. mapOnePart    
    function mapOnePart (part) {  // [ partName, [partEnts] ]
if (1 && 1) console.log('mapOnePart part', part)

      return enty('xD3Require').require(...a(part[1])) // to state
        .then(eon => getCell(eon, part[0], enty)) // get 
        .then(cell => mapCell(cell, part[0], enty)) // map
        .catch(e => console.log(e))

    }

    // ............................. enty     
    let enty = intermap
    enty.mapOnePart = mapOnePart
    enty.getCell = getCell
    enty.mapCell = mapCell

    return enty
  }

  exports.xMapper = xMapper
}))
