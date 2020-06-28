import { createContainer, DictionaryItem } from './DictionaryItem';
import { messages } from './data';

function createTabs(parentElement) {
  const tabName = ['All', 'Difficult', 'Deleted'];

  tabName.forEach((name, idx) => {
    const classes = (idx === 0) ? ['dictionary-header__tab-item', 'active'] : ['dictionary-header__tab-item'];
    const tab = createContainer('div', ...classes);

    tab.setAttribute('data-tab', tabName[idx].toLocaleLowerCase());
    tab.innerText = tabName[idx];
    parentElement.appendChild(tab);
  });
}

function renderEmptyTabNotification(msgText) {
  const classes = ['notification-wrapper', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'text-center', 'mx-3'];
  const notificationWrapper = createContainer('div', ...classes);
  let template = '';

  template += `<h4 class="message mb-5 text-muted">${msgText}</h4>`;
  template += '<a href="#" class="btn btn-lg btn-info">Learn words</a>';
  notificationWrapper.innerHTML = template;

  return notificationWrapper;
}

export function renderWordlist(words, wordItemState, msgText, containerElement) {
  // TODO: implement algorithm of getting user words from server or app state
  if (words.length === 0) {
    const notification = renderEmptyTabNotification(msgText);

    containerElement.appendChild(notification);
  } else {
    words.forEach((word) => {
      const wordItem = new DictionaryItem(word, wordItemState).generateItem();

      containerElement.appendChild(wordItem);
    });
  }
}

export function renderPageTemplate(words, state) {
  const template = createContainer('div', 'dictionary-container');
  const header = createContainer('div', 'dictionary-header', 'd-flex', 'flex-column', 'flex-md-row');
  const headerTitle = createContainer('div', 'dictionary-header__title');
  const wordlist = createContainer('div', 'wordlist', 'd-flex', 'flex-column');
  const tabsContainer = createContainer('div', 'dictionary-header__tabs-container', 'd-flex', 'align-items-center');
  const allWordsString = (words.length === 1) ? `${words.length} word` : `${words.length} words`;
  const msgText = messages.all;

  createTabs(tabsContainer);
  headerTitle.innerHtml = `My Dictionary ( ${allWordsString} )`;
  tabsContainer.setAttribute('id', 'dictionaryTabs');
  header.appendChild(headerTitle);
  header.appendChild(tabsContainer);
  template.appendChild(header);
  renderWordlist(words, state, msgText, wordlist);
  template.appendChild(wordlist);

  return template;
}
