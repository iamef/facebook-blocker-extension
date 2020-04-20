var chatlist = document.querySelectorAll("[aria-label='Conversations']")[0];

var btn = document.getElementsByClassName("_6-xo")[0];
btn.innerHTML = "Show Chat"

//chatlist.parentElement.insertBefore(btn, chatlist)

btn.onclick = function(){
	//var chatlist = document.querySelectorAll("[aria-label='Conversation List']")[0];
	var chatHidden = chatlist.style.display == 'none';
	console.log(chatlist)
	if(chatHidden){
		chatHidden = !chatHidden
		chatlist.style.display = 'block'
		btn.innerHTML = "Hide Chat"	
	}else{
		chatHidden = !chatHidden
		chatlist.style.display = 'none'
		btn.innerHTML = "Show Chat"
	}
}
