const config = {
  apiKey: "AIzaSyALJmJ2VVKSDLb7wNk3HGxdXM1OH_KfE30",
  authDomain: "indecisive-a9a51.firebaseapp.com",
  databaseURL: "https://indecisive-a9a51.firebaseio.com",
  projectId: "indecisive-a9a51",
  storageBucket: "indecisive-a9a51.appspot.com",
  messagingSenderId: "848170258525"
};
firebase.initializeApp(config);

//   Beer Mapping API
let drinkWords = ["SHOT O'CLOCK!", "It's 5 o'clock somwhere!", "Beer is proof that God loves us and wants us to be happy.",
  "DILLY DILLY!", "Alcohol may be man’s worst enemy, but the Bible says love your enemy.", "Everybody’s got to believe in something. I believe I’ll have another beer."]
let beerImg = ['./assets/image/brew01.jpg', './assets/image/brew02.jpg', './assets/image/brew03.jpg', './assets/image/brew04.jpg', './assets/image/brew05.jpg', './assets/image/brew06.jpg', './assets/image/brew07.jpg', './assets/image/brew08.jpg', './assets/image/brew09.jpg', './assets/image/brew10.jpg']
// On click fetches and randomize returned data

document.addEventListener('click', e => {
  // e.preventDefault()
  let beerCheck = document.querySelector('#beerCheck').checked
  if (beerCheck === true && e.target.className === 'button is-info search') {
    let getBeerCity = document.querySelector('.input').value
    fetch(`https://beermapping.com/webservice/loccity/b7e0022555c2b92e984c3bc704449aba/${getBeerCity}&s=json`)
      .then(r => r.json())
      .then(r => {
        let ranBrew = r[Math.floor(Math.random() * r.length)]
        let ranWords = drinkWords[Math.floor(Math.random() * drinkWords.length)]
        let ranImg = beerImg[Math.floor(Math.random() * beerImg.length)]
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
        document.querySelector('#beerResults').innerHTML = ``
        document.querySelector('#beerResults').append(beerListing)
        document.querySelector('#newBeer').style.display = 'block'
        document.querySelector('#moreBeer').style.display = 'block'
        console.log(ranWords)
        console.log(ranBrew)
      })
      .catch(console.error)
  } else if (beerCheck === false) {
    document.querySelector('#beerResults').innerHTML = ``
    document.querySelector('#newBeer').style.display = 'none'
    document.querySelector('#moreBeer').style.display = 'none'
  }
})

document.querySelector('#moreBeer').addEventListener('click', e =>{
    document.querySelector(`#beerResults`).innerHTML = ``
         let getBeerCity = document.querySelector('.input').value
         fetch(`https://beermapping.com/webservice/loccity/b7e0022555c2b92e984c3bc704449aba/${getBeerCity}&s=json`)
            .then(r => r.json())
            .then(r => {
                console.log(r)
                console.log(getBeerCity)
                for(let i = 0; i <10;i++){ 
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
        document.querySelector('#newBeer').style.display = 'block'
        document.querySelector('#moreBeer').style.display = 'block'
      }
    })
})

// Yelp API code
let URL

const API_KEY = 'M7IgpDGg-9kXeDXpl5Yj9A9_33reRjvfXANnx3RvJzphIo_pAXUEvP5FubmdzBV32ehGAyXtlzo0_hjlxzrBPi4O705EnwbTMXBu1v3rbP78tARuwNYSElA1WBqjXHYx';

let queryURL = `https://cors-anywhere.herokuapp.com/${URL}`;

