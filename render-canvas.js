/***********
 *    @renderCanvas
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.renderCanvas = global.renderCanvas || {})));
}(this, function (exports) { 'use strict';


let renderCanvas = function (__mapper = {}) {
    let state = {}
    let radians = Math.PI / 180

    let r = __mapper('xs').r('renderer')
    
		state.width = r.width(),
    state.height = r.height()
	
		let canvas = null
				canvas =
					d3.select('.viewframe')	//  d3.select("body").selectAll("canvas").data(["canvas"])
						.append('canvas')
							.attr("id", "canvas")
							.attr("class", "canvas")
							.attr('width', state.width)
							.attr('height', state.height)
							.style("position", "absolute")
							.style("top", 0)
							.style("left", 0)
							.style("border", "1px solid lightgray")
							.style("position", "absolute; top:0px; left:0px; z-index:1")
							.attr("pointer-events", "none")
							.attr("overflow", "visible")							
							

/*
 * 	@enty
 */ 		
	let enty = function () {}
	
/*
 * 	@canvas
 */ 
	enty.canvas = function () {
		return d3.select(".canvas")
	}
	
/*
 * 	@context
 */ 	
	enty.context = function  () {
		let canvas = d3.select(".canvas")
		let context = canvas.node().getContext("2d")
		return context
	}
	
/*
 * 	@render
 */ 	
 enty.render = function  (elapsed, anigrams, maxlimit) {

			let	canvas = __mapper("renderCanvas").canvas()
			let	context = canvas.node().getContext("2d")
			let width = canvas.property("width")
			let height = canvas.property("height")
			
			context.clearRect(0, 0, width, height)
			
			let traceline = []
			let gitems = d3.nest()				// let framesByGid = f.groupBy(frames, "gid")
				.key(function(d) { return d.ric.gid })
				.key(function(d) { return d.ric.cid })
				.entries(anigrams)
				
			for (let i in gitems) {						// DOTS (seg5===0) each group gid
				let gid = gitems[i].key, citems = gitems[i].values

				
				for (let j in citems) {						// each class cid
					let cid = citems[j].key					// cid
					let fitems = citems[j].values		// fitems

				/*  ============== TEXT ============== */
					let textcanvas = fitems											// __ TEXT __
						.filter(d => d.sort === "text") 				//    			

						if (textcanvas.length > 0)	{
								
								// 

						}						
						
				/*  ============== geojson ============== */
	
					let geojsons = fitems										// __ PATHS __
						.filter(d => d.sort === "geojson") 		//    geojson		

					if (geojsons.length > 0)	{
						
						for (let k in geojsons) {	
					
								let item = geojsons[k]

								let geometry = item.geometry
								let projection = item.projection
								let path = d3.geoPath().projection(projection).context(context);
						 
						 
									let fillStyle = f.kolor(item.pic.ture.cf, item.pic.ture.csx)
									let strokeStyle = f.kolor(item.pic.ture.cs, item.pic.ture.csx)
									let lineWidth = item.pic.ture.cw

											context.beginPath();
											let now = performance.now();
											path(geometry);
											context.lineWidth = lineWidth
											context.strokeStyle = strokeStyle
											context.stroke();
											context.fillStyle = fillStyle
											context.fill();
											context.closePath();						 
						
						
						}						
						
					}

			}
	}
}

	return enty

}

exports.renderCanvas = renderCanvas

}));
