import SettingsItem from './SettingsItem';

function createFieldsetElement(section) {
  const fieldsetElement = document.createElement('fieldset');

  fieldsetElement.className = 'settings-group d-flex flex-column';
  fieldsetElement.innerHTML = `<legend class="settings-group__title">${section}</legend>`;
  return fieldsetElement;
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
    buttonContainer.innerHTML = '<button id="saveBtn" class="btn btn--save">Save</button>';
    this.generateAddFieldsets(formElement);
    formElement.appendChild(buttonContainer);
    this.addSaveBtnClickHandler(formElement);

    return formElement;
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

  addSaveBtnClickHandler(element) {
    element.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const stateKeys = Object.keys(this.stateObj);

      stateKeys.forEach((value) => {
        if (value === 'cardAmount' || value === 'newOrRepetitionWords') {
          this.stateObj[value] = formData.get(value);
        } else {
          this.stateObj[value] = !!formData.get(value);
        }
      });
      // console.log(this.stateObj);
    });
  }
}

export default SettingsForm;
