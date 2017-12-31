//when the extension is installed
/*chrome.runtime.onInstalled.addListener(function (){
    //removes all the rules and calls a new function
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      //the function makes a new rule
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions:[
            //oh yay it has two conditions and the conditions are or conditions :)
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {hostContains: "facebook"}
            }),
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {hostContains: "messenger"}
            })
          ],

          actions: [new chrome.declarativeContent.ShowPageAction()]
        }
      ]);

    });
});*/
//I should check if it is a facebook file

/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //alert("received");
    console.log(request);
    console.log(sender);
    sendResponse({received: "on facebook"});
    
    //alert("arrived");
    
    chrome.tabs.executeScript(null, {"file": "removeChat.js"});
    chrome.tabs.executeScript(null, {"file": "removeTitleNotifications.js"});
});



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
