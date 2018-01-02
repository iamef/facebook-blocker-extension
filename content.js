//alert("content.js entered");
sentfromExtension = false;

/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    alert(sender);
    alert(request);
    sendResponse({received: "clicked"});
});*/

chrome.runtime.sendMessage({onFacebook: true}, function(response){
   console.log(response); 
});

/*chrome.tabs.executeScript(null, {"file": "removeChat.js"});
chrome.tabs.executeScript(null, {"file": "removeTitleNotifications.js"});*/