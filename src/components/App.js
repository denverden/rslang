import footer from './footer/Footer';
import renderComponent from './renderComponent';
import Routing from './routing/Routing';
import routes from './routing/routesData';
import Speakit from './SpeakIt/SpeakIt';
import Savanna from './Savanna/Savanna';

import './app.scss';

class App {
  constructor(data) {
    this.components = data.components;
    this.routes = data.routes;
  }

  start(game = '') {
    if (game === 'speakit') {
      const mySpeakIt = new Speakit();
      mySpeakIt.init('main');
    } else if (game === 'savanna') {
      const mySavana = new Savanna();
      mySavana.init('main');
    } else {
      this.initComponents();
      const routing = new Routing(this.routes);
      routing.initRoutes();
    }
  }

  initComponents() {
    this.components.forEach(renderComponent);
  }
}

const app = new App({
  components: [
    footer,
  ],
  routes,
});

export default app;
