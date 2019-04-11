<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 17dfa39bc05023449fd8d41eb42a614845c38d23
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
let people_on
let me
let loggedin= false
let pass_incorr=false
let id
//checkesif you are logged in 
db.collection("user_login").onSnapshot(({docs})=>{
  people_on=docs.filter(element=>{
      return element.data().loggedin==true
  })
  console.log(people_on)
  console.log(`loggedind${loggedin}`)

  me=people_on.filter(element=>{
    console.log(`my name is${element.data().name}`)
    return element.id==localStorage.getItem('name')
  })
  if(me.length==1 & !loggedin)
        {
          console.log("we want to sign out")
          id=me[0].id
          console.log(id)
          console.log(loggedin)
          let elem=me[0].data()
          elem.loggedin=false
          db.collection('user_login').doc(id).set(elem)
          loggedin=false
          // window.location.href="./index.html"
        }
})

document.querySelector(".contents2").addEventListener('click',({target})=>{
  console.log(target.classList[2])
  if(target.classList[2]=="sbmt")
  {
  if(!loggedin)
      {  
        let usrname=document.querySelector(".Username_input").value
        let password=document.querySelector(".password_input").value
      
        db.collection('user_login').get()
        .then(({docs})=>{
          console.log(docs)
          docs.forEach(element => {
            if(usrname==element.data().username) 
              {
                if(password==element.data().password)
                    {loggedin=true
                    id=element.id
                    let el=element.data()
                    el.loggedin=true
                    db.collection('user_login').doc(id).set(el)
                    localStorage.setItem('name',id)
                    // window.location.href="./index.html"
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
              loggedin=false
              pass_incorr=false
        
              }
      if(loggedin==false & pass_incorr==true)
              {let message_div=document.createElement('p')
              message_div.style.color="red"
              message_div.textContent="Password incorrect!"
              document.querySelector(".contents2").append(message_div)
              loggedin=false
              pass_incorr=false
            }
        
      })
        .catch(e=>console.error(e))
      }
  }
  
})

<<<<<<< HEAD
=======
>>>>>>> eb4f52cfdf6f9da429e985f71bc46dd2be2c8ef1
=======
>>>>>>> 17dfa39bc05023449fd8d41eb42a614845c38d23
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