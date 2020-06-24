import './dictionary.scss';

import Component from '../Component';

class Dictionary extends Component {
  // beforeRender() {
  //   console.log('before render');
  // }

  // afterRender() {
  //   console.log('after render');
  //   document.querySelector('.js-click').addEventListener('click', (event) => {
  //     event.preventDefault();
  //     window.location.hash = '#';
  //   });
  // }
}

const dictionary = new Dictionary({
  selector: 'main',
  template: '<h1>dictionary</h1>',
});

export default dictionary;
