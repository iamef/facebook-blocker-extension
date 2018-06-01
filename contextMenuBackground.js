//set up menu at install time
chrome.runtime.onInstalled.addListener(createMenu);

function createMenu(){
    createEnableAndDisableItem();
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
    
    console.log(enableParentId);
    
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

//add onClicked listener
chrome.contextMenus.onClicked.addListener(menuClickedHandler);

//onClicked callback function
function menuClickedHandler(info, tabs){
    if(info.menuItemId == enableBlockingId){
        blockAll();
    }else if(info.menuItemId == disableBlockingId){
        
        unblockAll();
    }
}