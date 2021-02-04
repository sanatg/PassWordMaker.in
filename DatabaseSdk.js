  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAjg7g5iDPyYuYEwdHp3YqyIeARYqvbVAc",
    authDomain: "passpill-3a780.firebaseapp.com",
    projectId: "passpill-3a780",
    storageBucket: "passpill-3a780.appspot.com",
    messagingSenderId: "799422724947",
    appId: "1:799422724947:web:06771bc87f16df8ff83fa6"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
    SignInWithGoogle=()=>{
    base_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(base_provider).then(function(result){
       var user = firebase.auth().currentUser;
    Swal.fire({
    title: 'Success!',
    text: 'Hi 👋 user: ' +user.displayName,
    icon: 'success',
    confirmButtonText: 'Cool'
    })
    }).catch(function(err){
      
    Swal.fire({
    title: 'Error!!',
    text: 'Due to some error you could not be signed in please try after sometime',
    icon: 'error',
    confirmButtonText: 'OkieDokie'
    })
       
    })
  } 
