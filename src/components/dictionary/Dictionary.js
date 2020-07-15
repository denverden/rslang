import './dictionary.scss';

import Component from '../Component';
import AppStore from '../AppStore';
import DictionaryItem from './DictionaryItem';
import { getWordInfo } from './userWord';
import { renderEmptyTabNotification, renderPageTemplate } from './DictionaryPageTemplate';
import {
  messages,
  addLoader,
  removeLoader,
  makeUrl,
} from './helpers';

class Dictionary extends Component {
  constructor(selector, template) {
    super(selector, template);
    this.userWordsArr = [];
  }

  beforeRender() {
    if (!AppStore.isLoggedIn) window.location.hash = '#sign-in';
    this.userWordsArr = [];
    AppStore.dictionaryTab = 'all';
  }

  async afterRender() {
    const dictionaryTabs = document.getElementById('dictionaryTabs');
    const wordlistContainer = document.getElementById('wordlist');

    wordlistContainer.innerHTML = '';
    document.querySelectorAll('.dictionary-header__tab-item').forEach((tab, idx) => {
      tab.classList.remove('active');
      if (idx === 0) tab.classList.add('active');
    });

    if (!dictionaryTabs.hasAttribute('data-event')) this.addClickTabHandler();

    await this.getUserWordIdArr(AppStore.dictionaryTab)
      .then(() => {
        const userWordCount = document.getElementById('userWordCount');
        const allWordsString = (this.userWordsArr.length === 1) ? `${this.userWordsArr.length} word` : `${this.userWordsArr.length} words`;

        userWordCount.innerHTML = allWordsString;
        this.renderWordlist(AppStore.dictionaryTab);
      });
  }

  addClickTabHandler() {
    const dictionaryTabs = document.getElementById('dictionaryTabs');
    dictionaryTabs.setAttribute('data-event', '');

    dictionaryTabs.addEventListener('click', (event) => {
      const containerElement = document.querySelector('.wordlist');
      const tabName = event.target.dataset.tab;

      AppStore.dictionaryTab = tabName;
      containerElement.innerHTML = '';

      document.querySelectorAll('.dictionary-header__tab-item').forEach((tab) => {
        tab.classList.remove('active');
      });
      event.target.classList.add('active');

      this.getUserWordIdArr(AppStore.dictionaryTab)
        .then(() => {
          this.renderWordlist(AppStore.dictionaryTab);
        });
    });
  }

  createWordlist(element) {
    addLoader(element);
    this.userWordsArr.forEach((word) => {
      getWordInfo(word.wordId)
        .then((res) => {
          res.image = `data:image/jpg;base64,${res.image}`;
          res.audio = `data:audio/mpeg;base64,${res.audio}`;
          const wordItem = new DictionaryItem(res, AppStore, word.optional).generateItem();

          const tempArr = [];
          tempArr.push(wordItem);
          tempArr.forEach((item) => element.append(item));
          // element.append(wordItem);
        });
    });
    setTimeout(removeLoader, 800, element);
  }

  createFilteredWordlist(element) {
    addLoader(element);
    this.userWordsArr.forEach((word) => {
      const wordInfo = word;
      const wordStat = word.userWord.optional;

      wordInfo.image = `https://raw.githubusercontent.com/lenazamnius/rslang-data/master/${wordInfo.image}`;
      wordInfo.audio = `https://raw.githubusercontent.com/lenazamnius/rslang-data/master/${wordInfo.audio}`;
      // eslint-disable-next-line no-underscore-dangle
      wordInfo.id = word._id;

      const wordItem = new DictionaryItem(wordInfo, AppStore, wordStat).generateItem();

      element.append(wordItem);
    });
    setTimeout(removeLoader, 800, element);
  }

  renderWordlist(tabName) {
    const wordlistContainer = document.getElementById('wordlist');
    wordlistContainer.innerHTML = '';

    if (this.userWordsArr.length === 0) {
      const msgText = messages[tabName];
      const notification = renderEmptyTabNotification(msgText);

      wordlistContainer.appendChild(notification);
    } else {
      // todo: change createWordlist func with limited number of words in one time
      if (tabName === 'all') this.createWordlist(wordlistContainer);
      if (tabName === 'difficult' || tabName === 'deleted') this.createFilteredWordlist(wordlistContainer);
    }
  }

  async getUserWordIdArr(tabName) {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');
    const url = makeUrl(tabName, userId);

    try {
      const rawResponse = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      const content = await rawResponse.json();

      this.userWordsArr = [];

      if (content.error) AppStore.viewMessage('alert-danger', 'Words loading failed');
      if (tabName === 'all') {
        content.forEach((val) => this.userWordsArr.push(val));
      } else {
        const filteredResultsArr = content[0].paginatedResults;

        filteredResultsArr.forEach((val) => this.userWordsArr.push(val));
      }
    } catch (error) {
      AppStore.viewMessage('alert-danger', 'Words loading failed');
    }
  }
}

const dictionary = new Dictionary({
  selector: 'main',
  template: renderPageTemplate(),
});

export default dictionary;
