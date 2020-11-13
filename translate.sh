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

  <link rel="stylesheet" href="../css/styles.css?v=1.0">

</head>

<body>
<div id="poem">
EOF

cat $1 |
	sed 's/./<span class="letter">\0<\/span>/g' |
	sed "s/^.*$/<p class='line'>\0<\/p>/g" |
	sed '1 s/^.*$/<span class="titre">\0<\/span>/'  |
	sed "s/<p class='line'><\/p>/<p class='line'><span class='letter'>\&nbsp<\/span><\/p>/g">> $dest

cat >> $dest <<EOF
</div>  
<script src="../js/scripts.js"></script>
</body>
</html>
EOF

shift

done
