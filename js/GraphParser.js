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
    for (let i = 0; i < this.index.children.length; i++) {
      if (this.index.children[i].name === nodeName) {
        this.index = this.index.children[i];

        this.printIndex();
        this.select();
        return;
      }
    }
    console.log("Couldn't find name");
  }

  printIndex(){
    console.log(this.index.printBranch());
  }

  select(){
    this.index.select();
  }

}
