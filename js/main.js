'use strict';


//let window = getElementsByClassName('Window');
window.onload = main;
let canvas;
let gl;


console.log("ah");

function main() {
  let root = createGraph();

  let div = function(){console.log("place holder div");}
  let textBuffer = new TextBuffer(div);
  let graphParser = new GraphParser(root, textBuffer);
  graphParser.printIndex();

  //graphParser.input("Github Main Page");
  graphParser.input(".fadadfasfdafsdsfdasfdafsad..");
  }


  function createGraph(){
    let root = new Node("CART 351");
      let baseGithub = new Node("Github Main Page", root, "https://github.com/forteller11/CART351-2019");
      let exercises = new Node("Exercises", root);
        let e1 = new Node("Exercise01", exercises, "https://www.youtube.com/watch?v=uY717BJA_2I");
        let e2 = new Node("Exercise02", exercises, "https://www.youtube.com/watch?v=k8FVUjGRSac");
        exercises.children.push(e1, e2);
      let projects = new Node("Project", root);
      let reflections = new Node("Reflections", root);
      let presentations = new Node("Presentations", root);
    root.children.push(baseGithub, exercises, projects, reflections, presentations);

    return root;
  }
