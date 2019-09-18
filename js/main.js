'use strict';


//let window = getElementsByClassName('Window');
window.onload = main;
let canvas;
let gl;


console.log("ah");

function main() {
  let root = createGraph();

  let graphParser = new GraphParser(root);
  graphParser.printIndex();
  }


  function createGraph(){
    let root = new Node("CART 351");
      let baseGithub = new Node("Github Main Page", root, "https://github.com/forteller11/CART351-2019");
      let exercises = new Node("Exercises", root);
      let projects = new Node("Project", root);
      let reflections = new Node("Reflections", root);
      let presentations = new Node("Presentations", root);
    root.children.push(baseGithub, exercises, projects, reflections, presentations);

    return root;
  }
