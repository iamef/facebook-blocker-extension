//This is a content script which means it should run when the url is "*://*.facebook.com/*", "*://*.messenger.com/*"

chrome.runtime.sendMessage({onFacebook: true}, function(response){
    //alert("received: " + response.received);
});