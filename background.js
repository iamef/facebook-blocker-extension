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
chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var onNewTab = false;
    //console.log("onClicked");
    chrome.tabs.query({active: true}, function(tabs){
        console.log(tabs);
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

chrome.runtime.onMessage.addListener(
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

