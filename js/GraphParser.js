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
    let potentialNode = this.index.findChildByName(nodeName);
    if (!(potentialNode === null)) {
      this.index = potentialNode;
      this.printIndex();
      this.select();
      return;
    }
    console.log("Couldn't find name");
  }

  input(inputString = "") {
    let nodeNames = inputString.split("/");
    if (nodeNames[0] === this.root.name) this.absoluteDirectorySelect(nodeNames); //if the first node is the root node name, go into directory mode
    else this.dive(inputString);
  }

  absoluteDirectorySelect(nodeNames) {
    let selectedNode = this.root.returnNodeAlongBranch(nodeNames);
    console.log(selectedNode.name);
  }

  printIndex() {
    console.log(this.index.printBranch());
  }

  select() {
    this.index.select();
  }

}
