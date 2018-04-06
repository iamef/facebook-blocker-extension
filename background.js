//fires when the extension is clicked
chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var onNewTab = false;
    //console.log("onClicked");
    chrome.tabs.query({active: true}, function(tabs){
        //console.log(tabs);
        tab = tabs[0];
        console.log(tab.url);
        if(tab.url == 'chrome://newtab/'){
            //alert("new tab is true?")
            chrome.tabs.update(tab.id, {url: "popup.html"});
        }else{
            chrome.tabs.create({ url: "popup.html"});
            
        }
    });
    
});

//gets the active tab
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    //alert(tabs[0]);
});

var setIntervalTimer; //NOW I NEED TO GET RID OF THIS... and clear this later on
var timerOn = false; //USAR

//checks if the tab is changed
chrome.tabs.onActivated.addListener(function(info){
    chrome.tabs.get(info.tabId, function (tab){
        //console.log("Hello");
        
//        url = new URL(tab.url);
//        
//        //alert(url.host.indexOf(".facebook."));
//        
//        if(url.host.indexOf(".facebook.") != -1 || url.host.indexOf(".messenger.") != -1){
//            alert("on Facebook");
//            setIntervalTimer = setInterval(updateTime, 1000);
//        }
        dealWithTimer(tab);
        
    });
    
});

//checks if tab updates to contain Facebook
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    //url = new URL(tab.url);
    
//    if(url.host.indexOf(".facebook.") != -1 || url.host.indexOf(".messenger.") != -1){
//            alert("on Facebook");
//    }
    //console.log(changeInfo);
    dealWithTimer(tab);
});

//checks if we change to a different window which might contain Facebook
//works when windows are removed and created and so forth
chrome.windows.onFocusChanged.addListener(function(windowId){
    //alert("window focus changed");
    chrome.tabs.query({active: true}, function(tabs){
        tabs.forEach(function(tab){
            if(tab.windowId == windowId){
                dealWithTimer(tab);
            }
        })
    });
});

function dealWithTimer(tab){
    if(onFacebook(tab)){
        if(!timerOn){
            //alert("on facebook and timer was off");
            startTimer();
            setIntervalTimer = setInterval(updateTime, 1000);
            timerOn=true;
        }else{
            //alert("on FB timer on");
        }
    //not on Facebook
    }else{
        if(timerOn){
            //alert("should turn timer off");
            clearTimeout(setIntervalTimer);
            timerOn=false;
        }
    }
}

function onFacebook(tab){
    //criteria: the tab must be active
    //the window must be focused
    //it must be a FB url
    
    
    if(!tab.active){
        alert("the tab is not active");
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


/*chrome.tabs.onRemoved.addListener(function(tabid, removed) {
    alert("tab Removed");
    //console.log("tab Closed");
    //chrome.tabs.sendMessage(tabId, any message, object options, function responseCallback)

    chrome.runtime.sendMessage({tabClosed: true}, function(response){
           console.log(response);
    });
    
});*/
    
   /*chrome.runtime.sendMessage(extensionID, {fromPopup: true}, function(response){
           console.log(response); 
        });
 
/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    console.log(sender);
    sendResponse({received: "onFacebook"});
    //alert("Are you sure you want to be on Facebook right now?");
  });

/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //alert("received");
    console.log(request);
    console.log(sender);
    sendResponse({received: "on facebook"});
    
    //alert("arrived");
    
    /*chrome.tabs.executeScript(null, {"file": "removeChat.js"});
    chrome.tabs.executeScript(null, {"file": "removeTitleNotifications.js"});*//*
    chrome.tabs.update({url: "popup.html"});
});*/



//on Updated updates too late
/*chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  
  
  var url = (new URL(tab.url)).hostname;
  console.log(url);
  if(url.includes(".facebook.")){
    chrome.tabs.executeScript(null, {"file": "removeChat.js"});
    chrome.tabs.executeScript(null, {"file": "removeTitleNotifications.js"});
    
    console.log(tab.mutedInfo.muted);
    if(!tab.mutedInfo.muted)
      chrome.tabs.update(tab.id, {muted: true});
      console.log("Tab muted");
  }
});*/

/*chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("clicked");
  console.log(tab);
  //why is the first element null?
  chrome.tabs.executeScript(null, {"file": "removeChat.js"});
});*/


///////////////////////////////////TIMER STUFFF////////

////////////TIMER STUFF//////////

//var displayTime;

var accumulatedTime;
var accumulatedTimeKey='accTimeMS'


function startTimer(){
    chrome.storage.sync.get(accumulatedTimeKey, function(items){
        console.log(items[accumulatedTimeKey]);
        accumulatedTime = items[accumulatedTimeKey];
        /*console.log(chrome.runtime.lastError);
        console.log(items[accumulatedTimeKey]);
        
        return (chrome.runtime.lastError ? 0 : items[accumulatedTimeKey]);*/
    });
    console.log(accumulatedTime);
    
    if(accumulatedTime == undefined || isNaN(accumulatedTime)){   
        accumulatedTime = 0;
    }
    console.log(accumulatedTime);
    console.log(typeof(accumulatedTime));
    console.log(isNaN(accumulatedTime));
}

function storeAccumulatedTime(){
    var items = {};
    if(accumulatedTime == undefined || isNaN(accumulatedTime)){   
        accumulatedTime = 0;
    }
    items[accumulatedTimeKey] = accumulatedTime;
    
    console.log(items);
    
    chrome.storage.sync.set(items, function(){
        console.log("saved " + accumulatedTime);
        //console.log(accumulatedTime);
        console.log(typeof(accumulatedTime));
        console.log(isNaN(accumulatedTime));
        
    });
}



function updateTime(){
    if(accumulatedTime == undefined || isNaN(accumulatedTime)){   
        accumulatedTime = 0;
    }
    accumulatedTime+=1;
    storeAccumulatedTime();
    
}
    
//moved to popup.js
//function timeString(){
//    var secondsPassed = accumulatedTime;
//    //console.log(startTime)
//    //console.log(accumulatedTime);
//    //console.log(secondsPassed);
//    
//    var minutes = Math.floor(secondsPassed / 60);
//    var seconds = Math.floor(secondsPassed % 60);
//    
//    var displayString = "";
//    
//    if(seconds < 10)
//        displayString= minutes + ":0" + seconds;
//    else
//        displayString= minutes + ":" + seconds;
//    //alert(displayString);
//    return displayString;
//}
//
