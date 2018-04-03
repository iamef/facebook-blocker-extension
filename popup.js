var elem = document.getElementById("timeSpent");
elem.onclick= clearTime;
//elem.onmouseover=updateTimeString;

var accumulatedTime;
var accumulatedTimeKey='accTimeMS';

updateTimeString();


function updateTimeString(){
    chrome.storage.sync.get(accumulatedTimeKey, function(items){
        console.log(items[accumulatedTimeKey]);
        accumulatedTime = items[accumulatedTimeKey];
        /*console.log(chrome.runtime.lastError);
        console.log(items[accumulatedTimeKey]);

        return (chrome.runtime.lastError ? 0 : items[accumulatedTimeKey]);*/

        //must be put in here because it is asynchronous
        elem.innerHTML="Time spent on Facebook: "+timeString();

    });
}

function clearTime(){
    var okClicked = window.confirm("Should the time be cleared?");
    if(okClicked){
        storeClearedTime();
        updateTimeString();
    }
}

function storeClearedTime(){
    var items = {};
    
    accumulatedTime = 0;
    
    items[accumulatedTimeKey] = accumulatedTime;
    
    //console.log(items);
    
    chrome.storage.sync.set(items, function(){
        console.log("saved " + accumulatedTime);
        console.log(items);
        //console.log(typeof(accumulatedTime));
        //console.log(isNaN(accumulatedTime));
        
    });
}


function timeString(){
    var secondsPassed = accumulatedTime;
    //console.log(startTime)
    //console.log(accumulatedTime);
    //console.log(secondsPassed);
    
    var minutes = Math.floor(secondsPassed / 60);
    var seconds = Math.floor(secondsPassed % 60);
    
    var displayString = "";
    
    if(isNaN(minutes)){
        minutes=0;
    }
    if(isNaN(seconds)){
        seconds=0;
    }
    
    displayString= minutes + "m " + seconds + "s";

    /*
    if(seconds < 10)
        displayString= minutes + ":0" + seconds;
    else
        displayString= minutes + ":" + seconds;*/
    //alert(displayString);
    return displayString;
}

