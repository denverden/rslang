import './speakit.scss';
import templatesURL from './templatesURL';
import templatesHTML from './templatesHTML';
import GameWords from './GameWords';

class Speakit {
  constructor() {
    this.group = 0;
    this.startpage = 0;
    this.container = '';
    this.microphoneOn = false;
    this.recognition = '';
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

    this.recognition.addEventListener('result', this.registerRecognitionEvent.bind(this));
    this.recognition.addEventListener('end', this.recognition.start);
    this.recognition.start();
  }

  registerRecognitionEvent(event) {
    let wordObj = {};

    if (this.microphoneOn) {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join();

      if (event.results[0].isFinal) {
        const input = document.querySelector('.current__input');
        input.value = transcript;

        wordObj = this.getWordByWord(input.value);

        if (Object.keys(wordObj).length > 0) {
          this.setActiveCard(wordObj.id);
          this.setWordSuccessById(wordObj.id);
          this.setImageAndTranslate(wordObj);
          this.setStar();
        }
      }
    }
  }

  registerStartButtonEvent() {
    const startpage = document.querySelector('.startpage');
    startpage.classList.add('hidden');

    const newGame = new GameWords(0);
    newGame.renderCardBlock();

    this.container.classList.remove('hidden');
  }

  registerHeaderControlEvent(event) {
    if (event.target.classList.contains('info__pages--page')) {
      this.removeActiveCSSClass('.info__pages--page', 'activePage');

      event.target.classList.add('activePage');
      const newGame = new GameWords(event.target.dataset.groupno);
      newGame.renderCardBlock();

      //      this.renderPageCard(this.startpage, event.target.dataset.groupno);
//      this.restart();
    }
  }

  registerDownButtonEvent(event) {
    event.preventDefault();
    if (event.target.classList.contains('btns__restart')) {
      this.restart();

    } else if (event.target.classList.contains('btns__speak')) {
      const input = document.querySelector('.current__input');

      if (this.microphoneOn) {
        this.microphoneOn = false;
        input.classList.add('none');

        this.removeActiveCSSClass('.cards__item', 'activeCard');

      } else {
        this.microphoneOn = true;
        input.classList.remove('none');

        this.removeActiveCSSClass('.cards__item', 'activeCard');
      }

    } else if (event.target.classList.contains('btns__result')) {
      this.openResult();
    }
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

    this.container = document.querySelector('.container');
  }

}

export default Speakit;
