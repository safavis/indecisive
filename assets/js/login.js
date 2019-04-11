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