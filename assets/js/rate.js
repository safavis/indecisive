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

// Contact Form Firebase Submissions:
// Array of buttons that close messages
const deleteBtns = document.querySelectorAll('.delete');

// Submit review to Firebase
document.querySelector(`.ratesbmt`).addEventListener(`click`, e => {
  e.preventDefault()
  let x = document.querySelector(`.option`).selectedIndex
  let id = db.collection(`ratings`).doc().id
  let name = document.querySelector(`.name`).value
  let email = document.querySelector(`.email`).value
  let rating = document.getElementsByTagName(`option`)[x].value
  let message = document.querySelector(`.userMessage`).value
  if (name === `` || email === `` || message === ``) {
    document.querySelector(`.is-danger`).style.display = `block`
  } else {
    db.collection(`ratings`).doc(id).set({
      name: name,
      email: email,
      rating: rating,
      message: message,
    })
    document.querySelector(`.name`).value = ``
    document.querySelector(`.email`).value = ``
    document.querySelector(`.userMessage`).value = ``
    document.querySelector(`.is-success`).style.display = `block`
  }
})

// Hiding messages
const hideElem = (elem) => {
  elem.style.display = `none`
}

for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener(`click`, e => {
    hideElem(e.target.closest('article'))
  })
}

// Showing reviews
db.collection(`ratings`).onSnapshot(({ docs }) => {
  document.querySelector(`.appendratings`).innerHTML = ``
  docs.forEach(doc => {
    let { name, email, rating, message } = doc.data()
    let reviewElem = document.createElement(`div`)
    reviewElem.innerHTML = `
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          ${name}
        </p>
      </header>
      <div class="card-content">
        <div class="content ratingsDiv">
          <p>${rating}</p>
        </div>
        <div class="content">
          <p>${message}</p>
        </div>
      </div>
    </div>
    `
    document.querySelector(`.appendratings`).append(reviewElem)
  })
})