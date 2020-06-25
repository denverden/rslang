import { createContainer, DictionaryItem } from './DictionaryItem';

const tabName = ['All', 'Difficult', 'Deleted'];



function renderPageTemplate(words, state) {
  const template = createContainer('div', 'dictionary-container');
  const header = createContainer('div', 'dictionary-header', 'd-flex', 'flex-column', 'flex-md-row');
  const headerTitle = createContainer('div', 'dictionary-header__title');
  const wordlist = createContainer('div', 'wordlist', 'd-flex', 'flex-column');
  const tabsContainer = createContainer('div', 'dictionary-header__tabs-container', 'd-flex', 'align-items-center');

  tabName.forEach((name, idx) => {
    const classes = (idx === 0) ? ['dictionary-header__tab-item', 'active'] : ['dictionary-header__tab-item'];
    const tab = createContainer('div', ...classes);

    tab.innerText = tabName[idx];
    tabsContainer.appendChild(tab);
  });

  // TODO: implement algorithm of getting user words from server or app state
  words.forEach((word) => {
    const wordItem = new DictionaryItem(word, state).generateItem();

    wordlist.appendChild(wordItem);
  });

  header.appendChild(headerTitle);
  header.appendChild(tabsContainer);
  template.appendChild(header);
  template.appendChild(wordlist);

  return template;
}

export default renderPageTemplate;
