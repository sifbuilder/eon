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

    // ............................. intermap
    function intermap (_) {
      
      if (arguments.length < 1) return state
      if (typeof _ === 'object') return state = Object.assign({}, state, _)
      if ((typeof _ === 'string') && (state[_] !== undefined)) return state[_]
    
    }

    // ............................. mapOnePart    
    async function mapOnePart (part) {  // partName: eg. haloPacer
      let partName = part[0] // name
      let parts = Array.isArray(part[1]) ? part[1] : Array.of(part[1]) // to array

      let promises = intermap('xD3Require').require(...parts) // to state
      let [resolved] = await Promise.all([promises])
      return [ partName, resolved ]
      
    }

    // ............................. mapParts        
    async function mapParts (parts) {

      let promises = parts.map(p => enty.mapOnePart(p))
      await Promise.all(promises)
        .then(function (resolvedParts) {
          resolvedParts.map(r => {
            let partName = r[0]
            let partCode = r[1]
            intermap( { [partName]: partCode  })   // add to mapper state
          }) 
          
        })
        .catch(function (err) {
          console.log('A promise failed to resolve', err)
          return promises
        })        
    }


    let enty = intermap

    enty.mapOnePart = mapOnePart
    enty.mapParts = mapParts

    return enty
  }

  exports.xMapper = xMapper
}))
