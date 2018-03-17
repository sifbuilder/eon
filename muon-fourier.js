/***************************
 *        @muonFourier
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonFourier = global.muonFourier || {})))
}(this, function (exports) {
  'use strict'

// https://raw.githubusercontent.com/andymac-2/fourier-polygon/master/fourier-polygon.js
// https://github.com/andymac-2/fourier-polygon
// (C) 2018 Andrew Pritchard (MIT License)  
  
  
var muonFourier = function () {
    

let diagram,
  period,
  polyline,
    
  transform = [],
  centres = [],
  circles = [],
  svgPolyLine = null,
  endCircle = null,
  traced = null,
  
  tracedPath = "",
  endTime = null

    
    
let NS = "http://www.w3.org/2000/svg",
  margin = 1.3;
  
  
let updateTransform = function () {
  
  if (1 && 1) console.log("updateTransform")
    var N = polyline.length;
    var _transform = [];
    for (var k = 0; k < N; k++) {
        var current = Complex (0, 0);
        for (var n = 0; n < N; n++) {
            var coef = Complex (0, (-2) * Math.PI * k * n / N)
            let h = coef.exp().mul(polyline[n])
            current = current.add(h);
        }
        _transform.push(current);
    }
    transform = _transform;
};    
    
    
    
    
    
    
var FourierDiagram = function (_div, path, _period) {
    
    if (1 && 1) console.log("FourierDiagram")
      diagram = _div;
      period = _period * path.length;
    
    polyline = [];
    for (var i = 0; i < path.length; i++) {
        var point = path[i];
        polyline.push (Complex(point[0], point[1]));
    }

};



let draw = function (period) {
    this.diagram.innerHTML = "";
        
    var elemSVG = document.createElementNS(this.NS, "svg");
    elemSVG.setAttribute ("width", "600");
    elemSVG.setAttribute ("height", "600");
    elemSVG.setAttribute ("viewBox", this.bbox());
    
    this.diagram.appendChild (elemSVG);
    
    this.centres = [];
    this.circles = [];
    
    for (var i = 0; i < this.transform.length; i++) {
        var x = this.transform[i].re / this.transform.length;
        var y = this.transform[i].im / this.transform.length;
        var mag = Math.sqrt (x * x + y * y);
        
        var centre = document.createElementNS(this.NS, "circle");
        centre.setAttribute ("class", "centrePoint");
        centre.setAttribute ("cx", 0);
        centre.setAttribute ("cy", 0);
        centre.setAttribute ("r", "2");
        
        elemSVG.appendChild (centre);
        this.centres.push(centre);
        
        var circle = document.createElementNS(this.NS, "circle");
        circle.setAttribute ("class", "bigCircle");
        circle.setAttribute ("cx", 0);
        circle.setAttribute ("cy", 0);
        circle.setAttribute ("r", mag);
        
        elemSVG.appendChild (circle);
        this.circles.push(circle);
    }
    
    var endCircle = document.createElementNS(this.NS, "circle");
    endCircle.setAttribute ("class", "endCircle");
    endCircle.setAttribute ("cx", "0");
    endCircle.setAttribute ("cy", "0");
    endCircle.setAttribute ("r", "4");
    
    elemSVG.appendChild(endCircle);
    this.endCircle = endCircle;
    
    var polyline = document.createElementNS(this.NS, "polyline");
    polyline.setAttribute ("points", "0,0 ");
        
    elemSVG.appendChild (polyline);
    this.svgPolyLine = polyline;
    
    var traceline = document.createElementNS(this.NS, "polyline");
    traceline.setAttribute ("class", "traceLine");
    traceline.setAttribute ("points", "0,0 ");
        
    elemSVG.appendChild (traceline);
    this.traced = traceline;
    
    this.tracedPath = "";
    
    window.requestAnimationFrame(this.animate.bind(this));
};



let animate = function (time) {
    var acc = Complex (0, 0);
    var polyString = "0,0 ";
    
    var n = time % period;
    var N = transform.length;
    
    var nyquist = Math.floor (N / 2);
    
    var k = 0;
    
    for (var i = 0; i < N; k++, i++) {
        
        var x = acc.re / N;
        var y = acc.im / N;
        
        polyString += "" + x + "," + y + " ";
        
        this.circles[i].setAttribute ("cx", x);
        this.circles[i].setAttribute ("cy", y);
        
        this.centres[i].setAttribute ("cx", x);
        this.centres[i].setAttribute ("cy", y);
        
        if (i === nyquist) {
            k -= N;
        }
        
        var coef = Complex (0, (-2) * Math.PI * k * n / this.period);
        acc = acc.add(coef.exp().mul(this.transform[i]));
    }
    
    x = acc.re / N;
    y = acc.im / N;
    
    polyString += "" + x + "," + y;
    this.svgPolyLine.setAttribute ("points", polyString);
    
    this.endCircle.setAttribute ("cx", x);
    this.endCircle.setAttribute ("cy", y);
    
    this.tracedPath += " " + x + "," + y;
    this.traced.setAttribute ("points", this.tracedPath);
    
    if (this.endTime === null) {
        this.endTime = time + this.period;
    }
    
    if (time > this.endTime) {
        this.endTime = null;
        return;
    }
    
    window.requestAnimationFrame (this.animate.bind(this));
};


    
    /***************************
     *        @enty
     */
    let enty = function () {}

    enty.FourierDiagram = FourierDiagram
    enty.updateTransform = updateTransform
    enty.transform = () => transform


    return enty
  }

  exports.muonFourier = muonFourier
}))
