/*
Purpose
1) UI of the time alert dialog
2) receiving messages to open dialog
*/

chrome.runtime.onMessage.addListener(function(message, sender){
    console.log(message);
    if(typeof message.timeAlert == "number"
      && message.timeAlert == 2){ //TODO comment the 2nd thing out later
        console.log("message.timerAlert == 2");
        
        if(document.getElementById('timeAlertDialog') == null) 
            createTimeAlertDialog();
        openDialog();
    }
    
});

function createTimeAlertDialog(){
    var timeDialog = document.createElement("div");

    timeDialog.id = "timeAlertDialog";
    timeDialog.setAttribute('title', "Facebook Time Alert");
    timeDialog.innerHTML = "You have been using Facebook for <em>another</em> <br><center><strong>2 minutes</strong>.</center><br> Please do yourself a favor and leave Facebook.";
    document.body.appendChild(timeDialog);

    $("#timeAlertDialog").dialog({
        dialogClass: "timeAlertDialog",
        autoOpen: false,
        closeText: "x",
        buttons: [
            {
                text: "Leave Facebook",
                click: function() {
                    chrome.runtime.sendMessage({leaveFacebook: true});
                    $(this).dialog( "close" );
                }  
            },
            
        ],
        open: function(event, ui) {
            $(event.target).parent().css('position','fixed');
            $(event.target).parent().css('background-color','lightgrey');
            $(event.target).css("font-size", "20px");

            console.log($('body').css("width"));
            $(event.target).parent().css('width', '400px');


            $(".timeAlertDialog .ui-dialog-titlebar").css("background-color", "darksalmon");
            $(".timeAlertDialog .ui-dialog-titlebar .ui-dialog-title").css("font-size", "25px");
            
            $(".timeAlertDialog .ui-dialog-titlebar .ui-dialog-titlebar-close").css("text-align","right");
            $(".timeAlertDialog .ui-dialog-titlebar .ui-dialog-titlebar-close").css("padding-right","6px");

            
            $(".timeAlertDialog .ui-dialog-buttonpane").css("background-color", "transparent");
            $(".timeAlertDialog .ui-dialog-buttonpane .ui-dialog-buttonset").css("margin", "0px");

            $(".timeAlertDialog .ui-dialog-buttonpane .ui-dialog-buttonset .ui-button.ui-corner-all.ui-widget").css("margin", "0px");
            $(".timeAlertDialog .ui-dialog-buttonpane .ui-dialog-buttonset .ui-button.ui-corner-all.ui-widget").css("font-weight", "bold");
            $(".timeAlertDialog .ui-dialog-buttonpane .ui-dialog-buttonset .ui-button.ui-corner-all.ui-widget").css("font-size", "20px");
        }
    });
}

function openDialog(){
    $("#timeAlertDialog").dialog("open");    
}