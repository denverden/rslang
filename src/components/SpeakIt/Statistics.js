import templatesHTML from './templatesHTML';
import templatesURL from './templatesURL';
import { playAudio, addSomeCSSClass } from './helpers';

class Statistics {
  constructor() {
    this.currentStatistics = '';
    this.currentId = -1;
  }

  getWordById(wordArr, id) {
    let wordObj = {};
    wordArr.forEach((item) => {
      if (item.id === id) {
        wordObj = item;
      }
    });

    return wordObj;
  }

  getCountError(currentWordArray) {
    let cnt = 0;

    currentWordArray.forEach((item) => {
      if (!item.success) {
        cnt += 1;
      }
    });

    return cnt;
  }

  getCountSuccess(currentWordArray) {
    let cnt = 0;

    currentWordArray.forEach((item) => {
      if (item.success) {
        cnt += 1;
      }
    });

    return cnt;
  }

  getCurrentGroup(currentWordArray) {
    console.log(currentWordArray[0]);
    return currentWordArray[0].group;
  }

  renderHeader(statListArray) {
    const reversArr = statListArray.reverse();

    this.currentStatistics = reversArr;

    const statisticsContainerDiv = document.querySelector('.statistics__container');

    reversArr.forEach((item, index) => {
      if (item.statistics.length > 0) {
        const { date } = item;
        const errors = this.getCountError(item.statistics);
        const success = this.getCountSuccess(item.statistics);
        const group = this.getCurrentGroup(item.statistics);

        statisticsContainerDiv.insertAdjacentHTML('beforeEnd', templatesHTML.getStatisticsHeaderHTML(index, date, group, errors, success));
        statisticsContainerDiv.insertAdjacentHTML('beforeEnd', templatesHTML.getStatisticsContainerHTML(index));

        this.renderWordList(index);
      }
    });

    statisticsContainerDiv.addEventListener('click', this.registerStatisticsClickEvent.bind(this));
  }

  renderWordList(id) {
    const wordsArr = this.currentStatistics[id].statistics;

    for (let i = 0; i < 10; i += 1) {
      const successItemDiv = document.querySelector(`.headerid-${id} .statistics__success-item`);
      const errorItemDiv = document.querySelector(`.headerid-${id} .statistics__errors-item`);

      if (wordsArr[i].success) {
        successItemDiv.insertAdjacentHTML('beforeEnd', templatesHTML.getResultItemHTML(wordsArr[i]));
      } else {
        errorItemDiv.insertAdjacentHTML('beforeEnd', templatesHTML.getResultItemHTML(wordsArr[i]));
      }
    }
  }

  registerStatisticsClickEvent(event) {
    if (event.target.dataset.wordid) {
      // eslint-disable-next-line max-len
      const obj = this.getWordById(this.currentStatistics[this.currentId].statistics, event.target.dataset.wordid);

      playAudio('audio', templatesURL.getAudioURL(obj.audio));
    } else if (event.target.dataset.id) {
      const currentItem = document.querySelector(`.headerid-${event.target.dataset.id}`);

      addSomeCSSClass('.statistics-items', 'none');

      if (this.currentId === event.target.dataset.id) {
        currentItem.classList.add('none');
      } else {
        currentItem.classList.remove('none');
      }

      this.currentId = event.target.dataset.id;
    }
  }

  registerCloseEvent() {
    const container = document.querySelector('.container');
    const resultPage = document.querySelector('.resultpage');
    const statisticsPage = document.querySelector('.statistics');

    container.classList.add('hidden');
    resultPage.classList.remove('hidden');
    statisticsPage.classList.add('hidden');
  }

  init() {
    let statListArray = localStorage.getItem('statListArray') || [];
    const container = document.querySelector('.container');
    const resultPage = document.querySelector('.resultpage');
    const statisticsPage = document.querySelector('.statistics');
    const closeBtn = document.querySelector('.statistics__return');

    if (statListArray.length > 0) {
      statListArray = JSON.parse(statListArray);

      this.renderHeader(statListArray);

      container.classList.add('hidden');
      resultPage.classList.add('hidden');
      statisticsPage.classList.remove('hidden');

      closeBtn.addEventListener('click', this.registerCloseEvent.bind(this));
    } else {
      console.log('No statistics!');
    }
  }
}

export default Statistics;
