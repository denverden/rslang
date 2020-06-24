import Speakit from './SpeakIt';
import templatesURL from './templatesURL';
import templatesHTML from './templatesHTML';

class GameWords {
  constructor(group) {
    this.isGame = false;
    this.group = group;

    this.startpage = 0;
    this.currentWordArray = [];
    this.container = '';
    this.resultPage = '';
    this.microphoneOn = false;
    this.recognition = '';

  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  removeActiveCSSClass(elementClass, removeClass) {
    document.querySelectorAll(elementClass).forEach((item) => {
      item.classList.remove(removeClass);
    });
  }


  async getWordList() {
    try {
      const page = this.getRandomInt(20);

      const res = await fetch(templatesURL.getWordListURL(page, this.group));
      const data = await res.json();

      return data;
    } catch (err) {
      console.log('Error getWordList', err);
    }
  }

  async createWordArray() {
    // todo: add random set word
    this.currentWordArray = await this.getWordList();

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

      // const obj = this.getWordById(event.target.dataset.wordid);
      //
      // this.setImageAndTranslate(obj);
      // this.playAudio(obj.audio);
    }
  }

  async renderCardBlock() {
    const cards = document.querySelector('.cards');
    cards.innerText = '';

    await this.createWordArray();

    for (let i = 0; i < 10; i++) {
      cards.insertAdjacentHTML('beforeEnd', templatesHTML.getCardItemHTML(this.currentWordArray[i].id, this.currentWordArray[i].word, this.currentWordArray[i].transcription))
    }

    cards.addEventListener('click', this.registerCardsEvent.bind(this));
  }

}


export default GameWords;
