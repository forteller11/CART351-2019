'use strict';

window.onload = main;

function main(){
  console.log("main test");

  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "../db/getDB.php", true);
  xhttp.send();

  xhttp.onreadystatechange = (e) => {
    if (e.target.readyState  === 4){
      console.log(e.target.response);
    }
    console.log(e);
  };

}
