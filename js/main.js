'use strict';


//let window = getElementsByClassName('Window');
window.onload = main;
let canvas;
let gl;


function main() {
  let root = createGraph();
  let terminalOutput = document.getElementById("terminalOutput");
  let terminalInput = document.getElementById("terminalInput");
  terminalInput.focus();
  terminalInput.select();
  console.log(terminalOutput)
  let textBuffer = new TextBuffer(terminalOutput, terminalInput);
  let graphParser = new GraphParser(root, textBuffer, terminalInput);
  textBuffer.addToQueue(
    `CART_351_Home_Page
    Charly_Yan_Miller

    "help"_for_options
    `, false);
  //graphParser.input("Github Main Page");
  graphParser.input("CART_351");
  }


  function createGraph(){
    let root = new Node("CART_351");
      let baseGithub = new Node("Github_Main_Page", root, "https://github.com/forteller11/CART351-2019");
      let exercises = new Node("Exercises", root);
        let e1 = new Node("Exercise01", exercises);
          let ea = new Node("Github", exercises, "https://github.com/forteller11/CART351-2019");
          let eb = new Node("Website", exercises, "https://forteller11.github.io/CART351-2019/");
          e1.children.push(ea, eb)
        let e2 = new Node("Exercise02_(placeholder)", exercises);
        let e3 = new Node("Exercise03_(placeholder)", exercises);
        exercises.children.push(e1, e2, e3);
      let projects = new Node("Project", root);
      let reflections = new Node("Reflections", root);
      let presentations = new Node("Presentations", root);
    root.children.push(baseGithub, exercises, projects, reflections, presentations);

    return root;
  }
