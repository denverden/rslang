import './dictionary.scss';

import Component from '../Component';
import { renderWordlist, renderPageTemplate } from './dictionaryPageTemplate';
import { messages, words, settingsState } from './data';

class Dictionary extends Component {
  beforeRender() {
    // console.log('before render');
  }

  afterRender() {
    document.getElementById('dictionaryTabs').addEventListener('click', (event) => {
      const containerElement = document.querySelector('.wordlist');
      const tabName = event.target.dataset.tab;
      const msgText = messages[tabName];

      containerElement.innerHTML = '';
      document.querySelectorAll('.dictionary-header__tab-item').forEach((tab) => {
        tab.classList.remove('active');
      });
      event.target.classList.add('active');
      renderWordlist(words, settingsState, msgText, containerElement);
    });
  }
}

const dictionary = new Dictionary({
  selector: 'main',
  template: renderPageTemplate(words, settingsState),
});

export default dictionary;
