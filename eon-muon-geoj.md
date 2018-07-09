# eon-muon-geoj 
**process geojson streams** 
 
## references 
[Maarten’s Block geo to square tiles](https://bl.ocks.org/maartenzam/ec11de22bc8e5608a98f207f1c09bdb6) 
[geojson-normalize](https://github.com/mapbox/geojson-normalize/blob/master/index.js) 
 
## functions 
 
## methods 
* ### trim 
**flatten gj** 
 ref: https://bl.ocks.org/maartenzam/ec11de22bc8e5608a98f207f1c09bdb6 
 
* ### tclip 
 
* ### complexify 
 turns strings of coordinates into arrays of comples numbers 
 @gj 
 
* ### deprop 
  reomove properties from gj object 
 
* ### snip 
 return function to get dots within form range [pa6,pb7] 
  @form 
 
* ### largestPoly 
  return the lagest polity on gj 
 @gj: MultiPolygon 
 
* ### lineStringFromStream 
 
* ### polygonFromStream 
 
* ### multLineStringFromStreamArray 
 
* ### featurecollect 
    transform to FeatureCollection 
    @gj  {gj.FeatureCollection, gj.Feature, gj.GeometryCollection} 
    called by halo to carry ric, sort as properties 
 
* ### featurize 
    transform to array of gj.Features 
    @gj  {gj.FeatureCollection, gj.Feature, gj.GeometryCollection} 
 
* ### ntime 
  convert geometry to feature and add interval to properties 
  @gj 
  @interval 
 
* ### zorder 
  @gj FeatureCollection 
 
* ### centroid 
  get ring's centroid 
   @ring 
   called by zorder 
 
* ### getCoords 
   get array of coordinates from gj (eg. parent anigram) 
 
* ### getCoordsLength 
   get number of coordinates in gj 
 
* ### getCoordsInRange 
   get first nb coordinates 
 
* ### isValid 
   check if gj is valid geojson type 
   @gj 
   @type 
 
 
# license 
MIT