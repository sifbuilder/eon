/**********************
 *    @eonEohalLinkform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonEohalLinkform = global.eonEohalLinkform || {})))
}(this, function (exports) {
  'use strict'

  async function eonitem (__eo = {}) {
    let [
      eonEohalSol,
      eonEohalMars,
      eonMuonEoric,
      eonMuonProps,
    ] = await Promise.all([
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-muon-eoric'),
      __eo('xs').b('eon-muon-props'),
    ])

    let eonMuonStore = __eo('eonMuonStore')
    let state = {}

    // ........................ diagonalp
    let diagonalp = function (d, v) {			// error: d is undefined
      // v < 0: linear link
      // 0 < v < 1: curved link
      // > 1: curvy link

      let s = d.source
      let t = d.target
      let x0 = s.x // s.state.stateA // s.x
      let y0 = s.y //  s.state.stateB //s.y
      let x1 = t.x //  t.state.stateA //t.x
      let y1 = t.y //  t.state.stateB //t.y

      if ((x0 === undefined) ||
				(y0 === undefined) ||
				(x1 === undefined) ||
				(y1 === undefined)) {
        console.log('error in diagonal')
        return null
      }

      let polygon = []

      if (v < 0) {													// linar
        polygon = [ [x0, y0],
          [x1, y1],
        ]
      } else if (v > 1) {						// (1, )	curvy
        var rd = 1 + d3.randomNormal(0, v - 1)()		// v
        polygon = [ [x0, y0],
          [x0 + rd * (x1 - x0), y0],
          [x0 + rd * (x1 - x0), y1],
          [x1, y1],
        ]
      } else {										// (0,1)		curve
        var rd = 1 + d3.randomNormal(0, v)()		// v

        let r = -1 // let r = Math.sign((0.5 - Math.random()))

        let x0a = x0 + r * rd * (x1 - x0)
        let y0a = y0 - r * rd * (y1 - y0)
        polygon = [
          [x0, y0],
          [x0a, y0a],
          [x1, y1],
        ]
      }
      return polygon
    }

    // ............................. breed
    function eohale (anitem) {
      let newItems = []

      let fromAnima = eonMuonStore.findAnimaFromUid(anitem.eoload.link.source)
      let toAnima = eonMuonStore.findAnimaFromUid(anitem.eoload.link.target)

      if (fromAnima !== undefined && fromAnima !== undefined) {
        console.assert(fromAnima !== undefined, 'h.linkform fromAnima undefined')
        console.assert(toAnima !== undefined, 'h.linkform toAnima undefined')

        let p0 = fromAnima.eonode.geometry.coordinates
        let p1 = toAnima.eonode.geometry.coordinates
        let lineStrnig = [ p0, p1 ]

        // let lf 	= linkItem.eoload.link.lf || 0
        // linkItem.stream = diagonalp(form, lf)
        let eofold = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: lineStrnig,
          },
          properties: {},
        }

        let eonode = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {},
        }

        let newItem = eonMuonProps.clone(anitem)
        newItem.eohal = eonEohalMars
        newItem.eofold = eofold
        newItem.eonode = eonode

        newItems.push(newItem)
      }

      return newItems
    }

    // ....................... gramify
    let gramify = anitem => {
      let newAnigrams = eonMuonProps.a(eohale(anitem))
      let newItems = newAnigrams.reduce((p, q) => [...p, ...eonMuonProps.a(eonEohalMars.gramify(q))], [])
      return newItems
    }

    // ....................... anify
    let anify = anitem => {
      let newItems = eohale(anitem)
      return eonMuonProps.a(newItems)
    }

    // ....................... eonEohalLinkform
    let eonEohalLinkform = {
      anify: anitem => anify(anitem),
      gramify: anitem => gramify(anitem),
    }

    // ....................... enty
    let enty = eonEohalLinkform
    return enty
  }

  exports.eonEohalLinkform = eonitem
}))
