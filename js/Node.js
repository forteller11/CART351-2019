'use strict';


class Node
{

  constructor(name = "unassigned name", parent = null, url = ''){
    this.name = name;
    this.parent = parent; //another node object
    this.url = url;
    this.children = [];

    this.newLine = "\n";
    this.indentSpace = "___";
  }

  selected(){
    //console.error("Method not implemented!");
    if (this.url.length > 0) window.open(this.url, '_blank');
    if (this.children.length > 0) return this.children; //change directory?
    else return this;
  }

  exit(){
    return this.parent;
  }

  printBranch(currentIndent = "__"){
    let branchString = "";
    branchString += this.name;
    branchString += this.newLine;
    if (this.children.length > 0){
      branchString += currentIndent;
      for (let i = 0; i < this.children.length; i ++){
        branchString += this.children[0].printBranch(currentIndent + this.indentSpace);
      }
    }

    return branchString;
  }

}
