
 # md:{filename}
 **process graticule objects**

 ## references
 [D3.js](https://github.com/d3) by [Mike Bostock](https://en.wikipedia.org/wiki/Mike_Bostock)
 [d3-geo/graticule.js](http://ci.testling.com/substack/minimist)

 ## functions
 *tidx
 return `function(column, row)` that gives the sequential index of [column,row]
 ``` js
 tidx (horq, verq, hd = 1, vd = 1)
 ```
 * `@argv.horq` number of rows
 * `@argv.verq` number of columns
 * `@argv.hd`   span between columns
 * `@argv.vd`   span between rows
 
 *ridx
 return `function(idx)` , give [row,column] of sequential index

 *oneface
   a,b,c coord-vertices in [xn, yn] space give face verts indices

 *bifaces
  (i,h) in [xn,yn[]
  vertices to ...
  inPolygons to filter coords if in pols
  mersCoords to get vert coords

 *gratiparams
 use:
 ```
 let {X0, X1, DX, PX, x0, x1, dx, px,
      Y0, Y1, DY, PY, y0, y1, dy, py} = gratiparams(params)
 ```
  lattice.[ Xx, Yy ]
   lattice specifies x and y discrete with same major and minor
  frame.[ [X,Y], [x,y] ]   X:[X0,X1,DX,PX]
   frame defineds x and y major and minor discretes
  frame.[ [ Xx, Yy ] ]    Xx:[X0,X1,DX,PX]
  [ Xx, Yy ]
   if type not specified assume lattice
 
 *arywinopen
   call `arywinopen(x0,x1,dx)`
   return array of elements in [x0,x1] with pass dx
 
 *arywinclose
   as arywinopen closing the array
 
 *symgraticuleY
   return function of dot to arywinclose array
 
 *symgraticuleX
   return function of dot to arywinclose array
   open range interval [x0,x1)
 
 *asymgraticuleY
   return function of dot to arywinclose array
 
 *asymgraticuleX
   return function of dot to arywinclose array
   open range interval [x0,x1)
 
 ## methods
 *grarr
   return `{mms, pps}`  of meridians and parallels
     on symetrical  discretes with symgraticuleX and symgraticuleY
     mms and pps are gj.MultiLineString geometries
 
 *equator
   return Feature.LineString coordinates: equator
     equator: [ [ [-180, 180, 360, 1], [-90, 90, 360, 1] ] ]
 
 *vhMultiLine
   return Feature.MultiLineString.coordinates: [...mersCoords,...parsCoords]
 
 *vMultiLine
   return Feature.MultiLineString.coordinates: mersCoords
 
 *hMultiLine
   return Feature.MultiLineString.coordinates: parsCoords
 
 *dedges
   get grarr
 
 *gvertices
   call `gvertices(params)`
   get mersq sym mers and parsq sym pars from grarr
   takes vertices from meridians with step being the y precision (dy/py)
   mers[i].length may be 5, while parsq: 3
 
 *gfaces
 
 
 *equator
 
 
 # license
 MIT
