/**********************
 *    @eohalGeovoro
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.eohalGeovoro = global.eohalGeovoro || {})));
}(this, function (exports) { 'use strict';


async function eohalGeovoro(__mapper = {}) {
		
    let [
      d3,
      eohalPetiole,
      muonDelaunay,
      muonGeoj,
      muonProfier,
      muonProj3ct,
      muonProps,
    ] = await Promise.all([
      __mapper('xs').b('d3'),
      __mapper('xs').e('petiole'),
      __mapper('xs').m('delaynay'),
      __mapper('xs').m('geoj'),
      __mapper('xs').m('profier'),
      __mapper('xs').m('proj3ct'),
      __mapper('xs').m('props'),
    ])
    
		let state = Object.assign({})

		
		const color = t => d3.hsl(280 + (40 * t), 0.18, 0.4);

		const voronoi = d3.voronoi
		const FindDelaunayTriangulation = muonDelaunay.FindDelaunayTriangulation

    // ............................. eohal
	let eohale = function eohale(anitem) {
		
		let newAnima = .............................
		
		newAnima.sort = "geojson"						// SORT
		
		let projectionProps = avatar.pic.projection
		newAnima.projection = __mapper("proxys").p("projection").getproj(projectionProps)
		newAnima.geoPath = d3.geoPath().projection(newAnima.projection)		// geopath	

		// data
		let spherical = __mapper("pluginProjection").spherical
		let SAMPLES = Math.floor(avatar.pic.hsamp)
		let sites = __mapper("pluginProjection").fibonacciSphere(SAMPLES, false).map(spherical)
		
		// geovoro		
		let diagram = voronoi(sites)
		let geovoro = __mapper("pluginGeovoro").data(sites)
		let triangles = geovoro.triangles(sites)
		
		// for each triangle
		for (let i=0;i< triangles.features.length;i++) {

				let newAvatar =  __mapper("proxys").p("snap").clone(newAnima)
				
				newAvatar.ric.fid = newAvatar.ric.fid + "geo" + i					

				let triangle = triangles.features[i]	// planar coordinates
				const geoCentroid = d3.geoCentroid(triangle)
				const centroid = __mapper("pluginProjection").cartesian(geoCentroid)
				newAvatar.depth = centroid[0]		// x 
	
				newAvatar.geo = Object.assign({},triangle)
				
				let pic = Object.assign({},avatar.pic)
					const color = t => d3.hsl(280 + (40 * t), 0.18, 0.4);
					const k = (Math.PI * i) / sites.length;
					let _fill = color((1 + Math.cos(k)) / 2);	
					let t = (2.2 - (2.0 * centroid[1]) - (1.4 * centroid[2])) / 6;
					pic.ture.color = d3.interpolate('white', color)(t);		// ('red', "black")(t);
				newAvatar.pic = pic
				
				newAnimas.push(newAvatar)
			
		}
		
		newAnimas.sort((a, b) => d3.ascending(a.depth, b.depth))
		return newAnimas
	}	
	
  

    // ............................. gramm
    let gramm = anitem => {
      let newItem = eohale(anitem)
      let newAnitems = eohalPetiole.gramm(newItem)
      return newAnitems
    }

    // ............................. ween
    let ween = anitem => {
      if (anitem.eoinited === undefined) {
        return muonProps.v(anitem)
      } else {
        return []
      }
    }
  
    // ............................. enty
		var enty = function enty() {}
		enty.offspring = (anima, avatar)  =>  muonProps.a(avatar)
		enty.breed = (anima, avatar)  => breed(anima, avatar)
		
		return enty

}

exports.eohalGeovoro = eohalGeovoro

}));