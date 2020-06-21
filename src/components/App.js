import page from './page/Page';

class App {
  constructor(data) {
    this.components = data.components;
  }

  start() {
    this.initComponents();
  }

  initComponents() {
    this.components.forEach((component) => component.render());
  }
}

const app = new App({
  components: [
    page,
  ],
});

export default app;
