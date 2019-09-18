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

  dive(nodeName = "") { //if nodeName matches a child, print the branch and focus on it
    for (let child in this.index.children) {
      if (child.name === nodeName) {
        this.index = child.name;
        printIndex();
        return;
      }
    }
  }

  printIndex(){
    console.log(this.index.printBranch());
  }

}
