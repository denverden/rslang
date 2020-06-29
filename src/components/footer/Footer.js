import Component from '../Component';

class Footer extends Component { }

const footer = new Footer({
  selector: 'footer',
  template: `
            <div class="container-fluid px-5 py-4">
             Copyright 2020&copy;
            </div>
          `,
});

export default footer;
