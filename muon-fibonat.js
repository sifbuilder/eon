/***************************
 *        @muonFibonat
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonFibonat = global.muonFibonat || {})))
}(this, function (exports) {
  'use strict'

  let muonFibonat = function muonFibonat (__mapper = {}) {

    let f = __mapper('props')(),
      mlacer = __mapper('xs').m('lacer'),
      mgeom = __mapper('xs').m('geom')

    let cache = {} // params, string
		cache.string = []

		
    /* **************************
     *        @stream
     */
    let stream = function (params={}) {

			// let randomize = Math.floor(params.randomize)
			// let samples = Math.floor(params.samples)
			// let dotsInSegment = Math.floor(params.dotsInSegment)

			let randomize = params.randomize
			let samples = params.samples
			let dotsInSegment = params.dotsInSegment

			let string = []
			
      if (randomize == cache.randomize
				&& samples == cache.samples
				&& dotsInSegment == cache.dotsInSegment
				) {


        string = cache.string

      } else {
						if (0 && 1) console.log("m.fibonat.stream recalculate")
				
				let rnd = (randomize) ? Math.random() * samples : 1.0

				const offset = 2.0 / samples;
				const increment = Math.PI * (3.0 - Math.sqrt(5.0));

				let nodes = d3.range(samples)
					.map(i => {
						const y = ((i * offset) - 1) + (offset / 2);
						const r = Math.sqrt(1 - Math.pow(y, 2));
						const phi = ((i + rnd) % samples) * increment;
						const x = Math.cos(phi) * r
						const z = Math.sin(phi) * r
						return ([x, y, z])	// eg. [-0.63, -0.5, 0.58]
					})
					.map(mgeom.spherical) // eg. [-0.7853, 0.6154]
					.map(mgeom.to_degrees)	// eg. [-141.93, 35.80]
				
				let string = []	
				
				for (let i=0; i<nodes.length - 1; i++) {	// before last node
				
					let dot0 = nodes[i]
					let dot1 = nodes[i+1]

					string.push(dot0)		// push beginning of segment
		
					if (dotsInSegment > 1) {		// for the interior
						let dom = [0, dotsInSegment + 2 ]		// domain adds frontier

						let rngX = 	[ dot0[0], dot1[0] ]		// range bewteen segment extremes
						let rngY = 	[ dot0[1], dot1[1] ]
						
						let scaleX = d3.scaleLinear().domain(dom).range(rngX)
						let scaleY = d3.scaleLinear().domain(dom).range(rngY)

						// [dot0, [1,..,indots]], dot1
						let indots = d3.range(1,dotsInSegment+1,1).map(d => [scaleX(d), scaleY(d)])	
						
						
						string = [...string, ...indots]	
						
					}
				}					
				
				string.push(nodes[nodes.length-1])		// add last node
				
        cache.randomize = randomize
        cache.samples = samples
        cache.dotsInSegment = dotsInSegment
        cache.string = string
				
				
      }

      return string
    }

    /***************************
     *        @enty
     */
    let enty = function () {}

    enty.stream = stream
    enty.reset = () => { cache = {}; return enty }

    return enty
  }

  exports.muonFibonat = muonFibonat
}))
