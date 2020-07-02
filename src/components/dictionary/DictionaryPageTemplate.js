import AppStore from '../AppStore';
import { messages } from './data';
import { createContainer, DictionaryItem } from './DictionaryItem';

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

function renderEmptyTabNotification(msgText) {
  const classes = ['notification-wrapper', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'text-center', 'mx-3'];
  const notificationWrapper = createContainer('div', ...classes);
  let template = '';

  template += `<h4 class="message mb-5 text-muted">${msgText}</h4>`;
  template += '<a href="#" class="btn btn-lg btn-info">Learn words</a>';
  notificationWrapper.innerHTML = template;

  return notificationWrapper;
}

async function getUserWordIdArr(arr) {
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

    content.forEach((val) => arr.push(val));
  } catch (error) {
    AppStore.viewMessage('alert-danger', 'Words loading failed');
  }
  console.log('in get word ids');
}

export async function renderWordlist(words, wordItemState, msgText, containerElement) {
  // TODO: implement algorithm of getting user words from server or app state
  const wordIdsArr = [];
  await getUserWordIdArr(wordIdsArr)
    .then(() => {
      console.log(wordIdsArr, 'in then of render wordlist');
      if (words.length === 0) {
        const notification = renderEmptyTabNotification(msgText);

        containerElement.appendChild(notification);
      } else {
        words.forEach((word) => {
          const wordItem = new DictionaryItem(word, wordItemState).generateItem();

          containerElement.appendChild(wordItem);
        });
      }
    });
  // if (words.length === 0) {
  //   const notification = renderEmptyTabNotification(msgText);

  //   containerElement.appendChild(notification);
  // } else {
  //   words.forEach((word) => {
  //     const wordItem = new DictionaryItem(word, wordItemState).generateItem();

  //     containerElement.appendChild(wordItem);
  //   });
  // }
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
  console.log('in renderPageTemplate');
  return template;
}
