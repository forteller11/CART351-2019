'use strict';

/*
  this class is responsible for understanding graphs/trees (node<-->node relationships)
  as well as understanding and interpreting inputs from the textinput
  providing the textBuffer strings and selecting particular nodes to open up windows
  Disclaimer: the graphParser is super tightly coupled with the Node class
*/
class GraphParser {

  constructor(root, textBuffer, input) {
    this.root = root;
    this.index = root;
    this.textBuffer = textBuffer;
    this.textInput = input;

    this.textInput.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this.input(this.textInput.value);
        this.textInput.value = "";
        this.textInput.placeholder = "";
      }
    })
  }

  returnToBaseNode() {
    this.index = this.root;
  }

  input(inputString = "") {
    let commands = inputString.split("/");

    if ((commands[0] === this.index.name) && (commands.length > 1)) {
      commands.splice(0, 1);
    }

    let doesCommandMatchIndex = false;
    while (commands.length > 0) {
      if ((commands[0] === "..") || (commands[0] === "exit")) {
        this.exit();
        break;
      }
      if ((commands[0] === "help") || (commands[0] === "options")) {
        this.help();
        return;
      }
      if ((commands[0] === "clear") || (commands[0] === "cls")) {
        this.clear();
        break;
      }
      if (commands[0] === "graph") {
        this.textBuffer.emptyQueueToDivOverTime(this.root.printBranch(this.root.indentBranch, true));
        return;
      }
      if ((commands[0] === "root") || (commands[0] === "home")) {
        this.index = this.root;
        break;
      }
      this.dive(commands[0]);
      commands.splice(0, 1);
    }
    this.textBuffer.emptyQueueToDivOverTime(this.printIndex());
  }

  dive(nodeName = "") { //if nodeName matches a child, print the branch and focus on it
    let newChildNode = this.index.findChildByName(nodeName);
    if (newChildNode.url.length > 0) {
      newChildNode.select();
    } else this.index = newChildNode;
    //select do it...
  }

  exit() {
    if (!(this.index.parent === null)) {
      console.log("exit");
      this.index = this.index.parent;
      return;
    }
    console.log("exit not possible");
  }

  clear() {
    this.textBuffer.clear();
  }

  printIndex() {
    return this.index.printBranch(this.index.indentBranch);
  }

  help() {
    let help =
    `Help:
    -------------------
    Enter_folder_names_to_traverse_directory
    actions_can_be_nested_using_"/"
    --------------------
    Commands:
    "graph-------------->displays_entire_directory_structure"
    "clear"------------->clears_the_screen
    "exit"-------------->goes_up_in_the_directory
    "root"-------------->returns_to_root_directory
    "draw"-------------->assci_art_:)
    `;
    this.textBuffer.emptyQueueToDivOverTime(help);
  }

}
