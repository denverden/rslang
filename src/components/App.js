import homePage from './home-page/HomePage';
import Routing from './routing/Routing';
import routes from './routing/routesData';

class App {
  constructor(data) {
    this.components = data.components;
    this.routes = data.routes;
  }

  start() {
    this.initComponents();
    const routing = new Routing(this.routes);
    routing.initRoutes();
  }

  initComponents() {
    this.components.forEach((component) => component.render());
  }
}

const app = new App({
  components: [
    homePage,
  ],
  routes,
});

export default app;
