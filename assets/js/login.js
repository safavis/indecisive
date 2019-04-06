 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyALJmJ2VVKSDLb7wNk3HGxdXM1OH_KfE30",
    authDomain: "indecisive-a9a51.firebaseapp.com",
    databaseURL: "https://indecisive-a9a51.firebaseio.com",
    projectId: "indecisive-a9a51",
    storageBucket: "indecisive-a9a51.appspot.com",
    messagingSenderId: "848170258525"
  };
  firebase.initializeApp(config);

//togglenightmode
  function toggleNightMode() {
    var color = document.getElementById('mydiv').style.color;
      
    var backgroundColor = document.getElementById('mydiv').style.backgroundColor;
    
      
    if (color == "black" && backgroundColor == "white") {
          document.getElementById('mydiv').style.color="white";
          document.getElementById('mydiv').style.backgroundColor="black";
          document.getElementById('mydiv').style.fontFamily="Arial";
          
      } else {
          document.getElementById('mydiv').style.color="black";
          document.getElementById('mydiv').style.backgroundColor="white";
          document.getElementById('mydiv').style.fontFamily="Times New Roman";
      }
  }
  
 