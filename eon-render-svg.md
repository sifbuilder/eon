# eon-render-svg 
**render svg** 
 
 The viewport is the visible area of the SVG image 
 Default units are pixels 
 `<svg width="600" height="400"></svg>` 
 The svg [viewBox](http://tutorials.jenkov.com/svg/svg-viewport-view-box.html) attribute is used to redefine the viewport coordinates 
 two first coordinates define user coordinates of upper left corner 
 two last coordinates define user coordinates of lower right corner 
 `<svg width="600" height="400" viewBox="0 0 50 20" >` 
ref: [Margin Convention](https://bl.ocks.org/mbostock/3019563) 
## methods 
* ### svg 
* ### svgelems 
     call `svgelems(payload, data, idfn)` 
* ### render 
     call `render(elapsed, featurecollection, maxlimit)` 
     gets anima.geofold's from m.animation 
  @elapsed 
  @featurecollection 
  @maxlimit
  
  axes
  // d.properties.axis: cf, co, cp, cs, csx, cw, d3axis, domain, label, orient, range, rotate, scale, scaleType, tickFormat, tickPadding, tickSize,
  // d.properties.axis.style :  font-family, font-size, text-anchor
  
   
# license 
MIT