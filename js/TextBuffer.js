'use strict';


class TextBuffer
{
  constructor (input, output)
  {
    console.log(output);
    this.inputTextBox = input;
    this.outputDiv = output;
    this.consoleText = ""; //represents console
    this.queuedTexts = [];
    //maybe queued text is array
    this.timePerWord = 8; //in ms
    this.queueClearInterval = null;

    //add text
  }

  emptyQueueToDivOverTime(optionalString = ""){
    console.log("empty queue div");
    this.addToQueue(optionalString);

    //find out what strings to attach to text node string ot shed
    //remove strings from queued text

    //var content = div.createTextNode(stringToShed);
    //this.emptyQueueToDivOverTime

    this.queueClearInterval = setInterval( ()=>{
      this.outputDiv.innerText += this.queuedTexts.pop();
      this.checkIfQueueEmpty();
    }, this.timePerWord);
  }

  addToQueue(inputString){
    let arrOfWords = inputString.split("");
    for (let i = 0; i < arrOfWords.length; i++){
      this.queuedTexts.push(arrOfWords[i]); //add to array of chars in event blob
    }
  }

  checkIfQueueEmpty(){
    if ((this.queuedTexts.length === 0) && (!(this.queueClearInterval === null)) ) {
      console.log("cleartimeout");
      clearTimeout(this.queueClearInterval);
      this.queueClearInterval = null;
      return;
    }
  }


}
