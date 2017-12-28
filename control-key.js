/* -------------------------- */		
/*     controlKey	        		*/
/* -------------------------- */	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.controlKey = global.controlKey || {})));
}(this, function (exports) { 'use strict';

	var keys = []
	
	function controlKey(payload) {
		
		var currentListeners = []
		var nextListeners = currentListeners
		
		var __currentListeners = {}
		var __nextListeners = __currentListeners

	// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners(target) {
			if (nextListeners === currentListeners) {
				nextListeners = currentListeners.slice()
			}
			
			if (target && __nextListeners[target]){
				if (__nextListeners[target] === __currentListeners[target]) {
					__nextListeners[target] = __currentListeners[target].slice()
				}			
			}
		}
		
	// ____________________ pauseEvent
	function pauseEvent(e){
						if(e.stopPropagation) e.stopPropagation()
						if(e.preventDefault) e.preventDefault()
						e.cancelBubble=true
						e.returnValue=false
						return false
				}			
	// ____________________ controlAction
	var controlAction = function controlAction(e) {
			pauseEvent(e)
			var listeners = currentListeners = nextListeners
			for (var i = 0; i < listeners.length; i++) {
				listeners[i](e)
			}									
		}

		// ____________________ subscribe
		let subscribe = function subscribe (listener, target) {
			// console.log(" -------  control key subscribe", listener.name)
			
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners(target)
			nextListeners.push(listener)
			
					if (target) {
						if (typeof __nextListeners[target] === "undefined") __nextListeners[target] = []
						__nextListeners[target].push(listener)							
					}
			
			return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
				
				
				if (target) {
							var index = __nextListeners[target].indexOf(listener)
							__nextListeners[target].splice(index, 1)
				}
			}
		}
		
	// ____________________ handleKeyDown
		// https://www.kirupa.com/html5/keyboard_events_in_javascript.htm
		// https://github.com/gaearon/redux-devtools-dock-monitor
		var handleKeyDown = function handleKeyDown(event) {
		
		
		switch (event.key) {
    case "ArrowLeft":
    case "Left": // hack for IE and old Gecko
				if (event.getModifierState("Alt")) {
					leftArrowAlt()
					event.preventDefault()
					break
				}
    case "ArrowRight":
    case "Right": // hack for IE and old Gecko
				if (event.getModifierState("Alt")) {
					rightArrowAlt()
					event.preventDefault()
					break
				}
    case "ArrowUp":
    case "Up": // hack for IE and old Gecko
				if (event.getModifierState("Alt")) {
					upArrowAlt()
					event.preventDefault()
					break
				}
    case "ArrowDown":
    case "Down": // hack for IE and old Gecko
				if (event.getModifierState("Alt")) {
					downArrowAlt()
					event.preventDefault()
					break
				}
		}
		
			// event.stopPropagation()
			// event.preventDefault()
			// keys[event.keyCode] = true // console.log("___ keys", keys, event)	
			// if 				(keys[70] && keys[17])					fKeyCtrl()				// CTRL-f
				// else if (keys[68] && keys[17])					dKeyCtrl()				// CTRL-d
				// else if (event.keyCode == '37' &&  keys[17]) leftArrowCtrl() 	// CTRL-LEFT
				// else if (event.keyCode == '39' &&  keys[17]) rightArrowCtrl()	// CTRL-RIGHT
				// else if (event.keyCode == '38' &&  keys[17]) upArrowCtrl()		// CTRL-UP
				// else if (event.keyCode == '40' &&  keys[17]) downArrowCtrl()	// CTRL-DOWN
		}	
		// ____________________ fKeyCtrl
		var fKeyCtrl = function fKeyCtrl() {		// change view
				// // Ctrl 17 + Shift 16  + f 70
		}
			// ____________________ dKeyCtrl
		var dKeyCtrl = function dKeyCtrl() {		// change debug mode
				// // Ctrl 17 + Shift 16  + d 68
		}
		// ____________________ handleKeyPressed
		var handleKeyPressed = function handleKeyPressed(e) {
		}			
		// ____________________ handleKeyReleased
		var handleKeyReleased = function handleKeyReleased(e) {
						keys[e.keyCode] = false
		}	
/* -------------------------- 	*/		
/*        event actions 				*/		
/* -------------------------- 	*/
		// ____________________ leftArrowAlt
		var leftArrowAlt = function leftArrowAlt(e) {
			console.log("leftArrowAltFn")
			
				var listeners = __currentListeners["leftArrowAlt"] = __nextListeners["leftArrowAlt"]
				for (var i = 0; i < listeners.length; i++) {
					listeners[i](e)
				}			
		}
		// ____________________ rightArrowAlt
		var rightArrowAlt = function rightArrowAlt(e) {
			
				// var listeners = currentListeners = nextListeners
				// for (var i = 0; i < listeners.length; i++) {
					// listeners[i](e)
				// }				


			var listeners = __currentListeners["rightArrowAlt"] = __nextListeners["rightArrowAlt"]
				for (var i = 0; i < listeners.length; i++) {
					listeners[i](e)
				}				
		}
		// ____________________ upArrowAlt
		var upArrowAlt = function upArrowAlt() {
			console.log("upArrowAltFn")
		}
			// ____________________ downArrowAlt
		var downArrowAlt = function downArrowAlt() {
			console.log("downArrowAltFn")
		}

		// ____________________ leftArrowCtrl
		var leftArrowCtrl = function leftArrowCtrl(e) {
			console.log("leftArrowCtrlFn")
			
					var listeners = __currentListeners["leftArrowCtrl"] = __nextListeners["leftArrowCtrl"]
					for (var i = 0; i < listeners.length; i++) {
						listeners[i](e)
					}			
		}
		// ____________________ rightArrowCtrl
		var rightArrowCtrl = function rightArrowCtrl(e) {
			console.log("rightArrowCtrlFn")
			
			
				// var listeners = currentListeners = nextListeners
				// for (var i = 0; i < listeners.length; i++) {
					// listeners[i](e)
				// }				


			var listeners = __currentListeners["rightArrowCtrl"] = __nextListeners["rightArrowCtrl"]
				for (var i = 0; i < listeners.length; i++) {
					listeners[i](e)
				}				
		}
		// ____________________ upArrowCtrl
		var upArrowCtrl = function upArrowCtrl() {
			console.log("upArrowCtrlFn")
		}
			// ____________________ downArrowCtrl
		var downArrowCtrl = function downArrowCtrl() {
			console.log("downArrowCtrlFn")
		}
		// ____________________ controlfn
	  function controlfn() {
 		}		
		
/* -------------------------- */		
/*     enty	       			 		*/
/* -------------------------- */
		function enty() {}
		enty.subscribe = subscribe
		enty.start = function start(svg) {
			
			document.addEventListener("keydown", handleKeyDown, false)
			document.addEventListener("keypress", handleKeyPressed, false)
			document.addEventListener("keyup", handleKeyReleased, false)
			
			return enty
		}	
		
		return enty
	}

exports.controlKey = controlKey

}));		
