var enabledKey='enabled';
var notifsTopBarBlockedKey='notifsTopBarBlocked';
var chatBlockedKey='chatBlocked';
var newsfeedBlockedKey='feedBlocked';
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
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
    }
});

function define(inItems){
    if(inItems==undefined) return true;
    return inItems;
}


function unblockAll(){
    unblockChat();
    unblockNotifsTopBar();
    unblockFeed();
}

function unblockChat(){
    chrome.tabs.insertCSS(null, {file: "blockingCSS/undoChatContentReg.css"});
}

function unblockNotifsTopBar(){
    chrome.tabs.insertCSS(null, {file: "blockingCSS/undoNotificationsContent.css"});

}

function unblockFeed(){
    chrome.tabs.insertCSS(null, {file: "blockingCSS/undoNewsfeedContent.css"});
}


//Blocking settings
//blocked items
//chat sidebar (search isn't blocked): 