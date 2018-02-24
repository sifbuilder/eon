#!/bin/sh
echo 'script-ents.sh'

outEnls="script-enls.js"
if [ -f "$outEnls" ] 
then 
	echo "./$outEnls"
fi

outEnts="script-ents.js"
if [ -f "$outEnts" ] 
then 
	echo "./$outEnts"
fi

#  ------------------------ script-enls
echo -e "/*  enls */" > $outEnls

echo -e "/*  d3 */" >> $outEnls
for entry in "./d3"*
do
	echo "document.write(\"<script src='$entry'><\/script>\")" >> $outEnls
done


echo -e "/*  topojson */" >> $outEnls
for entry in "./topojson"*
do
	echo "document.write(\"<script src='$entry'><\/script>\")" >> $outEnls
done

echo -e "/*  three */" >> $outEnls
for entry in "./three"*
do
	echo "document.write(\"<script src='$entry'><\/script>\")" >> $outEnls
done


#  ------------------------ script-ents
echo -e "/*  ents */" > $outEnts

echo -e "/*  boson */" >> $outEnts
for entry in "./boson"*
do
	echo "document.write(\"<script src='$entry'><\/script>\")" >> $outEnts
done

echo -e "/*  controls */" >> $outEnts
for entry in "./control"*
do
	echo "document.write(\"<script src='$entry'><\/script>\")" >> $outEnts
done

echo -e "/*  data */" >> $outEnts
for entry in "./data"*
do
	echo "document.write(\"<script src='$entry'><\/script>\")" >> $outEnts
done

echo -e "/*  forces */" >> $outEnts
for entry in "./force"*
do
	echo "document.write(\"<script src='$entry'><\/script>\")" >> $outEnts
done

echo -e "/*  geos */" >> $outEnts
for entry in "./geo"*
do
	echo "document.write(\"<script src='$entry'><\/script>\")" >> $outEnts
done

echo -e "/*  libs */" >> $outEnts
for entry in "./lib"*
do
	echo "document.write(\"<script src='$entry'><\/script>\")" >> $outEnts
done

echo -e "/*  muons */" >> $outEnts
for entry in "./muon"*
do
	echo "document.write(\"<script src='$entry'><\/script>\")" >> $outEnts
done

echo -e "/*  halos */" >> $outEnts
for entry in "./halo"*
do
	echo "document.write(\"<script src='$entry'><\/script>\")" >> $outEnts
done

echo -e "/*  x  proxy */" >> $outEnts
for entry in "./x"*
do
	echo "document.write(\"<script src='$entry'><\/script>\")" >> $outEnts
done

echo -e "/*  renderers */" >> $outEnts
for entry in "./render"*
do
	echo "document.write(\"<script src='$entry'><\/script>\")" >> $outEnts
done





