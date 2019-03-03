//This is a content script which means it should run when the url is "*://*.facebook.com/*", "*://*.messenger.com/*"

chrome.runtime.sendMessage({onFacebook: true}, function(response){
    //alert("received: " + response.received);
});

//addTimer();

function addTimer(){
    var timerTest = document.createElement("div");
    
    timerTest.id="asdfFacebookTimerfdas";
    
    timerTest.style.position="fixed";
    timerTest.style.bottom="0";
    timerTest.style.left="0";
    timerTest.innerHTML = "HELLLO";
	
    timerTest.style.color="white";
    timerTest.style.backgroundColor="blue";
	
    timerTest.style.zIndex=10000;

    document.body.insertBefore(timerTest, document.body.childNodes[0]);
}