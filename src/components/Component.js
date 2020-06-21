class Component {
  constructor(data) {
    this.selector = data.selector;
    this.template = data.template;
  }

  render() {
    document.querySelector(this.selector).innerHTML = this.template;
  }
}

export default Component;
