/* ******************************************
   *    @eonZ793gTruncatedDodecahedron
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ793gTruncatedDodecahedron = global.eonZ793gTruncatedDodecahedron || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  let [
    d3,
    d3Geo,
    THREE,
    eonCtlWen,
    eonEohalMars,
    eonEohalSol,
    eonEohalTextform,
    eonMuonGeom,
    eonMuonNatform,
    eonMuonNets,
    eonMuonProps,
    eonMuonGeovoro,
    eonRenderPortview,
    eonRenderWebgl,
  ] = await Promise.all([
    __eo('xs').b('d3'),
    __eo('xs').b('d3-geo'),
    __eo('xs').b('three'),
    __eo('xs').b('eon-ctl-wen'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-eohal-sol'),
    __eo('xs').b('eon-eohal-textform'),
    __eo('xs').b('eon-muon-geom'),
    __eo('xs').b('eon-muon-natform'),
    __eo('xs').b('eon-muon-nets'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-muon-geovoro'),
    __eo('xs').b('eon-render-portview'),
    __eo('xs').b('eon-render-webgl'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  let z = function () {
  // .................. pics

    let epsilon = 1e-6, epsilon2 = epsilon * epsilon, asin = Math.asin
    let atan = Math.atan, abs = Math.abs
    let pi = Math.PI, degrees = 180 / pi, asin1_3 = Math.asin(1 / 3)
    let sqrt = Math.sqrt
    let theta = atan(0.5) * degrees,
      sin = Math.sin, cos = Math.cos

    const eotim = {'td': 9800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

    let def = `
:name
truncated dodecahedron
:number
17
:symbol
t{5,3}	@T sub 5 @
:dual
triakis icosahedron
:sfaces
42 30{3} 12{10}
:svertices
60 60(@3@.@10 sup 2@)
:net
32 10
10 79 89 93 96 97 94 90 80 74 73
3 66 73 74
10 52 59 72 78 79 73 60 53 48 47
3 41 48 53
3 82 89 79
10 98 106 107 99 93 89 85 84 88 92
3 77 88 84
3 102 96 93
10 117 115 111 105 97 96 104 110 114 116
3 113 114 110
3 103 94 97
10 95 91 87 86 90 94 100 108 109 101
3 112 109 108
3 83 80 90
10 50 49 54 61 74 80 81 75 62 55
3 71 62 75
10 27 37 43 44 38 28 24 21 20 23
3 14 23 20
10 22 26 30 31 27 23 17 9 8 16
3 5 8 9
3 34 37 27
10 67 68 63 56 43 37 36 42 55 62
3 46 55 42
3 51 44 43
10 65 58 45 39 38 44 57 64 69 70
3 76 69 64
3 35 28 38
10 19 11 10 18 24 28 32 33 29 25
3 40 29 33
3 15 21 24
10 0 2 6 12 20 21 13 7 3 1
3 4 3 7
:hinges
31
1 1 0 8 2.489234513805425
2 4 0 9 2.0344439357957027
3 1 2 7 2.489234513805425
4 1 0 0 2.489234513805425
5 4 0 1 2.0344439357957027
6 1 5 7 2.489234513805425
7 1 0 2 2.489234513805425
8 4 0 3 2.0344439357957027
9 1 8 7 2.489234513805425
10 1 0 4 2.489234513805425
11 4 0 5 2.0344439357957027
12 1 11 7 2.489234513805425
13 1 0 6 2.489234513805425
14 4 0 7 2.0344439357957027
15 1 14 7 2.489234513805425
17 1 16 8 2.489234513805425
18 4 16 9 2.0344439357957027
19 1 18 7 2.489234513805425
20 1 16 0 2.489234513805425
21 4 16 1 2.0344439357957027
22 1 21 7 2.489234513805425
23 1 16 2 2.489234513805425
24 4 16 3 2.0344439357957027
25 1 24 7 2.489234513805425
26 1 16 4 2.489234513805425
27 4 16 5 2.0344439357957027
28 1 27 7 2.489234513805425
29 1 16 6 2.489234513805425
30 4 16 7 2.0344439357957027
31 1 30 7 2.489234513805425
14 8 21 8 2.0344439357957027
:dih
2
60 3 10 2.489234513805425
30 10 10 2.0344439357957027
:vertices
118
-8.7198614886411601[(1/6)*sqrt(3)+(-5/4+(-1/2)*sqrt(5))*sqrt(10+2*sqrt(5))] 6.04508497187474[(13/4+(5/4)*sqrt(5))] 0[0]
-8.7198614886411601[(1/6)*sqrt(3)+(-5/4+(-1/2)*sqrt(5))*sqrt(10+2*sqrt(5))] 7.04508497187474[(17/4+(5/4)*sqrt(5))] 0[0]
-8.13207623634868[(1/6)*sqrt(3)+(-11/8+(-3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 5.23606797749979[(3+sqrt(5))] 0[0]
-8.13207623634868[(1/6)*sqrt(3)+(-11/8+(-3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 7.85410196624968[(9/2+(3/2)*sqrt(5))] 0[0]
-7.92416454553092[((7/24)*sqrt(3)+(-1/8)*sqrt(15))+(-5/4+(-3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 8.83224956698349[(35/8+(13/8)*sqrt(5))+(1/8)*sqrt(3)*sqrt(10+2*sqrt(5))] 0[0]
-7.45925987154549[(-1/3)*sqrt(3)+(-5/4+(-1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] 3.61803398874989[(5/2+(1/2)*sqrt(5))] 0[0]
-7.18101972005353[(1/6)*sqrt(3)+(-9/8+(-3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 4.92705098312484[(13/4+(3/4)*sqrt(5))] 0[0]
-7.18101972005353[(1/6)*sqrt(3)+(-9/8+(-3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 8.1631189606246299[(17/4+(7/4)*sqrt(5))] 0[0]
-6.59323446776106[(1/6)*sqrt(3)+(-5/4+(-1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] 3.11803398874989[(2+(1/2)*sqrt(5))] 0[0]
-6.59323446776106[(1/6)*sqrt(3)+(-5/4+(-1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] 4.11803398874989[(3+(1/2)*sqrt(5))] 0[0]
-6.59323446776106[(1/6)*sqrt(3)+(-5/4+(-1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] 8.9721359549995801[(9/2+2*sqrt(5))] 0[0]
-6.59323446776106[(1/6)*sqrt(3)+(-5/4+(-1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] 9.9721359549995801[(11/2+2*sqrt(5))] 0[0]
-6.22996320375838[(1/6)*sqrt(3)+(-7/8+(-3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 5.23606797749979[(3+sqrt(5))] 0[0]
-6.22996320375838[(1/6)*sqrt(3)+(-7/8+(-3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 7.85410196624968[(9/2+(3/2)*sqrt(5))] 0[0]
-6.0489145945417[((1/24)*sqrt(3)+(-1/8)*sqrt(15))+(-17/16+(-3/16)*sqrt(5))*sqrt(10+2*sqrt(5))] 5.1315395142321401[(25/8+(9/8)*sqrt(5))+((1/16)*sqrt(3)+(-1/16)*sqrt(15))*sqrt(10+2*sqrt(5))] 0[0]
-6.0489145945417[((1/24)*sqrt(3)+(-1/8)*sqrt(15))+(-17/16+(-3/16)*sqrt(5))*sqrt(10+2*sqrt(5))] 7.95863042951734[(35/8+(11/8)*sqrt(5))+((-1/16)*sqrt(3)+(1/16)*sqrt(15))*sqrt(10+2*sqrt(5))] 0[0]
-6.00544921546858[(1/6)*sqrt(3)+(-11/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 2.30901699437495[(7/4+(1/4)*sqrt(5))] 0[0]
-6.00544921546858[(1/6)*sqrt(3)+(-11/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 4.92705098312484[(13/4+(3/4)*sqrt(5))] 0[0]
-6.00544921546858[(1/6)*sqrt(3)+(-11/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 8.1631189606246299[(17/4+(7/4)*sqrt(5))] 0[0]
-6.00544921546858[(1/6)*sqrt(3)+(-11/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 10.7811529493745[(23/4+(9/4)*sqrt(5))] 0[0]
-5.6421779514659[(1/6)*sqrt(3)+(-1+(-1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] 6.04508497187474[(13/4+(5/4)*sqrt(5))] 0[0]
-5.6421779514659[(1/6)*sqrt(3)+(-1+(-1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] 7.04508497187474[(17/4+(5/4)*sqrt(5))] 0[0]
-5.05439269917343[(1/6)*sqrt(3)+(-9/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 2[2] 0[0]
-5.05439269917343[(1/6)*sqrt(3)+(-9/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 5.23606797749979[(3+sqrt(5))] 0[0]
-5.05439269917343[(1/6)*sqrt(3)+(-9/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 7.85410196624968[(9/2+(3/2)*sqrt(5))] 0[0]
-5.05439269917343[(1/6)*sqrt(3)+(-9/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 11.0901699437495[(11/2+(5/2)*sqrt(5))] 0[0]
-4.10333618287827[(1/6)*sqrt(3)+(-7/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 2.30901699437495[(7/4+(1/4)*sqrt(5))] 0[0]
-4.10333618287827[(1/6)*sqrt(3)+(-7/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 4.92705098312484[(13/4+(3/4)*sqrt(5))] 0[0]
-4.10333618287827[(1/6)*sqrt(3)+(-7/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 8.1631189606246299[(17/4+(7/4)*sqrt(5))] 0[0]
-4.10333618287827[(1/6)*sqrt(3)+(-7/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 10.7811529493745[(23/4+(9/4)*sqrt(5))] 0[0]
-3.5155509305858[(1/6)*sqrt(3)-1*sqrt(10+2*sqrt(5))] 3.11803398874989[(2+(1/2)*sqrt(5))] 0[0]
-3.5155509305858[(1/6)*sqrt(3)-1*sqrt(10+2*sqrt(5))] 4.11803398874989[(3+(1/2)*sqrt(5))] 0[0]
-3.5155509305858[(1/6)*sqrt(3)-1*sqrt(10+2*sqrt(5))] 8.9721359549995801[(9/2+2*sqrt(5))] 0[0]
-3.5155509305858[(1/6)*sqrt(3)-1*sqrt(10+2*sqrt(5))] 9.9721359549995801[(11/2+2*sqrt(5))] 0[0]
-3.36019135740088[((1/24)*sqrt(3)+(1/8)*sqrt(15))+(-3/4+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 4.25792037676598[(25/8+(7/8)*sqrt(5))+(-1/8)*sqrt(3)*sqrt(10+2*sqrt(5))] 0[0]
-3.36019135740088[((1/24)*sqrt(3)+(1/8)*sqrt(15))+(-3/4+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 8.83224956698349[(35/8+(13/8)*sqrt(5))+(1/8)*sqrt(3)*sqrt(10+2*sqrt(5))] 0[0]
-3.15227966658312[(1/6)*sqrt(3)+(-5/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 4.23606797749979[(2+sqrt(5))] 0[0]
-3.15227966658312[(1/6)*sqrt(3)+(-5/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 5.23606797749979[(3+sqrt(5))] 0[0]
-3.15227966658312[(1/6)*sqrt(3)+(-5/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 7.85410196624968[(9/2+(3/2)*sqrt(5))] 0[0]
-3.15227966658312[(1/6)*sqrt(3)+(-5/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 8.85410196624968[(11/2+(3/2)*sqrt(5))] 0[0]
-3.10881428751[((7/24)*sqrt(3)+(1/8)*sqrt(15))+(-15/16+(-1/16)*sqrt(5))*sqrt(10+2*sqrt(5))] 10.8856814126422[(45/8+(17/8)*sqrt(5))+((-1/16)*sqrt(3)+(1/16)*sqrt(15))*sqrt(10+2*sqrt(5))] 0[0]
-2.60795979336377[((1/24)*sqrt(3)+(-1/8)*sqrt(15))+(-7/16+(-1/16)*sqrt(5))*sqrt(10+2*sqrt(5))] -.395471536732346[(-5/8+(-1/8)*sqrt(5))+((-1/16)*sqrt(3)+(1/16)*sqrt(15))*sqrt(10+2*sqrt(5))] 0[0]
-2.56449441429065[(1/6)*sqrt(3)-3/4*sqrt(10+2*sqrt(5))] 3.42705098312484[(7/4+(3/4)*sqrt(5))] 0[0]
-2.56449441429065[(1/6)*sqrt(3)-3/4*sqrt(10+2*sqrt(5))] 6.04508497187474[(13/4+(5/4)*sqrt(5))] 0[0]
-2.56449441429065[(1/6)*sqrt(3)-3/4*sqrt(10+2*sqrt(5))] 7.04508497187474[(17/4+(5/4)*sqrt(5))] 0[0]
-2.56449441429065[(1/6)*sqrt(3)-3/4*sqrt(10+2*sqrt(5))] 9.6631189606246299[(23/4+(7/4)*sqrt(5))] 0[0]
-2.35658272347289[((7/24)*sqrt(3)+(-1/8)*sqrt(15))-5/8*sqrt(10+2*sqrt(5))] 2.44890338239104[(15/8+(5/8)*sqrt(5))+(-1/8)*sqrt(3)*sqrt(10+2*sqrt(5))] 0[0]
-2.20122315028797[(1/6)*sqrt(3)+(-3/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -2.30901699437495[(-7/4+(-1/4)*sqrt(5))] 0[0]
-2.20122315028797[(1/6)*sqrt(3)+(-3/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -1.30901699437495[(-3/4+(-1/4)*sqrt(5))] 0[0]
-2.20122315028797[(1/6)*sqrt(3)+(-3/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 1.30901699437495[(3/4+(1/4)*sqrt(5))] 0[0]
-2.20122315028797[(1/6)*sqrt(3)+(-3/8+(-1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 2.30901699437495[(7/4+(1/4)*sqrt(5))] 0[0]
-1.69846901050621[(2/3)*sqrt(3)-3/4*sqrt(10+2*sqrt(5))] 6.54508497187474[(15/4+(5/4)*sqrt(5))] 0[0]
-1.61343789799549[(1/6)*sqrt(3)-1/2*sqrt(10+2*sqrt(5))] -3.11803398874989[(-2+(-1/2)*sqrt(5))] 0[0]
-1.61343789799549[(1/6)*sqrt(3)-1/2*sqrt(10+2*sqrt(5))] -.5[-1/2] 0[0]
-1.61343789799549[(1/6)*sqrt(3)-1/2*sqrt(10+2*sqrt(5))] .5[1/2] 0[0]
-1.61343789799549[(1/6)*sqrt(3)-1/2*sqrt(10+2*sqrt(5))] 3.11803398874989[(2+(1/2)*sqrt(5))] 0[0]
-1.61343789799549[(1/6)*sqrt(3)-1/2*sqrt(10+2*sqrt(5))] 6.35410196624968[(3+(3/2)*sqrt(5))] 0[0]
-1.61343789799549[(1/6)*sqrt(3)-1/2*sqrt(10+2*sqrt(5))] 6.73606797749979[(9/2+sqrt(5))] 0[0]
-1.61343789799549[(1/6)*sqrt(3)-1/2*sqrt(10+2*sqrt(5))] 9.9721359549995801[(11/2+2*sqrt(5))] 0[0]
-.662381381700341[(1/6)*sqrt(3)-1/4*sqrt(10+2*sqrt(5))] -3.42705098312484[(-7/4+(-3/4)*sqrt(5))] 0[0]
-.662381381700341[(1/6)*sqrt(3)-1/4*sqrt(10+2*sqrt(5))] -.190983005625053[(-3/4+(1/4)*sqrt(5))] 0[0]
-.662381381700341[(1/6)*sqrt(3)-1/4*sqrt(10+2*sqrt(5))] .190983005625053[(3/4+(-1/4)*sqrt(5))] 0[0]
-.662381381700341[(1/6)*sqrt(3)-1/4*sqrt(10+2*sqrt(5))] 3.42705098312484[(7/4+(3/4)*sqrt(5))] 0[0]
-.662381381700341[(1/6)*sqrt(3)-1/4*sqrt(10+2*sqrt(5))] 6.04508497187474[(13/4+(5/4)*sqrt(5))] 0[0]
-.662381381700341[(1/6)*sqrt(3)-1/4*sqrt(10+2*sqrt(5))] 7.04508497187474[(17/4+(5/4)*sqrt(5))] 0[0]
-.662381381700341[(1/6)*sqrt(3)-1/4*sqrt(10+2*sqrt(5))] 9.6631189606246299[(23/4+(7/4)*sqrt(5))] 0[0]
-.577350269189626[(-1/3)*sqrt(3)] 0[0] 0[0]
-.074596129407867501[(1/6)*sqrt(3)+(-3/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 4.23606797749979[(2+sqrt(5))] 0[0]
-.074596129407867501[(1/6)*sqrt(3)+(-3/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 5.23606797749979[(3+sqrt(5))] 0[0]
-.074596129407867501[(1/6)*sqrt(3)+(-3/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 7.85410196624968[(9/2+(3/2)*sqrt(5))] 0[0]
-.074596129407867501[(1/6)*sqrt(3)+(-3/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 8.85410196624968[(11/2+(3/2)*sqrt(5))] 0[0]
.080763443777053501[((1/24)*sqrt(3)+(1/8)*sqrt(15))-1/8*sqrt(10+2*sqrt(5))] 4.0961815894837[(15/8+(5/8)*sqrt(5))+(1/8)*sqrt(3)*sqrt(10+2*sqrt(5))] 0[0]
.288675134594813[(1/6)*sqrt(3)] -3.11803398874989[(-2+(-1/2)*sqrt(5))] 0[0]
.288675134594813[(1/6)*sqrt(3)] -.5[-1/2] 0[0]
.288675134594813[(1/6)*sqrt(3)] .5[1/2] 0[0]
.288675134594813[(1/6)*sqrt(3)] 3.11803398874989[(2+(1/2)*sqrt(5))] 0[0]
.332140513667933[((7/24)*sqrt(3)+(1/8)*sqrt(15))+(-5/16+(1/16)*sqrt(5))*sqrt(10+2*sqrt(5))] 6.94055650860708[(35/8+(11/8)*sqrt(5))+((1/16)*sqrt(3)+(-1/16)*sqrt(15))*sqrt(10+2*sqrt(5))] 0[0]
.832995007814166[((1/24)*sqrt(3)+(-1/8)*sqrt(15))+(3/16+(1/16)*sqrt(5))*sqrt(10+2*sqrt(5))] -4.34059644076744[(-15/8+(-7/8)*sqrt(5))+((1/16)*sqrt(3)+(-1/16)*sqrt(15))*sqrt(10+2*sqrt(5))] 0[0]
.876460386887286[(1/6)*sqrt(3)+(-1/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -2.30901699437495[(-7/4+(-1/4)*sqrt(5))] 0[0]
.876460386887286[(1/6)*sqrt(3)+(-1/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -1.30901699437495[(-3/4+(-1/4)*sqrt(5))] 0[0]
.876460386887286[(1/6)*sqrt(3)+(-1/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 1.30901699437495[(3/4+(1/4)*sqrt(5))] 0[0]
.876460386887286[(1/6)*sqrt(3)+(-1/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 2.30901699437495[(7/4+(1/4)*sqrt(5))] 0[0]
1.08437207770505[((7/24)*sqrt(3)+(-1/8)*sqrt(15))+(1/8)*sqrt(5)*sqrt(10+2*sqrt(5))] -2.28716459510875[(-5/8+(-3/8)*sqrt(5))+(-1/8)*sqrt(3)*sqrt(10+2*sqrt(5))] 0[0]
1.08437207770505[((7/24)*sqrt(3)+(-1/8)*sqrt(15))+(1/8)*sqrt(5)*sqrt(10+2*sqrt(5))] 2.28716459510875[(5/8+(3/8)*sqrt(5))+(1/8)*sqrt(3)*sqrt(10+2*sqrt(5))] 0[0]
1.23973165088997[(1/6)*sqrt(3)+1/4*sqrt(10+2*sqrt(5))] -3.42705098312484[(-7/4+(-3/4)*sqrt(5))] 0[0]
1.23973165088997[(1/6)*sqrt(3)+1/4*sqrt(10+2*sqrt(5))] -2.42705098312484[(-3/4+(-3/4)*sqrt(5))] 0[0]
1.23973165088997[(1/6)*sqrt(3)+1/4*sqrt(10+2*sqrt(5))] 2.42705098312484[(3/4+(3/4)*sqrt(5))] 0[0]
1.23973165088997[(1/6)*sqrt(3)+1/4*sqrt(10+2*sqrt(5))] 3.42705098312484[(7/4+(3/4)*sqrt(5))] 0[0]
1.82751690318244[(1/6)*sqrt(3)+(1/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -4.23606797749979[(-2-sqrt(5))] 0[0]
1.82751690318244[(1/6)*sqrt(3)+(1/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -1.61803398874989[(-1/2+(-1/2)*sqrt(5))] 0[0]
1.82751690318244[(1/6)*sqrt(3)+(1/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 1.61803398874989[(1/2+(1/2)*sqrt(5))] 0[0]
1.82751690318244[(1/6)*sqrt(3)+(1/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 4.23606797749979[(2+sqrt(5))] 0[0]
2.77857341947759[(1/6)*sqrt(3)+(3/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -4.54508497187474[(-7/4+(-5/4)*sqrt(5))] 0[0]
2.77857341947759[(1/6)*sqrt(3)+(3/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -1.30901699437495[(-3/4+(-1/4)*sqrt(5))] 0[0]
2.77857341947759[(1/6)*sqrt(3)+(3/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 1.30901699437495[(3/4+(1/4)*sqrt(5))] 0[0]
2.77857341947759[(1/6)*sqrt(3)+(3/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 4.54508497187474[(7/4+(5/4)*sqrt(5))] 0[0]
3.36635867177007[(1/6)*sqrt(3)+(1/4+(1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] -.5[-1/2] 0[0]
3.36635867177007[(1/6)*sqrt(3)+(1/4+(1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] .5[1/2] 0[0]
3.72962993577275[(1/6)*sqrt(3)+(5/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -4.23606797749979[(-2-sqrt(5))] 0[0]
3.72962993577275[(1/6)*sqrt(3)+(5/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -1.61803398874989[(-1/2+(-1/2)*sqrt(5))] 0[0]
3.72962993577275[(1/6)*sqrt(3)+(5/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 1.61803398874989[(1/2+(1/2)*sqrt(5))] 0[0]
3.72962993577275[(1/6)*sqrt(3)+(5/8+(1/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 4.23606797749979[(2+sqrt(5))] 0[0]
3.77309531484587[((7/24)*sqrt(3)+(1/8)*sqrt(15))+(5/16+(3/16)*sqrt(5))*sqrt(10+2*sqrt(5))] -1.4135454576426[(-5/8+(-1/8)*sqrt(5))+((1/16)*sqrt(3)+(-1/16)*sqrt(15))*sqrt(10+2*sqrt(5))] 0[0]
3.77309531484587[((7/24)*sqrt(3)+(1/8)*sqrt(15))+(5/16+(3/16)*sqrt(5))*sqrt(10+2*sqrt(5))] 1.4135454576426[(5/8+(1/8)*sqrt(5))+((-1/16)*sqrt(3)+(1/16)*sqrt(15))*sqrt(10+2*sqrt(5))] 0[0]
3.95414392406254[(1/6)*sqrt(3)+(1/8+(3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -1.30901699437495[(-3/4+(-1/4)*sqrt(5))] 0[0]
3.95414392406254[(1/6)*sqrt(3)+(1/8+(3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 1.30901699437495[(3/4+(1/4)*sqrt(5))] 0[0]
4.31741518806522[(1/6)*sqrt(3)+(1/2+(1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] -3.42705098312484[(-7/4+(-3/4)*sqrt(5))] 0[0]
4.31741518806522[(1/6)*sqrt(3)+(1/2+(1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] -2.42705098312484[(-3/4+(-3/4)*sqrt(5))] 0[0]
4.31741518806522[(1/6)*sqrt(3)+(1/2+(1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] 2.42705098312484[(3/4+(3/4)*sqrt(5))] 0[0]
4.31741518806522[(1/6)*sqrt(3)+(1/2+(1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] 3.42705098312484[(7/4+(3/4)*sqrt(5))] 0[0]
4.90520044035769[(1/6)*sqrt(3)+(3/8+(3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -1.61803398874989[(-1/2+(-1/2)*sqrt(5))] 0[0]
4.90520044035769[(1/6)*sqrt(3)+(3/8+(3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 1.61803398874989[(1/2+(1/2)*sqrt(5))] 0[0]
5.18344059184966[(2/3)*sqrt(3)+(1/2+(1/4)*sqrt(5))*sqrt(10+2*sqrt(5))] 2.92705098312484[(5/4+(3/4)*sqrt(5))] 0[0]
5.64834526583509[((1/24)*sqrt(3)+(1/8)*sqrt(15))+(1/2+(3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -2.28716459510875[(-5/8+(-3/8)*sqrt(5))+(-1/8)*sqrt(3)*sqrt(10+2*sqrt(5))] 0[0]
5.85625695665285[(1/6)*sqrt(3)+(5/8+(3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] -1.30901699437495[(-3/4+(-1/4)*sqrt(5))] 0[0]
5.85625695665285[(1/6)*sqrt(3)+(5/8+(3/8)*sqrt(5))*sqrt(10+2*sqrt(5))] 1.30901699437495[(3/4+(1/4)*sqrt(5))] 0[0]
6.44404220894532[(1/6)*sqrt(3)+(1/2+(1/2)*sqrt(5))*sqrt(10+2*sqrt(5))] -.5[-1/2] 0[0]
6.44404220894532[(1/6)*sqrt(3)+(1/2+(1/2)*sqrt(5))*sqrt(10+2*sqrt(5))] .5[1/2] 0[0]
:EOF`

    // .................. facesAni anima
    let facesAni = {

      eohal: eonEohalMars,
      eotim: eotim,
      eoric: {gid: 'facesAni', cid: 'facesAni', fid: 'facesAni'},

      eofold: anitem => {
        let tim = anitem.eoload.tim
        let colors = anitem.eoload.colors

        let parts = eonMuonNets.parse({text: def})

        let net = {
          type: 'Feature',
          geometry: {
            type: 'MultiPoint',
            coordinates: parts.verts,
          },
          properties: {
            sort: 'threeobject',
            faces: parts.faces,
            hinges: parts.hinges,
            colors: colors,
            shading: 0,
            showlines: 1,
            showfaces: 1,
            renderData: {
              t: tim,
              docenter: 1,
            },
          },
        }

        return net
      },

      eocrom: {'csx': 0, 'cf': 999, 'cs': 777, 'cw': 1.6, 'co': 0.999, 'cp': 0.999},

      eomot: {
        proform: {

          projection: 'uniwen',
          scale: [ [[[0.3, 0.9]]], [[[0.3, 0.9]]], [[[0.3, 0.9]]]],
          translate: [ 0, 0, 0 ],
          rotate: [ 0, 0, [[[0, 12]]] ],
          lens: [0, 1, Infinity],
        },

      },
      eoload: {
        tim: [[[0, 0.2, 1]]],

        colors: [
          [ 0.7, 0.5, 0.2], // gold
          [ 0.0, 0.2, 0.99 ],
          [ 0.0, 0.99, 0.09 ],
        ],
      },
    }

    // .................. cameraOrthoAni anima
    let cameraOrthoAni = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'cameraOrthoAni'},
      eohal: eonEohalSol,

      eofold: ani => {
        let json = {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: ani.eoload.properties,
        }
        return json
      },
      eoload: {
        properties: {

          sort: 'camera',
          type: 'OrthographicCamera',
          name: 'Orthographic',

          left: -(3 / 2) * 3.0,
          right: (3 / 2) * 3.0,
          top: 3.0,
          bottom: -3.0,
          near: 0.001,
          far: 20,

          position: [0, 0, 9],
          rotation: [0, 90, 0],
          velang: [ [[[-0.0001, 0]]], [[[0.0001, 0]]], 0.001],
          vellin: [0, [[[0.0001, 0]]], 0],
          distance2nodesFactor: 1,
          lookAt: [0, 0, 0],
        },

      },
    }
    // .................. textAni
    let net = eonMuonNets.parse({text: def})

    let text = `(${net.number}) ${net.name}
symbol: ${net.symbol}
dual: ${net.dual}
netlib.org/polyhedra`

    let textsegment = function (text, t) {
      let s = text // source
      let a = Array.from(s) // discretize source
      let q = a.length // length, number of elems
      let n = Math.ceil(q * t) // elems in time
      let v = a.slice(0, n) // segment in time
      let s1 = v.join('') // rejoin segment

      return s1
    }

    let textAni = {
      eohal: eonEohalTextform,
      eotim: eotim,
      eoric: {gid: 'txtg', cid: 'txtcT', fid: 'txtfT'},

      eofold: ani => {
        let natipros = { eoform: ani.eoload.eoform, ghv: 1, gsa: 1, gco: 0 }
        return eonMuonNatform.natMultiLineString(natipros)
      },
      eomot: {
        proform: {
          projection: 'uniwen',
          scale: [ 0.2, 0.2 ],

          translate: [ 0, 0, 0 ], // iter
          rotate: [0, 0, 0],
          lens: [0, 1, Infinity ],
        },
      },
      eocrom: { 'csx': 7, 'cf': 999, 'co': 0.9, 'cs': 999, 'cw': 0.1, 'cp': 0.99},

      eoload: {
        eoform: {
          x: {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
            'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
            'dom3': [ 0, 7 * 360 ],
            'fn0': (e, c) => e[0],
          },
          y: {
            'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'a': 1, 'b': 1, // circ
            'ra2': 106, 'v0': 0, 'v1': 1, 'w4': 0, 'seg5': 18, 'pa6': 0, 'pb7': -1,
            'dom3': [0, 360],
            'fn0': (e, c) => 0 * sin(e[0]),
          },
        },
        textform: {
          string: [[[function (t) {
            let txt = this.text
            let linenb = this.linenb
            let sttxt = txt.split('\n')
            return sttxt[linenb]
          }]]],
          text: text,
          style: {
            rotate: [[[ 0, 0 ]]],

            'font-size': [[[9, 9]]],
            'font-family': 'Verdana', // BankFuturistic, Arial
            // 'height': 56,
            'kerning': 4, // 1
            'lengthAdjust': 'spacing', // spacingAndGlyphs
            'letter-spacing': 1,
            'text-anchor': 'start', // start, middle, end
            'textLength': 0,
            // 'width': 111,
            'word-spacing': 1,
            // 'writing-mode': 'tb',
          },
        },
      },
    }

    let getanis = function (txt = '') {
      let anis = []
      let a = txt.split('\n')
      for (let i = 0; i < a.length; i++) {
        let ani = eonMuonProps.clone(textAni)
        ani.eoric.fid = textAni.eoric.fid + '_' + i
        ani.eoric.cid = textAni.eoric.cid + '_' + i
        ani.eomot.proform.translate = [75, -145 - 11 * i]
        ani.eoload.textform.linenb = i
        anis.push(ani)
      }
      return anis
    }
    // .................. ambientLight anima
    let ambientLight = {

      eotim: eotim,
      eoric: {gid: 'light', cid: 'light', fid: 'AmbientLight'},
      eohal: eonEohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = { // Feature
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: anitem.eoload.light,
        }

        return json
      },
      eoload: {
        light: {
          sort: 'light',
          type: 'AmbientLight',
          name: 'AmbientLight',
          color: 0xeeeeee,
          intensity: 0.5,
          position: [400, 400, 400],
        },
      },

    }
    // .................. lightHemisphereAni anima
    let lightHemisphereAni = {

      eotim: eotim,
      eoric: {gid: 'camera', cid: 'camera', fid: 'lightHemisphereAni'},
      eohal: eonEohalSol,

      eofold: anitem => {
        let eoload = anitem.eoload
        let json = { // Feature
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0, 0] },
          properties: anitem.eoload.light,
        }

        return json
      },
      eoload: {
        light: {
          sort: 'light',
          type: 'HemisphereLight',
          name: 'HemisphereLight',
          skyColor: [[[111, 999]]],
          groundColor: [[[999, 111]]],
          intensity: 0.3,
          position: [0, 0, 0],
        },
      },

    }
    // .................. scene
    let scene = [
      ...getanis(text),
      facesAni, // h.mars
      cameraOrthoAni, // h.sol
      ambientLight, // h.sol
      lightHemisphereAni, // h.sol
    ]

    return scene
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ793gTruncatedDodecahedron = anitem
}))