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
    //TODO use the currentWindow:true rather than tabs[0]
    chrome.tabs.query({active: true}, function(tabs){
        tab = tabs[0];
        if(tab.url == 'chrome://newtab/'){
            chrome.tabs.update(tab.id, {url: "popup.html"});
        }else{
            chrome.tabs.create({ url: "popup.html"});
        }
    });
    
});

//set this variable to the interval or timeout so I could clear it later
var setIntervalTimer; 

var timerOn = false;


///////////HANDELING START & STOP TIMER CASES///////////


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
        //console.log("No window ID");
        dealWithTimer(-1);
    }else{
        //TODO use the currentWindow:true rather than loop through each tab
        chrome.tabs.query({active: true}, function(tabs){
            tabs.forEach(function(tab){
                //console.log("tabWId: " + tab.windowId + ", WID: "+windowId +", url " +tab.url);
                if(tab.windowId == windowId){
                    dealWithTimer(tab);
                }
            })
        });
    }
});



var prevTab = null;
var currTab = null;
chrome.idle.setDetectionInterval(30); //set idle interval to 30 seconds
chrome.idle.onStateChanged.addListener(function(newState){
    var date = new Date();
    var s = (newState + " @ " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    
    if(newState != chrome.idle.IdleState.ACTIVE) {
        s="CARAMBA! "+s;
        console.log(s);
        dealWithTimer('idle');
    }else{
        console.log(s);
        dealWithTimer(prevTab);
    }
    
    //console.log(s);
    console.log("currTab");
    console.log(currTab);
    console.log("prevTab");
    console.log(prevTab);
    //alert(s); 
    
});

function dealWithTimer(tab){
    if(currTab != 'idle') prevTab = currTab;
    currTab = tab;
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
    if(tab == -1 || tab == undefined || !tab.active || tab == 'idle' ){
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

////////////TIMER FUNCTIONS//////////

var accumulatedTime;
var accumulatedTimeKey='accTimeMS'

var startTime;
var endTime;

var firstTimer;
function startTimer(){
    console.log("\nStart Timer");
    
    startTime=Date.now();
    
    timerOn=true;
    
    chrome.storage.sync.get(accumulatedTimeKey, function(items){
        console.log("Start time: " + items[accumulatedTimeKey]);
        accumulatedTime = items[accumulatedTimeKey];
        
        //use the accumulated time to make a timeout
        setIntervalTimer = setTimeout(initiateFutureUpdates, (60-accumulatedTime%60)*1000);
    });
}

function initiateFutureUpdates(){
    //make the current update
    futureUpdates();
    
    //test to see if the interval timer runs immediately after this
    setIntervalTimer = setInterval(futureUpdates, 60000);
}

function futureUpdates(){
    //get the temp time
    //to set the temp time
    chrome.storage.sync.get(accumulatedTimeKey, function(items){
        //console.log("Future updates: " + items[accumulatedTimeKey]);
        items["tempTimeKey"] = accumulatedTime+(Date.now()-startTime)/1000;

        //set the temp time
        chrome.storage.sync.set(items, function(){
            chrome.tabs.executeScript({file: 'facebookLiveTimerDisplay.js'});
        });
        
        usageAlert(items["tempTimeKey"]);
    });
}

var fbAlertsKey='fbAlerts';
function usageAlert(timeSpent){
    console.log("Usage alert: " + timeSpent);
    
    //something to paste in console
    /*
    chrome.storage.sync.get(accumulatedTimeKey, function(items){items[accumulatedTimeKey] = 596; chrome.storage.sync.set(items, function(){});});

    chrome.storage.sync.get(accumulatedTimeKey, function(items){console.log(items)});
    
    */
    chrome.storage.sync.get(fbAlertsKey, function(items){
        console.log("FB alerts on? " + items[fbAlertsKey]);
        
        //!undefined is true
        //undefined==false is false
        if(items[fbAlertsKey] == false) return;

        if(Math.round(timeSpent/60) % 5 == 0){
            var okClicked = window.confirm("You have been using Facebook for another five minutes. You will be leave Facebook if you click OK.");
            if(okClicked){
                //alert("ok c");
                chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
                    var tab = tabs[0]; //tabs should only contain one tab.
                    chrome.tabs.update(tab.id, {url: 'chrome://newtab/'});
                });
            }
        }
    });
}

function stopTimer(){
    console.log("\nStop Timer");
    endTime=Date.now();
    
    storeAccumulatedTime();
    clearTimeout(setIntervalTimer);
    timerOn=false;
    
}

function storeAccumulatedTime(){
    chrome.storage.sync.get(accumulatedTimeKey, function(items){
        //console.log("storedTime: " + items[accumulatedTimeKey]);
        accumulatedTime = items[accumulatedTimeKey];
        
        console.log("Time spent: " + (endTime-startTime)/1000);
    
        accumulatedTime+=(endTime-startTime)/1000;

        items[accumulatedTimeKey] = accumulatedTime;

        chrome.storage.sync.set(items, function(){
            //console.log("saved time: " + accumulatedTime);
            //console.log(typeof(accumulatedTime));
            //console.log(isNaN(accumulatedTime));
            
            console.log("accTime: "
                +Math.floor(accumulatedTime/3600) + "hrs "
                +Math.floor(accumulatedTime/60 % 60) + "mins "
                +accumulatedTime%60 + "s ");

        });
        
    });
}

