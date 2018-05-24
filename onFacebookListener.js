var enabledKey='enabled';
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message.onFacebook){
        //alert("message: " + message.onFacebook);
        chrome.storage.sync.get(enabledKey, function(items){
           runEnabled(items[enabledKey]); //check if it is enabled and does what it should 
        });

        sendResponse({received: true});
    }
});


//Enabled settings
function runEnabled(enabled){
    if(!enabled){
        //need to make sure that notifications are on and chat is on
        chrome.tabs.insertCSS(null, {file: "blockingCSS/undoChatContentReg.css"});
        chrome.tabs.insertCSS(null, {file: "blockingCSS/undoNotificationsContent.css"});
        chrome.tabs.insertCSS(null, {file: "blockingCSS/undoNewsfeedContent.css"});
    }
}


//Blocking settings
//blocked items
//chat sidebar (search isn't blocked): 