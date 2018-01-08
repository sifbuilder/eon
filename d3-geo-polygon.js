(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-array'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3));
}(this, (function (exports,d3Array) { 'use strict';

// https://github.com/d3/d3-geo-polygon Version 1.0.1. Copyright 2017 Mike Bostock.

function noop() {}

var clipBuffer = function() {
  var lines = [],
      line;
  return {
    point: function(x, y, i, t) {
      var point = [x, y];
      // when called by clipPolygon, store index and t
      if (arguments.length > 2) { point.index = i; point.t = t; }
      line.push(point);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop,
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
};

var epsilon = 1e-6;
var epsilon2 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau = pi * 2;


var radians = pi / 180;

var abs = Math.abs;

var atan2 = Math.atan2;
var cos = Math.cos;





var sin = Math.sin;
var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sqrt = Math.sqrt;




function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

var pointEqual = function(a, b) {
  return abs(a[0] - b[0]) < epsilon && abs(a[1] - b[1]) < epsilon;
};

function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
var clipRejoin = function(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n, p0 = segment[0], p1 = segment[n], x;

    // If the first and last points of a segment are coincident, then treat as a
    // closed ring. TODO if all rings are closed, then the winding order of the
    // exterior ring should be checked.
    if (pointEqual(p0, p1)) {
      stream.lineStart();
      for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
      stream.lineEnd();
      return;
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });

  if (!subject.length) return;

  clip.sort(compareIntersection);
  link(subject);
  link(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
};

function link(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}

// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305â€“363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/

var adder = function() {
  return new Adder;
};

function Adder() {
  this.reset();
}

Adder.prototype = {
  constructor: Adder,
  reset: function() {
    this.s = // rounded value
    this.t = 0; // exact error
  },
  add: function(y) {
    add(temp, y, this.t);
    add(this, temp.s, this.s);
    if (this.s) this.t += temp.t;
    else this.s = temp.t;
  },
  valueOf: function() {
    return this.s;
  }
};

var temp = new Adder;

function add(adder, a, b) {
  var x = adder.s = a + b,
      bv = x - a,
      av = x - bv;
  adder.t = (a - av) + (b - bv);
}

function spherical(cartesian) {
  return [atan2(cartesian[1], cartesian[0]), asin(cartesian[2])];
}

function cartesian(spherical) {
  var lambda = spherical[0], phi = spherical[1], cosPhi = cos(phi);
  return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a




// TODO return d
function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

function cartesianEqual(a, b) {
  var dx = b[0] - a[0],
      dy = b[1] - a[1],
      dz = b[2] - a[2];
  return dx * dx + dy * dy + dz * dz < epsilon2 * epsilon2;
}

var sum = adder();

var polygonContains = function(polygon, point) {
  var lambda = point[0],
      phi = point[1],
      normal = [sin(lambda), -cos(lambda), 0],
      angle = 0,
      winding = 0;

  sum.reset();

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = point0[0],
        phi0 = point0[1] / 2 + quarterPi,
        sinPhi0 = sin(phi0),
        cosPhi0 = cos(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = point1[0],
          phi1 = point1[1] / 2 + quarterPi,
          sinPhi1 = sin(phi1),
          cosPhi1 = cos(phi1),
          delta = lambda1 - lambda0,
          sign$$1 = delta >= 0 ? 1 : -1,
          absDelta = sign$$1 * delta,
          antimeridian = absDelta > pi,
          k = sinPhi0 * sinPhi1;

      sum.add(atan2(k * sign$$1 * sin(absDelta), cosPhi0 * cosPhi1 + k * cos(absDelta)));
      angle += antimeridian ? delta + sign$$1 * tau : delta;

      // Are the longitudes either side of the pointâ€™s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = cartesianCross(cartesian(point0), cartesian(point1));
        cartesianNormalizeInPlace(arc);
        var intersection = cartesianCross(normal, arc);
        cartesianNormalizeInPlace(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -epsilon || angle < epsilon && sum < -epsilon) ^ (winding & 1);
};

var clip = function(pointVisible, clipLine, interpolate, start, sort) {
  if (typeof sort === "undefined") sort = compareIntersection;

  return function(sink) {
    var line = clipLine(sink),
        ringBuffer = clipBuffer(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = d3Array.merge(segments);
        var startInside = polygonContains(polygon, start);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          clipRejoin(segments, sort, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      if (pointVisible(lambda, phi)) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi, close) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi, close);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1], true);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
};

function validSegment(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon : halfPi - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon : halfPi - b[1]);
}

function intersectSegment(from, to) {
  this.from = from, this.to = to;
  this.normal = cartesianCross(from, to);
  this.fromNormal = cartesianCross(this.normal, from);
  this.toNormal = cartesianCross(this.normal, to);
}

var epsilon3 = 1e-18;

// >> here a and b are segments processed by intersectSegment
function intersect(a, b) {
  var axb = cartesianCross(a.normal, b.normal);
  cartesianNormalizeInPlace(axb);
  var a0 = cartesianDot(axb, a.fromNormal),
      a1 = cartesianDot(axb, a.toNormal),
      b0 = cartesianDot(axb, b.fromNormal),
      b1 = cartesianDot(axb, b.toNormal);

  if (a0 > -epsilon3 && a1 < epsilon3 && b0 > -epsilon3 && b1 < epsilon3) {
    return axb;
  }

  if (a0 < epsilon3 && a1 > -epsilon3 && b0 < epsilon3 && b1 > -epsilon3) {
    axb[0] = -axb[0], axb[1] = -axb[1], axb[2] = -axb[2];
    return axb;
  }
}

function intersectPointOnLine(p, a) {
  var a0 = cartesianDot(p, a.fromNormal),
      a1 = cartesianDot(p, a.toNormal);
  p = cartesianDot(p, a.normal);

  return abs(p) < epsilon2 && (a0 > -epsilon2 && a1 < epsilon2 || a0 < epsilon2 && a1 > -epsilon2);
}

var intersectCoincident = {};


// todo: publicly expose d3.geoIntersect(segment0, segment1) ??
// cf. https://github.com/d3/d3/commit/3dbdf87974dc2588c29db0533a8500ccddb25daa#diff-65daf69cea7d039d72c1eca7c13326b0

var clipNone = function(stream) { return stream; };

// clipPolygon
var polygon = function (p) {
  var segments = [];

  if (p.type != "Polygon") return clipNone; // todo: MultiPolygon?

  var polygon = p.coordinates.map(function(ring) {
    var c, c0;
    ring = ring.map(function(point, i) {
      c = cartesian(point = [point[0] * radians, point[1] * radians]);
      if (i) segments.push(new intersectSegment(c0, c));
      c0 = c;
      return point;
    });
    ring.pop();
    return ring;
  });


  function visible(lambda, phi) {
    return polygonContains(polygon, [lambda, phi]);
  }

  function clipLine(stream) {
    var point0,
        lambda00,
        phi00,
        v00,
        v0,
        clean;
    return {
      lineStart: function() {
        point0 = null;
        clean = 1;
      },
      point: function(lambda, phi, close) {
        if (cos(lambda) == -1) lambda -= sign(sin(lambda)) * 1e-5; // move away from -180/180 https://github.com/d3/d3-geo/pull/108#issuecomment-323798937
        if (close) lambda = lambda00, phi = phi00;
        var point = cartesian([lambda, phi]),
            v = v0,
            intersection,
            i, j, s, t;
        if (point0) {
          var segment = new intersectSegment(point0, point),
              intersections = [];
          for (i = 0, j = 100; i < segments.length && j > 0; ++i) {
            s = segments[i];
            intersection = intersect(segment, s);
            if (intersection) {
              if (intersection === intersectCoincident ||
                  cartesianEqual(intersection, point0) || cartesianEqual(intersection, point) ||
                  cartesianEqual(intersection, s.from) || cartesianEqual(intersection, s.to)) {
                t = 1e-4;
                lambda = (lambda + 3 * pi + (Math.random() < .5 ? t : -t)) % (2 * pi) - pi;
                phi = Math.min(pi / 2 - 1e-4, Math.max(1e-4 - pi / 2, phi + (Math.random() < .5 ? t : -t)));
                segment = new intersectSegment(point0, point = cartesian([lambda, phi]));
                i = -1, --j;
                intersections.length = 0;
                continue;
              }
              var sph = spherical(intersection);
              intersection.distance = clipPolygonDistance(point0, intersection);
              intersection.index = i;
              intersection.t = clipPolygonDistance(s.from, intersection);
              intersection[0] = sph[0], intersection[1] = sph[1], intersection.pop();
              intersections.push(intersection);
            }
          }
          if (intersections.length) {
            clean = 0;
            intersections.sort(function(a, b) { return a.distance - b.distance; });
            for (i = 0; i < intersections.length; ++i) {
              intersection = intersections[i];
              v = !v;
              if (v) {
                stream.lineStart();
                stream.point(intersection[0], intersection[1], intersection.index, intersection.t);
              } else {
                stream.point(intersection[0], intersection[1], intersection.index, intersection.t);
                stream.lineEnd();
              }
            }
          }
          if (v) stream.point(lambda, phi);
        } else {
          for (i = 0, j = 100; i < segments.length && j > 0; ++i) {
            s = segments[i];
            if (intersectPointOnLine(point, s)) {
              t = 1e-4;
              lambda = (lambda + 3 * pi + (Math.random() < .5 ? t : -t)) % (2 * pi) - pi;
              phi = Math.min(pi / 2 - 1e-4, Math.max(1e-4 - pi / 2, phi + (Math.random() < .5 ? t : -t)));
              point = cartesian([lambda, phi]);
              i = -1, --j;
            }
          }
          v00 = v = visible(lambda00 = lambda, phi00 = phi);
          if (v) stream.lineStart(), stream.point(lambda, phi);
        }
        point0 = point, v0 = v;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  function interpolate(from, to, direction, stream) {
    if (from == null) {
      var n = polygon.length;
      polygon.forEach(function(ring, i) {
        ring.forEach(function(point) { stream.point(point[0], point[1]); });
        if (i < n - 1) stream.lineEnd(), stream.lineStart();
      });
    } else if (from.index !== to.index && from.index != null && to.index != null) {
      for (var i = from.index; i !== to.index; i = (i + direction + segments.length) % segments.length) {
        var segment = segments[i],
            point = spherical(direction > 0 ? segment.to : segment.from);
        stream.point(point[0], point[1]);
      }
    }
  }

  return clip(visible, clipLine, interpolate, polygon[0][0], clipPolygonSort);
};

function clipPolygonSort(a, b) {
  a = a.x, b = b.x;
  return a.index - b.index || a.t - b.t;
}

// Geodesic coordinates for two 3D points.
function clipPolygonDistance(a, b) {
  var axb = cartesianCross(a, b);
  return atan2(sqrt(cartesianDot(axb, axb)), cartesianDot(a, b));
}

exports.geoClipPolygon = polygon;

Object.defineProperty(exports, '__esModule', { value: true });

})));
