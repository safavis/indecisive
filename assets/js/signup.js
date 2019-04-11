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

// Submit signup form to Firebase
document.querySelector(`#signup`).addEventListener(`click`, e => {
  e.preventDefault()
  let id = db.collection(`user_login`).doc().id
  let name = document.querySelector(`.name`).value
  let email = document.querySelector(`.email`).value
  let username = document.querySelector(`.usernm`).value
  let password = document.querySelector(`.pass`).value
  if (name === `` || email === `` || username === `` || password === ``) {
    document.querySelector(`.is-danger`).style.display = `block`
  } else {
    db.collection('user_login').doc(id).set({
      name: name,
      email: email,
      username: username,
      password: password,
    })
    document.querySelector(`.name`).value = ``
    document.querySelector(`.email`).value = ``
    document.querySelector(`.usernm`).value = ``
    document.querySelector(`.pass`).value = ``
    document.querySelector(`.is-success`).style.display = `block`
  }
})

// Cancel button
document.querySelector(`#canc`).addEventListener(`click`, e => {
  document.querySelector(`.name`).value = ``
  document.querySelector(`.email`).value = ``
  document.querySelector(`.usernm`).value = ``
  document.querySelector(`.pass`).value = ``
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