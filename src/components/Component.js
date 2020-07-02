class Component {
  constructor(data) {
    this.selector = data.selector;
    this.template = data.template;
  }

  render() {
    console.log('in render');
    const SELECTOR = document.querySelector(this.selector);
    if (typeof this.template === 'string') {
      SELECTOR.innerHTML = this.template;
    } else {
      SELECTOR.innerHTML = '';
      SELECTOR.appendChild(this.template);
    }
  }
}

export default Component;
