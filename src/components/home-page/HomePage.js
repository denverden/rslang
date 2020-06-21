import Component from '../Component';

class HomePage extends Component {}

const homePage = new HomePage({
  selector: 'main',
  template: '<h1>Home Page</h1><div>This is first page!</div>',
});

export default homePage;
