var gv_username;
var gv_password;

function init() {
registerEnterButtonLoginEventHandler();
$("#RegisterButton").hammer({}).on('tap',function(e){ sendRegistration()});
$(document).hammer({}).on('swipeleft',function(e){ sendRegistration()	});
$(document).hammer({}).on('swiperight',function(e){ steroids.layers.pop()	});
}

function registerEnterButtonLoginEventHandler() {
	$( "#username_input" ).on( "keydown", function( event ) {
	if(event.which == config.keyEnter){
	sendRegistration();}
	});
	$( "#password_input" ).on( "keydown", function( event ) {
	if(event.which == config.keyEnter){
	sendRegistration();}
	});
}

function sendRegistration(){
	// Evtl. vorher gesetzte Klassen entfernen
	$("#username_input").removeClass("invalidCustom");
	$("#password_input").removeClass("invalidCustom");
	
	//alert("sendRegistration wurde aufgerufen!");
	//Fehlerbehandlungsfunktionen:
	function handleErrorRegister(returnedObject) {
		//alert("handleErrorRegister wurde aufgerufen!");
		//TODO: Hier Zwischen Verbindungsfehler und bereitsvergebenem Username unterscheiden!){
		if(returnedObject.status == 409){
		navigator.notification.alert("Dein Username ist leider bereits vergeben...", onAlertDismissHandleErrorRegister,'Information','OK');
		}else{
		alert(unescape("%22Fehler bei %DCberpr%FCfung der Registrierungsdaten. %28Keine Verbindung zum Server%3F%29 %22"));
		}
	}

	function onAlertDismissHandleErrorRegister (){ //Tue nichts
	}
	function alertDismissedInputEmpty() {
		//alert("alertDismissed aufgerufen! gv_username= "+gv_username+"gv_password= "+gv_password);
		//Zeige an, welche Eingabe fehlt! (roter Rand)
		if (isEmpty(gv_username)) {
		$("#username_input").addClass("invalidCustom");
		}
		if (isEmpty(gv_password)) {
		$("#password_input").addClass("invalidCustom");
		}
	}

	function alertDismissedUsernameTooLong(){
		$("#username_input").addClass("invalidCustom");
	}
	
	function alertDismissedUsernameNotMatchesRegex() {
		$("#username_input").addClass("invalidCustom");
	}
		
	var v_username = $("#username_input").val();
	var v_password = $("#password_input").val();
	
	//Pr�fe, ob username & passwort bef�llt wurden
	if (isEmpty(v_username) || isEmpty(v_password) ){
	
	gv_username = v_username;
	gv_password = v_password;
	
	//Roten Rand entfernen, wenn Feld bef�llt! 
		if(isEmpty(v_username)==false){ $("#username_input").removeClass("invalidCustom");
		}
		if(isEmpty(v_password)==false){ $("#password_input").removeClass("invalidCustom");
		}
	
	navigator.notification.alert(
		'Bitte gib deinen Usernamen und dein Passwort an, damit du dich registrieren kannst!', // message  
		alertDismissedInputEmpty, 		//v_username, v_password sollten hier �bergeben werden, aber nicht m�glich --> nutzung globaler variablen: gv_username & gv_password
		'Fehlende Eingabe!',    // title   
		'Ok'                  	// buttonName
		);
	
	}else{
		// Pr�fung auf ung�ltige Zeichen im Name
		if(!v_username.match(config.usernameRegex)) {
			navigator.notification.alert(
			unescape("Dein gew%FCnschter Username enth%E4lt ung%FCltige Zeichen. Es sind nur alphanumerische Zeichen erlaubt."), // message  
			alertDismissedUsernameNotMatchesRegex,
			unescape("Ung%FCltiger Benutzername%21"),    // title   
			'Ok'                  	// buttonName
			);
		} else {
			// Pr�fung auf Maximalzeichenzahl im anzulegenden Username! (siehe application.js)
			if(v_username.length > config.maxZeichenUsername){
				navigator.notification.alert(
				unescape("Dein gew%FCnschter Username ist leider zu lang - die maximale Zeichenzahl ist%3A ")+config.maxZeichenUsername, // message  
				alertDismissedUsernameTooLong, 		//v_username, v_password sollten hier �bergeben werden, aber nicht m�glich --> nutzung globaler variablen: gv_username & gv_password
				'Username zu lang!',    // title   
				'Ok'                  	// buttonName
				);
			
			}else{
				//Username und passwort sind beide gesetzt worden & Username ist nicht zu lang!--> Serveranfrage starten!
				//alert("Register-AJAX-gestartet!");
				$.ajax( {
						url:config.serverURL + "user/register/"+v_username,
						type:"PUT",
						contentType:"text/plain",
						success:function(obj){handleRegistrationOK(v_username, v_password);},
						error:function(obj){handleErrorRegister(obj);}, 
						data:v_password
					}); 
			}
		}
	}
}

function handleRegistrationOK(username, password) {
	//alert("Die Registrierung war erfolgreich!"); 
	//setze Usercredentials in Localstorage:
	localStorage.setItem("username", username);
	localStorage.setItem("password", password);
	
	openHomeScreen();	
}

function openHomeScreen() {
	//alert("openHomeScreen wurde aufgerufen!");
	steroids.layers.popAll();
}

$( document ).ready(function() { init(); });