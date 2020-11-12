#!/bin/bash

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
<p class="poem">

EOF

cat $1 | sed 's/./<span class="letter">\0<\/span>/g' | sed "s/$/<\/br>/g" >> $dest

cat >> $dest <<EOF
</p>  
<script src="../js/scripts.js"></script>
</body>
</html>
EOF
