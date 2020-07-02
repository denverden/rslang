import message from './message/Message';
import footer from './footer/Footer';
import renderComponent from './renderComponent';
import Routing from './routing/Routing';
import routes from './routing/routesData';

import './app.scss';

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
    this.components.forEach(renderComponent);
  }
}

const app = new App({
  components: [
    message,
    footer,
  ],
  routes,
});

export default app;
