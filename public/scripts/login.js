//Author: Alexander Adu-Sarkodie
//Date: February 2016
// Client side validation script! Beware of security. This is for 
//prototyping  only.
// Note: Like all Javascript password scripts, this is  insecure as the user can see 
//the valid usernames/passwords and the redirect url simply with View Source.  
// And the user can obtain another three tries simply by refreshing the page.  
//So do not use for anything serious. This is only used as  prototype for clientside implementation!
//Can be made isomorphic and run from the server

var count = 2;
function validate() {
	var un = document.myform.username.value;
	var pw = document.myform.pword.value;
	var valid = false;

	var unArray = ["alex","sveta","letitia","jackie","dinesh", "george", "ben", "jaye", "bobus", "gyamfua", "susie", "esther", "kweku","yaw","lee"];  // as many as you like - no comma after final entry
	var pwArray = ["morgan","kukuu","bigfish","kjaye","dodgy", "ap3tw3", "hey", "heyhey", "dangerman", "pclady", "susieb", "estherd", "kwekud","yawa","leepa"];  // the corresponding passwords;

	for (var i=0; i <unArray.length; i++) {
		if ((un == unArray[i]) && (pw == pwArray[i])) {
			valid = true;
			break;
		}
	}

	if (valid) {
		alert ("Login was successful");
		window.location = "http://localhost:3040/";
		return false;
	}

	var t = " tries";
	if (count == 1) {t = " try"}

	if (count >= 1) {
		alert ("Invalid username and/or password.  You have " + count + t + " left.");
		document.myform.username.value = "";
		document.myform.pword.value = "";
		setTimeout("document.myform.username.focus()", 25);
		setTimeout("document.myform.username.select()", 25);
		count --;
	}

	else {
	alert ("Still incorrect! You have no more tries left!");
		document.myform.username.value = "No more tries allowed!";
		document.myform.pword.value = "";
		document.myform.username.disabled = true;
		document.myform.pword.disabled = true;
		return false;
	}

}

function apply(){
	document.frm.submit.disabled=true;
	if(document.frm.chk.checked ==true){
		document.frm.submit.disabled=false;
	}
	if(document.frm.chk.checked==false){
		document.frm.submit.enabled=false;
	}
}