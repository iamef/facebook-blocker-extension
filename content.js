var timeDisplay = document.createElement("p");
timeDisplay.appendChild(document.createTextNode("TEXT"));
timeDisplay.style.float = "left";


var startTime;
var endTime;

//var displayTime;

var accumulatedTime;
var accumulatedTimeKey='accTimeMS'

function startTimer(){
    startTime = performance.now();
    
    accumulatedTime = chrome.storage.sync.get(accumulatedTimeKey, function(items){
        return items[accumulatedTimeKey];
        /*console.log(chrome.runtime.lastError);
        console.log(items[accumulatedTimeKey]);
        
        return (chrome.runtime.lastError ? 0 : items[accumulatedTimeKey]);*/
    });
    
    if(accumulatedTime == undefined) accumulatedTime = 0;
    console.log(accumulatedTime);
}

function endTimer(){
    endTime = performance.now();
    
    accumulatedTime+=(endTime-startTime);
    
    var items = {};
    item[accumulatedTimeKey] = accumulatedTime;
    
    chrome.storage.sync.set(items);
    //add some mech to store it to chrome
}

function updateTime(){   
    var now = performance.now();
    console.log(now);
    
    var secondsPassed = (now - startTime + accumulatedTime)/1000;
    console.log(startTime)
    console.log(accumulatedTime);
    console.log(secondsPassed);
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

//fbTopBar.insertBefore(timeDisplay, fbTopBar.firstChild);
fbTopBar.appendChild(timeDisplay);



startTimer();
setInterval(updateTime, 1000);