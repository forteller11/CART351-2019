'use strict';

let canvasActivation = true;
window.onload = main;
function main(){
  sizeCursorInit();
  colorCursorInit();

  let onOff = document.getElementById("activateButton");
  onOff.style.backgroundColor = 'grey';


  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'getActivation'}, (response) => {
      canvasActivation = response.active;
      console.log(canvasActivation);
      if (canvasActivation)
        onOff.style.backgroundColor = new Color(100,255,100,1).cssSerialize();
      else
        onOff.style.backgroundColor = new Color(255,100,100,1).cssSerialize();
    });
  });


  onOff.addEventListener('pointerdown', (e) => {
    let changedActivity;
    if (canvasActivation){
      changedActivity = false;
      onOff.style.backgroundColor = new Color(255,100,100,1).cssSerialize();
    }
      else {
        changedActivity = true;
        onOff.style.backgroundColor = new Color(100,255,100,1).cssSerialize();
      }
      canvasActivation = changedActivity;

    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'setActivation', active:changedActivity}, (response) => {
      });
    });
  });

}
