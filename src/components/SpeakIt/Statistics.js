import templatesHTML from './templatesHTML';
import templatesURL from './templatesURL';

class Statistics {
  constructor(currentGameObject) {
    this.currentGameObject = currentGameObject;
    this.container = document.querySelector('.container');
    this.resultPage = document.querySelector('.resultpage');
  }

  playAudio(query) {
    const audio = document.querySelector('.audio');
    audio.autoplay = true;
    audio.setAttribute('src', templatesURL.getAudioURL(query));
  }

  registerResultClickEvent(event) {
    if (event.target.dataset.wordid) {
      const obj = this.currentGameObject.getWordById(event.target.dataset.wordid);
      this.playAudio(obj.audio);
    }
  }

  init() {
    const successDiv = document.querySelector('.resultpage__succes-num');
    const successItemDiv = document.querySelector('.resultpage__succes-item');

    const errorDiv = document.querySelector('.resultpage__errors-num');
    const errorItemDiv = document.querySelector('.resultpage__errors-item');

    successDiv.innerText = this.currentGameObject.getCountSuccess();
    errorDiv.innerText = this.currentGameObject.getCountError();

    successItemDiv.innerText = '';
    errorItemDiv.innerText = '';

    for (let i = 0; i < 10; i++) {
      if (this.currentGameObject.currentWordArray[i].success) {
        successItemDiv.insertAdjacentHTML('beforeEnd', templatesHTML.getResultItemHTML(this.currentGameObject.currentWordArray[i]));
      } else {
        errorItemDiv.insertAdjacentHTML('beforeEnd', templatesHTML.getResultItemHTML(this.currentGameObject.currentWordArray[i]));
      }
    }

    this.container.classList.add('hidden');
    this.resultPage.classList.remove('hidden');

    successItemDiv.addEventListener('click', this.registerResultClickEvent.bind(this));
    errorItemDiv.addEventListener('click', this.registerResultClickEvent.bind(this));
  }

}

export default Statistics;
