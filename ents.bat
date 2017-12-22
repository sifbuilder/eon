@ECHO OFF

REM create file to load js components

SET outEnts=ents.js
if  EXIST %outEnts%  DEL %outEnts%

SET outEnls=enls.js
if  EXIST %outEnls%  DEL %outEnls%

setlocal enabledelayedexpansion


REM enls
echo /*  d3  */ >> %outEnls% 
for /f "delims=" %%f in ('dir /b /a-d /on d3*') do  echo document.write("<script src='%%f'><\/script>")   >> %outEnls% 

echo /*  topojson */ >> %outEnls% 
for /f "delims=" %%f in ('dir /b /a-d /on topojson*') do  echo document.write("<script src='%%f'><\/script>")   >> %outEnls% 

echo /*  three */ >> %outEnls% 
for /f "delims=" %%f in ('dir /b /a-d /on three*') do  echo document.write("<script src='%%f'><\/script>")   >> %outEnls% 



REM ents
echo /* https://www.irt.org/script/974.htm */ >> %outEnts% 

echo /*  bosons */ >> %outEnts% 
for /f "delims=" %%f in ('dir /b /a-d /on boson*') do  echo document.write("<script src='%%f'><\/script>")   >> %outEnts% 

echo /*  controls */ >> %outEnts% 
for /f "delims=" %%f in ('dir /b /a-d /on control*') do  echo document.write("<script src='%%f'><\/script>")   >> %outEnts% 

echo /*  data */ >> %outEnts% 
for /f "delims=" %%f in ('dir /b /a-d /on data*') do  echo document.write("<script src='%%f'><\/script>")   >> %outEnts% 

echo /*  forces */ >> %outEnts% 
for /f "delims=" %%f in ('dir /b /a-d /on force*') do  echo document.write("<script src='%%f'><\/script>")   >> %outEnts% 

echo /*  geos projections */ >> %outEnts% 
for /f "delims=" %%f in ('dir /b /a-d /on geo*') do  echo document.write("<script src='%%f'><\/script>")   >> %outEnts% 

echo /*  lib */ >> %outEnts% 
for /f "delims=" %%f in ('dir /b /a-d /on lib*') do  echo document.write("<script src='%%f'><\/script>")   >> %outEnts% 

echo /*  muons */ >> %outEnts% 
for /f "delims=" %%f in ('dir /b /a-d /on muon*') do  echo document.write("<script src='%%f'><\/script>")   >> %outEnts% 

echo /*  halo */ >> %outEnts% 
for /f "delims=" %%f in ('dir /b /a-d /on halo*') do  echo document.write("<script src='%%f'><\/script>")   >> %outEnts% 

echo /*  x  proxy */ >> %outEnts% 
for /f "delims=" %%f in ('dir /b /a-d /on x*') do  echo document.write("<script src='%%f'><\/script>")   >> %outEnts% 

echo /*  renderers */ >> %outEnts% 
for /f "delims=" %%f in ('dir /b /a-d /on render*') do  echo document.write("<script src='%%f'><\/script>")   >> %outEnts% 


endlocal

:END
:eof