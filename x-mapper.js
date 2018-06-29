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
    let getCell = (e,n,m) => e[n] !== undefined ? e[n](m) : e // eon, name, map
    
    // ............................. intermap
    function intermap (_) {

      if (arguments.length < 1) return state
      else if (typeof _ === 'object') return state = Object.assign({}, state, _)
      else if (typeof _ === 'string' && state[_] !== undefined) return state[_]

    }

    // ............................. mapOnePart
    // function mapOnePart (part) {  // partName: eg. haloPacer
    
      // let partName = part[0] // name
      // let parts = Array.isArray(part[1]) ? part[1] : Array.of(part[1]) // to array

      // return intermap('xD3Require').require(...parts) // to state
        // .then(value => {
          
          // return [ partName, value ]
        // })


    // }
    function mapOnePart (part) {  // partName: eg. haloPacer
    
      let nome = part[0] // name
      let parts = Array.isArray(part[1]) ? part[1] : Array.of(part[1]) // to array

      
      return intermap('xD3Require').require(...parts) // to state
        .then(eon => [ nome, getCell(eon, nome, enty) ])


    }

    // ............................. mapParts
    async function mapParts (parts) { // modifies mapper state
    
      await Promise.all(parts.map(p => enty.mapOnePart(p)))
      .then(values => {
          values.map(value => {
            if (1 && 1) console.log('value', value)

            let partName = value[0]
            let partCode = value[1]
            intermap( { [partName]: partCode[partName]  })   // add to mapper state
          })
      })

    }


    let enty = intermap

    enty.mapOnePart = mapOnePart
    enty.mapParts = mapParts

    return enty
  }

  exports.xMapper = xMapper
}))
