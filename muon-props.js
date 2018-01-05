/***************************
 *        @muonProps
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonProps = global.muonProps || {})))
}(this, function (exports) { "use strict"

  let muonProps = function muonProps() {

    let props = {}

    props.a = d => (Array.isArray(d)) ? [...d] : [d]
    props.v = (d,...p) => (typeof(d) === "function") ? d(...p) : d
    props.f = d => (typeof(d) === "function") ? d : () => d

    // https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
    props.o = obj => {
      if (null == obj || "object" != typeof obj) return obj
      let copy = obj.constructor()
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
      }
      return copy
    }

    // http://heyjavascript.com/4-creative-ways-to-cloneObj-objects/
    props.cloneObj = function cloneObj(obj) {
      if (obj === null || typeof obj !== "object") {
        return obj
      }

      let temp = obj.constructor() // give temp the original obj's constructor
      for (let key in obj) {
        temp[key] = cloneObj(obj[key])
      }

      return temp
    }
    props.cloneArray = function cloneArray(obj) {

      if (Array.isArray(obj) ) {
        let r = [ ...obj ]
      } else {
        r = obj
      }
      return r
    }

    props.debug = () => [].join.call(arguments, "\n")

    props.diagonalp = function(d, v) {      // error: d is undefined
      // v < 0: linear link
      // 0 < v < 1: curved link
      // > 1: curvy link

      let s = d.source
      let t = d.target
      let x0 = s.x // s.stace.stateA // s.x
      let y0 = s.y //  s.stace.stateB //s.y
      let x1 = t.x //  t.stace.stateA //t.x
      let y1 = t.y //  t.stace.stateB //t.y

      if ((x0 === undefined) ||
          (y0 === undefined) ||
          (x1 === undefined) ||
          (y1 === undefined)) {
        console.log("error in diagonal")
        return null
      }

      let polygon = []

      if (v < 0) {                          // linar
        polygon = [ [x0,y0],
          [x1,y1]
        ]
      } else if (v > 1) {           // (1, )  curvy

        let rd = 1 + d3.randomNormal(0, v-1)()    // v
        polygon = [ [x0,y0] ,
          [x0 + rd * (x1 - x0), y0],
          [x0 + rd * (x1 - x0), y1],
          [x1,y1]
        ]

      } else {                    // (0,1)    curve
        let rd = 1 + d3.randomNormal(0, v)()    // v

        let r = -1  // let r = Math.sign((0.5 - Math.random()))

        let x0a = x0 + r * rd * (x1 - x0)
        let y0a = y0 - r * rd * (y1 - y0)
        polygon = [
          [x0,y0] ,
          [x0a, y0a],
          [x1,y1]
        ]

      }
      return polygon
    }

    props.closerange = (a,b) => [...d3.range(a,b), a]
    props.geoscale = extent => d3.scaleLinear().domain(extent[0]).range(extent[1])

    props.addarray = (a1,a2) => a1.map( (d, i) => d + a2[i] )
    props.sum = (a, t) => a.reduce((p, c) => c[t] + p, 0)
    props.add = (a, t) => a.reduce((p, c) => c + p, 0)
    props.summa = (fns) => fns.reduce((fncurr, fnprev) => {
				return t => props.lib.functor(fncurr)(t) + props.lib.functor(fnprev)(t)
				}, t => 0)   
    
    props.fa = d => {     // force array
      let ret
      if (Array.isArray(d)) ret = d
      else if (typeof d === "object") ret = Object.values(d)
      else if (d === null) ret = []
      else if (d === undefined) ret = []
      else ret = d
      return props.a(ret)
    }

    props.norma = function norma(pts = []) {
      let m = Math.max(...pts)
      let c = 1 / m
      let r = pts.map(p => p * c)
      return r
    }

    props.ta = d => (Array.isArray(d)) ? d.map( di => [[ di ]]) : [[ d ]] // to tripleArray
    props.unslide = function unslide (stream = [])  {

      let lengths = stream.map(d => d.length)
      let mx = Math.max(...lengths)

      let unslide = d3.range(mx).map(i => [])
      for (let i=0; i<stream.length; i++) {
        for (let j=0; j<mx; j++) {
          unslide[j][i] = stream[i][j]
        }
      }
      return unslide

    }
		
    props.posInStream = function(rpos, stream) {	// pos from rel-pos in stream

      let pos
      let unidimLength = stream.length
      pos = Math.round(rpos * unidimLength  / 100)
      pos = (pos >= 0) ? pos % unidimLength : (pos + unidimLength) % unidimLength
      return pos

    }		
		

    props.parray = d => (Array.isArray(d)) ? d.slice() : [d]

    props.geoscale = extent => d3.scaleLinear().domain(extent[0]).range(extent[1])

    props.rarray = d => (Array.isArray(d)) ? [ ...d ].reverse() : [d] // reverse array

    props.closerange = (a,b) => [...d3.range(a,b), a]

    props.isNumericArray =  d => Array.isArray(d) && d.reduce((prev, curr) => prev && typeof curr === "number", true)

    // pure array: no object/funcion elements
    props.isPureArray =  d => Array.isArray(d) && d.reduce((prev, curr) => prev && typeof curr !== "object" && typeof curr !== "function", true)

    // quasipure array: arrrays, string or number elements
    props.isQuasiPureArray =  d => Array.isArray(d) && d.reduce((prev, curr) => prev &&
        Array.isArray(curr) ||
        typeof(curr) === "string" ||
        typeof(curr) === "number"
      , true)
    props.isDoubleSingleArray =  d => (Array.isArray(d)   // [[_]]
        && Array.isArray(d[0])
        && d.length === 1
        && d[0].length === 1
    )
    props.isDoubleArray =  d => (Array.isArray(d)       // [[_]]
        && Array.isArray(d[0])
        && d.length === 1
    )

    // tripleArray" animas animation, single polygon geojson MultiPolygon
    props.isTripleArray =  d => (Array.isArray(d) && Array.isArray(d[0]) && Array.isArray(d[0][0])
        && d.length === 1 && d[0].length === 1 && d[0][0].length === 1 )    // [[[_]]]
    props.isPureObject = d => (!Array.isArray(d) &&
                typeof d === "object" &&
                Object.keys(d).reduce ((p,c) => p && (typeof d[c] !== "object"), true)
    )
    props.isObject = d => (typeof d === "object" && Array.isArray(d) === false)
    props.isArray = d => Array.isArray(d)
    props.isString = d => typeof(d) === "string"
    props.isNumber = d => typeof(d) === "number"
    props.isFunction = d => typeof(d) === "function"

    props.functor = d => (typeof(d) === "function") ? d : d => d
    props.constant = v => (typeof v === "function") ? v() : v
    props.value = v => (typeof v === "function") ? v() : v
    props.noop = () => {}

   /* **************************
   *        @colors
   */
    props.colors = {}             // colors
    props.colors.scales = {
      bos: d3.scaleLinear().domain([0, 0.5, 1]).range(["black", "#FF2400", "Wheat"]), // 0
      wheat: d3.scaleLinear().domain([0, 0.5, 1]).range(["black", "Wheat", "#FF2400"]), // 1
      red: d3.scaleLinear().domain([0, 0.5, 1]).range(["#FF2400", "Yellow"]), // 2
      ry: d3.scaleLinear().domain([0, 1]).range(["red", "yellow"]), // 3
      bar: d3.scaleLinear().domain([0, 0.5, 1]).range(["black", "#FF2400", "Yellow"]),  // 4
      lab: d3.interpolateLab("#FF2400", "yellow"),  // 5
      hsl: d3.interpolateLab("brown", "steelblue"), // 6
      rbl: d3.interpolateLab("red", "blue"),  // 7
      plasma: d3.interpolatePlasma,   // 8
      cool: d3.interpolateCool, // 9
      warm: d3.interpolateWarm, // 10
      magma: d3.interpolateMagma,   // 11
      inferno: d3.interpolateInferno,   // 12
      viridis: d3.interpolateViridis,   // 13
      cubehelex: d3.interpolateCubehelexDefault,  // 14
      rainbow: d3.interpolateRainbow, // 15
      bluered: d3.scaleLinear().domain([0, 0.5, 1]).range(["blue", "Wheat", "red",]),
      blueblack: d3.scaleLinear().domain([0, 0.5, 1]).range(["blue", "Wheat", "black",]) // "red",])  // 0
    }
    props.colors.color = props.colors.scales.bos
    props.colors.array =  Object.keys(props.colors.scales).map(key => props.colors.scales[key])

    props.color = (d=0) => {
      return props.colors.array[Math.round(d)]
    }
    props.kolor = (v, d=0) => {
      return props.color(d)(v/1000)
    }


    props.polarize = function(point) {        // cart to 2d planar
      let x = point[0]
      let y = point[1]
      let ang = Math.atan2(y, x)
      let rad = Math.sqrt(x * x + y * y)
      return [ang,0,rad]
    }

    /* **************************
   *        @slide
   *
   *        [ [a1,a2,a3], [b1,b2] ]     [ [a1,b1], [a2,b2x], [a3,b2] ]
   *        [ {a1,a2,a3}, [b1,b2] ]     [ [a1v,b1], [a2v,b2x], [a3v,b2] ]
   *        [ {a1,a2,a3}, {b1,b2} ]     [ [a1v,b1], [a2v,b2x], [a3v,b2] ]
   */
    props.slide = function (streams=[], compl="max")  {

      let nbr = streams.length

      let inpattern = streams.reduce( (p,q) => p &&  props.isNumericArray(q), true)
      /* if ( !inpattern ) console.log (" streams not in pattern", streams) */

      let lengths = streams.map(d => d.length),
        mx = Math.max(...lengths),
        mn = Math.min(...lengths)

      let streamXYZ = []
      if (compl === "min") {
        let pointsHowmany = mn              // min length

        for (let i=0; i<pointsHowmany; i++) {
          streamXYZ[i] = streams.map(d => d[i])
        }
        let scales = streams.map(d => d3.scaleLinear().domain([0,pointsHowmany - 1]).range([0,d.length -1 ]))

      } else {
        let pointsHowmany = mx              // max length
        let scales = streams.map(d => d3.scaleLinear().domain([0,pointsHowmany - 1]).range([0,d.length -1 ]))
        for (let j=0; j<pointsHowmany; j++) {
          let w = streams.map((s,k) => streams[k][Math.round(scales[k](j))])
          streamXYZ.push(w)
        }
      }
      return  streamXYZ
    }
    

    props.interadd = function (streams)  {

						let ww = []				
						let ses = []				// scale per position
						let res = []				// scale per position

						let nStreams = streams.length						// number of streams	
						let nDots = streams.reduce((p,q) => Math.max(q.length,p),0) // max dots

						
						for (let i=0; i<nStreams; i++) {			// scales 
						
							let sid = [0,nDots-1]
							let sir = [0,streams[i].length -1]
							let si = d3.scaleLinear()		// argument scale 
								.domain( sid )		// from result position
								.range ( sir )		// to strem i position
								
							ses[i] = si					// ses scale for i stream 

							
							let rid = d3.range(streams[i].length).map((d,i) => i)
							let rir = streams[i]
							let ri = d3.scaleLinear()					// argument scale 
								.domain( rid )					// from result position
								.range ( rir )		// to strem i position
								
							res[i] = ri					// ses scale for i stream 
	
						}
						
						for (let j=0;j<nDots;j++) {				// each position j
						
							let rr = []
							let ss = []
							
							for (let k=0;k<streams.length;k++) {			// each stream
								let vk = ses[k](j)								// postion on stream
								let sk = res[k](vk)								// time stream

								rr.push(vk)		//[0, 0, 0], [0.5, 0.25, 1], [1, 0.5, 2]	positions per stream
								ss.push(sk)		// [2, 33, 5], [2.5, 33.25, 6], [3, 33.5, 7]	values	j						
							}

						ww[j] = ss.reduce((p,q) => q+p,0)
					
					}

					return ww



}    
    
   /***************************
   *        @streamRange
   */
    props.streamRange = function (pts, pa=0, pb=-1, step=1, fas=0) {
      // for (let k in params) params[k] = value(params[k])
      //  + clockwise, - counter-clockwise
      //  [-0,-1] :=   [359,0]        // [0,360] _e_
      //  [-300,120] := -[300, 0], -[0,120]

      let neg = x =>  x < 0 || (x === 0 && (1/x < 0))
      let pos = x =>  x > 0 || (x === 0 && (1/x > 0))

      let ptsLength = pts.length    // group order    assume positive
      let intA = Math.round(pa)
      let intB = Math.round(pb)
      let posA = Math.abs(intA)
      let posB = Math.abs(intB)

      let posmodA = Math.floor(posA  % ptsLength)
      let posmodB = Math.floor(posB  % ptsLength)
      let modStep = Math.floor(step)

      let ret = []
      if (intA === intB) {

        let p = intA  % ptsLength     // pt in group
        ret.push(pts[p])

      } else if (intB < 0) {          // neg B is nb. of cycles

        for(let i = 1; i<= posB; i++) ret = ret.concat(pts.slice(posA, ptsLength))
        ret = ret.concat(pts.slice(posA, Math.floor(ptsLength * (posB % 1) ))) // fraction

        if (neg(intA)) ret = props.immutableReverse(ret)

      } else if (posA < posB) {
        if (posmodA < posmodB) {

          ret = ret.concat(pts.slice(posmodA, posmodB + 1))   // +1 position
            .filter((d,i)=> (i % modStep  === 0))     // step

        } else {

          ret = ret.concat(
            pts.slice(posmodA, ptsLength),
            pts.slice(0, posmodB))
        }

        if (neg(intA)) ret = props.immutableReverse(ret)

      } else if (posA > posB) {       // _e_

        if (neg(intA)) {
          ret = ret.concat(pts.slice(posA, ptsLength))
          ret = ret.concat(pts.slice(0, posB))
          ret = props.immutableReverse(ret)

        } else {
          let rpts = props.immutableReverse(pts)
          ret = props.streamRange(rpts, pts.length - posA, pts.length - posB)
        }
      }
      return ret
    }
   /***************************
   *        @fibonacciSphere
   */
    props.cartesian = function (spherical) {
      let radians =  Math.PI / 180
      let lambda =  spherical[0] * radians,
        phi =     spherical[1] * radians,
        cosphi = Math.cos(phi)
      return [
        Math.cos(lambda)      * cosphi ,
        Math.sin(lambda)      * cosphi ,
        Math.sin(phi)
      ]
    }

    props.spherical = function (cartesian) {
      let radians =  Math.PI / 180
      let r = Math.sqrt(cartesian[0] * cartesian[0] + cartesian[1] * cartesian[1]),
        lat = Math.atan2(cartesian[2], r),
        lng = Math.atan2(cartesian[1], cartesian[0])
      return [lng / radians, lat / radians]
    }

    props.mapline = function (Positions, Verts) {
      return Verts
        .map(function (v) {
          return props.spherical(Positions[v])
        })
    }

    props.fibonacciSphere = function fibonacciSphere(samples = 1, randomize = true) {

      let rnd = 1.0
      if (randomize) {
        rnd = Math.random() * samples
      }

      const offset = 2.0 / samples
      const increment = Math.PI * (3.0 - Math.sqrt(5.0))

      let r = d3.range(samples)
        .map((i) => {
          const y = ((i * offset) - 1) + (offset / 2)
          const r = Math.sqrt(1 - Math.pow(y, 2))
          const phi = ((i + rnd) % samples) * increment
          const x = Math.cos(phi) * r
          const z = Math.sin(phi) * r
          return ([x, y, z])
        })
      return r

    }
  /***************************
   *        @format
   */
    props.d = function ( precision ) {
      return function(value) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
      }
    }
   /***************************
   *        @ent
   *        entry from list and index
   */
    props.enxs = function( ent, ents, entidx = 0) {

      let ret
      if (ent !== undefined) {        // if ent singular

        ret = ent // .map(d => Math.round(d))

      } else if (ents !== undefined) {  // if plural

        if (typeof entidx === "number") ret = ents[Math.round(entidx)] // get one
        else if (Array.isArray(entidx)) ret = entidx.map(d => ents[Math.round(d)]) // get some

      }
      return ret

    }

    props.entxx = function( ent, ents, entidx = 0, arr) {

      let _ent = arr[ent]
      let _ents = arr[ents]
      let _entidx = arr[entidx]
      return props.enxs(_ent, _ents, _entidx )

    }

    /***************************
   *        @enty
   */
    let enty = () => props

    return enty
  }

  exports.muonProps = muonProps

}));
