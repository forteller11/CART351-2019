'use strict';


class ParentNode extends Node
{
  constructor (div)
  {
    this.children[]; //type of end node
  }

  select(){
    return this.children;
  }

  printBranch(string currentIndent){

    let branchString = "";
    let branchString += currentIndent;
    branchString += this.name;
    branchString += this.newLine;

    for (let child in children){
      branchString += child.printBranch(currentIndent + this.indentSpace);
    }
  }
}
