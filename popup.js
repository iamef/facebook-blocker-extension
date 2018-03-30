var elem = document.getElementById("timeSpent");

var accumulatedTime;
var accumulatedTimeKey='accTimeMS';

chrome.storage.sync.get(accumulatedTimeKey, function(items){
    console.log(items[accumulatedTimeKey]);
    accumulatedTime = items[accumulatedTimeKey];
    /*console.log(chrome.runtime.lastError);
    console.log(items[accumulatedTimeKey]);

    return (chrome.runtime.lastError ? 0 : items[accumulatedTimeKey]);*/
    
    //must be put in here because it is asynchronous
    elem.innerHTML=elem.innerHTML+" "+timeString();

});


function timeString(){
    var secondsPassed = accumulatedTime;
    //console.log(startTime)
    //console.log(accumulatedTime);
    //console.log(secondsPassed);
    
    var minutes = Math.floor(secondsPassed / 60);
    var seconds = Math.floor(secondsPassed % 60);
    
    var displayString = "";
    
    displayString= minutes + "m " + seconds + "s";

    /*
    if(seconds < 10)
        displayString= minutes + ":0" + seconds;
    else
        displayString= minutes + ":" + seconds;*/
    //alert(displayString);
    return displayString;
}

