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
db.collection('user').onSnapshot(({docs})=>{
  people_on=docs.filter(element=>{
      return element.data().logg==1
  })

  me=people_on.filter(element=>{
    return element.id==localStorage.getItem('name')
  })
  if(me.length==1 & !loggedin)
        {
          id=me[0].id
          let elem=me[0].data()
          elem.logg=0
          db.collection('user').doc(id).set(elem)
          loggedin=false
           window.location.href="../../login.html"
        }
})

document.querySelector("#contactforms").addEventListener('click',({target})=>{
  if(target.classList[2]=="sbmt")
  {
  if(!loggedin)
      {  
        let usrname=document.querySelector(".Username_input").value
        let password=document.querySelector(".password_input").value
      
        db.collection('user').get()
        .then(({docs})=>{
          docs.forEach(element => {
            if(usrname==element.data().username) 
              {
                if(password==element.data().password)
                    {loggedin=true
                    id=element.id
                    let el=element.data()

                    el.logg=1
                    db.collection('user').doc(id).set(el)
                    localStorage.setItem('name',id)
                   //   window.location.href="./Desktop/indecisive/login.html"
                  }
                else
                {
                  pass_incorr=true
                }
              }
                
        });
        
        document.querySelector("#contactforms").innerHTML=`
        <div class="field contact-input">
        <label class="label">Username</label>
        <div class="control">
            <input class="input Username_input" type="text" placeholder="e.g Username">
        </div>
    </div>

    <div class="field contact-input">
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
              message_div.style.textAlign="center"
              message_div.textContent="Username does not exist , please sign up!"
              console.log(document.querySelector("#contactforms"))
              document.querySelector("#contactforms").append(message_div)
              loggedin=false
              pass_incorr=false
        
              }
      if(loggedin==false & pass_incorr==true)
              {let message_div=document.createElement('p')
              message_div.style.color="red"
              message_div.textContent="Password incorrect!"
              message_div.style.textAlign="center"

              document.querySelector("#contactforms").append(message_div)
              loggedin=false
              pass_incorr=false
            }
        
      })
        .catch(e=>console.error(e))
      }
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
  newstyle.setAttribute("class", "nightmode")
  newstyle.setAttribute("href", currentmode); 
  document.getElementsByTagName("head")[0].appendChild(newstyle);
  nightmodeOn = !nightmodeOn
}