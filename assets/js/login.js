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

// Pseudo login code
document.querySelector(`.sbmt`).addEventListener('click', e => {
  let name = document.querySelector(`.pass`).value
  let email = document.querySelector(`.emailinput`).value
  if (name === `` || email === ``) {
    document.querySelector(`.is-danger`).style.display = `block`
  } else {
    location.replace("./index.html")
  }
})

// Array of buttons that close messages
const deleteBtns = document.querySelectorAll('.delete');

// Hiding messages
const hideElem = (elem) => {
  elem.style.display = `none`
}

for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener(`click`, e => {
    hideElem(e.target.closest('article'))
  })
}