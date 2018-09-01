# eon-muon-profier 
build geo projections 
 
## functions 
* ### getPrt 
 
## methods 
* ### formion 
`formion (projdef, anigram)` 
**get projection from projdef and apply projection properties** 
 if `@projdef` or `@projdef.projection` are not defined, assume `p.uniwen` identity 
 if `@projdef.translate != undefined` 
 * if pure array, translate to position 
 * if non-pure array, add translate positions 
 * if a position, `object` translate to position 
 * if other `object`, process as `stace.spot` 
 
 if `@projdef.anod == 1` add `geofold.properties.geonode.geometry.coordinates` to translate 
 
 if `@projdef.rotate != undefined` 
 * if is pure array, apply rotation 
 * if is 2d, apply z rotation 
 * if non-pure array, add multi-rotations 
 
 if `@projdef.prerotation [[[ control:wen ]]]` apply wen control rotation 
 if `@projdef.prerotation [[[ control:versor ]]]` apply versor control rotation 
 if `@projdef.control:wen` apply wen control rotation 
 if `@projdef.control:versor` apply versor control rotation 
 
### projer_ 
use: `mprofier.projer_(prodef, anigram)(gj) 
*get formion projector on gj* 
 
### conformer_ 
use: `mprofier.conformer_ (anigram)` 
**get formion projector** 
assumes `projection != undefined` 
``` 
 projection: { 
  projection: 'natform', 
  form: anigram.payload.conform 
 } 
``` 
 
### proformion 
call `mprofier.proformion (anigram)` 
calls `formion(anigram.payload.proform, anigram)` 
**get proform projection from projdef** 
 
### proformer 
 
 
### ereformion 
### ereformer 
