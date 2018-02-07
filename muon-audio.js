/***********
	 *		@muonAudio
	 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonAudio = global.muonAudio || {})))
}(this, function (exports) {
  'use strict'

  // alexmacy�s Block 41bf2c3727c59a3366528807c2c708b2
  // Updated March 30, 2017
  // ref.: https://bl.ocks.org/alexmacy/41bf2c3727c59a3366528807c2c708b2
  // Released under the The MIT License.

  var muonAudio = function (__mapper) {
	 var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
      oscillator = audioCtx.createOscillator(),
      gainNode = audioCtx.createGain(),
      analyser = audioCtx.createAnalyser()

    oscillator.connect(audioCtx.destination)
    gainNode.connect(audioCtx.destination)
    oscillator.connect(gainNode)
    oscillator.connect(analyser)

    var bufferLength = analyser.frequencyBinCount
    var dataArray = new Uint8Array(analyser.frequencyBinCount)

    gainNode.gain.value = -1
    oscillator.frequency.value = 0
    oscillator.start(0)

    var width = innerWidth,
      height = innerHeight

    // var scaleY = d3.scalePow().exponent(-.25).domain([height,10]).range([100,5000])
    var scaleY = d3.scalePow().exponent(-0.25).domain([height, 1]).range([100, 5000])

    var scaleX = d3.scaleLinear().domain([0, bufferLength]).range([0, width])
    // var gainScale = d3.scaleLinear().domain([0,width]).range([-1,0])
    var gainScale = d3.scaleLinear().domain([0, 60]).range([-1, 0])
    var octaves = [110, 220, 440, 880, 1760, 3520]

    var tickerHist = [0]

    var line = d3.line()
      .x(function (d, i) { return scaleX(i) })
      .y(function (d) { return (d - 122.5) * (gainNode.gain.value + 1) })

    var tickerHist = [0]

    oscStart()

    function oscStart () {
      if (oscillator.noteOn) oscillator.noteOn(0)
    }
    function oscStop () {
      oscillator.frequency.value = 0
      gainNode.gain.value = -1
      updateWave(100)
    }
    function oscChange () {
      ticker.attr('transform', `translate(${d3.event.pageX},0)`)
      oscillator.frequency.value = scaleY(d3.event.pageY)
      gainNode.gain.value = gainScale(d3.event.pageX)
      updateWave(1)
    }

    function updateWave (duration) {
      analyser.getByteTimeDomainData(dataArray)

      // waveShape.transition().duration(duration).ease(d3.easeLinear).attr("d",line)
      // freq.text(`Frequency: ${d3.format(',.0f')(oscillator.frequency.value)} Hz`);
    }

    function enty () { }

    enty.play = _ => {
      oscillator.frequency.value = scaleY(_.freq) // scaleY(d3.event.pageY)	// [100,5000]
      gainNode.gain.value = gainScale(_.gain) // d3.event.pageX)			// [-1,0]
      updateWave(1)
    }

    enty.stop = () => {
      oscillator.frequency.value = 0
      gainNode.gain.value = -1
      updateWave(100)
    }

    return enty
  }

  exports.muonAudio = muonAudio
}))
