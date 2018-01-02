/*alert("popup.js");
console.log("aqui");
var links = document.getElementsByTagName('a');

var extensionID = 'nddlelglajjgaeinikojccdelodeoedo';
var sendMessageMethod = function(){
    alert("clicked");
    console.log("clicked");
    chrome.runtime.sendMessage(extensionID, {fromPopup: true}, function(response){
       console.log(response); 
    });
};

for(var i = 0; i < links.length; i++){
    //alert("over here");
    
    links[i].onclick = sendMessageMethod;
}*/