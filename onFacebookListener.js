console.log("onFacebookListener.js"); //this is called right when the extension is installed


/**The purpose of this script is to ensure Facebook is properly configured based on the settings of the user*/

/**The listener does not listen for context menu information */

var enabledKey='enabled';
var notifsTopBarBlockedKey='notifsTopBarBlocked';
var chatBlockedKey='chatBlocked';
var newsfeedBlockedKey='feedBlocked';

//the message comes from the context script onFacebook.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    console.log(message);
    if(message.onFacebook){        
        //alert("message: " + message.onFacebook);
        chrome.storage.sync.get(null, function(items){
            var enabled = define(items[enabledKey]); 
            
            if(enabled){
                //these may not be defined
                var chatBlocked = define(items[chatBlockedKey]);
                var notifsBlocked = define(items[notifsTopBarBlockedKey]);
                var newsBlocked = define(items[newsfeedBlockedKey]);
                
                
                if(!chatBlocked){
                    unblockChat();
                }
                if(!notifsBlocked){
                    unblockNotifsTopBar();
                }
                if(!newsBlocked){
                    unblockFeed();
                }
            }else{
                unblockAll();
            }
        });
        sendResponse({received: true});
    }else if(message.addedTimerUI){
        
        
        chrome.storage.sync.get(accumulatedTimeKey, function(items){
            ///*function storeAccumulatedTime(){
            console.log(items);
            items["tempTimeKey"] = accumulatedTime;

            console.log(items);
            alert(items);
            
            chrome.storage.sync.set(items, function(){
                chrome.tabs.executeScript({file: 'facebookLiveTimerDisplay.js'});
                
                //console.log(typeof(accumulatedTime));
                //console.log(isNaN(accumulatedTime));
                
            });
            
            //*/
            
//            console.log(items[accumulatedTimeKey]);
//            accumulatedTime = items[accumulatedTimeKey];
//    
//            //alert(accumulatedTime/3600 + ": " + accumulatedTime/60);
//            
//            var toString = {time: accumulatedTime};
//            
//            var config = {somebigobject: 'complicated value'};
//            
//            //alert(JSON.stringify(config));
//            
//            var s = document.createElement('script');
//            s.dataset.variable = 193;
//            
//            chrome.storage.sync.set()
//            
//            chrome.tabs.executeScript({file: 'facebookLiveTimerDisplay.js'});
//            
//            //chrome.tabs.executeScript({code: 'var config = ' + JSON.stringify(config)}, function() {
//            //    chrome.tabs.executeScript({file: 'facebookLiveTimerDisplay.js'});
//            //});
//            
            
            
        });
        
        /*//the second parameter appears to be when response is received?
        chrome.tabs.executeScript({file: 'facebookLiveTimerDisplay.js'}, function() {
            chrome.storage.sync.get(accumulatedTimeKey, function(items){
                console.log(items[accumulatedTimeKey]);
                accumulatedTime = items[accumulatedTimeKey];
    
                alert(accumulatedTime/3600 + ": " + accumulatedTime/60);
                
                //chrome.tabs.query({active: true}, function(tabs){
        
                    chrome.tabs.sendMessage({timeOnFB: accumulatedTime}, function(response){});
                //});
            });
        });
        
        /*chrome.tabs.executeScript({
            file: 'facebookLiveTimerDisplay.js'
        });*/    
    }
    
});

function define(inItems){
    if(inItems==undefined) alert("items[chatBlockedKey or notifsTopBarBlockedKey or newsfeedBlockedKey is undefined]");
    if(inItems==undefined) return true;
    return inItems;
}

/*---------UNBLOCKING------*/
function unblockAll(){
    unblockChat();
    unblockNotifsTopBar();
    unblockFeed();
}

function unblockChat(){
    console.log("unBlockChat() called");
    chrome.tabs.insertCSS(null, {file: "blockingCSS/undoChatContentReg.css"});
}

function unblockNotifsTopBar(){
    console.log("unblockNotifsTopBar() called");
    chrome.tabs.insertCSS(null, {file: "blockingCSS/undoNotificationsContent.css"});

}

function unblockFeed(){
    console.log("unblockFeed() called");
    chrome.tabs.insertCSS(null, {file: "blockingCSS/undoNewsfeedContent.css"});
}

/*---------BLOCKING------*/
//Blocking settings
//blocked items
//chat sidebar (search isn't blocked): 
function blockAll(){
    blockChat();
    blockNotifsTopBar();
    blockFeed();
}

function blockChat(){
    chrome.tabs.insertCSS(null, {file: "blockingCSS/chatContent.css"});
}

function blockNotifsTopBar(){
    chrome.tabs.insertCSS(null, {file: "blockingCSS/notificationsContent.css"});

}

function blockFeed(){
    chrome.tabs.insertCSS(null, {file: "blockingCSS/newsfeedContent.css"});
}


function addTimerUIOnFacebook(){
    var timerTest = document.createElement("a");
    
    timerTest.className="_2s25";
    timerTest.id="asdfFacebookTimerfdas";
    timerTest.href="#";
    
    var timerParent = document.querySelectorAll('[data-click="profile_icon"]')[0];
    
    alert(timerParent);
    
    timerParent.insertBefore(timerTest, timerParent.childNodes[0]);
    
    firstTimeUpdate(); //from background.js, hopefully will work
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