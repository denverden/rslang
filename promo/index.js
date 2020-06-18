import './style/style.sass';

// change slide

const slides = document.querySelectorAll('.slide-container__slide1, .slide-container__slide2, .slide-container__slide3');
let currentSlide = 0;
let isEnabled = true;

function changeCurrentSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
}

function hideSlide(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener('animationend', function () {
    this.classList.remove('slider_show', direction);
  });
}

function showSlide(direction) {
  slides[currentSlide].classList.add('slider_next', direction);
  slides[currentSlide].addEventListener('animationend', function () {
    this.classList.remove('slider_next', direction);
    this.classList.add('slider_show');
    isEnabled = true;
  });
}

function nextSlide(n) {
  hideSlide('to-left');
  changeCurrentSlide(n + 1);
  showSlide('from-right');
}

function previousSlide(n) {
  hideSlide('to-right');
  changeCurrentSlide(n - 1);
  showSlide('from-left');
}

document.querySelector('.slider__next-button').addEventListener('click', () => {
  if (isEnabled) {
    previousSlide(currentSlide);
  }
});

document.querySelector('.slider__prev-button').addEventListener('click', () => {
  if (isEnabled) {
    nextSlide(currentSlide);
  }
});
