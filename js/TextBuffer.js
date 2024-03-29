'use strict';


class TextBuffer
{
  constructor (output, input)
  {
    this.outputDiv = output;
    this.inputDiv = input;
    this.consoleText = ""; //represents console
    this.queuedTexts = [];
    //maybe queued text is array
    this.timePerWord = 8; //in ms
    this.queueClearInterval;

    window.addEventListener('onmousehover',()=>this.inputDiv.focus());
    //add text
  }

  emptyQueueToDivOverTime(optionalString = ""){

    this.addToQueue(optionalString);
    //find out what strings to attach to text node string ot shed
    //remove strings from queued text

    //var content = div.createTextNode(stringToShed);
    //this.emptyQueueToDivOverTime
    this.queueClearInterval = setInterval( ()=>{
      if (this.checkIfQueueEmpty()) {return;}
      let charToAdd = this.queuedTexts.shift();
      this.outputDiv.innerText += charToAdd;
      if (charToAdd === "\n") {this.inputDiv.scrollIntoView();}
      this.checkIfQueueEmpty();

    }, this.timePerWord);
  }

  addToQueue(inputString, linebreak = true){
    let space = "";
    if (linebreak) {space = "\n";}
    let inputStringSpaced = space+inputString;
    let arrOfWords = inputStringSpaced.split("");
    for (let i = 0; i < arrOfWords.length; i++){
      this.queuedTexts.push(arrOfWords[i]); //add to array of chars in event blob
    }
  }

  checkIfQueueEmpty(){
    if (this.queuedTexts.length === 0) {
      clearInterval(this.queueClearInterval);
      return true;
    }
    return false;
  }

  clear(){
    this.queuedText = [];
    this.outputDiv.innerText = "";
  }


}
