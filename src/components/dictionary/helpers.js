import AppStore from '../AppStore';

export const messages = {
  all: 'You have not learned a single word. Let\'s get started.',
  timeDifficult: 'You have not marked any word as timeDifficult yet.',
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
  const urlAllWords = `${AppStore.apiUrl}/users/${userId}/words`;
  const urlDeletedWords = `${AppStore.apiUrl}/users/${userId}/aggregatedWords?wordsPerPage=100&filter=%7B%22userWord.optional.deleted%22%3Atrue%7D`;
  const urlDifficultWords = `${AppStore.apiUrl}/users/${userId}/aggregatedWords?wordsPerPage=100&filter=%7B%22userWord.difficulty%22%3A%22hard%22%7D`;
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

export function getTimeWordLastLearned(date) {
  const timeDiff = Math.abs(new Date() - new Date(date));
  const millisecondsIn = {
    minute: (1000 * 60),
    hour: (1000 * 60 * 60),
    day: (1000 * 60 * 60 * 24),
    month: (1000 * 60 * 60 * 24 * 30),
    year: (1000 * 60 * 60 * 24 * 30 * 12),
  };
  let timePeriod;
  let temp;

  if (timeDiff > millisecondsIn.year) {
    temp = Math.floor(timeDiff / millisecondsIn.year);
    timePeriod = (temp === 1) ? `${temp} yr` : `${temp} yrs`;
  } else if (timeDiff > millisecondsIn.month) {
    temp = Math.floor(timeDiff / millisecondsIn.month);
    timePeriod = (temp === 1) ? `${temp} mo` : `${temp} mos`;
  } else if (timeDiff > millisecondsIn.day) {
    temp = Math.floor(timeDiff / millisecondsIn.day);
    timePeriod = (temp === 1) ? `${temp} d` : `${temp} ds`;
  } else if (timeDiff > millisecondsIn.hour) {
    temp = Math.floor(timeDiff / millisecondsIn.hour);
    timePeriod = (temp === 1) ? `${temp} hr` : `${temp} hrs`;
  } else {
    temp = Math.floor(timeDiff / millisecondsIn.minute);
    timePeriod = (temp <= 1) ? '1 min' : `${temp} mins`;
  }

  return timePeriod;
}

export function timeRepeatWordAgain(wordRatio) {
  let timePeriod;

  if (wordRatio < -2) timePeriod = '10 min';
  if (wordRatio >= -2 && wordRatio < 0) timePeriod = '1 hr';
  if (wordRatio >= 0 && wordRatio <= 2) timePeriod = '1 day';
  if (wordRatio > 2) timePeriod = '1 week';

  return timePeriod;
}
