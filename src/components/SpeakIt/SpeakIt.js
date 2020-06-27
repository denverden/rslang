import './speakit.scss';
import templatesHTML from './templatesHTML';
import Game from './Game';

class Speakit {
  constructor() {
    this.currentGameObject = '';
    this.container = '';
    this.resultPage = '';

    this.microphoneOn = false;
    this.recognition = '';
  }

  createNewGame(group) {
    if (this.currentGameObject instanceof Game) {
      this.currentGameObject = new Game(group);
      this.currentGameObject.renderCardBlock();

    } else {
      this.currentGameObject = new Game(group);
      this.currentGameObject.renderCardBlock();
    }
  }

  removeActiveCSSClass(elementClass, removeClass) {
    document.querySelectorAll(elementClass).forEach((item) => {
      item.classList.remove(removeClass);
    });
  }

  addSpeechRecognition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', this.registerSpeechRecognitionEvent.bind(this));
    this.recognition.addEventListener('end', this.recognition.start);
    this.recognition.start();
  }

  addStar() {
    const score = document.querySelector('.info__score ');
    score.insertAdjacentHTML('beforeend', templatesHTML.getStarHTML())
  }

  registerSpeechRecognitionEvent(event) {
    let wordObj = {};

    if (this.microphoneOn) {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join();

      if (event.results[0].isFinal) {
        const input = document.querySelector('.current__input');
        input.value = transcript;

        wordObj = this.currentGameObject.getWordByWord(input.value);

        if (Object.keys(wordObj).length > 0) {
          this.currentGameObject.setActiveCard(wordObj.id);
          this.currentGameObject.setWordSuccessById(wordObj.id);
          this.currentGameObject.setImageAndTranslate(wordObj);
          this.addStar();
        }
      }
    }
  }

  registerStartButtonEvent() {
    const startpage = document.querySelector('.startpage');
    startpage.classList.add('hidden');

    this.createNewGame(0);

    this.container.classList.remove('hidden');
  }

  registerHeaderControlEvent(event) {
    if (event.target.classList.contains('info__pages--page')) {
      this.removeActiveCSSClass('.info__pages--page', 'activePage');

      event.target.classList.add('activePage');
      this.createNewGame(event.target.dataset.groupno);
    }
  }

  registerDownButtonEvent(event) {
    event.preventDefault();
    if (event.target.classList.contains('btns__restart')) {
      this.currentGameObject.restartGame();

    } else if (event.target.classList.contains('btns__speak')) {
      const input = document.querySelector('.current__input');

      if (this.microphoneOn) {
        this.microphoneOn = false;
        this.currentGameObject.microphoneOn = false;
        input.classList.add('none');

        this.removeActiveCSSClass('.cards__item', 'activeCard');

      } else {
        this.microphoneOn = true;
        this.currentGameObject.microphoneOn = true;
        input.classList.remove('none');

        this.removeActiveCSSClass('.cards__item', 'activeCard');
      }

    } else if (event.target.classList.contains('btns__result')) {
      this.currentGameObject.renderStatisticsGame();
    }
  }

  registerCloseStatisticsEvent() {
    this.container.classList.remove('hidden');
    this.resultPage.classList.add('hidden');
  }

  registerNewGameEvent() {
    this.registerCloseStatisticsEvent();
    this.createNewGame(this.currentGameObject.group);
  }

  init(elementId) {
    this.addSpeechRecognition();

    const el = document.getElementById(elementId);
    el.insertAdjacentHTML('beforeEnd', templatesHTML.getStartPageHTML());

    const startButton = document.querySelector('.startpage--intro-btn');
    startButton.addEventListener('click', this.registerStartButtonEvent.bind(this));

    const btns = document.querySelector('.btns');
    btns.addEventListener('click', this.registerDownButtonEvent.bind(this));

    const headerControl = document.querySelector('.info');
    headerControl.addEventListener('click', this.registerHeaderControlEvent.bind(this));

    const returnBtn = document.querySelector('.resultpage__return');
    returnBtn.addEventListener('click', this.registerCloseStatisticsEvent.bind(this));

    const newGameBtn = document.querySelector('.resultpage__new-game');
    newGameBtn.addEventListener('click', this.registerNewGameEvent.bind(this));

    this.container = document.querySelector('.container');
    this.resultPage = document.querySelector('.resultpage');
  }

}

export default Speakit;
