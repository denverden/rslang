import Component from '../Component';
import './PromoStyle.scss';

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
  template: `<section class="slider">
  <button class="slider__prev-button">
  </button>
  <div class="slide-container">
    <div class="slide-container__slide slider--show">
      <img src="https://aiesec.at/wp-content/uploads/2015/07/5718269042_8b2181bed8_o-900x600.png" alt="Slide 1">
    </div>
    <div class="slide-container__slide">
      <img src="https://obj.altapress.ru/picture/571846/900x600.jpg" alt="Slide 2">
    </div>
    <div class="slide-container__slide">
      <img src="https://media.kasperskycontenthub.com/wp-content/uploads/sites/20/2020/02/25184427/DSC05835-900x600.jpg" alt="Slide 3">
    </div>
  </div>
  <button class="slider__next-button">
  </button>
</section>
<section class="info">
  <div class="info__item">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Star%2A.svg/1200px-Star%2A.svg.png" alt="pic1">
    <h2>ProTip1</h2>
    <p>Личный кабинет, позволяющий сохранить прогресс</p>
  </div>
  <div class="info__item"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Star%2A.svg/1200px-Star%2A.svg.png" alt="pic2">
    <h2>ProTip2</h2>
    <p>Методика интервального повторения для закрепления в памяти изучаемых слов</p>
  </div>
  <div class="info__item"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Star%2A.svg/1200px-Star%2A.svg.png" alt="pic3">
    <h2>ProTip3</h2>
    <p>Познавательные мини-игры, позволяющие расширить словарный запас</p>
  </div>
  <div class="info__item">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Star%2A.svg/1200px-Star%2A.svg.png" alt="pic4">
    <h2>ProTip4</h2>
    <p>Статистика для отслеживания прогресса</p>
  </div>
  <div class="info__item">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Star%2A.svg/1200px-Star%2A.svg.png" alt="pic5">
    <h2>ProTip5</h2>
    <p>No one rejects, dislikes, or avoids pleasure itself, because it is pleasure</p>
  </div>
  <div class="info__item">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Star%2A.svg/1200px-Star%2A.svg.png" alt="pic6">
    <h2>ProTip6</h2>
    <p>To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it</p>
  </div>
</section>
<section class="rules">
  <div class="rules__rule">
    <img src="https://image.flaticon.com/icons/png/512/114/114903.png" alt="rule1">
    <h2>Rule1</h2>
    <p>Rule description 1</p>
  </div>
  <div class="rules__rule">
    <img src="https://image.flaticon.com/icons/png/512/114/114903.png" alt="rule2">
    <h2>Rule2</h2>
    <p>Rule description 2</p>
  </div>
  <div class="rules__rule">
    <img src="https://image.flaticon.com/icons/png/512/114/114903.png" alt="rule3">
    <h2>Rule3</h2>
    <p>Rule description 3</p>
  </div>
  <div class="rules__rule">
    <img src="https://image.flaticon.com/icons/png/512/114/114903.png" alt="rule4">
    <h2>Rule4</h2>
    <p>Rule description 4</p>
  </div>
</section>`,
});

export default homePage;
