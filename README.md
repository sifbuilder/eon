
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
   filter and sort sinusoids per amplitude
 del item outside time period (ric.delled = 1)
   beyond nyquist w frequency is aliased by -N
   sinusoid is Sum( Xi * e^i2[pi]w[i]n/N )
   The sinusoid's frequency is w cycles per N samples
 no add segments ourside time period (pacer.autoN = 0)
   each point/circle anigram has radius of next sinusoid amplitude
 m.fourier : fourier transform
 m.fourier.transformedCoefs : get fourier transform coefficients
    transformedCoefs(geojson)
    return geojson
 ## mgeoj.ntime
   json
   interval
 ## mgeoj.featurize
   json
     transform gj.FeatureCollection, gj.Feature, gj.GeometryCollection
     to array of gj.Features
 m.svg.castels(svgdata, frame={start:0, stop:0.90, step:0.33} )
  svgdata: cubic beziers: MC...CZ
  frame.start: bezier interaval beginning
  frame.stop: bezier interval end
  frame.step: space between points
    eg: castels(svg, {start:0, stop:0.90, step:0.33}) will return 3 curve points in bezier
 z.618b-fourierRhyno
 rhyno data from m.animas
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
 z.618f-fourierSquare
     @aniLine avatar
       form.payload.fourier.avatars.line
     @fourierPacer avatar
       payload.pacer.geojsor
     data is basic square. MultiLineString geometry.coordinates
     @fourierForm anima
       payload.fourier.avatars.fourierPacer  form trace
       payload.fourier.avatars.line  sinusoid ray
 ## z.618g-fourierLicht
     @aniLine avatar
       form.payload.fourier.avatars.line
     @fourierPacer avatar
       payload.pacer.geojsor
     data is svg MCZ...MCZ
