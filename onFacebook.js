//This is a content script which means it should run when the url is "*://*.facebook.com/*", "*://*.messenger.com/*"
//Loads after background.js and contextMenuBackground.js
//get document should get the Facebook document

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
    
    //timerTest.onclick=clearTime;
}
    

//THIS FUNCTION NEEDS TO BE UPDATED
//COPIED AND PASTED FROM popup.js: clearTime() , storeClearedTimer(), and timeString()
function clearTime(){
    var okClicked = window.confirm("Should the time be cleared?");
    if(okClicked){
        storeClearedTime();
        updateTimeString(); //THIS IS NOW OBSOLETE
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