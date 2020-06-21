import homePage from './home-page/HomePage';

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
    homePage,
  ],
});

export default app;
