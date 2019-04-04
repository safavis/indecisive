// Initialize Firebase
const config = {
  apiKey: "AIzaSyALJmJ2VVKSDLb7wNk3HGxdXM1OH_KfE30",
  authDomain: "indecisive-a9a51.firebaseapp.com",
  databaseURL: "https://indecisive-a9a51.firebaseio.com",
  projectId: "indecisive-a9a51",
  storageBucket: "indecisive-a9a51.appspot.com",
  messagingSenderId: "848170258525"
}
firebase.initializeApp(config)
let db = firebase.firestore()
// 

// Yelp API code
// let URL = 'https://api.yelp.com/v3/businesses/search?location=40515&term&categories=vet&limit=10';
let URL = 'https://api.yelp.com/v3/businesses/search?location=92703&limit=10';

const API_KEY = 'M7IgpDGg-9kXeDXpl5Yj9A9_33reRjvfXANnx3RvJzphIo_pAXUEvP5FubmdzBV32ehGAyXtlzo0_hjlxzrBPi4O705EnwbTMXBu1v3rbP78tARuwNYSElA1WBqjXHYx';

let queryURL = `https://cors-anywhere.herokuapp.com/${URL}`;

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
    // r.businesses.forEach(function (event) {
    for (let i = 0; i < r.businesses.length; i++) {
      let newListing = document.createElement(`div`)
      newListing.innerHTML = `
    <p>${r.businesses[i].name}</p>
    <p>${r.businesses[i].location.display_address[0]}, ${r.businesses[i].location.display_address[1]}</p>
    <p>${r.businesses[i].display_phone}</p>
    `
      document.querySelector(`#test`).append(newListing)
    }
    // })
  });
// 

// Contact Form Firebase Submissions:
// Array of buttons that close messages
const deleteBtns = document.querySelectorAll('.delete');

// Submit form to Firebase
document.querySelector(`.contactsbmt`).addEventListener(`click`, e => {
  e.preventDefault()
  let x = document.querySelector(`.option`).selectedIndex
  let id = db.collection(`submissions`).doc().id
  let name = document.querySelector(`.name`).value
  let email = document.querySelector(`.email`).value
  let subject = document.getElementsByTagName(`option`)[x].value
  let message = document.querySelector(`.userMessage`).value
  if (name === `` || email === `` || message === ``) {
    document.querySelector(`.is-danger`).style.display = `block`
  } else {
    db.collection(`submissions`).doc(id).set({
      name: name,
      email: email,
      subject: subject,
      message: message,
    })
    document.querySelector(`.name`).value = ``
    document.querySelector(`.email`).value = ``
    document.querySelector(`.userMessage`).value = ``
    document.querySelector(`.is-success`).style.display = `block`
    console.log(name)
    console.log(email)
    console.log(message)
  }
})
// 

// Hiding messages
const hideElem = (elem) => {
  elem.style.display = `none`
}

for (let i = 0; i < deleteBtns.length; i++) {
  // console.log("Delete Item", deleteBtns[i])
  deleteBtns[i].addEventListener(`click`, e => {
    console.log("element", e.target)
    hideElem(e.target.closest('article'))
  })
}
//


