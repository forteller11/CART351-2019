'use strict';


class Node
{

  constructor(name = "unassigned name", parent = null, url = ''){
    this.name = name;
    this.parent = parent; //another node object
    this.url = url;
    this.children = [];

    this.newLine = "\n";
    this.indentBranch = " ->";
    this.indentLeaf = " ->";
  }

  select(){
    //console.error("Method not implemented!");
    if (this.url.length > 0) window.open(this.url, '_blank');
    //if (this.children.length > 0) return this.children; //change directory?
    //else return this;
  }

  printBranch(indentHistory = ""){
    let branchString = "";
    let currentIndent = "";
    let indentToAdd = this.indentBranch;
    if (this.children.length === 0) indentToAdd = this.indentLeaf;

    for (let i = 0; i < indentHistory.length-indentToAdd.length; i++){
      currentIndent += " ";
    }

    branchString += currentIndent+indentToAdd;
    branchString += this.name;
    branchString += this.newLine;
    if (this.children.length > 0){
      for (let i = 0; i < this.children.length; i ++){
        branchString += this.children[i].printBranch(indentHistory + indentToAdd);
      }
    }

    return branchString;
  }

  findChildByName(nameToMatch){
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].name === nameToMatch) return this.children[i];
    }
    console.log("couldn't find child by name: " + nameToMatch);
    return this;
  }


}
