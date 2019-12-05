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
      let e2 = new Node("Exercise02", exercises);
        let e2Github = new Node ("Github", e2, "https://github.com/forteller11/CART351-2019/tree/master/exercises/exercise02");
        let e2A = new Node ("PartA", e2, "https://forteller11.github.io/CART351-2019/exercises/exercise02/PartA/index.html");
        let e2B = new Node ("PartB", e2, "https://forteller11.github.io/CART351-2019/exercises/exercise02/PartB/index.html");
        e2.children.push(e2A, e2B, e2Github);
      let e3 = new Node("Exercise03_(placeholder)", exercises);
      exercises.children.push(e1, e2, e3);
    let projects = new Node("Final_Project", root);
      let propsall = new Node("Proposal", projects, "./assets/FinalProjectProposal.pdf");
      let project = new Node("Final", projects);
        let extension = new Node("Chrome_Tagger", project, "./assets/chromeTagger.zip");
        let extensionReflection = new Node("Writing", project, "./assets/extensionReflection.pdf");
        let extensionVideo = new Node("Video", project, "youtube.com");
      project.children.push(extension, extensionReflection, extensionVideo);
    projects.children.push(propsall, project);
    let reflections = new Node("Reflections", root);
    let presentations = new Node("Presentations", root);
  root.children.push(baseGithub, exercises, projects, reflections, presentations);

  return root;
}
