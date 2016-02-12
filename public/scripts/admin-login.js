//Author: Alexander Adu-Sarkodie
//Date: February 2016
// Client side validation script! Beware of security. This is for 
//prototyping  only.
// Note: Like all Javascript password scripts, this is hopelessly insecure as the user can see 
//the valid usernames/passwords and the redirect url simply with View Source.  
// And the user can obtain another three tries simply by refreshing the page.  
//So do not use for anything serious. This is only used as  prototype for clientside implementation!

var count = 2;
function validate() {
	var un = document.myform.username.value;
	var pw = document.myform.pword.value;
	var valid = false;

	var unArray = ["alex"];  // as many as you like - no comma after final entry
	var pwArray = ["akwadaanyame"];  // the corresponding passwords;

	for (var i=0; i <unArray.length; i++) {
		if ((un == unArray[i]) && (pw == pwArray[i])) {
			valid = true;
			break;
		}
	}

	if (valid) {
		alert ("Login was successful");
		window.location = "http://localhost:8080/";
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