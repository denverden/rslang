import {previousSlide, nextSlide} from '../slide/Slide.js';

let currentSlide = 0;

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
