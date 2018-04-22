
# d3animas

- space-time manifolds
  
## Author

- sifbuilder

based upon

- [x] [Mike Bostock's D3jsv4] (https://github.com/d3)

with references including

- [x] [three.js] (https://threejs.org/)
- [x] [Mike Bostock’s Blocks] (https://bl.ocks.org/mbostock)
- [x] [Vasco Asturiano’s Blocks] (https://bl.ocks.org/vasturiano)
- [x] [Philippe Rivière’s Blocks] (https://bl.ocks.org/fil)
- [x] [Mike Bostock’s Superformula Explorer Block](http://bl.ocks.org/mbostock/1021103)
- [x] [Johan Giellis’s paper] (http://www.amjbot.org/content/90/3/333.full.pdf)
- [x] [Christophe Viau’s D3 plugin based on superformulas.] (https://github.com/d3/d3-plugins/)
- [x] [Dan Abramov's Redux] (https://github.com/reactjs/redux)
- [x] [TJ Holowaychuk's frontend-boilerplate] (https://github.com/tj/frontend-boilerplate)
- [x] [Kent C. Dodds' How to Contribute to an Open Source Project on GitHub] (https://github.com/eggheadio-github/stack-overflow-copy-paste)

# License

- MIT
 ## z.618g-fourierLicht  d.lichtenstein
     data is svg MCZ...MCZ
     @aniDotted anima
     @aniLine anima
     @aniRay avatar
       form.payload.fourier.avatars.line
     @aniTrace avatar
       form.payload.fourier.avatars.line
     @fourierPacer avatar
       payload.pacer.geojsor
     @fourierForm h.fourier
 ## z.619f-popart d.popart h.formed
     tim
     data
     @fourierPacer avatar h.pacer
     @fourierForm anima
 ## z.619d-lichtenstein d.lichtenstein h.formed
     tim
     data
     fourierPacer avatar
     fourierForm anima
 ## z.619h-rachael d.rachael h.formed
     tim
     data
     @aniRay avatar
       form.payload.fourier.avatars.line
     fourierPacer avatar
     fourierForm anima
     @polyPacer avatar h.pacer
     @polyForm anima
     tim
     data
     @aniRay avatar
       form.payload.fourier.avatars.line
     fourierPacer avatar
     fourierForm anima
 mstore.gramm calls UPDANIGRAM
 anigrams geofolds are saved in the proformed domain
 ## z.619d-lichtenstein d.lichtenstein h.formed
     tim
     data
     formPacer avatar
     polyForm anima
 ## h.ent
 anigram.geofold : last of geoform, conform, ereform, proformed
 ani:nodeSitus : ani.geofold.properties.geonode.geometry.coordinates
 parentani:situs : parent.payload.geonode.geometry.coordinates
  geoform conform ereform proform
  geoForm = props.geoform
  conForm = props.conform
  ereForm = props.ereform
  proForm = props.proform
  nodeGeoformed = props.geonode.properties.nodeGeoformed
  nodeEreformed = props.geonode.properties.nodeEreformed
  nodeProformed = props.geonode.properties.nodeProformed
  forms and nodes have geometry.coordinates
  get GEOFORM from anigram.geofold
    CONFORM  - conform does not affect geonode
    EREFORM  - ereform the conformed geofold
     uniwen: prerotation, tranlations, scale, project, rotation
     geonode in geonode..nodeProformed - retains GEOFORM domain
    PROFORM  - ereform the ereformed geofold
     uniwen: prerotation, tranlations, scale, project, rotation
     geonode in geonode..nodeProformed - retains GEOFORM domain
     nodeEreformed from nodeProformed
 ## h.fourier
    h.fourier anigrams per frequency cycloid
    cycloids in payload.fourier.transforms resulting from m.fourier.complexify
    anigrams turned to h.ent
 ### h.fourier.gramm
   payload.fourier.transforms, gj featurized, complexified, ntimed
   payload.fourier.maglast pencil radio
   payload.fourier.interval [0,1] delete anigrams outside
   payload.fourier.tolerance 1 remove sinusoids below
   payload.fourier.dotboform style of pencil dot
   payload.fourier.avatars.fourierPacer  form trace
   payload.fourier.avatars.line  sinusoid ray
   time in period is (t - t0) / (t1 - t0), with t unit time
   fidder(j,i) per feature and sinusoid
   features are rendered simultaneously on time period
 del item outside time period (ric.delled = 1)
   beyond nyquist w frequency is aliased by -N
   sinusoid is Sum( Xi * e^i2[pi]w[i]n/N )
   The sinusoid's frequency is w cycles per N samples
 del item outside time period (ric.delled = 1)
 add pencil on last sinusoid and pacer avatar
 no add segments ourside time period (pacer.autoN = 0)
   each point/circle anigram has radius of next sinusoid amplitude
 h.pacer applies to h.gramm, could apply to h.ween
 eg: 
     let haloPacerHalo_ween = function  (anima, newItems = []) {
       if (anima.payload.inited !== 1) { anima.payload.inited = anima.payload.gelded = 1; newItems = Array.of(anima) }
       return newItems
     }
 let haloPacerHalo_ween = anima => (anima.payload.inited !== 1) ? (anima.payload.inited = anima.payload.gelded = 1, [anima]) : []
 call situs locators as pacer method to get this.stace
 the anigram ric and the newItem fider() conform the newItem id
 call fidder as pacer method
 call geojsor as pacer method
 m.fourier : fourier transform
 m.fourier.transformedCoefs : get fourier transform coefficients
    transformedCoefs(geojson)
    return geojson
 ## mgeoj
   gj streams
   refs:
   https://bl.ocks.org/maartenzam/ec11de22bc8e5608a98f207f1c09bdb6
   https://github.com/mapbox/geojson-normalize/blob/master/index.js
 ### mgeoj.complexify convert geometry coordinates to complex numbers
  @gj
 ### meoj.trim flatten gj
  ref: https://bl.ocks.org/maartenzam/ec11de22bc8e5608a98f207f1c09bdb6
 ### meoj.snip return function to get dots within form range [pa6,pb7]
   @form
 ## mgeoj.largestPoly  return the lagest polity on gj
  @gj: MultiPolygon
 ## mgeoj.ntime  convert geometry to feature and add interval to properties
   json
   interval
 ## mgeoj.featurize
     transform to array of gj.Features
     @json  {gj.FeatureCollection, gj.Feature, gj.GeometryCollection}
 ## mgeoj.featurecollect
     transform to FeatureCollection
     @json  {gj.FeatureCollection, gj.Feature, gj.GeometryCollection}
     called by halo to carry ric, sort as properties
 ## mgeoj.deprop  reomove properties from gj object
 ## mgeoj.zorder
 @json FeatureCollection
 ## mgeoj.centroid   get ring's centroid
    @ring
    called by zorder
 ## mgeoj.getCoords
    get array of coordinates from gj (eg. parent anigram)
 ## mgeoj.getCoordsLength
    get number of coordinates in gj
 ## mgeoj.getCoordsInRange
    get first nb coordinates
 ## mgeoj.isValid   check if gj is valid geojson type
    @json
    @type
 m.svg.castels(svgdata, frame={start:0, stop:0.90, step:0.33} )
  svgdata: cubic beziers: MC...CZ
  frame.start: bezier interaval beginning
  frame.stop: bezier interval end
  frame.step: space between points
    eg: castels(svg, {start:0, stop:0.90, step:0.33}) will return 3 curve points in bezier
 z.618b-fourierRhyno
 rhyno data from m.animas
   data    
   defined as (closed) LineString gemetry.coordinates 
   mfourier.transformedCoefs(tfeature) 
     @aniLine avatar
       form.payload.fourier.avatars.line
     @fourierPacer avatar
       payload.pacer.aad:1 add segments to LineString trace
       payload.pacer.autoSitus place situs on parent (stace undefined)  
       payload.pacer.fider take fid from payload.ric.fid  
       payload.pacer.geojsor 
     @fourierForm anima
       geofold.properties.pointRadius
       payload.fourier.transforms:  transforms coefficients
       payload.fourier.dotboform:  style of pencil dot
       payload.fourier.avatars.fourierPacer  form trace
       payload.fourier.avatars.line  sinusoid ray
 z.618c-matisse
     @aniLine avatar
       form.payload.fourier.avatars.line
     @fourierPacer avatar
     @fourierForm matisse anima
     @fourierForm anima
     tim
     data
     @aniRay avatar
       form.payload.fourier.avatars.line
     fourierPacer avatar
     fourierForm anima
 ## z.619e-lichtenstein d.licht4 h.formed
     tim
     data
     @fourierPacer avatar h.pacer
     @fourierForm anima
 z.618f-fourierSquare
     data is basic square. MultiLineString geometry.coordinates
     @aniDots anima
     @aniRay avatar
       form.payload.fourier.avatars.line
     @fourierPacer avatar
       payload.pacer.geojsor
     @fourierForm anima
       payload.fourier.avatars.fourierPacer  form trace
       payload.fourier.avatars.line  sinusoid ray
 ## z.618g-fourierLicht  d.lichtenstein
     data is svg MCZ...MCZ
     @aniLine avatar
       form.payload.fourier.avatars.line
     @fourierPacer avatar
       payload.pacer.geojsor
     @fourierForm h.fourier
