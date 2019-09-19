'use strict';

window.onload = main;

function main() {
  let root = createGraph();
  let terminalOutput = document.getElementById("terminalOutput");
  let terminalInput = document.getElementById("terminalInput");
  terminalInput.focus();
  let textBuffer = new TextBuffer(terminalOutput, terminalInput);
  let graphParser = new GraphParser(root, textBuffer, terminalInput);

  textBuffer.addToQueue(
    `Terminal_Home_Page
    Charly_Yan_Miller

    ░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░┌┐░┌───┬───┬───┐
    ░░░░░░░┌┘└┐│┌─┐│┌──┼──┐│
    ┌──┬──┬┴┐┌┘└┘┌┘│└──┼░░││
    │┌─┤┌┐│┌┤│░┌┐└┐├──┐├░░││
    │└─┤┌┐│││└┐│└─┘├──┘├──┘│
    └──┴┘└┴┘└─┘└───┴───┴───┘
    ░░░░░░░░░░░░░░░░░░░░░░░░

    "help"_for_options
    --------------------------

    `, false);

  textBuffer.emptyQueueToDivOverTime(graphParser.printIndex());

  window.addEventListener("mouseup", ()=>{
    terminalInput.focus();
  });
  }
