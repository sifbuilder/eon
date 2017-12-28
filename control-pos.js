/* -------------------------- */		
/*     controlPos		          */		
/* -------------------------- */	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.controlPos = global.controlPos || {})));
}(this, function (exports) { 'use strict';

/*  -------------          */
/*    controlPos        */
/*  -------------          */
	function controlPos(__mapper) {
	
		function prevent(e) {}		
			
		function subject() {
			return this
		}

		function started(d) {}

		function moved(d) {
				function createPostipElem() {
						var padLayer = d3.select('body')
								.selectAll('g.refs')
									.data(['refs'])
									.enter()
										.insert("g", "refs")
										.attr("class", "refs")
						var postipElem = d3.select("g.refs")
								.selectAll("div.postip")
									.data(['divMousePos'])
									.enter()
										.append("div")
											.attr("class", "postip")
											.call(drawPostipElem)	
				}
							
				function drawPostipElem (postip) {
						postip	
							.attr("viewBox", "0 0 10 10")
							.style("top", "-5px")
							.style("position", "absolute")
							.style("padding", "10px")
							.style("background", "rgba(255, 255, 255, .90)")
							.style("border", "1px solid lightgray")
							.style("pointer-events", "none")
							.style("z-index", "100")
							.style('border', '1px solid orange')
							.style('color', 'grey')		
							.classed('postip-hidden', true)
							.style("opacity", 0)
					}
					
				function textPadFn (a) { 
						var s = String("_______" + Math.floor(a.ox) + " : " + Math.floor(a.oy) + "_______")
						return s
				}

				// https://github.com/1wheel/swoopy-drag/blob/master/lib/d3-jetpack.js
				function displayTextPad(a) {
					d3.select('.postip')
						.classed('postip-hidden', false)
						.style('opacity', 1)
						.html('')
						.selectAll('div')
							.data([textPadFn]).enter()
								.append('div')				
									.html(function(textPadFn) {
										return (textPadFn(a))
								})
				}

				function moveTextPad(node) {
						var postip = d3.select('div.postip')
						if (!postip.size()) return
						var e = d3.event,
							x = e.clientX,
							y = e.clientY,
							doctop = (window.scrollY)? window.scrollY : (document.documentElement && document.documentElement.scrollTop)? document.documentElement.scrollTop : document.body.scrollTop,
							n = postip.node(),
							nBB = n.getBoundingClientRect()
							postip.style('top', (y+doctop-nBB.height-18)+"px");
							postip.style('left', Math.min(Math.max(0, (x-nBB.width/2)), window.innerWidth - nBB.width)+"px");
							
						prevent(e)
				}
		
			var datum = d,								// d datum
					node = this, 							// elem
					parent = node.parentNode,
					origin = d3.mouse(parent),
					ox = origin[0],
					oy = origin[1]		



			var action = {ox: ox, oy: oy}
					createPostipElem()
					displayTextPad(action)
					moveTextPad(node)
		}

		function ended(d) {
		
					var node = d3.select(this)		// selection
					var datum = node.datum()		// datum
				
					d3.select('div.postip')
						.classed('postip-hidden', true)
						.style('opacity', 0)
					d3.selectAll('.postipped')
						.classed('postipped', false)
		}
			
		// ......................... controlPos
		function controlPos(selection) {
				selection.on("mouseenter.pos", started)	
				selection.on("mousemove.pos", moved)
				selection.on("mouseout.pos", ended)	
		}
		
		// selection.call(controlPos)
		return controlPos
}		



exports.controlPos = controlPos

}));		
