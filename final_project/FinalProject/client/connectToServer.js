'use strict';

window.onload = main;

function main(){
  console.log("main test");

  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "../db/createDB.php", true);
  xhttp.send();

  xhttp.onreadystatechange = (e) => {
    console.log("ah");
    console.log(e);
  };

}
