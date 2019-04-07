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
 let db=firebase.firestore()
 let userfound=false
  document.querySelector(".loginSubmit").addEventListener("click",({target})=>{
      userfound=false
      db.collection('user_login').get()
      .then(r=>{
            console.log(r.docs)
        });
    
  })
 