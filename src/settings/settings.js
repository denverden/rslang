import settingsObj from './settingsObj';

import './settings.scss';

const settingsState = {
  cardAmount: '50',
  deleteWordBtn: false,
  indicateDifficultyBtn: false,
  moveDifficultBtn: false,
  newRepeatedWords: 'both',
  showAnswerBtn: false,
  showExample: false,
  showExampleTranslation: false,
  showImage: false,
  showMeaning: false,
  showTranscription: false,
  showTranslation: false,
};

function createMainWrapper() {
  const mainWrapper = document.createElement('main');
  mainWrapper.classList.add('main-wrapper');
  return mainWrapper;
}

function createSettingsContainer() {
  const container = document.createElement('div');
  container.classList.add('settings-container');
  return container;
}

function renderSettingsTemplate() {
  const { body } = document;
  const container = createSettingsContainer();
  const wrapper = createMainWrapper();

  wrapper.appendChild(container);
  body.appendChild(wrapper);
}

renderSettingsTemplate();
// const settingGroups = Object.keys(settingsObj);
// console.log(settingGroups);
