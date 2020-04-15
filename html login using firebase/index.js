  //Firebase Configuratin  
  var firebaseConfig = {
    apiKey: "AIzaSyD4pgTraZ_aNl6euRwFIRMeJ2rAk9ZTOIo",
    authDomain: "web-login-2ea2c.firebaseapp.com",
    databaseURL: "https://web-login-2ea2c.firebaseio.com",
    projectId: "web-login-2ea2c",
    storageBucket: "web-login-2ea2c.appspot.com",
    messagingSenderId: "58528943052",
    appId: "1:58528943052:web:5ef57ac08d72ee3182eb69"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById("user-div").style.display = "block"
      document.getElementById("login-div").style.display = "none"

      var user = firebase.auth().currentUser;

      if(user != null){
        var email_id = user.email;
        document.getElementById("welcome").innerHTML = "Welcome user: " + email_id;
      }
  
    } else {
      document.getElementById("user-div").style.display = "none"
      document.getElementById("login-div").style.display = "block"
    }
  });  

  const auth = firebase.auth();  

  function signUp(){ 
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Error: '+errorMessage);
    }); 
  }

  function signIn(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...

      alert("Error : "+errorMessage);
    });
}

function logout(){
  firebase.auth().signOut();
}
