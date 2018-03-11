//alert("on script removeChat.js");
var sidebarRemoved = false;
var flyoutRemoved = false;
var notificationsRemoved = false;

removeChatFlyout();
removeChatSidebar();
removeNotifications();

/*var chatSidebarNode = document.getElementById("pagelet_sidebar");
var sidebarConfig = {childList: true, subtree: true}

var sidebarCallback = function(mutationsList) {
    for(var mutation of mutationsList) {
        alert("pagelet_sidebar changed");
        console.log(mutation);
        
        if(!sidebarRemoved)removeChatSidebar();
    }
}

var sidebarObserver = new MutationObserver(sidebarCallback);
sidebarObserver.observe(chatSidebarNode, sidebarConfig);*/

// Select the node that will be observed for mutations
var targetNode = document.getElementsByTagName('body')[0];

// Options for the observer (which mutations to observe)
var config = { childList: true, subtree: true };

// Callback function to execute when mutations are observed
var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        //console.log(mutation);
        //console.log('A child node has been added or removed.');
        //alert("body changed");
        if(!sidebarRemoved)removeChatSidebar();
        if(!flyoutRemoved)removeChatFlyout();
        if(!notificationsRemoved)removeNotifications();
        //console.log(sidebarRemoved);
        //console.log(flyoutRemoved);
        //console.log(notificationsRemoved);
        
        
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
//observer.disconnect();


//maybe try 'u_0_v' instead
//maybe try id='pagelet_sidebar' instead NO doESN"T ALWYS WORK
//fbChatSideBarBody doesn't get rid of the whole bar
//take it's third or second parent
//var chatSidebarClassElems = document.getElementsByClassName('fbChatSidebarBody');

//or maybe try 'BuddylistPagelet' instead
//or 'pagelet_dock'
//var chatFlyoutClassElems = document.getElementsByClassName('fbNubFlyout uiToggleFlyout');

//console.log(chatSidebarClassElems);
//console.log(chatFlyoutClassElems);


//var chatSidebarObj = chatSidebarClassElems[0];
//var chatFlyoutObj = chatFlyoutClassElems[0];

//var chatSidebarObj = document.getElementById('u_0_v');


function removeChatSidebar(){
    //alert("in method");
    //alert("try pagelets")
    removeChatSidebarPagelet();
    if(!sidebarRemoved){
        //alert("try uv")    
        removeChatSidebarUV();
    }
    if(!sidebarRemoved){
        //alert("try fbchat")
        removeChatSidebarFBChat();
    }
}

function removeChatSidebarPagelet(){
    var chatSidebarObj = null;
    
    //alert(document.getElementsByClassName('fbChatSidebarBody')[0]);
    console.log(document.getElementById('pagelet_sidebar'));
    if(typeof document.getElementById('pagelet_sidebar') != "undefined" && document.getElementById('pagelet_sidebar') != null){
        chatSidebarObj = document.getElementById('pagelet_sidebar');
        //alert("should end up here");
    }else{
        //alert("don't end up here");
        //document.getElementsByClassName('fbChatSidebarBody')[0].addEventListener
        //console.log(document.getElementsByClassName('fbChatSidebarBody')[0]);
    }
    if(chatSidebarObj !=null){
        chatSidebarObj.style.display = "none";
        sidebarRemoved = true;
    }
}

function removeChatSidebarUV(){
    var chatSidebarObj = null;
    
    //alert(document.getElementsByClassName('fbChatSidebarBody')[0]);
    console.log(document.getElementById('u_0_v'));
    if(typeof document.getElementById('u_0_v') != "undefined" && document.getElementById('u_0_v') != null){
        chatSidebarObj = document.getElementById('u_0_v');
        //alert("should end up here");
    }else{
        //alert("don't end up here");
        //document.getElementsByClassName('fbChatSidebarBody')[0].addEventListener
        //console.log(document.getElementsByClassName('fbChatSidebarBody')[0]);
    }
    if(chatSidebarObj !=null){
        chatSidebarObj.style.display = "none";
        sidebarRemoved = true;
    }
}

function removeChatSidebarFBChat(){
    var chatSidebarObj = null;
    
    //alert(document.getElementsByClassName('fbChatSidebarBody')[0]);
    console.log(document.getElementsByClassName('fbChatSidebarBody')[0]);
    if(typeof document.getElementsByClassName('fbChatSidebarBody')[0] != "undefined"){
        chatSidebarObj = document.getElementsByClassName('fbChatSidebarBody')[0].parentElement.parentElement.parentElement; //can do 2 or 3 parent elements
        //alert("should end up here");
    }else{
        //alert("don't end up here");
        //document.getElementsByClassName('fbChatSidebarBody')[0].addEventListener
        //console.log(document.getElementsByClassName('fbChatSidebarBody')[0]);
    }
    if(chatSidebarObj !=null){
        chatSidebarObj.style.display = "none";
        sidebarRemoved = true;
    }
}

function removeChatFlyout(){
    //if you do the parentElement the chat boxes don't appear WOAH THAT'S SO COOL
    var chatFlyoutObj = null;
    if(typeof document.getElementById('BuddylistPagelet') != "undefined" && document.getElementById('BuddylistPagelet') != null){
        //alert(typeof document.getElementById('BuddylistPagelet'));
        chatFlyoutObj = document.getElementById('BuddylistPagelet').parentElement;
    }else{
        //console.log(document.getElementById('BuddylistPagelet'));
    }

    //console.log(chatSidebarObj);
    //console.log(chatFlyoutObj);

    if(chatFlyoutObj !=null){
        chatFlyoutObj.style.display = "none";
        flyoutRemoved = true;
    }
    
}

function removeNotifications(){
    var notificationsSection = document.getElementById("fbNotificationsJewel").parentElement.parentElement;
    notificationsSection.style.display = 'none';
    notificationsRemoved = true;
}

