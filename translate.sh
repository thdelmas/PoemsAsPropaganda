#!/bin/bash


while [ "$1" ]
do
dest="site/poems/$(basename $1 | cut -d'.' -f1).html"

cat > $dest <<EOF
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Osklau</title>
  <meta name="description" content="Osklau">
  <meta name="author" content="Osklau">

  <link rel="stylesheet" href="../css/styles_test.css?v=1.0">

</head>

<body>
<table ><tbody id="poem">
EOF

cat $1 |
	sed 's/./<td class="letter">\0<\/td>/g' |
	sed "s/^.*$/<tr class='line'>\0<\/tr>/g" |
	sed "s/<tr class='line'><\/tr>/<tr class='line'><td class='letter'>\&nbsp<\/td><\/tr>/g">> $dest

cat >> $dest <<EOF
</tbody></table>  
<script src="../js/scripts.js"></script>
</body>
</html>
EOF
shift

done
