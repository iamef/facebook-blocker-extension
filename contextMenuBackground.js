//set up menu at install time
chrome.runtime.onInstalled.addListener(createMenu);

function createMenu(){
    createEnableAndDisableItem();
    createChatItem();
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

//add onClicked listener
chrome.contextMenus.onClicked.addListener(menuClickedHandler);

//onClicked callback function
function menuClickedHandler(info, tabs){
    if(info.menuItemId == enableBlockingId){
        blockAll();
    }else if(info.menuItemId == disableBlockingId){
        unblockAll();
    }else if(info.menuItemId == blockChatId){
        blockChat();
    }else if(info.menuItemId == showChatId){
        unblockChat();
    }
}