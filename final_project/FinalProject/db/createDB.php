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
    echo("opened or connected to the database graffitiStrokes");
   }
catch(PDOException $e) {
    // Print PDOException message
    echo $e->getMessage();
  }

  $theQuery = 'CREATE TABLE stroke (
    url TEXT NOT NULL,
    creationDate TEXT NOT NULL,
    red INTEGER NOT NULL,
    green INTEGER NOT NULL,
    blue INTEGER NOT NULL,
    alpha INTEGER NOT NULL,
    positionsWidths TEXT NOT NULL
  )';
      $file_db ->exec($theQuery);

      $insertStatement = "INSERT INTO stroke (
        url,
        creationDate,
        red,
        green,
        blue,
        alpha,
        positionsWidths
      )
      VALUES (
        'https://www.youtube.com/',
        '2019-11-16T12-30-30',
        255,
        0,
        0,
        0,
        '0,20,20, 200,200, 20'
      ) ";

      $file_db ->exec($insertStatement);

  // if everything executed error less we will arrive at this statement
      echo ("Table stroke created successfully<br \>");
        // Close file db connection
         $file_db = null;
  ?>
