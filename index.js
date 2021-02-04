// You can add a message if you wish so, in String format
Notiflix.Loading.Hourglass();
Notiflix.Loading.Change('Loading...'+0+'%');
var css = "font-size: 40px;background-color: #FFFF00";
var css2 = "background-color: red;color:white;font-size: 20px;";
var longitude1 = "";
var latitude1 = "";
var myPassword = "myPassword";
var myUsername = "myUsername";
var pass;
 var encrypted;
  var encrypted2;
 var lengthShowPassword;
 var user = firebase.auth().currentUser;
  var collectionmade = false;
var usernameinput;
var slider = document.getElementById("myRange");

console.log("%c⚠️⚠️ Warning ⚠️⚠️", css);
console.log("%c This console is only intended for developers any irrelevant code entered may cause site to break",css2);


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    retrieve();
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    var slider = document.getElementById("Range");
var output = document.getElementById("passlength");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
  // document.addEventListener('contextmenu', event => event.preventDefault());
     var user = firebase.auth().currentUser;
     //console.log(user);
     var userphoto = user.photoURL;
     if ( userphoto === null) {
       document.getElementById("profile-pic").src = "astronaut.svg" ;
     }
     else{
       document.getElementById("profile-pic").src = userphoto ;
     }
    
    if(user != null){
      var email_id = user.email;

    document.getElementById("user_para2").innerHTML =  email_id;
        var name = user.displayName;
           if ( name === null) {
              document.getElementById("user_para").innerHTML = "Astronaut";
           }
     else{
        document.getElementById("user_para").innerHTML = "astronaut: "+name;
     }
     // document.getElementById("user_para4").innerHTML = name;
    }
  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
     Notiflix.Loading.Remove(600);


  }
});
var i = 0;
(function(){
     if (i == 0) {
    i = 1;
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        Notiflix.Loading.Change('Loading...'+width+'%');
      }
    }
  }
})();

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
  .then((user) => {
    // Signed in 
      var user = firebase.auth().currentUser;
    var message = "";
    if (user.displayName === null){
      message = "Hi 👋 user";
    } 
      else {
        message = "Hi 👋 user:"+ user.displayName
      }
    Swal.fire({
    title: 'Success!',
    text: message,
    icon: 'success',
    confirmButtonText: 'Cool'
    })
 
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
     Swal.fire({
    title: 'Error!!',
    text: errorMessage,
    icon: 'error',
    confirmButtonText: 'OkieDokie'
    })
  });


}

var output = document.getElementById("passwordlength");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

function StorePasswordWithSiteName(){
	var user = firebase.auth().currentUser;
	var input1 = document.getElementById("field1").value;
   usernameinput  = document.getElementById("field2").value;
   localStorage.setItem(user.email+"username",encrypted2);
   console.log(localStorage.getItem(user.email+"username"))
  localStorage.setItem(user.email,encrypted);


  var data = localStorage.getItem(user.email);
  collectionmade = true;
db.collection(user.email).doc().set({
  SiteName:input1,
  Password:data,
  Date:new Date(),
  isCollectionMade:collectionmade,
})
.then(function(docRef) {
   // console.log("Document written with ID: ", docRef.id);
    
    Notiflix.Notify.Success('Password Added Successfully');
    var input1 = document.getElementById("field1").value = ""
    var input2 = document.getElementById("field2").value = ""
    var input3 = document.getElementById("passpara").value = "" ;
    var input4 = document.getElementById("myRange").value = "0" ;
    var textinput4 = document.getElementById("passwordlength").innerHTML = "1";

})
.catch(function(error) {
      
       Notiflix.Notify.Failure(error);
});
}

