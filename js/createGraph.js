'use strict';


function createGraph(){

  let root = new Node("CART_351");
    let baseGithub = new Node("Github_Main_Page", root, "https://github.com/forteller11/CART351-2019");
    let exercises = new Node("Exercises", root);
      let e1 = new Node("Exercise01", exercises);
        let ea = new Node("Github", e1, "https://github.com/forteller11/CART351-2019");
        let eb = new Node("Website", e1, "https://forteller11.github.io/CART351-2019/");
        let ec = new Node("lastparent", e1);
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
