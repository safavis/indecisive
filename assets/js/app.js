let drinkWords =["SHOT O'CLOCK!", "It's 5 o'clock somwhere!", "Beer is proof that God loves us and wants us to be happy.",
"DILLY DILLY!", "Alcohol may be man’s worst enemy, but the Bible says love your enemy.", "Everybody’s got to believe in something. I believe I’ll have another beer."]
let beerImg = ['./assets/image/brew01.jpg', './assets/image/brew02.jpg', './assets/image/brew03.jpg', './assets/image/brew04.jpg', './assets/image/brew05.jpg', './assets/image/brew06.jpg' ]
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
//   Beer Mapping API
document.querySelector('.search').addEventListener('click', e =>{
   // e.preventDefault()
   let beerCheck = document.querySelector('#beerCheck').checked
    if(beerCheck === true){
        let getBeerCity = document.querySelector('.input').value
        fetch('http://beermapping.com/webservice/loccity/b7e0022555c2b92e984c3bc704449aba/'+ getBeerCity + '&s=json')
            .then( r => r.json())
            .then( r =>{
                let ranBrew = r[Math.floor(Math.random()* r.length)]
                let ranWords = drinkWords[Math.floor(Math.random()*drinkWords.length)]
                let ranImg = beerImg[Math.floor(Math.random()*beerImg.length)]
                let beerListing = document.createElement('div')
                beerListing.innerHTML = `
                <h1 class="title is-1">Pub Choice!</h1>
                <div class="card" id="beerCard">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img class="business-img" src="${ranImg}" alt="${ranBrew.name}">
                  </figure>
                </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">${ranBrew.name}</p>
                  </div>
                </div>
              <div class="content">
                <p>Address: ${ranBrew.street}. ${ranBrew.city}, ${ranBrew.state} ${ranBrew.zip}</p>
                <p>Phone: ${ranBrew.phone}</p>
                <p>For business hours, reviews, and menus, <a href="${ranBrew.reviewlink}">click here</a>
                </div>
                <div class="content"><Strong>"${ranWords}"</strong></div>
              </div>
            </div>
                `
                document.querySelector(`#beerResults`).innerHTML = ``
                document.querySelector(`#beerResults`).append(beerListing)
                document.querySelector('.newBeer').style.display = 'block'
                document.querySelector('.moreBeer').style.display = 'block'
                console.log(ranWords)
                console.log(ranBrew)
            })
            .catch(console.error)  
    } else{
        document.querySelector(`#beerResults`).innerHTML = ``
        document.querySelector('.newBeer').style.display = 'none'
        document.querySelector('.moreBeer').style.display = 'none'
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
document.querySelector('.moreBeer').addEventListener('click', e =>{
    document.querySelector(`#beerResults`).innerHTML = ``
         let getBeerCity = document.querySelector('.input').value
         fetch('http://beermapping.com/webservice/loccity/b7e0022555c2b92e984c3bc704449aba/'+ getBeerCity + '&s=json')
            .then(r => r.json())
            .then(r => {
                console.log(r)
                for(let i = 0; i <r.length;i++){ 
                    let beerListing = document.createElement('div')
                    beerListing.innerHTML = `
                    
                    <div class="card" id="beerCard">
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img class="business-img" src="${beerImg[i]}" alt="${r[i].name}">
                      </figure>
                    </div>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <p class="title is-4">${r[i].name}</p>
                      </div>
                    </div>
                  <div class="content">
                    <p>Address: ${r[i].street}. ${r[i].city}, ${r[i].state} ${r[i].zip}</p>
                    <p>Phone: ${r[i].phone}</p>
                    <p>For business hours, reviews, and menus, <a href="${r[i].reviewlink}">click here</a>
                    </div>
                    <div class="content"><Strong>""</strong></div>
                  </div>
                </div>`
                document.querySelector('#beerResults').append(beerListing)
                document.querySelector('.newBeer').style.display = 'block'
                document.querySelector('.moreBeer').style.display = 'block'
            }
            })
        })
// Yelp API code
// let URL = 'https://api.yelp.com/v3/businesses/search?location=40515&term&categories=vet&limit=10';
// let URL = `https://api.yelp.com/v3/businesses/search?location=${searchInput}&limit=10`;

const API_KEY = 'M7IgpDGg-9kXeDXpl5Yj9A9_33reRjvfXANnx3RvJzphIo_pAXUEvP5FubmdzBV32ehGAyXtlzo0_hjlxzrBPi4O705EnwbTMXBu1v3rbP78tARuwNYSElA1WBqjXHYx';

let queryURL = `https://cors-anywhere.herokuapp.com/${URL}`;

document.querySelector(`.search`).addEventListener('click', e => {
  searchInput = document.querySelector(`.input`).value
  console.log(searchInput)
  URL = `https://api.yelp.com/v3/businesses/search?location=${searchInput}&limit=25`;
  queryURL = `https://cors-anywhere.herokuapp.com/${URL}`;
  fetch(queryURL, {
    method: "GET",
    headers: {
      "accept": "application/json",
      "x-requested-with": "xmlhttprequest",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${API_KEY}`
    }
  })
    .then(r => r.json())
    .then(r => {
      console.log(r)
      let i = Math.floor(Math.random() * 25)
      console.log(i)
      let newListing = document.createElement(`div`)
      newListing.innerHTML = `
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img class="business-img" src="${r.businesses[i].image_url}" alt="${r.businesses[i].name}">
          </figure>
        </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">${r.businesses[i].name}</p>
          </div>
        </div>
      <div class="content">
        <p>Address: ${r.businesses[i].location.display_address[0]}, ${r.businesses[i].location.display_address[1]}</p>
        <p>Phone: ${r.businesses[i].display_phone}</p>
        <p>For business hours, reviews, and menus, <a href="${r.businesses[i].url}">click here</a>
        </div>
      </div>
    </div>
    `

      document.querySelector(`#results`).innerHTML = ``
      document.querySelector(`#results`).append(newListing)
    })
  document.querySelector(`.search2`).style.display = `block`
  document.querySelector(`.more`).style.display = `block`

});
//

document.querySelector(`.search2`).addEventListener('click', e => {
  document.querySelector(`#results`).innerHTML = ``
  searchInput = document.querySelector(`.input`).value
  console.log(searchInput)
  URL = `https://api.yelp.com/v3/businesses/search?location=${searchInput}&limit=25`;
  queryURL = `https://cors-anywhere.herokuapp.com/${URL}`;
  fetch(queryURL, {
    method: "GET",
    headers: {
      "accept": "application/json",
      "x-requested-with": "xmlhttprequest",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${API_KEY}`
    }
  })
    .then(r => r.json())
    .then(r => {
      console.log(r)
      let i = Math.floor(Math.random() * 25)
      let newListing = document.createElement(`div`)
      newListing.innerHTML = `
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img class="business-img" src="${r.businesses[i].image_url}" alt="${r.businesses[i].name}">
          </figure>
        </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">${r.businesses[i].name}</p>
          </div>
        </div>
      <div class="content">
        <p>Address: ${r.businesses[i].location.display_address[0]}, ${r.businesses[i].location.display_address[1]}</p>
        <p>Phone: ${r.businesses[i].display_phone}</p>
        <p>For business hours, reviews, and menus, <a href="${r.businesses[i].url}">click here</a>
        </div>
      </div>
    </div>
    `
      document.querySelector(`#results`).append(newListing)
    })
});

document.querySelector(`.more`).addEventListener('click', e => {
  document.querySelector(`#results`).innerHTML = ``
  searchInput = document.querySelector(`.input`).value
  console.log(searchInput)
  URL = `https://api.yelp.com/v3/businesses/search?location=${searchInput}&limit=10`;
  queryURL = `https://cors-anywhere.herokuapp.com/${URL}`;
  fetch(queryURL, {
    method: "GET",
    headers: {
      "accept": "application/json",
      "x-requested-with": "xmlhttprequest",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${API_KEY}`
    }
  })
    .then(r => r.json())
    .then(r => {
      console.log(r)
      for (let i = 0; i < r.businesses.length; i++) {
        let newListing = document.createElement(`div`)
        newListing.innerHTML = `
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img class="business-img" src="${r.businesses[i].image_url}" alt="${r.businesses[i].name}">
          </figure>
        </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">${r.businesses[i].name}</p>
          </div>
        </div>
      <div class="content">
        <p>Address: ${r.businesses[i].location.display_address[0]}, ${r.businesses[i].location.display_address[1]}</p>
        <p>Phone: ${r.businesses[i].display_phone}</p>
        <p>For business hours, reviews, and menus, <a href="${r.businesses[i].url}">click here</a>
        </div>
      </div>
    </div>
    `
        document.querySelector(`#results`).append(newListing)
      }
    })
});
