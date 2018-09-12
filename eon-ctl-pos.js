/**********************
   *    @ctlPos
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.ctlPos = global.ctlPos || {})))
}(this, function (exports) {
  'use strict'

  async function ctlPos (__mapper) {
    let [
      d3,
    ] = await Promise.all([
      __mapper('xs').b('d3'),
    ])

    let d3selection = d3

    let cameraProjer // projection camera

    function prevent (e) {}

    function started (d) {}

    function moved (d) {
      function createPostipElem () {
        d3selection.select('body')
          .selectAll('g.refs')
          .data(['refs'])
          .enter()
          .insert('g', 'refs')
          .attr('class', 'refs')

        d3selection.select('g.refs')
          .selectAll('div.postip')
          .data(['divMousePos'])
          .enter()
          .append('div')
          .attr('class', 'postip')
          .call(drawPostipElem)
      }

      function drawPostipElem (postip) {
        postip
          .attr('viewBox', '0 0 0 0')
          .style('top', '-0px')
          .style('position', 'absolute')
          .style('padding', '0px')
          .style('background', 'rgba(255, 255, 255, .999)')
          .style('border', '1px solid lightgray')
          .style('pointer-events', 'none')
          .style('z-index', '100')
          .style('border', '1px solid orange')
          .style('color', 'grey')
          .classed('postip-hidden', true)
          .style('opacity', 0)
      }

      function textPadFn (a) {
        var s = String('___' + Math.floor(a.ox) + ' : ' + Math.floor(a.oy) + '___')
        return s
      }

      // https://github.com/1wheel/swoopy-drag/blob/master/lib/d3selection-jetpack.js
      function displayTextPad (a) {
        d3selection.select('.postip')
          .classed('postip-hidden', false)
          .style('opacity', 1)
          .html('')
          .selectAll('div')
          .data([textPadFn]).enter()
          .append('div')
          .html(function (textPadFn) {
            return (textPadFn(a))
          })
      }

      function moveTextPad (node) {
        var postip = d3selection.select('div.postip')
        if (!postip.size()) return
        var e = d3selection.event,
          x = e.clientX,
          y = e.clientY,
          doctop = (window.scrollY) ? window.scrollY : (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop,
          n = postip.node(),
          nBB = n.getBoundingClientRect()
        postip.style('top', (y + doctop - nBB.height - 18) + 'px')
        postip.style('left', Math.min(Math.max(0, (x - nBB.width / 2)), window.innerWidth - nBB.width) + 'px')

        prevent(e)
      }

      var node = this, // elem
        parent = node.parentNode,

        // origin = d3.mouse(parent),
        // var action = {ox: origin[0], oy: origin[1]}

        t = cameraProjer.invert(d3selection.mouse(parent))
      var action = {ox: t[0], oy: t[1]}

      createPostipElem()
      displayTextPad(action)
      moveTextPad(node)
    }

    function ended (d) {
      d3selection.select('div.postip')
        .classed('postip-hidden', true)
        .style('opacity', 0)
      d3selection.selectAll('.postipped')
        .classed('postipped', false)
    }

    // ......................... enty
    function enty (selection) {
      selection.on('mouseenter.pos', started)
      selection.on('mousemove.pos', moved)
      selection.on('mouseout.pos', ended)
    }

    return enty
  }

  exports.ctlPos = ctlPos
}))
