console.log("background.js"); //this is called right when the extension is installed

/** The purpose of this script is to run basic background processes:

1) ensure user knows when the extension is updated
2) ensure that the popup.html shows up
3) takes care of the timer functions



//fires when the extension is updated
/*chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "update"){
        alert("Extension Updated: \n\n"+
              '-Renamed the extension from "FBlocker and Timer" to "Selective Blocker and Timer for Facebook™" \n'+
              "-Rebranded the logo\n"+ 
              "to avoid legal issues with Facebook."+
              "\nEmail csandapp@gmail.com or leave a review at tinyurl.com/fbblocker if you have any concerns or feedback. Thank you!");
    }
});*/

//fires when the extension is clicked
chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var onNewTab = false;
    chrome.tabs.query({active: true}, function(tabs){
        tab = tabs[0];
        if(tab.url == 'chrome://newtab/'){
            chrome.tabs.update(tab.id, {url: "popup.html"});
        }else{
            chrome.tabs.create({ url: "popup.html"});
        }
    });
    
});

//var accTimeUndefined = true;

var setIntervalTimer; //set this variable to the setIntervalTimer so I could clear it later

var timerOn = false;

//checks if the tab is changed
chrome.tabs.onActivated.addListener(function(info){
    chrome.tabs.get(info.tabId, function (tab){
        dealWithTimer(tab);
        
    });
    
});

//checks if tab updates to contain Facebook
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){   
    if(tab.active) dealWithTimer(tab);
});

//checks if we change to a different window which might contain Facebook
//works when windows are removed and created and so forth
chrome.windows.onFocusChanged.addListener(function(windowId){
    if(windowId == chrome.windows.WINDOW_ID_NONE){
        dealWithTimer(-1);
        
    }
    chrome.tabs.query({active: true}, function(tabs){
        
        tabs.forEach(function(tab){
            //console.log("tabWId: " + tab.windowId + ", WID: "+windowId +", url " +tab.url);
            if(tab.windowId == windowId){
                dealWithTimer(tab);
            }
        })
    });
});

function dealWithTimer(tab){
    if(onFacebook(tab)){
        if(!timerOn){
//            alert("on facebook and timer was off");
            startTimer();
        }else{
//            alert("on FB timer on");
        }
    //not on Facebook
    }else{
        if(timerOn){
//            alert("should turn timer off");
            stopTimer();
        }
    }
}

function onFacebook(tab){
    //criteria: the tab must be active
    //the window must be focused
    //it must be a FB url
    
    
    if(tab == -1 || tab == undefined || !tab.active){
        //alert("the tab is not active");
        return false;
    }
    
    //don't think this is necessary since there is a windows listener now
    /*chrome.windows.getCurrent( function(window){
       if(tab.windowId != window.id){
           alert("tab passed in doesn't have the same window ID");
       }
        //console.log("tab windowID:" + tab.windowId + " current windowID:" + window.id); 
    });*/
    
    url = new URL(tab.url);
    
    
    return (url.host.indexOf(".facebook.") != -1 || url.host.indexOf(".messenger.") != -1);
}

////////////TIMER STUFF//////////

//var displayTime;

var accumulatedTime;
var accumulatedTimeKey='accTimeMS'

var startTime;
var endTime;

var firstTimer;
function startTimer(){
    console.log("\nStart Timer");
    
    //getAccumulatedTime();
    
    //MIGHT WANT TO UNCOMMENT
    
    //AY CARAMBA
    //setIntervalTimer = setInterval(updateTimeDisplay, 60000);
    
    startTime=Date.now();
    
    timerOn=true;
    
    chrome.storage.sync.get(accumulatedTimeKey, function(items){
        console.log(items[accumulatedTimeKey]);
        accumulatedTime = items[accumulatedTimeKey];
        
        //use the accumulated time to make a timeout
        setIntervalTimer = setTimeout(initiateFutureUpdates, (60-accumulatedTime%60)*100);
    });
}

function initiateFutureUpdates(){
    //updateTimeDisplay(currDisplayNumber+60);
    
    //make the current updates right?
    futureUpdates();
    
    //test to see if the interval timer runs immediately after this
    setIntervalTimer = setInterval(futureUpdates, 6000);
}

function futureUpdates(){
    //set the temp time
    chrome.storage.sync.get(accumulatedTimeKey, function(items){
        ///*function storeAccumulatedTime(){
        console.log(items);
        items["tempTimeKey"] = accumulatedTime+(Date.now()-startTime)/1000;

        chrome.storage.sync.set(items, function(){
            chrome.tabs.executeScript({file: 'facebookLiveTimerDisplay.js'});
        });
    });
    
    
    ///////// PUT ALERT FOR EVERY 5 MIN USE!
//    if(currDisplayNumber % 5 == 0){
//        for(var i=0;i<5;i++){
//            alert("You have been using Facebook for another five minutes. Please consider closing your tab.");
//        }
//        /*var okClicked = window.confirm("Should the time be cleared?");
//        if(okClicked){
//            alert()
//        }*/
//    }
}


//chrome.storage.sync.get(accumulatedTimeKey, function(items){
//            ///*function storeAccumulatedTime(){
//            console.log(items);
//            items["tempTimeKey"] = accumulatedTime;
//
//            console.log(items);
//            alert(items);
//            
//            chrome.storage.sync.set(items, function(){
//                chrome.tabs.executeScript({file: 'facebookLiveTimerDisplay.js'});
//                
//                //console.log(typeof(accumulatedTime));
//                //console.log(isNaN(accumulatedTime));
//                
//            });


