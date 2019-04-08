/*TIMER INFORMATION*/
var timeSpentElem = document.getElementById("timeSpent");
timeSpentElem.onclick= clearTime;
//timeSpentElem.onmouseover=updateTimeString;

var accumulatedTime;
var accumulatedTimeKey='accTimeMS';

document.getElementById("saveSettings").onclick = saveSettings;
updateTimeString();
updateSettingsDisplay();

function updateTimeString(){
    chrome.storage.sync.get(accumulatedTimeKey, function(items){
        console.log(items[accumulatedTimeKey]);
        accumulatedTime = items[accumulatedTimeKey];
        /*console.log(chrome.runtime.lastError);
        console.log(items[accumulatedTimeKey]);

        return (chrome.runtime.lastError ? 0 : items[accumulatedTimeKey]);*/

        //must be put in here because it is asynchronous
        timeSpentElem.innerHTML="Time spent on Facebook: "+timeString();

    });
}

var enabledKey='enabled';
var notifsTopBarBlockedKey='notifsTopBarBlocked';
var chatBlockedKey='chatBlocked';
var newsfeedBlockedKey='feedBlocked';
var fbAlertsKey='fbAlerts';
function updateSettingsDisplay(){
    chrome.storage.sync.get(enabledKey, function(items){
        //enabled section
        var enabled = items[enabledKey];
        if(enabled==undefined){
            //alert("enabled: "+enabled);
            enabled=true;
        }
        document.getElementById("enabled").checked=enabled;
        
        //notifications top bar
        //console.log("notifs saved state: " + items[notifsTopBarBlockedKey]);
        var notifsBlocked = items[notifsTopBarBlockedKey];
        if(notifsBlocked==undefined){
            notifsBlocked=true;
        }
        document.getElementById('notifsTopBar').checked=notifsBlocked;
        
        //chat
        var chatBlocked = items[chatBlockedKey];
        if(chatBlocked==undefined){
            chatBlocked=true;
        }
        document.getElementById("blockChat").checked=chatBlocked;
        
        //newsfeed
        var newsBlocked = items[newsfeedBlockedKey];
        if(newsBlocked==undefined){
            newsBlocked=true;
        }
        document.getElementById("newsfeed").checked=newsBlocked;
        
        //fb alerts
        var fbAlertsOn = items[fbAlertsKey];
        if(fbAlertsOn==undefined){
            fbAlertsOn=true;
        }
        document.getElementById("fbAlerts").checked=fbAlertsOn;
        
    });
}

function saveSettings(){
    //Enabled settings
    var enabled = document.getElementById('enabled').checked;
    var items = {};
    items[enabledKey] = enabled;
    
    
    //notifications top bar
    var notifsBlocked = document.getElementById('notifsTopBar').checked;
    items[notifsTopBarBlockedKey] = notifsBlocked;
    console.log("notifications blocked " + notifsBlocked)
    
    //chat
    var chatBlocked = document.getElementById('blockChat').checked;
    items[chatBlockedKey] = chatBlocked;
    
    //newsfeed
    var newsBlocked = document.getElementById('newsfeed').checked;
    items[newsfeedBlockedKey] = newsBlocked;
    //EDIIITTTT FRRROOOMMM HEERREEE .   items[chatBlockedKey] = chatBlocked;
    
    //fbAlerts
    var fbAlertsOn = document.getElementById("fbAlerts").checked
    items[fbAlertsKey] = fbAlertsOn;
    
    chrome.storage.sync.set(items, function() {
          alert("Settings saved.");
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
    
    
    
    
    var hours = Math.floor(secondsPassed / 3600);
    var minutes = Math.floor(secondsPassed / 60) % 60;
    var seconds = Math.round(secondsPassed % 60);
    
    var displayString = "";

    if(isNaN(hours)){
        hours=0;
    }
    
    
    if(isNaN(minutes)){
        minutes=0;
    }
    if(isNaN(seconds)){
        seconds=0;
    }
    
    if(hours > 0){
        displayString+=hours + "hr ";
    }
    displayString += minutes + "m " + seconds + "s";

    /*
    if(seconds < 10)
        displayString= minutes + ":0" + seconds;
    else
        displayString= minutes + ":" + seconds;*/
    //alert(displayString);
    return displayString;
}

/*SETTINGS INFORMATION*/
//settings icon
var settingsIconElem = document.getElementById("settingsIcon");
settingsIconElem.onclick = function(){
    var settingsDisplay = document.getElementById("settingsDiv").style.display;
    if(settingsDisplay != "none" && settingsDisplay != ""){
        //the variable is not a pointer so we must use this instead :cry-face:
        document.getElementById("settingsDiv").style.display = "none";
    }else{
        document.getElementById("settingsDiv").style.display = 'block';
    }
}



