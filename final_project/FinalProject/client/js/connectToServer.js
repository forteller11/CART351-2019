'use strict';

window.onload = main;

function main(){
  console.log("main test");

  // let getRequest = new XMLHttpRequest();
  // getRequest.open("GET", "https://blooming-meadow-17879.herokuapp.com?hostname=youtube.com", true);
  // getRequest.responseType = "text";
  // getRequest.send();
  //
  // getRequest.onreadystatechange = (e) => {
  //   if (e.target.readyState  === 4){
  //     console.log("GET BACK FROM SERVER:")
  //     console.log(e.target.response);
  //   }
  //   console.log("GET readystate: "+ e.target.readyState)
  //   console.log(e);
  // };

  let postRequest = new XMLHttpRequest();
  postRequest.open("POST", "https://blooming-meadow-17879.herokuapp.com/", true);
  console.log(postRequest);
  postRequest.setRequestHeader('Content-Type','text/plain');
  //postRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  postRequest.responseType = "text";
  //let uri = window.location.hostname; //+ '?name=John';
  //let encodedUri = encodeURI(uri);
  //console.log(encodeURI(uri));

  let hostname = "test.com";
  let stroke1 = "255,0,0,1,20,20,40,80";
  let stroke2 = "0,0,255,0.5,0,60,200,60";
  let strokeData = stroke1 + ";" + stroke2;
  let txtToPost = hostname + "|_|" + strokeData;

  postRequest.send(hostname + "|_|" + strokeData);

  postRequest.onreadystatechange = (e) => {
    if (e.target.readyState  === 4){
      console.log("BACK FROM SERVER: ")
      console.log(e.target.response);
    } else{
      console.log("readystate: "+ e.target.readyState);
      console.log(e);
    }
  };

}
