import templatesURL from './templatesURL';
import Words from './Words';
import { getRandomInt, shuffleArray } from './helpers';
import templatesHTML from './templatesHTML';

class Game extends Words {
  constructor(group) {
    super(group);

    this.attempt = 5;
    this.gameWordArray = [];
    this.gameThreeWordArray = [];
    this.timerId = 0;
  }

  registerCardsEvent(event) {
    if (event.target.dataset.wordid) {
      if (event.target.dataset.wordid === this.gameWordArray[this.gameWordArray.length - 1].id) {
        console.log('true');
        clearTimeout(this.timerId);
        this.gameWordArray[this.gameWordArray.length - 1].success = true;
      } else {
        this.attempt -= 1;
        console.log('false');
        clearTimeout(this.timerId);
      }

      // removeSomeCSSClass('.cards__item', 'activeCard');
      //
      // if (event.target.classList.contains('.cards__item')) {
      //   event.target.classList.add('activeCard');
      // } else {
      //   event.target.closest('.cards__item').classList.add('activeCard');
      // }
      //
      // const wordObj = this.getWordById(event.target.dataset.wordid);
      //
      // playAudio('audio', templatesURL.getAudioURL(wordObj.audio));
    }
  }

  createCards() {
    const cards = document.querySelector('.cards');
    cards.innerText = '';

    for (let i = 0; i < this.gameOtherThreeWordArray.length; i += 1) {
      cards.insertAdjacentHTML('beforeEnd', templatesHTML.getCardItemHTML(this.gameOtherThreeWordArray[i]));
    }

    cards.addEventListener('click', this.registerCardsEvent.bind(this));
  }

  getOtherThreeWord(idx) {
    this.gameOtherThreeWordArray = [];

    while (this.gameOtherThreeWordArray.length < 3) {
      const i = getRandomInt(20);
      if (i !== idx) {
        this.gameOtherThreeWordArray.push(this.currentWordArray[i]);
      }
    }

    this.gameOtherThreeWordArray.push(this.gameWordArray[this.gameWordArray.length - 1]);

    shuffleArray(this.gameOtherThreeWordArray);
  }

  async timer() {
    this.timerId = setTimeout(() => {
      console.log('Time is over!');
      this.attempt -= 1;
    }, 5000);
  }

  async renderCardBlock() {
    const currentWord = document.querySelector('.current__translation');

    await this.createWordArray(0, 20);
    const idx = getRandomInt(20);
    this.gameWordArray.push(this.currentWordArray[idx]);

    this.getOtherThreeWord(idx);

    currentWord.innerText = this.gameWordArray[this.gameWordArray.length - 1].word;

    this.createCards();

    await this.timer();
    // await this.timer().then(() => {
    //   console.log('5 sec: ', this.gameWordArray[this.gameWordArray.length - 1].word);
    // });

    console.log('out renderCardBlock');
  }

  async init() {
    // Запускаем пока есть попытки
    const attemptDiv = document.querySelector('.info__score');
    attemptDiv.innerText = this.attempt;

    while (this.attempt > 0) {
      this.group = getRandomInt(5);

      await this.renderCardBlock();
      attemptDiv.innerText = this.attempt;
    }

    console.log('Выводим окно со стастикой', this.gameWordArray);
  }
}

export default Game;
