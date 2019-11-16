<html>
<head>
<title>Hello world example in php</title>
</head>
<body>
<?php
echo "Hello World!";
?>
</body>
<?php

$theQuery = 'CREATE TABLE artCollection (pieceID INTEGER PRIMARY KEY NOT NULL, artist TEXT, title TEXT,geoLoc TEXT, creationDate TEXT,descript ,image TEXT)';
    $file_db ->exec($theQuery);
// if everything executed error less we will arrive at this statement
    echo ("Table artCollection created successfully<br \>");
      // Close file db connection

?>

</html>
