'use strict';


class GraphParser {

  constructor(root) {
    this.root = root;
    this.index = root;
    this.textBuffer;
  }

  returnToBaseNode() {
    this.index = this.root;
  }

  input(inputString = "") {
    let commands = inputString.split("/");

    if (commands[0] === this.index.name) {
      commands.splice(0,1);
      console.log("starting is index");
    }

    while (commands.length > 0) {
      if ((commands[0] === "..") || (commands[0] === "/..")){
        this.exit();
      }
      else {
        this.dive(commands[0]);
      }
      commands.splice(0,1);
      this.printIndex();
    }

    console.log("FINISHED INPUT: "+this.index.name);
  }

  dive(nodeName = "") { //if nodeName matches a child, print the branch and focus on it
    this.index = this.index.findChildByName(nodeName);
  }

  exit(){
    if (!(this.index.parent === null)) {
      console.log("exit");
      this.index = this.index.parent;
      return;
    }
    console.log("exit not possible");
  }

  printIndex() {
    console.log(this.index.printBranch());
  }

  select() {
    this.index.select();
  }

}
