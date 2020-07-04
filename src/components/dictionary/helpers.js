export const messages = {
  all: 'You have not learned a single word. Let\'s get started.',
  difficult: 'You have not marked any word as difficult yet.',
  deleted: 'You have not deleted any word yet.',
};

export function addLoader(element) {
  const dictionaryContainer = document.querySelector('.dictionary-container');
  const loader = document.createElement('div');

  element.classList.add('hidden');
  element.classList.remove('d-flex');
  loader.classList.add('loader', 'd-flex', 'justify-content-center', 'mt-5');
  loader.innerHTML = '<div class="spinner-border text-secondary" role="status"><span class="sr-only">Loading...</span></div>';
  dictionaryContainer.appendChild(loader);
}

export function removeLoader(element) {
  const dictionaryContainer = document.querySelector('.dictionary-container');
  const loader = document.querySelector('.loader');

  dictionaryContainer.removeChild(loader);
  element.classList.remove('hidden');
  element.classList.add('d-flex');
}

export function createContainer(element, ...classes) {
  const container = document.createElement(element);

  container.classList.add(...classes);

  return container;
}

export function makeUrl(tabName, userId) {
  const urlAllWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`;
  const urlDeletedWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=20&filter=%7B%22userWord.optional.deleted%22%3Atrue%7D`;
  const urlDifficultWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=20&filter=%7B%22userWord.difficulty%22%3A%22hard%22%7D`;
  let url = '';

  switch (tabName) {
    case 'deleted':
      url = urlDeletedWords;
      break;
    case 'difficult':
      url = urlDifficultWords;
      break;
    default:
      url = urlAllWords;
  }

  return url;
}
