import Component from '../Component';

class Footer extends Component { }

const footer = new Footer({
  selector: 'footer',
  template: `
            <div class="container">
             Copyright 2020&copy;
            </div>
  `,
});

export default footer;
