<?php
try {
    /**************************************
    * Create databases and                *
    * open connections                    *
    **************************************/

    // Create (connect to) SQLite database in file
    $file_db = new PDO('sqlite:../db/graffitiStrokes.db');
    // Set errormode to exceptions
    /* .. */
    $file_db->setAttribute(PDO::ATTR_ERRMODE,
                            PDO::ERRMODE_EXCEPTION);

  }
  catch(PDOException $e) {
    // Print PDOException message
    echo $e->getMessage();
  }

  $sql_select = "SELECT * FROM strokesCollection WHERE url = 'https://www.youtube.com/' ";
// the result set
$result = $file_db->query($sql_select);
//if (!$result) die("Cannot execute query.");
echo "<||";

// fetch first row ONLY...
  $row = $result->fetch(PDO::FETCH_ASSOC);
  var_dump($row);
echo "||>";
foreach ($row as &$val){
  echo "<div>" . $val . '</div>';
}
// put required html mark up
echo"<html>\n";
echo"<head>\n";
echo"<title> Output from the STROKES DATABASE </title> \n";
//include CSS Style Sheet
//echo "<link rel='stylesheet' type='text/css' href='css/galleryStyle.css'>";
echo"</head>\n";
// start the body ...
echo"<body>\n";
// place body content here ...
echo"</body>\n";
echo"</html>\n";

?>
