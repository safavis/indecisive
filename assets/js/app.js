let drinkWords =["SHOT O'CLOCK!", "It's 5 o'clock somwhere!", "Beer is proof that God loves us and wants us to be happy.",
"DILLY DILLY!", "Alcohol may be man’s worst enemy, but the Bible says love your enemy.", "Everybody’s got to believe in something. I believe I’ll have another beer."]
// On click fetchs and randomize returned data
var config = {
    apiKey: "AIzaSyALJmJ2VVKSDLb7wNk3HGxdXM1OH_KfE30",
    authDomain: "indecisive-a9a51.firebaseapp.com",
    databaseURL: "https://indecisive-a9a51.firebaseio.com",
    projectId: "indecisive-a9a51",
    storageBucket: "indecisive-a9a51.appspot.com",
    messagingSenderId: "848170258525"
  };
  firebase.initializeApp(config);
  let user=firebase.firestore()
  let name
document.addEventListener('click', e =>{
    e.preventDefault()
    if(e.target.id === 'randomData'){
        let getBeerCity = document.getElementById('cityVal').value
        fetch('http://beermapping.com/webservice/loccity/b7e0022555c2b92e984c3bc704449aba/'+ getBeerCity + '&s=json')
            .then( r => r.json())
            .then( r =>{
                let ranBrew = r[Math.floor(Math.random()* r.length)]
                let ranWords = drinkWords[Math.floor(Math.random()*drinkWords.length)]
                document.querySelector('#beerData').innerHTML = `
                <div class="card" id="beerCard">
                <div class="card-image" id="beerImage">
                </div>
                    <div class="card-content">
                        <div class="media">
                        <div class="media-content">
                            <p><a class="title is-4" src="${ranBrew.proxylink}">${ranBrew.name}</a></p>
                            <p class="subtitle is-6">${ranBrew.phone}</p>
                            <p class="subtitle is-6">${ranBrew.street}. ${ranBrew.city}, ${ranBrew.state} ${ranBrew.zip}</p>
                        </div>
                        </div>
                        <div class="content">
                        "${ranWords}"
                        </div>
                    </div>
                </div>
                `
                console.log(ranWords)
                console.log(ranBrew)
                console.log(r)
                // Using result of 1st request to use in 2nd request
                return fetch('http://beermapping.com/webservice/locimage/b7e0022555c2b92e984c3bc704449aba/'+ ranBrew.id + '&s=json')
            }).then(data => data.json())
                .then(r =>{
                   
                    console.log(r)
                })
            .catch(console.error)  
    }
    if(e.target.id==="signup"){
        name=document.querySelector(".name").value
        let email=document.querySelector(".email").value
        let username=document.querySelector(".usernm").value
        let password=document.querySelector(".pass").value
        console.log({'name':name,'email':email,'username':username,'password':password})
        user.collection('user_login').doc(name).set({'name':name,'email':email,'username':username,'password':password})
    }
})
