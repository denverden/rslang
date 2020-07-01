import AppStore from '../AppStore';
import SettingsForm from './SettingsForm';
import { settingsData } from './settingsData';

function createContainer(element, ...classes) {
  const container = document.createElement(element);

  container.classList.add(...classes);
  return container;
}

function renderSettingsTemplate() {
  const settings = AppStore.settings.optional;
  const formElement = new SettingsForm(settingsData, settings).generateForm();
  const template = createContainer('div', 'settings-container', 'd-flex', 'flex-column', 'align-items-center');
  const title = createContainer('div', 'settings-container__title', 'text-dark');

  title.innerHTML = '<h1>Settings</h1>';
  template.appendChild(title);
  template.appendChild(formElement);

  return template;
}

export default renderSettingsTemplate;
