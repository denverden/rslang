import { settingsObj, settingsState } from './settingsData';
import SettingsForm from './SettingsForm';

import './settings.scss';

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
  const title = createSettingsTitle();
  const formElement = new SettingsForm(settingsObj, settingsState).generateForm();

  container.appendChild(title);
  container.appendChild(formElement);
  sectionWrapper.appendChild(container);
  body.appendChild(sectionWrapper);
}

function pageInitialization() {
  renderSettingsTemplate();
}

pageInitialization();
