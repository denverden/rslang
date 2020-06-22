import renderComponent from '../renderComponent';

class Routing {
  constructor(data) {
    this.routes = data;
  }

  initRoutes() {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
    this.renderRoute();
  }

  renderRoute() {
    let route = this.routes.find((el) => el.path === window.location.hash.slice(1));
    if (typeof route === 'undefined') {
      route = this.routes.find((el) => el.path === '***');
    }
    document.querySelector('main').innerHTML = `<${route.component.selector}></${route.component.selector}>`;
    renderComponent(route.component);
  }
}

export default Routing;
