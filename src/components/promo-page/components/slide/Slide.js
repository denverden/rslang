const slides = document.querySelectorAll('.slide-container__slide');
let currentSlide = 0;
let isEnabled = true;

function changeCurrentSlide(slideNumber) {
  currentSlide = (slideNumber + slides.length) % slides.length;
}

function hideSlide(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener('animationend', () => {
    this.classList.remove('slider--show', direction);
  });
}

function showSlide(direction) {
  slides[currentSlide].classList.add('slider_next', direction);
  slides[currentSlide].addEventListener('animationend', () => {
    this.classList.remove('slider_next', direction);
    this.classList.add('slider--show');
    isEnabled = true;
  });
}

export function nextSlide(slideNumber) {
  hideSlide('to-left');
  changeCurrentSlide(slideNumber + 1);
  showSlide('from-right');
}

export function previousSlide(slideNumber) {
  hideSlide('to-right');
  changeCurrentSlide(slideNumber - 1);
  showSlide('from-left');
}
