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
  }

  restartGame(saveGame = true) {
    if (saveGame) {
      this.saveGame();
    }

    const input = document.querySelector('.current__input');
    const score = document.querySelector('.speakit-info__score');
    const currentImage = document.querySelector('.current__image');
    const currentTranslate = document.querySelector('.current__translation');

    score.innerText = '';
    input.value = '';
    currentImage.src = templatesURL.getDefaultImageURL();
    currentTranslate.innerText = '';

    removeSomeCSSClass('.cards__item', 'activeCard');

    this.setFalseToSuccessField();
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

    await this.createWordArray(0, 10);

    for (let i = 0; i < 10; i += 1) {
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

      currentImage.onerror = () => {
        currentImage.src = templatesURL.getDefaultImageURL();
      };
    } catch (err) {
      // eslint-disable-next-line no-console
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
