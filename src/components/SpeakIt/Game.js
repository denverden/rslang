import templatesURL from './templatesURL';
import templatesHTML from './templatesHTML';
import Words from './Words';
import Statistics from './Statistics';

class Game extends Words {
  constructor(group) {
    super(group);
    this.microphoneOn = false;
  }

  saveGame() {

  }

  renderStatisticsGame() {
    const currentStatistics = new Statistics(this);
    currentStatistics.init();
  }

  removeActiveCSSClass(elementClass, removeClass) {
    document.querySelectorAll(elementClass).forEach((item) => {
      item.classList.remove(removeClass);
    });
  }

  playAudio(query) {
    const audio = document.querySelector('.audio');
    audio.autoplay = true;
    audio.setAttribute('src', templatesURL.getAudioURL(query));
  }

  restartGame() {
    const input = document.querySelector('.current__input');
    const score = document.querySelector('.info__score');

    score.innerText = '';
    input.value = '';
    this.removeActiveCSSClass('.cards__item', 'activeCard');

    this.currentWordArray.forEach((item) => {
      item.success = false;
    });
  }

  registerCardsEvent(event) {
    if (event.target.dataset.wordid && !this.microphoneOn) {
      this.removeActiveCSSClass('.cards__item', 'activeCard');

      if (event.target.classList.contains('.cards__item')) {
        event.target.classList.add('activeCard');
      } else {
        event.target.closest('.cards__item').classList.add('activeCard');
      }

      const wordObj = this.getWordById(event.target.dataset.wordid);

      this.setImageAndTranslate(wordObj);
      this.playAudio(wordObj.audio);
    }
  }

  async renderCardBlock() {
    const cards = document.querySelector('.cards');
    cards.innerText = '';

    await this.createWordArray();

    for (let i = 0; i < 10; i++) {
      cards.insertAdjacentHTML('beforeEnd', templatesHTML.getCardItemHTML(this.currentWordArray[i]));
    }

    cards.addEventListener('click', this.registerCardsEvent.bind(this));
  }

  setImageAndTranslate(wordObj) {
    const currentImage = document.querySelector('.current__image');
    const currentTranslate = document.querySelector('.current__translation');

    currentImage.src = templatesURL.getImageURL(wordObj.image);
    currentTranslate.innerText = wordObj.wordTranslate;
  }

  setActiveCard(id) {
    const cards = document.querySelectorAll('.cards__item');
    cards.forEach((item) => {
      if (item.dataset.wordid === id) {
        item.classList.add('activeCard');
      }
    });
  }
}

export default Game;
