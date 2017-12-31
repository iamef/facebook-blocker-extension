//alert("content.js entered");
chrome.runtime.sendMessage({onFacebook: true}, function(response){
   console.log(response); 
});

/*chrome.tabs.executeScript(null, {"file": "removeChat.js"});
chrome.tabs.executeScript(null, {"file": "removeTitleNotifications.js"});*/