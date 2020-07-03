import './dictionary.scss';

import Component from '../Component';
import AppStore from '../AppStore';
import { messages } from './data';
import { DictionaryItem } from './DictionaryItem';
import { renderEmptyTabNotification, renderPageTemplate } from './dictionaryPageTemplate';

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

    await this.getUserWordIdArr()
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

      this.renderWordlist(AppStore.dictionaryTab);
    });
  }

  addLoader(element) {
    const dictionaryContainer = document.querySelector('.dictionary-container');
    const loader = document.createElement('div');

    element.classList.add('hidden');
    element.classList.remove('d-flex');
    loader.classList.add('loader', 'd-flex', 'justify-content-center', 'mt-5');
    loader.innerHTML = '<div class="spinner-border text-secondary" role="status"><span class="sr-only">Loading...</span></div>';
    dictionaryContainer.appendChild(loader);
  }

  removeLoader(element) {
    const dictionaryContainer = document.querySelector('.dictionary-container');
    const loader = document.querySelector('.loader');

    dictionaryContainer.removeChild(loader);
    element.classList.remove('hidden');
    element.classList.add('d-flex');
  }

  createWordlist(element) {
    this.addLoader(element);
    this.userWordsArr.forEach((word) => {
      this.getWordInfo(word.wordId)
        .then((res) => {
          res.image = `data:image/jpg;base64,${res.image}`;
          res.audio = `data:audio/mpeg;base64,${res.audio}`;

          const wordItem = new DictionaryItem(res, AppStore).generateItem();

          element.append(wordItem);
        });
    });
    setTimeout(this.removeLoader, 800, element);
  }

  renderWordlist(tabName) {
    const wordlistContainer = document.getElementById('wordlist');
    wordlistContainer.innerHTML = '';

    if (this.userWordsArr.length === 0) {
      const msgText = messages[tabName];
      const notification = renderEmptyTabNotification(msgText);

      wordlistContainer.appendChild(notification);
    } else {
      this.createWordlist(wordlistContainer);
    }
  }

  async getWordInfo(wordId) {
    let wordInfoObj;

    try {
      const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/${wordId}`, {
        method: 'GET',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
        },
      });

      wordInfoObj = await rawResponse.json();
    } catch (error) {
      AppStore.viewMessage('alert-danger', 'Word loading failed');
    }

    return wordInfoObj;
  }

  async getUserWordIdArr() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');

    try {
      const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`, {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const content = await rawResponse.json();

      content.forEach((val) => this.userWordsArr.push(val));
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
