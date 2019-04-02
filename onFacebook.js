//This is a content script which means it should run when the url is "*://*.facebook.com/*", "*://*.messenger.com/*"
//Loads after background.js and contextMenuBackground.js

chrome.runtime.sendMessage({onFacebook: true}, function(response){
    //alert("received: " + response.received);
});

addTimerUIOnFacebook();

chrome.runtime.sendMessage({addedTimerUI: true}, function(response){
    //alert("received: " + response.received);
});



function addTimerUIOnFacebook(){
    var timerTest = document.createElement("a");
    
    timerTest.className="_2s25";
    timerTest.id="asdfFacebookTimerfdas";
    timerTest.href="#";
    
    var timerParent = document.querySelectorAll('[data-click="profile_icon"]')[0];
    timerParent.insertBefore(timerTest, timerParent.childNodes[0]);
    
    //firstTimeUpdate(); //from background.js, hopefully will work
    //timerTest.onclick=clearTime;

        
    /*timerTest.style.position="fixed";
    timerTest.style.bottom="0";
    timerTest.style.left="0";
    timerTest.innerHTML = "HELLLO";
        
    timerTest.style.color="white";
    timerTest.style.backgroundColor="blue";
        
    timerTest.style.zIndex=10000;
    
    document.body.insertBefore(timerTest, document.body.childNodes[0]);
    */
}
    
//COPIED AND PASTED FROM popup.js: clearTime() , storeClearedTimer(), and timeString()
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

//May not be necessary because it was added to background.js
/*function timeStringOnFB(){
    var secondsPassed = accumulatedTime; //accumulatedTime is in seconds
    var minutesDisplay = Math.round(secondsPassed / 60) % 60;
    var hours = Math.floor(secondsPassed / 3600);
    
    var displayString = "";
    
    if(isNaN(minutesDisplay)){
        minutes=0;
    }
    if(isNaN(hours)){
        hours=0;
    }
    
    if(hours > 0){
        displayString+=hours + "hr ";
    }
    displayString += minutesDisplay + "mins";
    
    return displayString;
}*/
