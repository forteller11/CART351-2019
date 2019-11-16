<?php
try {
    /******************************************
    * Create databases and  open connections*
    ******************************************/

    // Create (connect to) SQLite database in file
    $file_db = new PDO('sqlite:../db/graffitiStrokes.db');
  // Set errormode to exceptions
    $file_db->setAttribute(PDO::ATTR_ERRMODE,
                            PDO::ERRMODE_EXCEPTION);
    echo("opened or connected to the database graffitiGallery");
   }
catch(PDOException $e) {
    // Print PDOException message
    echo $e->getMessage();
  }

  $theQuery = 'CREATE TABLE strokesCollection (
    red INTEGER PRIMARY KEY NOT NULL,
    green INTEGER PRIMARY KEY NOT NULL,
    blue INTEGER PRIMARY KEY NOT NULL,
    alpha INTEGER PRIMARY KEY NOT NULL,
    positionsWidths TEXT NOT NULL
  )';
      $file_db ->exec($theQuery);
  // if everything executed error less we will arrive at this statement
      echo ("Table strokesCollection created successfully<br \>");
        // Close file db connection
         $file_db = null;
  ?>
