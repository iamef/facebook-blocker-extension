//This is a content script which means it should run when the url is "*://*.facebook.com/*", "*://*.messenger.com/*"
//Loads after background.js and contextMenuBackground.js
//get document should get the Facebook document
//most likely do not have permission to store information

chrome.runtime.sendMessage({onFacebook: true}, function(response){
    //alert("received: " + response.received);
});

addTimerUIOnFacebook();

chrome.runtime.sendMessage({addedTimerUI: true}, function(response){
    //alert("received: " + response.received);
});

function addTimerUIOnFacebook(){
    var timerTest = document.createElement("a");
    
    timerTest.className="_2s25";
    timerTest.id="asdfFacebookTimerfdas";
    timerTest.href="#";
    
    var timerParent = document.querySelectorAll('[data-click="profile_icon"]')[0];
    if(timerParent != undefined) timerParent.insertBefore(timerTest, timerParent.childNodes[0]);
    
    timerTest.onclick=clearTime;
}
    

function clearTime(){
    var okClicked = window.confirm("Should the time be cleared?");
    if(okClicked){
        
        //tell onFacebookListener to store time since no permission here
        chrome.runtime.sendMessage({storeClearedTime: "please"}, function(response){
            alert("received: " + response.received);
            document.getElementById("asdfFacebookTimerfdas").innerHTML = "0mins";
        });
    }
}
