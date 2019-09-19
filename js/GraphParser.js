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

    if (inputString === "") return;
    this.textBuffer.addToQueue(inputString);
    let inputStringLowerCase = inputString.toLowerCase();

    let commands = inputStringLowerCase.split("/");

    console.log(commands[0] + this.index.name);
    if (commands[0] === this.index.name.toLowerCase()) {
      if (commands.length <= 1){
      this.textBuffer.emptyQueueToDivOverTime(`already_in_directory_"${this.index.name}"`);
      return;
    }
      else {
        commands.splice(0, 1);
      }
    }

    let howManyCommandsMatchedDirectory = 0;
    while (commands.length > 0) {
      if ((commands[0] === "..") || (commands[0] === "exit")) {
        if (this.exit() === false) {
          this.textBuffer.emptyQueueToDivOverTime("already_in_root_node\n");
          return;
        }
        howManyCommandsMatchedDirectory++;
        break;
      }
      if ((commands[0] === "help") || (commands[0] === "options")) {
        this.help();
        howManyCommandsMatchedDirectory++;
        return;
      }
      if ((commands[0] === "clear") || (commands[0] === "cls")) {
        this.clear();
        howManyCommandsMatchedDirectory++;
        break;
      }
      if (commands[0] === "graph") {
        this.textBuffer.emptyQueueToDivOverTime(this.root.printBranch(this.root.indentBranch, true));
        howManyCommandsMatchedDirectory++;
        return;
      }
      if ((commands[0] === "root") || (commands[0] === "home")) {
        if (this.index === this.root) {
          this.textBuffer.emptyQueueToDivOverTime("already_in_root_node\n");
          return;
        }
        this.index = this.root;
        howManyCommandsMatchedDirectory++;
        break;
      }
      if ((commands[0] === "draw") || (commands[0] === "assci")) {
        this.textBuffer.emptyQueueToDivOverTime(this.proceduralAssciArt());
        howManyCommandsMatchedDirectory++;
        return;
      }
      howManyCommandsMatchedDirectory += this.dive(commands[0]);
      commands.splice(0, 1);
    }
    if (howManyCommandsMatchedDirectory > 0){
      this.textBuffer.emptyQueueToDivOverTime(this.printIndex());
    } else this.textBuffer.emptyQueueToDivOverTime("Could_not_understand_above_commands\n");
  }

  dive(nodeName = "") { //if nodeName matches a child, print the branch and focus on it
    let potentialChildNode = this.index.findChildByName(nodeName);
    if (potentialChildNode instanceof Node){
      if (potentialChildNode.url.length > 0) {
        potentialChildNode.select();
        this.textBuffer.addToQueue(`window_opened_"${potentialChildNode.url}"`);
      }
      else this.index = potentialChildNode;
      return 1;
    }
    return 0;
  }

  exit() {
    if (!(this.index.parent === null)) {
      this.index = this.index.parent;
      return true;
    }
    return false;
  }

  clear() {
    this.textBuffer.clear();
  }

  printIndex() {
    return this.index.printBranch(this.index.indentBranch);
  }

  help() {
    let help =
    `-------------------
    Enter_folder_names_to_traverse_directory
    actions_can_be_nested_using_"/"
    --------------------
    Commands:
    "graph-------------->displays_entire_directory_structure"
    "clear"------------->clears_the_screen
    "exit"-------------->goes_up_in_the_directory
    "root"-------------->returns_to_root_directory
    "draw"-------------->assci_art_pattern_:)
    `;
    this.textBuffer.emptyQueueToDivOverTime(help);
  }

  proceduralAssciArt(){
    const w = 14;
    const h = 6;
    let charType = ["░","▒","█","▄","│","║"];
    let assciArt = "";

    for (let i = 0; i < h; i++){
      for (let j = 0; j < w; j++){
        let index = Math.floor(Math.random() * charType.length);
        assciArt += charType[index];
      }
      assciArt += "\n";
    }
    return assciArt;
  }

}
