import templatesHTML from './templatesHTML';
import templatesURL from './templatesURL';
import { playAudio } from './helpers';

class Result {
  constructor(currentGameObject) {
    this.currentGameObject = currentGameObject;
    this.container = document.querySelector('.container');
    this.resultPage = document.querySelector('.resultpage');
  }

  getCountErrorInArrayWord(arr) {
    let cnt = 0;

    arr.forEach((item) => {
      if (!item.success) {
        cnt += 1;
      }
    });

    return cnt;
  }

  getCountSuccessInArrayWord(arr) {
    let cnt = 0;

    arr.forEach((item) => {
      if (item.success) {
        cnt += 1;
      }
    });

    return cnt;
  }

  registerWordClickEvent(event) {
    if (event.target.dataset.wordid) {
      const wordObj = this.currentGameObject.getWordById(event.target.dataset.wordid);
      playAudio('audio', templatesURL.getAudioURL(wordObj.audio));
    }
  }

  init() {
    const successDiv = document.querySelector('.resultpage__success-num');
    const successItemDiv = document.querySelector('.resultpage__success-item');

    const errorDiv = document.querySelector('.resultpage__errors-num');
    const errorItemDiv = document.querySelector('.resultpage__errors-item');

    successDiv.innerText = this.getCountSuccessInArrayWord(this.currentGameObject.gameWordArray);
    errorDiv.innerText = this.getCountErrorInArrayWord(this.currentGameObject.gameWordArray);

    successItemDiv.innerText = '';
    errorItemDiv.innerText = '';

    for (let i = 0; i < this.currentGameObject.gameWordArray.length - 1; i += 1) {
      if (this.currentGameObject.gameWordArray[i].success) {
        successItemDiv.insertAdjacentHTML('beforeEnd', templatesHTML.getResultItemHTML(this.currentGameObject.gameWordArray[i]));
      } else {
        errorItemDiv.insertAdjacentHTML('beforeEnd', templatesHTML.getResultItemHTML(this.currentGameObject.gameWordArray[i]));
      }
    }

    this.container.classList.add('hidden');
    this.resultPage.classList.remove('hidden');

    successItemDiv.addEventListener('click', this.registerWordClickEvent.bind(this));
    errorItemDiv.addEventListener('click', this.registerWordClickEvent.bind(this));
  }
}

export default Result;
