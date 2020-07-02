import Component from '../Component';

class Error404 extends Component {}

const error404 = new Error404({
  selector: 'main',
  template: '<h1>404 Page</h1><a class="btn btn-primary" href="#">На главную</a>',
});

export default error404;
