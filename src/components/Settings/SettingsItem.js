class SettingsItem {
  constructor(data, status) {
    const {
      type,
      name,
      text,
      value,
    } = data;
    this.type = type;
    this.name = name;
    this.text = text;
    this.value = value;
    this.statusItem = status[this.name];
  }

  generateItem() {
    const label = this.createInputLabel();

    label.innerHTML += this.createInput();
    return label;
  }

  createInputLabel() {
    const label = document.createElement('label');

    label.className = 'settings-item';
    label.innerHTML = `<span class="settings-item__title">${this.text}</span>`;
    return label;
  }

  createInput() {
    let template = '';

    template += `<input class="settings-item__input" type="${this.type}" name="${this.name}"`;

    if (this.type === 'radio') {
      const status = (this.statusItem === this.value) ? 'checked' : '';

      template += ` value="${this.value}" ${status}>`;
    } else if (this.type === 'checkbox') {
      const status = this.statusItem ? 'checked' : '';

      template += ` ${status}>`;
    } else if (this.type === 'number') {
      template += ` min="1" max="100" value="${this.value}">`;
    }

    return template;
  }
}

export default SettingsItem;
