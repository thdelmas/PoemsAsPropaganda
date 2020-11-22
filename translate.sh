#!/bin/bash


while [ "$1" ]
do
dest="site/poems/$(echo $1 | sed 's/^poems\///g'| cut -d'.' -f1).html"
parent_path=""
for i in $(dirname $1 | tr '/' ' ')
do
  parent_path="../$parent_path"
done

cat > $dest <<EOF
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Osklau</title>
  <meta name="description" content="Osklau">
  <meta name="author" content="Osklau">

  <link rel="stylesheet" href="${parent_path}css/styles_test.css?v=1.0">

</head>

<body>
<table ><tbody id="poem">
<tr class='line'><td class='letter'>&nbsp</td></tr>
EOF


cat $1 |
  sed 's/^ *//g' |
  sed 's/ *$//g' |
  sed 's/  */ /g' |
	sed 's/./<td class="letter">\0<\/td>/g' |
	sed "s/^.*$/<tr class='line'>\0<\/tr>/g" |
	sed "s/<tr class='line'><\/tr>/<tr class='line'><td class='letter'>\&nbsp<\/td><\/tr>/g">> $dest

cat >> $dest <<EOF
</tbody></table>  
<script src="${parent_path}js/scripts.js"></script>
</body>
</html>
EOF
shift

done

cd site/poems && find . -name '*.html' | sed 's/\.\///g' | sed 's/^.*$/"\0",/g' | sort
