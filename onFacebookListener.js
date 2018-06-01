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

/*---------UNBLOCKING------*/
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