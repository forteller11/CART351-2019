'use strict';


class TextBuffer
{
  constructor (output)
  {
    this.outputDiv = output;
    this.consoleText = ""; //represents console
    this.queuedTexts = [];
    //maybe queued text is array
    this.timePerWord = 8; //in ms
    this.queueClearInterval;


    //add text
  }

  emptyQueueToDivOverTime(optionalString = ""){

    this.addToQueue(optionalString);
    //find out what strings to attach to text node string ot shed
    //remove strings from queued text

    //var content = div.createTextNode(stringToShed);
    //this.emptyQueueToDivOverTime
    console.log(this.queuedTexts);
    this.queueClearInterval = setInterval( ()=>{
      if (this.checkIfQueueEmpty()) return;
      this.outputDiv.innerText += this.queuedTexts.shift();
      this.checkIfQueueEmpty();
    }, this.timePerWord);
  }

  addToQueue(inputString){
    let space = "\n";
    let inputStringSpaced = space+inputString;
    let arrOfWords = inputStringSpaced.split("");
    for (let i = 0; i < arrOfWords.length; i++){
      this.queuedTexts.push(arrOfWords[i]); //add to array of chars in event blob
    }
  }

  checkIfQueueEmpty(){
    if (this.queuedTexts.length === 0) {
      //clearInterval(this.queueClearInterval);
      return true;
    }
    return false;
  }


}
