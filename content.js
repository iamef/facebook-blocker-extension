var timeDisplay = document.createElement("p");
timeDisplay.appendChild(document.createTextNode("TEXT"));
//timeDisplay.style.float = "left";


//var displayTime;

var accumulatedTime;
var accumulatedTimeKey='accTimeMS'

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      //console.log(request);
      alert("request Received");
      sendResponse({receved: true});
  });


function startTimer(){
    chrome.storage.sync.get(accumulatedTimeKey, function(items){
        console.log(items[accumulatedTimeKey]);
        accumulatedTime = items[accumulatedTimeKey];
        /*console.log(chrome.runtime.lastError);
        console.log(items[accumulatedTimeKey]);
        
        return (chrome.runtime.lastError ? 0 : items[accumulatedTimeKey]);*/
    });
    console.log(accumulatedTime);
    
    if(accumulatedTime == undefined) accumulatedTime = 0;
    console.log(accumulatedTime);
}

function storeAccumulatedTime(){
    var items = {};
    items[accumulatedTimeKey] = accumulatedTime;
    
    console.log(items);
    
    chrome.storage.sync.set(items, function(){
        console.log("saved " + accumulatedTime);
        
        
    });
}



function updateTime(){
    accumulatedTime+=1;
    storeAccumulatedTime();
    
    chrome.storage.sync.get(accumulatedTimeKey, function(items){
        console.log(items[accumulatedTimeKey]);
    });
    
    
    var secondsPassed = accumulatedTime;
    //console.log(startTime)
    //console.log(accumulatedTime);
    //console.log(secondsPassed);
    var minutes = Math.floor(secondsPassed / 60);
    var seconds = Math.floor(secondsPassed % 60);
    
    var displayString;
    
    if(seconds < 10)
        displayString= minutes + ":0" + seconds;
    else
        displayString= minutes + ":" + seconds;
    //alert(displayString);
    timeDisplay.innerHTML = displayString;
}

fbTopBar = document.getElementById("pagelet_bluebar");

//console.log(fbTopBar);

fbTopBar.insertBefore(timeDisplay, fbTopBar.firstChild);
//fbTopBar.appendChild(timeDisplay);



startTimer();
setInterval(updateTime, 1000);