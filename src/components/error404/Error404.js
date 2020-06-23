import Component from '../Component';

class Error404 extends Component {
  // eslint-disable-next-line class-methods-use-this
  beforeRender() {
    // тут можно делать что-то до отрисовки компонента
    console.log('before render');
  }

  // eslint-disable-next-line class-methods-use-this
  afterRender() {
    // тут можно делать что-то после отрисовки компонента
    console.log('after render');
    document.querySelector('.js-click').addEventListener('click', (event) => {
      event.preventDefault();
      window.location.hash = '#';
    });
  }
}

const error404 = new Error404({
  selector: 'main',
  template: '<h1>404 Page</h1><a class="btn btn-primary js-click">На главную</a>',
});

export default error404;
