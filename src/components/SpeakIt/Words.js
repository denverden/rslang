import templatesURL from './templatesURL';

class Words {
  constructor(group) {
    this.group = group;
    this.currentWordArray = [];
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  async getWordList() {
    try {
      const page = this.getRandomInt(20);

      const res = await fetch(templatesURL.getWordListURL(page, this.group));
      let data = await res.json();

      data = data.slice(0,10);

      return data;
    } catch (err) {
      console.log('Error getWordList', err);
      return err;
    }
  }

  async createWordArray() {
    // todo: add random set word
    this.currentWordArray = await this.getWordList();

    this.currentWordArray.forEach((item) => {
      item.success = false;
    });
  }

  getWordById(id) {
    let wordObj = {};
    this.currentWordArray.forEach((item) => {
      if (item.id === id) {
        wordObj = item;
      }
    });

    return wordObj;
  }

  getWordByWord(word) {
    let wordObj = {};
    this.currentWordArray.forEach((item) => {
      if (item.word.toUpperCase() === word.toUpperCase()) {
        wordObj = item;
      }
    });

    return wordObj;
  }

  setWordSuccessById(id) {
    this.currentWordArray.forEach((item) => {
      if (item.id === id) {
        item.success = true;
      }
    });
  }

  getCountError() {
    let cnt = 0;

    this.currentWordArray.forEach((item) => {
      if (!item.success) {
        cnt += 1;
      }
    });

    return cnt;
  }

  getCountSuccess() {
    let cnt = 0;

    this.currentWordArray.forEach((item) => {
      if (item.success) {
        cnt += 1;
      }
    });

    return cnt;
  }

}

export default Words;