let yelpObject = {
  method: "GET",
  headers: {
    "accept": "application/json",
    "x-requested-with": "xmlhttprequest",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${API_KEY}`
  }
}

let weekdays = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']

const ratingFunc = () => {
  const starImg = document.createElement(`img`)
  starImg.setAttribute(`src`, `./assets/image/rating-star-icon.jpg`)
  starImg.setAttribute(`alt`, `rating star icon`)
  starImg.className = `stars`
  document.querySelector(`.ratingsDiv`).append(starImg)
}

// Search bar button
document.querySelector(`.search`).addEventListener('click', e => {
  searchInput = document.querySelector(`.input`).value
  URL = `https://api.yelp.com/v3/businesses/search?location=${searchInput}&limit=25`;
  queryURL = `https://cors-anywhere.herokuapp.com/${URL}`;
  fetch(queryURL, yelpObject)
    .then(r => r.json())
    .then(r => {
      let i = Math.floor(Math.random() * 25)
      let currentBusinessId = r.businesses[i].id
      // New fetch with selected business
      URL = `https://api.yelp.com/v3/businesses/${currentBusinessId}`
      queryURL = `https://cors-anywhere.herokuapp.com/${URL}`;
      fetch(queryURL, yelpObject)
        .then(r => r.json())
        .then(r => {
          console.log(r)
          let newListing = document.createElement(`div`)
          if (r.hours[0].open.length === 7) {
            newListing.innerHTML = `
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img class="business-img" src="${r.image_url}" alt="${r.name}">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">${r.name}</p>
                      <div class ="ratingsDiv content">
                        <h5>Rating out of 5:</h5>
                      </div>
                    </div>
                  </div>
                  <div class="content columns">
                    <div class="location column is-half">
                      <h5>Address:</h5>
                      <p class="address"></p>
                      <h5>Phone number:</h5>
                      <p>${r.display_phone}</p>
                      <h5>For customer reviews and menus, <a href="${r.url}">click here</a></h5>
                    </div>
                    <div class="hours column is-half">
                      <div>
                        <h5>Business hours:</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              `
            document.querySelector(`#results`).innerHTML = ``
            document.querySelector(`#results`).append(newListing)
            for (let i = 0; i < r.location.display_address.length; i++) {
              let addressPart = document.createElement(`p`)
              addressPart.innerHTML = `${r.location.display_address[i]} `
              document.querySelector(`.address`).append(addressPart)
            }
            for (let i = 0; i < r.rating; i++) {
              ratingFunc()
            }
            let businessHours = r.hours[0].open
            console.log(r)
            businessHours.forEach((item, i) => {
              let openingHours = moment(item.start, `HHmm`).format(`hh:mm a`)
              let closingHours = moment(item.end, `HHmm`).format(`hh:mm a`)
              let hoursElem = document.createElement(`p`)
              hoursElem.innerHTML = `
            <p>${weekdays[i]}: ${openingHours} - ${closingHours}</p>
            `
              document.querySelector(`.hours`).append(hoursElem)

            })
          } else {
            newListing.innerHTML = `
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img class="business-img" src="${r.image_url}" alt="${r.name}">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">${r.name}</p>
                      <div class ="ratingsDiv content">
                        <h5>Rating out of 5:</h5>
                      </div>
                    </div>
                  </div>
                  <div class="content">
                    <div class="location">
                      <h5>Address:</h5>
                      <p class="address"></p>
                      <h5>Phone number:</h5>
                      <p>${r.display_phone}</p>
                      <h5>For business hours, customer reviews, and menus, <a href="${r.url}">click here</a></h5>
                    </div>
                  </div>
                </div>
              </div>
              `
            document.querySelector(`#results`).innerHTML = ``
            document.querySelector(`#results`).append(newListing)
            for (let i = 0; i < r.location.display_address.length; i++) {
              let addressPart = document.createElement(`p`)
              addressPart.innerHTML = `${r.location.display_address[i]} `
              document.querySelector(`.address`).append(addressPart)
            }
            for (let i = 0; i < r.rating; i++) {
              ratingFunc()
            }
          }
        })
    })
  document.querySelector(`.search2`).style.display = `block`
  document.querySelector(`.more`).style.display = `block`
});

