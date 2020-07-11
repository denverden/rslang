import Component from '../Component';
import './footer.scss';

class Footer extends Component { }

const footer = new Footer({
  selector: 'footer',
  template: `
            <div class="container footer__main">
             Copyright 2020&copy; Training project.
            </div>
          `,
});

export default footer;
