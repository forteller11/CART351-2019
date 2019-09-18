'use strict';


class TextBuffer()
{
  constructor (div)
  {
    this.div = div;
    this.consoleText = ""; //represents console
    this.queuedText = "";
    this.timePerLine = 4; //in ms
    //add text
  }

  emptyQueueToDivOverTime(){
    if (queuedText.length < 1) return; //if empty end loop
    //find out what strings to attach to text node string ot shed
    //remove strings from queued text
    var content = div.createTextNode(stringToShed);
    this.emptyQueueToDivOverTime
    window.timeout(timePerLine, this.emptyQueueToDivOverTime);
  }
}