// Next option button
document.querySelector(`.search2`).addEventListener('click', e => {
  searchInput = document.querySelector(`.input`).value
  URL = `https://api.yelp.com/v3/businesses/search?location=${searchInput}&limit=25`;
  queryURL = `https://cors-anywhere.herokuapp.com/${URL}`;
  fetch(queryURL, yelpObject)
    .then(r => r.json())
    .then(r => {
      let i = Math.floor(Math.random() * 25)
      let currentBusinessId = r.businesses[i].id
      // New fetch with selected business
      URL = `https://api.yelp.com/v3/businesses/${currentBusinessId}`
      queryURL = `https://cors-anywhere.herokuapp.com/${URL}`;
      fetch(queryURL, yelpObject)
        .then(r => r.json())
        .then(r => {
          console.log(r)
          let newListing = document.createElement(`div`)
          if (r.hours[0].open.length === 7) {
            newListing.innerHTML = `
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img class="business-img" src="${r.image_url}" alt="${r.name}">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">${r.name}</p>
                      <div class ="ratingsDiv content">
                        <h5>Rating out of 5:</h5>
                      </div>
                    </div>
                  </div>
                  <div class="content columns">
                    <div class="location column is-half">
                      <h5>Address:</h5>
                      <p class="address"></p>
                      <h5>Phone number:</h5>
                      <p>${r.display_phone}</p>
                      <h5>For customer reviews and menus, <a href="${r.url}">click here</a></h5>
                    </div>
                    <div class="hours column is-half">
                      <div>
                        <h5>Business hours:</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              `
            document.querySelector(`#results`).innerHTML = ``
            document.querySelector(`#results`).append(newListing)
            for (let i = 0; i < r.location.display_address.length; i++) {
              let addressPart = document.createElement(`p`)
              addressPart.innerHTML = `${r.location.display_address[i]} `
              document.querySelector(`.address`).append(addressPart)
            }
            for (let i = 0; i < r.rating; i++) {
              ratingFunc()
            }
            let businessHours = r.hours[0].open
            console.log(r)
            businessHours.forEach((item, i) => {
              let openingHours = moment(item.start, `HHmm`).format(`hh:mm a`)
              let closingHours = moment(item.end, `HHmm`).format(`hh:mm a`)
              let hoursElem = document.createElement(`p`)
              hoursElem.innerHTML = `
            <p>${weekdays[i]}: ${openingHours} - ${closingHours}</p>
            `
              document.querySelector(`.hours`).append(hoursElem)

            })
          } else {
            newListing.innerHTML = `
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img class="business-img" src="${r.image_url}" alt="${r.name}">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">${r.name}</p>
                      <div class ="ratingsDiv content">
                        <h5>Rating out of 5:</h5>
                      </div>
                    </div>
                  </div>
                  <div class="content">
                    <div class="location">
                      <h5>Address:</h5>
                      <p class="address"></p>
                      <h5>Phone number:</h5>
                      <p>${r.display_phone}</p>
                      <h5>For business hours, customer reviews, and menus, <a href="${r.url}">click here</a></h5>
                    </div>
                  </div>
                </div>
              </div>
              `
            document.querySelector(`#results`).innerHTML = ``
            document.querySelector(`#results`).append(newListing)
            for (let i = 0; i < r.location.display_address.length; i++) {
              let addressPart = document.createElement(`p`)
              addressPart.innerHTML = `${r.location.display_address[i]} `
              document.querySelector(`.address`).append(addressPart)
            }
            for (let i = 0; i < r.rating; i++) {
              ratingFunc()
            }
          }
        })
    })
});

// Multiple results button
document.querySelector(`.more`).addEventListener('click', e => {
  document.querySelector(`#results`).innerHTML = ``
  searchInput = document.querySelector(`.input`).value
  console.log(searchInput)
  URL = `https://api.yelp.com/v3/businesses/search?location=${searchInput}&limit=10`;
  queryURL = `https://cors-anywhere.herokuapp.com/${URL}`;
  fetch(queryURL, yelpObject)
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
                <h5>Address:</h5>
                <p>${r.businesses[i].location.display_address[0]}, ${r.businesses[i].location.display_address[1]}
                </p>
                <h5>Phone:</h5>
                <p>${r.businesses[i].display_phone}</p>
                <h5>For business hours, reviews, and menus, <a href="${r.businesses[i].url}">click here</a></h5>
              </div>
            </div>
          </div>
          `
        document.querySelector(`#results`).append(newListing)
      }
    })
});


// navbar burger
var burger = document.querySelector('.burger');
var nav = document.querySelector('#'+burger.dataset.target);
burger.addEventListener('click', function(){
    burger.classList.toggle('is-active');
      nav.classList.toggle('is-active');
    });

    // Initialize Firebase
let db=firebase.firestore()
let people_on
let me

db.collection("user_login").onSnapshot(({docs})=>{
  people_on=docs.filter(element=>{
      return element.data().loggedin==true
  })
  me=people_on.filter(element=>{
    console.log(`my name is${element.data().name}`)
    return element.id==localStorage.getItem('name')
  })
  console.log(me.length)
  if(me.length==1)
  {
      document.querySelector(".loginoff_button").textContent="Log Out"
      // document.querySelector(".loginoff_button").setAttribute('href',"./index.html")
      console.log('we are loggonh out')
  }
  else{
    // document.querySelector(".loginoff_button").setAttribute('href',"./login.html")
    console.log('we are loggonh in')

  }
  console.log(document.querySelector(".loginoff_button"))
})
