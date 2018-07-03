
# md:{filename}
build geo projections

## functions
* ### getProj_

## methods
* ### formion_
`formion_ (projdef, anigram)`
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
*get formion_ projector on gj*

### conformer_
use: `mprofier.conformer_ (anigram)`
**get formion_ projector**
assumes `projection != undefined`
```
 projection: {
  projection: 'natform',
  form: anigram.payload.conform
 }
```

### proformion_
call `mprofier.proformion_ (anigram)`
calls `formion_(anigram.payload.proform, anigram)`
**get proform projection from projdef**

### proformer


### ereformion_
### ereformer
