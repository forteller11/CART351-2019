'use strict';

window.onload = main;

function main(){
  console.log("main test");

  // let getRequest = new XMLHttpRequest();
  // getRequest.open("GET", "../db/getDB.php", true);
  // getRequest.responseType = "document";
  // getRequest.send();
  //
  // getRequest.onreadystatechange = (e) => {
  //   if (e.target.readyState  === 4){
  //     console.log(e.target.response);
  //   }
  //   console.log(e);
  // };

  let postRequest = new XMLHttpRequest();
  postRequest.open("POST", "getDB.php", true);
  console.log(postRequest);
  //postRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  postRequest.responseType = "text";
  let uri = window.location.pathname + '?name=John';
  let encodedUri = encodeURI(uri);
  console.log(encodeURI(uri));
  postRequest.send(encodedUri);

  postRequest.onreadystatechange = (e) => {
    if (e.target.readyState  === 4){
      console.log(e.target.response);
    }
    console.log(e);
  };

}
