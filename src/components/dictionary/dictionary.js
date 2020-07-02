import './dictionary.scss';

import Component from '../Component';
import AppStore from '../AppStore';
import { words, messages } from './data';
import DictionaryItem from './DictionaryItem';
import { renderEmptyTabNotification, renderPageTemplate } from './dictionaryPageTemplate';

class Dictionary extends Component {
  constructor(selector, template) {
    super(selector, template);
    this.userWordsArr = [];
  }

  beforeRender() {
    console.log('in before');

    if (!AppStore.isLoggedIn) window.location.hash = '#sign-in';
    this.userWordsArr = [];
  }

  afterRender() {
    this.addClickTabHandler();
    this.getUserWordIdArr()
      .then(() => {
        const userWordCount = document.getElementById('userWordCount');
        const allWordsString = (this.userWordsArr.length === 1) ? `${this.userWordsArr.length} word` : `${this.userWordsArr.length} words`;

        userWordCount.innerHTML = allWordsString;
        console.log('in get word ids', this.userWordsArr);
        this.renderWordlist(AppStore.dictionaryTab);

        console.log('in after');
      });
  }

  renderWordlist(tabName) {
    const wordlistContainer = document.getElementById('wordlist');

    wordlistContainer.innerHTML = '';

    if (this.userWordsArr.length === 0) {
      const msgText = messages[tabName];
      const notification = renderEmptyTabNotification(msgText);

      wordlistContainer.appendChild(notification);
    } else {
      this.userWordsArr.forEach((word) => {
        this.getWordInfo(word.wordId)
          .then((res) => {
            const data = {};
            data.id = res.id;
            data.word = res.word;
            data.wordTranslate = res.wordTranslate;
            data.transcription = res.transcription;
            data.textMeaning = res.textMeaning;
            data.textExample = res.textExample;
            //   res.audio,
            //   image
            const wordItem = new DictionaryItem(data, AppStore).generateItem();
            wordlistContainer.append(wordItem);
          });
      });
      // if (AppStore.dictionaryTab === 'difficult') {
      //   wordlistContainer.innerText = 'Here will be your difficult words';
      // } else if (AppStore.dictionaryTab === 'deleted') {
      //   wordlistContainer.innerText = 'Here will be your deleted words';
      // } else {
      //   wordlistContainer.innerText = 'Here will be your words';
      // }
    }
  }

  addClickTabHandler() {
    document.getElementById('dictionaryTabs').addEventListener('click', (event) => {
      const containerElement = document.querySelector('.wordlist');
      const tabName = event.target.dataset.tab;

      containerElement.innerHTML = '';
      document.querySelectorAll('.dictionary-header__tab-item').forEach((tab) => {
        tab.classList.remove('active');
      });
      event.target.classList.add('active');
      AppStore.dictionaryTab = tabName;
      this.renderWordlist(AppStore.dictionaryTab);
    });
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
}

const dictionary = new Dictionary({
  selector: 'main',
  template: renderPageTemplate(),
});

export default dictionary;
