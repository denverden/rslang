import Component from '../Component';
import './PromoStyle.scss';
import gamesImg from './images/games.png';
import settingsImg from './images/settings.png';

class HomePage extends Component {
  afterRender() {
    const slides = document.querySelectorAll('.slide-container__slide');
    let currentSlide = 0;
    let isEnabled = true;

    function changeCurrentSlide(slideNumber) {
      currentSlide = (slideNumber + slides.length) % slides.length;
    }

    function hideSlide(direction) {
      isEnabled = false;
      slides[currentSlide].classList.add(direction);
      slides[currentSlide].addEventListener('animationend', function () {
        this.classList.remove('slider--show', direction);
      });
    }

    function showSlide(direction) {
      slides[currentSlide].classList.add('slider_next', direction);
      slides[currentSlide].addEventListener('animationend', function () {
        this.classList.remove('slider_next', direction);
        this.classList.add('slider--show');
        isEnabled = true;
      });
    }

    function previousSlide(slideNumber) {
      hideSlide('to-left');
      changeCurrentSlide(slideNumber + 1);
      showSlide('from-right');
    }

    function nextSlide(slideNumber) {
      hideSlide('to-right');
      changeCurrentSlide(slideNumber - 1);
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
  }
}

const homePage = new HomePage({
  selector: 'main',
  template: `<h1 class="welcome">Welcome to RS Lang!</h1>
  <h6 class="welcome">Here you can look through general features of our website.</h6>
  <section class="slider">
  <button class="slider__prev-button">
  </button>
  <div class="slide-container">
    <div class="slide-container__slide slider--show">
      <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
     </div>
     <div class="slide-container__slide">
     <a href="https://rslang-team62-denverden.netlify.app/#games">
        <img src="${gamesImg}" alt="Games">
      </a>
      <div class="carousel-caption d-block">
        <h2>Various types of educational games</h2>
      </div>
     </div>
    <div class="slide-container__slide">
    <a href="https://rslang-team62-denverden.netlify.app/#settings">
    <img src="${settingsImg}" alt="Settings">
  </a>
  <div class="carousel-caption d-block">
        <h2>Flexible language learning settings</h2>
      </div>
    </div>
  </div>
  <button class="slider__next-button">
  </button>
</section>
<h1 class="info-text">Our opportunities and advantages:</h1>
<section class="info">
  <div class="info__item">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Eo_circle_light-blue_white_checkmark.svg/1024px-Eo_circle_light-blue_white_checkmark.svg.png" alt="pic1">
    <h3>A personal account that helps to keep progress</h3>
  </div>
  <div class="info__item">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Eo_circle_light-blue_white_checkmark.svg/1024px-Eo_circle_light-blue_white_checkmark.svg.png" alt="pic2">
    <h3>Interval repetition technique for fixing in memory of the studied words</h3>
  </div>
  <div class="info__item">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Eo_circle_light-blue_white_checkmark.svg/1024px-Eo_circle_light-blue_white_checkmark.svg.png" alt="pic3">
    <h3>Cognitive mini-game, allowing to expand vocabulary</h3>
  </div>
  <div class="info__item">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Eo_circle_light-blue_white_checkmark.svg/1024px-Eo_circle_light-blue_white_checkmark.svg.png" alt="pic4">
    <h3>Statistics to track your progress</h3>
  </div>
  <div class="info__item">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Eo_circle_light-blue_white_checkmark.svg/1024px-Eo_circle_light-blue_white_checkmark.svg.png" alt="pic5">
    <h3>A variety of settings for the convenience of using the site</h3>
  </div>
</section>
<section class="rules">
  <div class="rules__rule">
    <img src="https://image.flaticon.com/icons/png/512/114/114903.png" alt="rule1">
    <h3>Example Rule 1</h3>
  </div>
  <div class="rules__rule">
    <img src="https://image.flaticon.com/icons/png/512/114/114903.png" alt="rule2">
    <h3>Example Rule 2</h3>
  </div>
  <div class="rules__rule">
    <img src="https://image.flaticon.com/icons/png/512/114/114903.png" alt="rule3">
    <h3>Example Rule 3</h3>
  </div>
  <div class="rules__rule">
    <img src="https://image.flaticon.com/icons/png/512/114/114903.png" alt="rule4">
    <h3>Example Rule 4</h3>
  </div>
</section>
<h1 class="start">So, what are you waiting for? Just <a href="http://localhost:3000/#sign-in">start</a> it right now!</h1>`,
});

export default homePage;
