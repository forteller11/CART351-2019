'use strict';


class GraphParser {

  constructor(root, textBuffer, input) {
    this.root = root;
    this.index = root;
    this.textBuffer = textBuffer;
    this.textInput = input;

    this.textInput.addEventListener('keypress', (e) =>{
      if (e.keyCode === 13){
        console.log(this.textInput.value);
        this.input(this.textInput.value);
        this.textInput.value = "";
      }
    })
  }

  returnToBaseNode() {
    this.index = this.root;
  }

  input(inputString = "") {
    let commands = inputString.split("/");

    if ((commands[0] === this.index.name) && (commands.length > 1)) {
      commands.splice(0,1);
    }

    while (commands.length > 0) {
      if ((commands[0] === "..") || (commands[0] === "exit")){
        this.exit();
        break;
      }
      if (commands[0] === "help"){
        this.help();
        return;
      }
      if (commands[0] === "clear"){
        this.clear();
        break;
      }
      if (commands[0] === "graph_directory"){
        this.textBuffer.emptyQueueToDivOverTime(this.root.printBranch(this.root.indentBranch, true));
        return;
      }

      if (commands[0] === "root"){
        this.index = this.root;
        break;
      }


        this.dive(commands[0]);

      commands.splice(0,1);
    }
    this.textBuffer.emptyQueueToDivOverTime(this.printIndex());
    this.select();

  }

  dive(nodeName = "") { //if nodeName matches a child, print the branch and focus on it
    this.index = this.index.findChildByName(nodeName);
  }

  exit(){
    if (!(this.index.parent === null)) {
      console.log("exit");
      this.index = this.index.parent;
      return;
    }
    console.log("exit not possible");
  }

  clear(){
    this.textBuffer.clear();
  }

  printIndex() {
    return this.index.printBranch(this.index.indentBranch);
  }

  printShallowIndex(){

  }

  select() {
    this.index.select();
  }

  help(){
    let help = `Enter_folder_names_to_traverse_directory
    actions_can_be_nested_using_"/"
    --------------------
    Commands:
    "graph_directory---->displays_directory_structure_full"
    "clear"------------->clears_the_screen
    "exit"-------------->goes_up_in_the_directory
    "root"-------------->returns_to_root_directory
    `;

    this.textBuffer.emptyQueueToDivOverTime(help);
  }

}
