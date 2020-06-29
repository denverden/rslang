import templatesURL from './templatesURL';
import templatesHTML from './templatesHTML';
import Words from './Words';
import Result from './Result';
import { clockToString, removeSomeCSSClass, playAudio } from './helpers';

class Game extends Words {
  constructor(group) {
    super(group);
    this.microphoneOn = false;
  }

  saveGame() {
    let statListArray = localStorage.getItem('statListArray') || [];

    if (statListArray.length > 0) {
      statListArray = JSON.parse(statListArray);
      console.log(statListArray);
    }

    const statObj = {};
    statObj.date = clockToString(new Date());
    statObj.statistics = this.currentWordArray;

    if (statListArray.length === 10) {
      statListArray.shift();
      statListArray.push(statObj);
    } else {
      statListArray.push(statObj);
    }

    localStorage.setItem('statListArray', JSON.stringify(statListArray));

  }

  renderResultGame() {
    const currentStatistics = new Result(this);
    currentStatistics.init();

    this.saveGame();
  }

  restartGame() {
    const input = document.querySelector('.current__input');
    const score = document.querySelector('.info__score');

    score.innerText = '';
    input.value = '';
    removeSomeCSSClass('.cards__item', 'activeCard');

    this.currentWordArray.forEach((item) => {
      item.success = false;
    });
  }

  registerCardsEvent(event) {
    if (event.target.dataset.wordid && !this.microphoneOn) {
      removeSomeCSSClass('.cards__item', 'activeCard');

      if (event.target.classList.contains('.cards__item')) {
        event.target.classList.add('activeCard');
      } else {
        event.target.closest('.cards__item').classList.add('activeCard');
      }

      const wordObj = this.getWordById(event.target.dataset.wordid);

      this.setImageAndTranslate(wordObj);
      playAudio('audio', templatesURL.getAudioURL(wordObj.audio));
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

    try {
      currentImage.src = templatesURL.getImageURL(wordObj.image);
      currentTranslate.innerText = wordObj.wordTranslate;
    } catch (err) {
      console.log('Error in setImageAndTranslate', err);
    }
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
