import templatesHTML from './templatesHTML';
import Words from './Words';

class Statistics {
  constructor(currentWordArray) {
    this.currentWordArray = currentWordArray;
    this.container = document.querySelector('.container');
    this.resultPage = document.querySelector('.resultpage');
  }

  countError() {
    let cnt = 0;

    this.currentWordArray.forEach((item) => {
      if (!item.success) {
        cnt += 1;
      }
    });

    return cnt;
  }

  countSuccess() {
    let cnt = 0;

    this.currentWordArray.forEach((item) => {
      if (item.success) {
        cnt += 1;
      }
    });

    return cnt;
  }

  init() {
    const successDiv = document.querySelector('.resultpage__succes-num');
    const successItemDiv = document.querySelector('.resultpage__succes-item');

    const errorDiv = document.querySelector('.resultpage__errors-num');
    const errorItemDiv = document.querySelector('.resultpage__errors-item');

    successDiv.innerText = this.countSuccess();
    errorDiv.innerText = this.countError();

    successItemDiv.innerText = '';
    errorItemDiv.innerText = '';

    for (let i = 0; i < 10; i++) {
      if (this.currentWordArray[i].success) {
        successItemDiv.insertAdjacentHTML('beforeEnd', templatesHTML.getResultItemHTML(this.currentWordArray[i]));
      } else {
        errorItemDiv.insertAdjacentHTML('beforeEnd', templatesHTML.getResultItemHTML(this.currentWordArray[i]));
      }
    }

    this.container.classList.add('hidden');
    this.resultPage.classList.remove('hidden');

    // successItemDiv.addEventListener('click', this.registerResultItemEvent.bind(this));
    // errorItemDiv.addEventListener('click', this.registerResultItemEvent.bind(this));
    // newGameBtn.addEventListener('click', this.restart.bind(this));
  }

}

export default Statistics;
