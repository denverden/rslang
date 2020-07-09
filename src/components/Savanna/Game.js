import templatesURL from './templatesURL';
import Words from './Words';
import { getRandomInt, shuffleArray } from './helpers';
import templatesHTML from './templatesHTML';
import Result from './Result';

class Game extends Words {
  constructor(group) {
    super(group);

    this.attempt = 5;
    this.gameWordArray = [];
    this.gameOtherThreeWordArray = [];
    this.timerId = 0;
    this.timerIntervalId = 0;
    this.attemptDiv = '';
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

  createCards() {
    const cards = document.querySelector('.cards');
    cards.innerText = '';

    for (let i = 0; i < this.gameOtherThreeWordArray.length; i += 1) {
      const idx = i + 1;
      cards.insertAdjacentHTML('beforeEnd', templatesHTML.getCardItemHTML(idx, this.gameOtherThreeWordArray[i]));
    }

    // Если делать регистрацию здесь, то почему-то не правильно отрабатывают click
    // cards.addEventListener('click', this.registerCardsEvent.bind(this));
    // this.attemptDiv.addEventListener('click', this.registerCardsEvent.bind(this));
  }

  registerCardsClickEvent(event) {
    if (event.target.dataset.wordid) {
      if (event.target.dataset.wordid === this.gameWordArray[this.gameWordArray.length - 1].id) {
        this.gameWordArray[this.gameWordArray.length - 1].success = true;
        clearInterval(this.timerIntervalId);
        clearTimeout(this.timerId);
        this.startTimer(false);
      } else {
        this.attempt -= 1;
        clearInterval(this.timerIntervalId);
        clearTimeout(this.timerId);
        this.startTimer(false);
      }
    }
  }

  compareKeyPress(idx) {
    // eslint-disable-next-line max-len
    if (this.gameOtherThreeWordArray[idx].id === this.gameWordArray[this.gameWordArray.length - 1].id) {
      this.gameWordArray[this.gameWordArray.length - 1].success = true;
      clearInterval(this.timerIntervalId);
      clearTimeout(this.timerId);
      this.startTimer(false);
    } else {
      this.attempt -= 1;
      clearInterval(this.timerIntervalId);
      clearTimeout(this.timerId);
      this.startTimer(false);
    }
  }

  registerKeyUpEvent(event) {
    const codeKey = event.code;

    if ((codeKey === 'Digit1') || (codeKey === 'Numpad1')) {
      this.compareKeyPress(0);
    } else if ((codeKey === 'Digit2') || (codeKey === 'Numpad2')) {
      this.compareKeyPress(1);
    } else if ((codeKey === 'Digit3') || (codeKey === 'Numpad3')) {
      this.compareKeyPress(2);
    } else if ((codeKey === 'Digit4') || (codeKey === 'Numpad4')) {
      this.compareKeyPress(3);
    }
  }

  renderResultGame() {
    const currentStatistics = new Result(this);
    currentStatistics.init();
  }

  async renderGameWords() {
    const currentWord = document.querySelector('.current__translation');
    const idx = getRandomInt(20);

    this.group = getRandomInt(5);
    await this.createWordArray(0, 20);
    this.gameWordArray.push(this.currentWordArray[idx]);

    this.getOtherThreeWord(idx);

    currentWord.innerText = this.gameWordArray[this.gameWordArray.length - 1].word;

    this.createCards();
  }

  myTimer() {
    let t = 5;
    const timerDiv = document.querySelector('.timer');

    this.timerIntervalId = setInterval(() => {
      t -= 1;
      timerDiv.innerHTML = `Timer: ${t}`;

      if (t <= 0) {
        clearInterval(this.timerIntervalId);
      }
    }, 1000);

    this.timerId = setTimeout(() => {
      console.log('timer.. Current attempt ', this.attempt);
      this.startTimer(true);
    }, 5000);
  }

  async startTimer(timeout) {
    if (timeout) {
      this.attempt -= 1;
      console.log('Attempt time over', this.attempt);
    }

    this.attemptDiv.innerText = `Attempt: ${this.attempt}`;

    if (this.attempt > 0) {
      await this.renderGameWords();
      this.myTimer();
    } else {
      this.renderResultGame();
      console.log('You lose....', this.gameWordArray);
    }
  }

  init() {
    this.attemptDiv = document.querySelector('.info__score');
    this.attemptDiv.innerText = this.attempt;

    document.querySelector('.cards').addEventListener('click', this.registerCardsClickEvent.bind(this));
    document.addEventListener('keyup', this.registerKeyUpEvent.bind(this));

    this.startTimer();
  }
}

export default Game;
