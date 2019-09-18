'use strict';

/*
the node class most fundmentally is the building block of hierchical/directed tree data stucture
having a single parent and potentially multiple children.
Effectively nodes can act either has folders (if they have children) or hyperlinks
if they have a url and are at the end of a branch (have no children);
*/
class Node
{

  constructor(name = "unassigned name", parent = null, url = ''){
    this.name = name;
    this.parent = parent; //another node object
    this.url = url; //url to open if selected
    this.children = []; //node objects

    this.indentBranch = "--";
    this.indentUnopenedParent = "-:";
    this.indentLeaf = "->";
  }

  select(){
    if (this.url.length > 0) {window.open(this.url, '_blank');}
    else console.error(`${this.name} has been selected but has no hyper-link!`)
  }

  printBranch(indentHistory = "", deep = false){
    let newNameInfo = this.printSelf(indentHistory);
    let branchString = "";
    branchString += newNameInfo.name;
    if (this.children.length > 0){
      for (let i = 0; i < this.children.length; i ++){
        if (deep) {branchString += this.children[i].printBranch(newNameInfo.indentHistory);}
        else branchString += this.children[i].printSelf(newNameInfo.indentHistory).name;
      }
    }

    return branchString;
  }

  printSelf(indentHistory = ""){
    let branchString = "";
    let newIndent = "";
    let indentToAdd = this.indentBranch;
    if (this.children.length === 0) {indentToAdd = this.indentLeaf;}

    for (let i = 0; i < indentHistory.length-indentToAdd.length; i++){
      newIndent += "-";
    }
    newIndent += indentToAdd;

    branchString += newIndent;
    branchString += this.name;
    branchString += "\n";

    return {
      name: branchString,
      indentHistory: newIndent
    };
  }

  findChildByName(nameToMatch){
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].name.toLowerCase() === nameToMatch.toLowerCase()) {return this.children[i];}
    }
    console.log("couldn't find child by name: " + nameToMatch);
    return this;
  }

}
