import Component from '../Component';

import './message.scss';

class Message extends Component {}

const message = new Message({
  selector: '.message',
  template: '<div class="container"></div>',
});

export default message;
