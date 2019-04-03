//use the stored temp time to update the time display
chrome.storage.sync.get("tempTimeKey", function(items){
    //alert(items["tempTimeKey"]);
    console.log(items["tempTimeKey"]);
    updateTimeDisplay(items["tempTimeKey"]*10);
});

function updateTimeDisplay(displayNumber){
    var timeDisplayElem = document.getElementById("asdfFacebookTimerfdas");
    
    timeDisplayElem.innerHTML = timeStringOnFB(displayNumber);
    
}

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
