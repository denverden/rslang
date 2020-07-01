import SettingsItem from './SettingsItem';
import AppStore from '../AppStore';

function createFieldsetElement(section) {
  const fieldsetElement = document.createElement('fieldset');

  fieldsetElement.className = 'settings-group d-flex flex-column';
  fieldsetElement.innerHTML = `<legend class="settings-group__title text-primary">${section}</legend>`;
  return fieldsetElement;
}

async function putSettings(settingsObj) {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('userToken');

  try {
    const res = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settingsObj),
    });

    const result = await res.json();

    if (!result.error) {
      AppStore.viewMessage('alert-info', 'Your settings successfully updated');
    } else {
      AppStore.viewMessage('alert-danger', 'Settings update failed');
    }
  } catch (err) {
    AppStore.viewMessage('alert-danger', 'Settings update failed');
  }
}

class SettingsForm {
  constructor(dataObj, stateObj) {
    this.dataObj = dataObj;
    this.stateObj = stateObj;
  }

  generateForm() {
    const formElement = document.createElement('form');
    const buttonContainer = document.createElement('div');

    formElement.className = 'settings-container__form';
    formElement.setAttribute('id', 'settingsForm');
    buttonContainer.className = 'button-container';
    buttonContainer.innerHTML = '<button id="saveBtn" class="btn btn-primary btn--save">Save</button>';
    this.generateAddFieldsets(formElement);
    formElement.appendChild(buttonContainer);
    this.addSaveBtnClickHandler(formElement);

    return formElement;
  }

  addSaveBtnClickHandler(element) {
    element.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const stateKeys = Object.keys(this.stateObj);

      this.updateState(formData, stateKeys);
      this.saveSettingsUpdate();
    });
  }

  generateAddFieldsets(formElement) {
    const sections = Object.keys(this.dataObj);

    sections.forEach((section) => {
      const fieldsetElement = createFieldsetElement(section);

      this.fillFieldsetWithInputs(section, fieldsetElement);
      formElement.appendChild(fieldsetElement);
    });
  }

  fillFieldsetWithInputs(section, fieldsetElement) {
    this.dataObj[section].forEach((inputObj) => {
      const inputElement = new SettingsItem(inputObj, this.stateObj).generateItem();

      fieldsetElement.appendChild(inputElement);
    });
  }

  updateState(formData, stateKeys) {
    stateKeys.forEach((value) => {
      if (value === 'wordsPerDay' || value === 'newOrRepetitionWords' || value === 'newWordsPerDay') {
        this.stateObj[value] = formData.get(value);
      } else {
        this.stateObj[value] = !!formData.get(value);
      }
    });
  }

  saveSettingsUpdate() {
    const optionsToCheck = [this.stateObj.showExample,
      this.stateObj.showMeaning,
      this.stateObj.showWordTranslation];
    const check = (val) => val === true;

    if (optionsToCheck.some(check)) {
      AppStore.settings.optional = this.stateObj;
      delete AppStore.settings.id;
      putSettings(AppStore.settings);
    } else {
      AppStore.viewMessage('alert-warning', 'Be sure to choose one of the options:</br>show word translation, show word meaning, show word usage example');
    }
  }
}

export default SettingsForm;
