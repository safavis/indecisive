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

let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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
          </div>
        </div>
      <div class="content">
        <p>Address: ${r.location.display_address[0]}, ${r.location.display_address[1]}</p>
        <p>Phone: ${r.display_phone}</p>
        <p>For business hours, reviews, and menus, <a href="${r.url}">click here</a>
        </div>
      </div>
    </div>
    `
          document.querySelector(`#results`).innerHTML = ``
          document.querySelector(`#results`).append(newListing)
          let businessHours = r.hours[0].open
          businessHours.forEach(item => {
            // console.log(item)
            let start = item.start 
            console.log(start)
            moment(start, hhmm)
            // let end = 
            // Create elem, add innerHTML, append to results div
            // let hoursElem = document.createElement(`p`)
            // hoursElem.innerHTML = 
          })
        })
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