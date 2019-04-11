<<<<<<< HEAD

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
let db=firebase.firestore()
document.querySelector(".sbmt").

=======
>>>>>>> eb4f52cfdf6f9da429e985f71bc46dd2be2c8ef1
//togglenightmode
const normal = "./assets/css/login.css"
const nightmode = "./assets/css/loginNight.css"
let nightmodeOn = false
let currentmode;
const toggleNightMode = function () {
  nightmodeOn ? currentmode = nightmode : currentmode = normal
  let newstyle = document.createElement("link");
  newstyle.setAttribute("rel", "stylesheet");
  newstyle.setAttribute("type", "text/css");
  newstyle.setAttribute("class", "nightmode")
  newstyle.setAttribute("href", currentmode);
  document.getElementsByTagName("head")[0].appendChild(newstyle);
  nightmodeOn = !nightmodeOn
}

// Pseudo login code
document.querySelector(`.sbmt`).addEventListener('click', e => {
  let name = document.querySelector(`.nameinput`).value
  let email = document.querySelector(`.emailinput`).value
  if (name === `` || email === ``) {
    document.querySelector(`.is-danger`).style.display = `block`
  } else {
    location.replace("./index.html")
  }
})

// Array of buttons that close messages
const deleteBtns = document.querySelectorAll('.delete');

// Hiding messages
const hideElem = (elem) => {
  elem.style.display = `none`
}

for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener(`click`, e => {
    hideElem(e.target.closest('article'))
  })
}