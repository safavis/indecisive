let drinkWords = ["SHOT O'CLOCK!", "It's 5 o'clock somwhere!", "Beer is proof that God loves us and wants us to be happy.",
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
let user = firebase.firestore()
let name
document.addEventListener('click', e => {
  // e.preventDefault()
  if (e.target.id === 'randomData') {
    let getBeerCity = document.getElementById('cityVal').value
    fetch('http://beermapping.com/webservice/loccity/b7e0022555c2b92e984c3bc704449aba/' + getBeerCity + '&s=json')
      .then(r => r.json())
      .then(r => {
        let ranBrew = r[Math.floor(Math.random() * r.length)]
        let ranWords = drinkWords[Math.floor(Math.random() * drinkWords.length)]
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
        return fetch('http://beermapping.com/webservice/locimage/b7e0022555c2b92e984c3bc704449aba/' + ranBrew.id + '&s=json')
      }).then(data => data.json())
      .then(r => {

        console.log(r)
      })
      .catch(console.error)
  }
  if (e.target.id === "signup") {
    name = document.querySelector(".name").value
    let email = document.querySelector(".email").value
    let username = document.querySelector(".usernm").value
    let password = document.querySelector(".pass").value
    console.log({ 'name': name, 'email': email, 'username': username, 'password': password })
    user.collection('user_login').doc(name).set({ 'name': name, 'email': email, 'username': username, 'password': password })
  }
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

document.querySelector(`.search`).addEventListener('click', e => {
  searchInput = document.querySelector(`.input`).value
  URL = `https://api.yelp.com/v3/businesses/search?location=${searchInput}&limit=25`;
  queryURL = `https://cors-anywhere.herokuapp.com/${URL}`;

  fetch(queryURL, yelpObject)
    .then(r => r.json())
    .then(r => {
      let i = Math.floor(Math.random() * 25)
      let currentBusinessId = r.businesses[i].id

      // New fetch with current business
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
              // Create elem, add innerHTML, append to results div
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
      <div class="content columns">
        <div class="location column is-half">
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
//

document.querySelector(`.search2`).addEventListener('click', e => {
  searchInput = document.querySelector(`.input`).value
  URL = `https://api.yelp.com/v3/businesses/search?location=${searchInput}&limit=25`;
  queryURL = `https://cors-anywhere.herokuapp.com/${URL}`;

  fetch(queryURL, yelpObject)
    .then(r => r.json())
    .then(r => {
      let i = Math.floor(Math.random() * 25)
      let currentBusinessId = r.businesses[i].id

      // New fetch with current business
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
      <div class="content columns">
        <div class="location column is-half">
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
        <p>${r.businesses[i].location.display_address[0]}, ${r.businesses[i].location.display_address[1]}</p>
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