////called to when the page is first loaded
////uses setTimeout since it may be in the middle of a minute
//function firstTimeUpdate(displayNumber){
//    console.log("FIRSTtime: "+ displayNumber);
//    
//    updateTimeDisplay(displayNumber);
//    setIntervalTimer = setTimeout(initiateFutureUpdates, (60-displayNumber%60)*100);
//}


function stopTimer(){
    console.log("\nStop Timer");
    endTime=Date.now();
    
    storeAccumulatedTime();
    clearTimeout(setIntervalTimer);
    timerOn=false;
    
}

//OBSOLETE: BECAUSE THE GET FUNCTION IS ASYNCHRONOUS, I PREFER TO HAVE THINGS WITHIN IT
//function getAccumulatedTime(){
//    chrome.storage.sync.get(accumulatedTimeKey, function(items){
//        console.log(items[accumulatedTimeKey]);
//        accumulatedTime = items[accumulatedTimeKey];
//        /*console.log(chrome.runtime.lastError);
//        console.log(items[accumulatedTimeKey]);
//        
//        I don't think you can return stuff sin it runs async or something
//        return (chrome.runtime.lastError ? 0 : items[accumulatedTimeKey]);*/
//    });
//    
//    console.log("accTime: "+accumulatedTime);
//}

function storeAccumulatedTime(){
    chrome.storage.sync.get(accumulatedTimeKey, function(items){
        console.log(items[accumulatedTimeKey]);
        accumulatedTime = items[accumulatedTimeKey];
        
        console.log("Time spent: " + (endTime-startTime)/1000);
    
        accumulatedTime+=(endTime-startTime)/1000;

        items[accumulatedTimeKey] = accumulatedTime;

        console.log(items);

        chrome.storage.sync.set(items, function(){
            console.log("saved time: " + accumulatedTime);
            //console.log(typeof(accumulatedTime));
            //console.log(isNaN(accumulatedTime));

        });
        
    });
    
    console.log("accTime: "+accumulatedTime);

}

//OBSOLETE BECAUSE WILL MERGE STORE ACCUMULATED TIME WITH GET TIME
//function storeAccumulatedTime(){
//    var items = {};
//    
//    while(accumulatedTime == undefined || isNaN(accumulatedTime)){   
//        alert("accumulated time:" + accumulatedTime);
//        
//        if(accTimeUndefined) accumulatedTime = 0;
//    }
//    
//    console.log((endTime-startTime)/1000);
//    
//    accumulatedTime+=(endTime-startTime)/1000;
//    
//    items[accumulatedTimeKey] = accumulatedTime;
//    
//    console.log(items);
//    
//    chrome.storage.sync.set(items, function(){
//        console.log("saved time: " + accumulatedTime);
//        //console.log(typeof(accumulatedTime));
//        //console.log(isNaN(accumulatedTime));
//        
//    });
//    
//    accTimeUndefined=false;
//}

//OBSOLETE VERSION MAY NEED THIS FOR REFERENCE
/*function storeAccumulatedTime(){
    var items = {};
    
    if(accumulatedTime == undefined || isNaN(accumulatedTime)){   
        alert("accumulated time:" + accumulatedTime);
        accumulatedTime = 0;
    }
    items[accumulatedTimeKey] = accumulatedTime;
    
    console.log(items);
    
    chrome.storage.sync.set(items, function(){
        console.log("saved time: " + accumulatedTime);
        //console.log(typeof(accumulatedTime));
        //console.log(isNaN(accumulatedTime));
        
    });
}*/


//MAYBE DELETE THIS SECTION!! 
//AY CARAMBA

//this will preferably be called from onFacebook.js
//function firstTimeUpdate(){
//    displayNumber = updateTimeDisplay();
//    setIntervalTimer = setTimeout(initiateFutureUpdates, (60-displayNumber%60)*1000);
//}

//function initiateFutureUpdates(){
//    updateTimeDisplay();
//    setIntervalTimer = setInterval(futureUpdates, 60000);
//}
//
//function futureUpdates(){
//    displayNumber = updateTimeDisplay();
//    if(displayNumber % 5 == 0){
//        for(var i=0;i<5;i++){
//            alert("You have been using Facebook for another five minutes. Please consider closing your tab.");
//        }
//        /*var okClicked = window.confirm("Should the time be cleared?");
//        if(okClicked){
//            alert()
//        }*/
//    }
//}
//
//function updateTimeDisplay(){
//    var displayNumber=0;
//    if(accumulatedTime == undefined || isNaN(accumulatedTime)){   
//        alert("accumulated time:" + accumulatedTime);
//        displayNumber = 0;
//    }else{
//        displayNumber=accumulatedTime;
//    }
//    
////    console.log(displayNumber);
//    displayNumber+=(Date.now()-startTime)/1000;
//    
//    
//    console.log(document);
//    
//    chrome.tabs.executeScript({
//        file: 'facebookLiveTimerDisplay.js'
//    });
//
//    
//    //var timeDisplayElem = document.getElementById("asdfFacebookTimerfdas");
//    
//   //timeDisplayElem = document.getElementById("asdfFacebookTimerfdas");
//    
//    //timeDisplayElem.innerHTML = timeStringOnFB(displayNumber);
//    
//    return displayNumber;   
//}

//function timeStringOnFB(secondsPassed){
//    var minutesDisplay = Math.round(secondsPassed / 60) % 60;
//    var hours = Math.floor(secondsPassed / 3600);
//    
//    var displayString = "";
//    
//    if(isNaN(minutesDisplay)){
//        minutes=0;
//    }
//    if(isNaN(hours)){
//        hours=0;
//    }
//    
//    if(hours > 0){
//        displayString+=hours + "hr ";
//    }
//    displayString += minutesDisplay + "mins";
//    
//    return displayString;
//}

