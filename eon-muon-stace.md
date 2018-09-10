# eon-muon-stace 
**manage location of aniItems** 
 
## methods 
getPosInDim  getPosesInDim m.liner _e_ 
 
### getSiti 
 
### getSitus , or ani geonode 
            ani position in the coords system 
            in geonode.geometry 
            sim forces act on the ani geonodes 
 
### getLoci 
 
### getLocus , locus and transpots 
 
### getLocifion 
get the uniwen projection with translate to anigram location 
getLocus 
 
### getLocifier 
locifier(p): [x, y, z] => [x+p[0], y+p[1], z+p[2]] 
 
### getTranspot 
 
### getTranspots 
`getTranspots(stace, payload)` 
**get stace locations in @ric** 
##### parameters 
 **stace** ,  may be passed as param or as payload attribute 
    * `{x:0, y:0, z:0}`, position object 
    * `[300,200,0]`,  pure array 
    * `[a1,a2,a3], [b1,b2]]`,  pure multi array, add by dax 
    * `[[[ {nat} ]]]`, nat form 
    * `[{gen,ere,pro}]`,  parent node position, nodeGeoformed, nodeEreformed or nodeProformed 
    * `[{pos:0}, a2]`,  if pos, parent form position 
 
  if stace.<dax>.pos and no transformation property 
      get spot from `parentani.geofold.geometry.coordinates` 
 **payload**, to get parent coords if spot is relative to parent geometry 
 
