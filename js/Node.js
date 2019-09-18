'use strict';


class Node
{

  constructor(name = "unassigned name", parent = null, url = ''){
    this.name = name;
    this.parent = parent; //another node object
    this.url = url;
    this.children = [];

    this.newLine = "\n";
    this.indentBranch = "--";
    this.indentLeaf = ">>";
  }

  select(){
    console.log("selected "+this.name)
    if (this.url.length > 0) {window.open(this.url, '_blank');}
    else console.log(`${this.name} has been selected but has no hyper-link!`)
  }

  printBranch(indentHistory = "", deep = false){
    let branchString = "";
    let currentIndent = "";
    let indentToAdd = this.indentBranch;
    if (this.children.length === 0) {indentToAdd = this.indentLeaf;}

    for (let i = 0; i < indentHistory.length-indentToAdd.length; i++){
      currentIndent += "-";
    }

    branchString += currentIndent+indentToAdd;
    branchString += this.name;
    branchString += this.newLine;
    if (this.children.length > 0){
      for (let i = 0; i < this.children.length; i ++){
        if (deep) {branchString += this.children[i].printBranch(indentHistory + indentToAdd);}
        else branchString += this.children[i].printSelf(indentHistory + indentToAdd);
      }
    }

    return branchString;
  }

  findChildByName(nameToMatch){
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].name.toLowerCase() === nameToMatch.toLowerCase()) {return this.children[i];}
    }
    console.log("couldn't find child by name: " + nameToMatch);
    return this;
  }

  printSelf(indentHistory = ""){
    let branchString = "";
    let currentIndent = "";
    let indentToAdd = this.indentBranch;
    if (this.children.length === 0) {indentToAdd = this.indentLeaf;}

    for (let i = 0; i < indentHistory.length-indentToAdd.length; i++){
      currentIndent += "-";
    }

    branchString += currentIndent+indentToAdd;
    branchString += this.name;
    branchString += this.newLine;
    return branchString;
  }


}
