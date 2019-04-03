console.log("contextMenuBackground.js"); //this is called right when the extension is installed
//get document would get the chrome extension document and NOT the Facebook document

//set up menu at install time
chrome.runtime.onInstalled.addListener(createMenu);

function createMenu(){
    createEnableAndDisableItem();
    createChatItem();
    createNotifsItem();
    createFeedItem();
}

var enableParentId;
var enableBlockingId;
var disableBlockingId;
function createEnableAndDisableItem(){
    //create parent for the enable/disable
    enableParentId=chrome.contextMenus.create({type: 'normal', 
        id: "enableParent", 
        title: "Enable/Disable Blocking", 
        contexts: ["page"], 
        documentUrlPatterns: ["*://*.facebook.com/*"]});
    
    
    //create enable child for the enable/disable
    enableBlockingId = chrome.contextMenus.create({type: 'normal', 
        id: "enableBlocking", 
        title: "Enable Blocking", 
        contexts: ["page"], 
        parentId: enableParentId,
        documentUrlPatterns: ["*://*.facebook.com/*"]});
    
    //create disable child for the enable/disable
    disableBlockingId = chrome.contextMenus.create({type: 'normal', 
        id: "disableBlocking", 
        title: "Disable Blocking", 
        contexts: ["page"], 
        parentId: enableParentId,
        documentUrlPatterns: ["*://*.facebook.com/*"]});
}

var chatParentId;
var blockChatId;
var showChatId;
function createChatItem(){
    //create parent for the chat
    chatParentId=chrome.contextMenus.create({type: 'normal', 
        id: "chatParent", 
        title: "Chat Blocking", 
        contexts: ["page"], 
        documentUrlPatterns: ["*://*.facebook.com/*"]});
    
    
    //create block chat child for the chat
    blockChatId = chrome.contextMenus.create({type: 'normal', 
        id: "blockChat", 
        title: "Block Chat", 
        contexts: ["page"], 
        parentId: chatParentId,
        documentUrlPatterns: ["*://*.facebook.com/*"]});
    
    //create show chat child for the chat
    showChatId = chrome.contextMenus.create({type: 'normal', 
        id: "showChat", 
        title: "Show Chat", 
        contexts: ["page"], 
        parentId: chatParentId,
        documentUrlPatterns: ["*://*.facebook.com/*"]});
}


var notifsParentId;
var blockNotifsId;
var showNotifsId;
function createNotifsItem(){
    //create parent for the notifications
    notifsParentId=chrome.contextMenus.create({type: 'normal', 
        id: "notifsParent", 
        title: "Notifications Blocking", 
        contexts: ["page"], 
        documentUrlPatterns: ["*://*.facebook.com/*"]});
    
    
    //create block notifications child
    blockNotifsId = chrome.contextMenus.create({type: 'normal', 
        id: "blockNotifs", 
        title: "Block Notifications", 
        contexts: ["page"], 
        parentId: notifsParentId,
        documentUrlPatterns: ["*://*.facebook.com/*"]});
    
    //create show notifications child
    showNotifsId = chrome.contextMenus.create({type: 'normal', 
        id: "showNotifs", 
        title: "Show Notifications", 
        contexts: ["page"], 
        parentId: notifsParentId,
        documentUrlPatterns: ["*://*.facebook.com/*"]});
}


var feedParentId;
var blockFeedId;
var showFeedId;
function createFeedItem(){
    //create parent for the feed
    feedParentId=chrome.contextMenus.create({type: 'normal', 
        id: "feedParent", 
        title: "Feed Blocking", 
        contexts: ["page"], 
        documentUrlPatterns: ["*://*.facebook.com/*"]});
    
    
    //create block feed child
    blockFeedId = chrome.contextMenus.create({type: 'normal', 
        id: "blockFeed", 
        title: "Block Feed", 
        contexts: ["page"], 
        parentId: feedParentId,
        documentUrlPatterns: ["*://*.facebook.com/*"]});
    
    //create show feed child
    showFeedId = chrome.contextMenus.create({type: 'normal', 
        id: "showFeed", 
        title: "Show Feed", 
        contexts: ["page"], 
        parentId: feedParentId,
        documentUrlPatterns: ["*://*.facebook.com/*"]});
}



//add onClicked listener
chrome.contextMenus.onClicked.addListener(menuClickedHandler);

//onClicked callback function
function menuClickedHandler(info, tabs){
    alert("Menu clicked");
    
    if(info.menuItemId == enableBlockingId){
        blockAll();
    }else if(info.menuItemId == disableBlockingId){
        unblockAll();
    }else if(info.menuItemId == blockChatId){
        blockChat();
    }else if(info.menuItemId == showChatId){
        unblockChat();
    }else if(info.menuItemId == blockNotifsId){
        blockNotifsTopBar();
    }else if(info.menuItemId == showNotifsId){
        unblockNotifsTopBar();
    }else if(info.menuItemId == blockFeedId){
        blockFeed();
    }else if(info.menuItemId == showFeedId){
        unblockFeed();
    }
}