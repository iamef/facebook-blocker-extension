//use the stored temp time to update the time display
chrome.storage.sync.get("tempTimeKey", function(items){
    //alert(items["tempTimeKey"]);
    console.log('\n'+ items["tempTimeKey"]);
    console.log("accTime: "
                +Math.floor(items["tempTimeKey"]/3600) + "hrs "
                +Math.floor(items["tempTimeKey"]/60 % 60) + "mins "
                +items["tempTimeKey"]%60 + "s ");
    
    
    updateTimeDisplay(items["tempTimeKey"]);
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
