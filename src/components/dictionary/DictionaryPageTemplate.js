import { createContainer } from './helpers';

export function renderEmptyTabNotification(msgText) {
  const classes = ['notification-wrapper', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'text-center', 'mx-3'];
  const notificationWrapper = createContainer('div', ...classes);
  let template = '';

  template += `<h4 class="message mb-5 text-muted">${msgText}</h4>`;
  template += '<a href="#learn" class="btn btn-lg btn-primary">Learn words</a>';
  notificationWrapper.innerHTML = template;

  return notificationWrapper;
}

function createTabs(parentElement) {
  const tabNames = ['All', 'Difficult', 'Deleted'];

  tabNames.forEach((name, idx) => {
    const classes = (idx === 0) ? ['dictionary-header__tab-item', 'active'] : ['dictionary-header__tab-item'];
    const tab = createContainer('div', ...classes);

    tab.setAttribute('data-tab', name.toLocaleLowerCase());
    tab.innerText = name;
    parentElement.appendChild(tab);
  });
}

export function renderPageTemplate() {
  const template = createContainer('div', 'dictionary-container');
  const header = createContainer('div', 'dictionary-header', 'd-flex', 'flex-column', 'flex-md-row');
  const headerTitle = createContainer('div', 'dictionary-header__title');
  const wordlist = createContainer('div', 'wordlist', 'd-flex', 'flex-column', 'animate-bottom');
  const tabsContainer = createContainer('div', 'dictionary-header__tabs-container', 'd-flex', 'align-items-center');

  createTabs(tabsContainer);
  headerTitle.innerHTML = 'My Dictionary ( <span class="dictionary-header__wordCount" id="userWordCount">0</span> )';
  tabsContainer.setAttribute('id', 'dictionaryTabs');
  wordlist.setAttribute('id', 'wordlist');
  header.appendChild(headerTitle);
  header.appendChild(tabsContainer);
  template.appendChild(header);
  template.appendChild(wordlist);

  return template;
}
