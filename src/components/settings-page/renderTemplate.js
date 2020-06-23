import { settingsObj, settingsState } from './settingsData';
import SettingsForm from './SettingsForm';

function createContainer(element, ...classes) {
  const container = document.createElement(element);

  container.classList.add(...classes);
  return container;
}

function renderSettingsTemplate() {
  const template = createContainer('div', 'settings-container', 'd-flex', 'flex-column', 'align-items-center');
  const title = createContainer('div', 'settings-container__title');
  const formElement = new SettingsForm(settingsObj, settingsState).generateForm();

  title.innerHTML = '<h1>Settings</h1>';
  template.appendChild(title);
  template.appendChild(formElement);

  return template;
}

export default renderSettingsTemplate;
