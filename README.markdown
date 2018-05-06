
# halo-pacer.js  
**create new itesm at init, automatically or upon mouse event**  
* `@a.p.pacer.add`, if 1, pace items are added to pacer (eg. LineString trace)  
* `@a.p.pacer.initSitus`  : situs for init items  
* `@a.p.pacer.autoSitus`  : situs for auto items, calls `m.stace.getLocus(this.stace, a.payload)`,  auto time is  
  `a.p.tim.unitPassed - a.p.pacer.outed`  
* `@a.p.pacer.eventSitus` : situs for event items  
  `count` new items to pacer from init, auto and event  
* `@a.p.pacer.fidder`  : new item `fid` identifier  
* `@a.p.pacer.geojsor(@anigram, @counter)` : gets new item  
