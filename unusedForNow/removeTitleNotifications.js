//console.log("in this script");
var titleNode = document.getElementsByTagName('head')[0];

// Options for the observer (which mutations to observe)
var config = { characterData: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        //console.log(mutation);
    }
    
    removeTitleNotifications();
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(titleNode, config);

function removeTitleNotifications(){
    var title = document.getElementsByTagName('title')[0];
    var titleText = title.innerHTML;
    if(titleText == 'Facebook' || titleText.indexOf('(') == -1){
        //console.log("title is equal")
        return;
    }
    //console.log("shouldn't get here");
    
    console.log(title.innerHTML);
    var startIndex = titleText.indexOf('F');
    
    title.innerHTML = titleText.substr(startIndex);
    console.log(title.innerHTML);
}