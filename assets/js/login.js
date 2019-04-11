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

let loggedin= false
let pass_incorr=false
let name
document.querySelector(".contents2").addEventListener('click',({target})=>{
  console.log(target.classList[2])
  if(target.classList[2]=="sbmt")
  { let usrname=document.querySelector(".Username_input").value
  let password=document.querySelector(".password_input").value
 
  db.collection('user_login').get()
  .then(({docs})=>{
    docs.forEach(element => {
      if(usrname==element.data().username) 
        {
          if(password==element.data().password)
              {loggedin=true
              name=element.data().name
              let el=element.data()
              el.loggedin=true
              db.collection('user_login').doc(name).set(el)
              localStorage.setItem('name',name)
               window.location.href="./index.html"
            }
          else
          {
            pass_incorr=true
          }
        }
          
  });
  console.log(`log:${loggedin}`)
  console.log(`pass:${pass_incorr}`)
  document.querySelector(".contents2").innerHTML=`
  <div class="field">
  <label class="label">Username</label>
  <div class="control">
      <input class="input Username_input" type="text" placeholder="e.g Username">
  </div>
</div>

<div class="field">
  <label class="label">Password</label>
  <div class="control">
      <input class="input password_input" type="password" placeholder="e.g. Password">

  </div>

</div>
<a class="button is-info sbmt">Submit</a>
`
  if(loggedin==false & pass_incorr==false)
        {let message_div=document.createElement('p')
        message_div.style.color="red"
        message_div.textContent="Username does not exist , please sign up!"
        document.querySelector(".contents2").append(message_div)
        }
 if(loggedin==false & pass_incorr==true)
        {let message_div=document.createElement('p')
        message_div.style.color="red"
        message_div.textContent="Password incorrect!"
        document.querySelector(".contents2").append(message_div)
        }
  loggedin=false
  pass_incorr=false
   
})
  .catch(e=>console.error(e))
}
})

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
  newstyle.setAttribute("href", currentmode); 
  document.getElementsByTagName("head")[0].appendChild(newstyle);
  nightmodeOn = !nightmodeOn
}
