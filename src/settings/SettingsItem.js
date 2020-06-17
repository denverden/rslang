class SettingsItem {
  // eslint-disable-next-line object-curly-newline
  constructor({ type, name, text, value }, status) {
    this.type = type;
    this.name = name;
    this.text = text;
    this.value = value;
    this.statusItem = status[this.name];
  }

  generateItem() {
    let template = '';
    const label = document.createElement('label');

    label.className = 'settings-item';
    template += `<span class="settings-item__title">${this.text}</span>`;
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

    label.innerHTML = template;

    return label;
  }
}

export default SettingsItem;
