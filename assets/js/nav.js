// navbar burger
const burger = document.querySelector('.burger');
const nav = document.querySelector('#' + burger.dataset.target);
burger.addEventListener('click', function () {
  burger.classList.toggle('is-active');
  nav.classList.toggle('is-active');
});