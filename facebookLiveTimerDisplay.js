//alert(document.currentScript.dataset.variable);

chrome.storage.sync.get("tempTimeKey", function(items){
    //alert(items["tempTimeKey"]);
    console.log(items["tempTimeKey"]);
    updateTimeDisplay(items["tempTimeKey"]*10);
});

//var displayTime = -1;
//chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//    displayTime = message.timeOnFB;
//    sendResponse({received: "timeOnFB"});
//    updateTimeDisplay(displayTime);
//    alert("Time should have updated");
//});
//
//function updateTimeDisplay(displayNumber){
//    var timeDisplayElem = document.getElementById("asdfFacebookTimerfdas");
//    
//    timeDisplayElem.innerHTML = timeStringOnFB(displayNumber);
//    
//    return displayNumber;   
//}


////this will preferably be called from onFacebook.js
//
//var currDisplayNumber = -1;
//var accumulatedTimeKey = "accTimeMS";
//
////get accumulated time to get what number to display
//chrome.storage.sync.get(accumulatedTimeKey, function(items){
//    accumulatedTime = items[accumulatedTimeKey];
//    if(accumulatedTime == undefined || isNaN(accumulatedTime)){   
//        firstTimeUpdate(0);
//        currDisplayNumber = 0;
//    }else{
//        firstTimeUpdate(accumulatedTime);
//        currDisplayNumber = accumulatedTime;
//    }
//});
//


////called to when the page is first loaded
////uses setTimeout since it may be in the middle of a minute
//function firstTimeUpdate(displayNumber){
//    console.log("FIRSTtime: "+ displayNumber);
//    
//    updateTimeDisplay(displayNumber);
//    setIntervalTimer = setTimeout(initiateFutureUpdates, (60-displayNumber%60)*100);
//}
//
//
//function initiateFutureUpdates(){
//    console.log("FutInitiate: "+ currDisplayNumber);
//    //update the display before the interval timer runs
//    updateTimeDisplay(currDisplayNumber+60);
//    
//    //test to see if the interval timer runs immediately after this
//    setIntervalTimer = setInterval(futureUpdates, 6000);
//}
//
//function futureUpdates(){
//    console.log("Futuro: "+ currDisplayNumber);
//    
//    //alert(currDisplayNumber);
//    
//    updateTimeDisplay(currDisplayNumber+180);
//    if(currDisplayNumber % 5 == 0){
//        for(var i=0;i<5;i++){
//            alert("You have been using Facebook for another five minutes. Please consider closing your tab.");
//        }
//        /*var okClicked = window.confirm("Should the time be cleared?");
//        if(okClicked){
//            alert()
//        }*/
//    }
//}
//
function updateTimeDisplay(displayNumber){
    currDisplayNumber=displayNumber;
    console.log("(cur)DISPLAYNUMBEERRRR: "+currDisplayNumber);
    //alert("(cur)DISPLAYNUMBEERRRR: "+displayNumber);
    
    var timeDisplayElem = document.getElementById("asdfFacebookTimerfdas");
    
    timeDisplayElem.innerHTML = timeStringOnFB(displayNumber);
    
    //return displayNumber;   
}
//
function timeStringOnFB(secondsPassed){
    var minutesDisplay = Math.round(secondsPassed / 60) % 60;
    var hours = Math.floor(secondsPassed / 3600);
    
    var displayString = "";
    
    if(isNaN(minutesDisplay)){
        minutes=0;
    }
    if(isNaN(hours)){
        hours=0;
    }
    
    if(hours > 0){
        displayString+=hours + "hr ";
    }
    displayString += minutesDisplay + "mins";
    
    return displayString;
}