function showpass(){
  lengthShowPassword = makeid(slider.value);
  encrypted = CryptoJS.AES.encrypt(lengthShowPassword, myPassword);
  encrypted2 = CryptoJS.AES.encrypt(usernameinput, myUsername);
  pass = document.getElementById("passpara").value = lengthShowPassword ;
}
function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
  
}
function makepass(){
  var test = document.getElementById("Range").value;
  var passwordmade = makeid2(test);
  var pass2 = document.getElementById("passpara2").value = passwordmade ;
}
function makeid2(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
  
}
  function retrieve(){
  const list_div = document.querySelector("#list_div")
  
  var user = firebase.auth().currentUser;
    Notiflix.Loading.Remove(600);
    db.collection(user.email).onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
    if (change.type === "added") {
         var decrypted = CryptoJS.AES.decrypt(change.doc.data().Password, myPassword);
      var stringData = decrypted.toString(CryptoJS.enc.Utf8)

      //console.log(stringData)
     list_div.innerHTML += "<div class = 'list-item'><h3><a href="+"http://"+change.doc.data().SiteName+" target='_blank'><i class='fas fa-external-link'></i></a> Site url: "+change.doc.data().SiteName+"</h3><h3> &nbsp;Password: <input type='text' placeholder='Password' class='input2' value = "+stringData+" readonly/></h3></div>"         
          if(change.doc.data().isCollectionMade === true){
              var empty = document.getElementById("emptyVaultOmaria").style.display = "none"
             
          }
          else if(change.doc.data().isCollectionMade === false){
            var empty = document.getElementById("emptyVaultOmaria").style.display = "block"
            document.getElementById("list_div").style.display = "none"
          
          }
    }
    //else{list_div.innerHTML +="<div class='list-item'> <img id='profile-pic' src='Empty_All_Omaria.png' alt='avatar image' height='100'/> </div>"}
   });

  })
}
function copyText(){
    var copyText = document.getElementById("passpara");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  if (document.execCommand("copy")) {
    document.getElementById("changeicon").className = "fas fa-clipboard";
     Notiflix.Notify.Success('Copied');
  } else {
    document.getElementById("changeicon").className = "fas fa-copy";
  }
   
}

function copyText2(){
    var copyText = document.getElementById("passpara2");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  if (document.execCommand("copy")) {
    document.getElementById("changeicon2").className = "fas fa-clipboard";
     Notiflix.Notify.Success('Copied');
  } else {
    document.getElementById("changeicon2").className = "fas fa-copy";
  }
   
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
function GiveFeedback(){
var user = firebase.auth().currentUser;
var feed = document.getElementById("msgtext").value;
db.collection("UserFeedback").add({
  DisplayName:user.displayName,
  Email:user.email,
  Date:new Date(),
  FeedBack:feed,

})
.then(function(docRef) {
   // console.log("Document written with ID: ", docRef.id);
    Qual.successd("success","Feedback Written");
    closeForm();
})
.catch(function(error) {
      Qual.errord("error",error);
});

}
function SearchList() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("list_div");
  li = ul.getElementsByTagName("div");
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("h3")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
          
      }
  }

}



var mybutton = document.getElementById("scrollBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

/*var myString   = "blablabla Card game bla";
var myPassword = "myPassword";

// PROCESS
var encrypted = CryptoJS.AES.encrypt(myString, myPassword);
var decrypted = CryptoJS.AES.decrypt(encrypted, myPassword);
document.getElementById("demo0").innerHTML = myString;
document.getElementById("demo1").innerHTML = encrypted;
document.getElementById("demo2").innerHTML = decrypted;
document.getElementById("demo3").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
*/
      document.addEventListener("keydown", function(e) {
  if (e.keyCode == 83 && (navigator.platform.match("linux") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();

  }
}, false);
  document.addEventListener("keydown", function(e) {
  if (e.keyCode == 83 && (navigator.platform.match("windows") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();

  }
}, false);
  document.addEventListener("keydown", function(e) {
  if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();

  }
}, false);

function openNav() {
  document.getElementById("mySidenav").style.width = "460px";
  document.getElementById("user_div").style.marginRight = "420px";
 
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0%";
    document.getElementById("user_div").style.marginRight = "0%";
}

function signout(){

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-outline-primary',
    cancelButton: 'btn btn-outline-primary',
  },
  buttonsStyling: true
})

swalWithBootstrapButtons.fire({
  title: 'Are you sure?',
  text: "you want to logout!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes',

  cancelButtonText: 'No',
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire(
      'Deleted!',
      'You have been logged out',
      'success'
    )
    signoutredirect();
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelled',
      'The Action was stopped',
      'error'
    )
  }
})
}
function signoutredirect(){
 firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}
