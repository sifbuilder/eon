 
# eon-x-s 
** ** 
  eon, name, map muonGraticule['muonGraticule'](__mapper) 
  `getCell = (e, n, m) => e[n] !== undefined ? e[n](m) : e` 
 
  eon, name, map __mapper({ muonGraticule: muonGraticule })('muonGraticule') 
  `mapCell = (e, n, m) => m({[n]: e})[n]` 
 
  getEon 
    [d3, ''] => d3, ./d3.js, d3 
    [uniwen, geo] => prjUniwen, ./muon-geo-uniwen.js, muon-geo-uniwen 
    [eon-geo-uniwen, ''] => prjUniwen, ./muon-geo-uniwen.js, muon-geo-uniwen 
   
# license 
MIT 
