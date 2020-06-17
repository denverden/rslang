import settingsObj from './settingsData';
import SettingsForm from './SettingsForm';

import './settings.scss';

const settingsState = {
  cardAmount: '50',
  deleteWordBtn: false,
  indicateDifficultyBtn: false,
  moveDifficultBtn: false,
  newOrRepetitionWords: 'newOnly',
  showAnswerBtn: false,
  showExample: false,
  showExampleTranslation: false,
  showImage: false,
  showMeaning: false,
  showTranscription: false,
  showTranslation: true,
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

function createSettingsTitle() {
  const title = document.createElement('div');

  title.className = 'settings-container__title';
  title.innerHTML = '<h1>Settings</h1>';
  return title;
}

function renderSettingsTemplate() {
  const { body } = document;
  const sectionWrapper = createMainWrapper();
  const container = createSettingsContainer();
  const formElement = new SettingsForm(settingsObj, settingsState).generateForm();
  const title = createSettingsTitle();

  container.appendChild(title);
  container.appendChild(formElement);
  sectionWrapper.appendChild(container);
  body.appendChild(sectionWrapper);
}

renderSettingsTemplate();
