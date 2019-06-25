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
    }else if(message.leaveFacebook){
        //alert("Will leave Facebook sometime...");
        chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
            var tab = tabs[0]; //tabs should only contain one tab.
            chrome.tabs.update(tab.id, {url: 'chrome://newtab/'});
        });
    }/*else if(message.addedTimerUI){
        //update the on Facebook timer display
        chrome.storage.sync.get(accumulatedTimeKey, function(items){
            console.log(items);
            items["tempTimeKey"] = accumulatedTime;
            chrome.storage.sync.set(items, function(){
                chrome.tabs.executeScript({file: 'facebookLiveTimerDisplay.js'});
            });
        });
        sendResponse({received: true});
    }else if(message.storeClearedTime == "please"){
        //alert("I will clear it!");
        //store cleared time in accumulatedTimey
        var items = {};
        accumulatedTime = 0;
        items[accumulatedTimeKey] = accumulatedTime;
        chrome.storage.sync.set(items, function(){
            console.log("saved " + accumulatedTime);
            console.log(items);    
        });
        sendResponse({received: true});
    }*/
});

function define(inItems){
    //if(inItems==undefined) alert("items[chatBlockedKey or notifsTopBarBlockedKey or newsfeedBlockedKey is undefined]");
    if(inItems==undefined) return true;
    return inItems;
}


//TODO MOVE THE BLOCKING METHODS SINCE IT MAKES MORE SENSE FOR IT TO BE ELSEWHERE
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