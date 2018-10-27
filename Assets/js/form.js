var config = {
  apiKey: "AIzaSyC86mtlghFFHUtx6igEEnwaS6ZdBFQgLbM",
  authDomain: "c1-6e180.firebaseapp.com",
  databaseURL: "https://c1-6e180.firebaseio.com"
};

firebase.initializeApp(config);

var ref = firebase.database().ref();

var auth = firebase.auth();


function init(){
	//log client in
	auth.onAuthStateChanged(function(user) {
	  if (!user) {
	  	login();
	  } 
	});

	//see if form is pre-selected; display corresponding form if so
	if(window.location.hash.length > 0) {
		var form = window.location.hash.replace('#', '');
	 	document.getElementById("fc_"+form).style.display = "block";
	}

	//selecting form
	window.onhashchange = changeForm;
}
function newFormType(){


	var sEl = document.getElementById("sel_contactType");

	var formName = sEl.options[sEl.selectedIndex].id.replace("ct_", "");
	
	//window.location.replace(window.location.href+"#"+formName);
	window.location.hash = formName;
}


function submitForm(e){
	var inputKey = e.target.parentNode.id.replace("contact_");
	var input = {};
	input[inputKey] = {};
	
	
	ref.child("anI_0000/"+auth.currentUser.uid).set(input)
	  .then(function() {
		submitS();
	  })
	  .catch(function(error) {
	    submitF();
	  });

}

function changeForm(){
	console.log("changeForm");

	//check if hash exists in the URL
	if(window.location.hash.length > 0) {
		//hide the current contents of the form bay
		var cb = clearBay();
		cb; 
		//show the new form
		var form = window.location.hash.replace('#', '');
	 	document.getElementById("fc_"+form).style.display = "block";
	}

}

function submitS(){
	//hide the current contents of the form bay 
	var cb = clearBay();
	cb;
	//show success msg
	document.getElementById("fc_success").style.display = "block";

	//reset selection form
	document.getElementById("ct_select").setAttribute("selected", true);

	//remove hash
	window.location.location.hash = "";
}

function submitF(){
	//hide the current contents of the form bay 
	var cb = clearBay();
	cb;

	//show fail msg
	document.getElementById("fc_error").style.display = "block";

}

function login(){
	firebase.auth().signInAnonymously().catch(function(error) {
	  
	  console.log(error.message);
	});
}

function enterSubmit(){

	document.addEventListener('keypress', (event) => {
	  if (event.key === "Enter"){
	  	console.log("submit");
	  	login();
	  }
	});
}

function clearBay(){
	var els = document.getElementById('formBay').children;
	for(var i=0; i<els.length; i++) {
	    console.log(els[i]);
	    els[i].style.display = "none";
	}

	return
}