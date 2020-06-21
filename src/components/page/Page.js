import Component from '../Component';

class Page extends Component {}

const page = new Page({
  selector: 'main',
  template: '<h1>Home Page</h1><div>This is first page!</div>',
});

export default page;
