// Initialize Firebase
const config = {
  apiKey: "AIzaSyALJmJ2VVKSDLb7wNk3HGxdXM1OH_KfE30",
  authDomain: "indecisive-a9a51.firebaseapp.com",
  databaseURL: "https://indecisive-a9a51.firebaseio.com",
  projectId: "indecisive-a9a51",
  storageBucket: "indecisive-a9a51.appspot.com",
  messagingSenderId: "848170258525"
};
firebase.initializeApp(config);

//toggleTheme
const normal = "./assets/css/login.css"
const nightmode = "./assets/css/loginNight.css"
let nightmodeOn = false
let currentmode;
const toggleNightMode = function () {
  currentmode = nightmodeOn ? nightmode : normal
  let newstyle = document.getElementById("toggletheme"); 
  newstyle.setAttribute("href", currentmode); 
  nightmodeOn = !nightmodeOn
}

document.getElementById('togBut').onclick = () => {
  toggleNightMode()
}