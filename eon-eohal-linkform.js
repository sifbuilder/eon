/**********************
 *    @eohalLinkform
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eohalLinkform = global.eohalLinkform || {})))
}(this, function (exports) {
  'use strict'

  async function eohalLinkform (__eo = {}) {
    let [
      eohalSol,
      eohalMars,
      muonEoric,
      muonProps,
    ] = await Promise.all([
      __eo('xs').e('sol'),
      __eo('xs').e('mars'),
      __eo('xs').m('eoric'),
      __eo('xs').m('props'),
    ])

    let muonStore = __eo('muonStore')
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

      let fromAnima = muonStore.findAnimaFromUid(anitem.eoload.link.source)
      let toAnima = muonStore.findAnimaFromUid(anitem.eoload.link.target)

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

        let newItem = muonProps.clone(anitem)
        newItem.eohal = eohalMars
        newItem.eofold = eofold
        newItem.eonode = eonode

        newItems.push(newItem)
      }

      return newItems
    }

    // ....................... gramm
    let gramm = anitem => {
      let newgramms = muonProps.a(eohale(anitem))
      let newItems = newgramms.reduce((p, q) => [...p, ...muonProps.a(eohalMars.gramm(q))], [])
      return newItems
    }

    // ....................... ween
    let ween = anitem => {
      let newItems = eohale(anitem)
      return muonProps.a(newItems)
    }

    // ....................... eohalLinkform
    let eohalLinkform = {
      ween: anitem => ween(anitem),
      gramm: anitem => gramm(anitem),
    }

    // ....................... enty
    let enty = eohalLinkform
    return enty
  }

  exports.eohalLinkform = eohalLinkform
}))
