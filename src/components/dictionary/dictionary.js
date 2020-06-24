import './dictionary.scss';

import Component from '../Component';
import renderPageTemplate from './DictionaryPageTemplate';

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
  template: renderPageTemplate(),
});

export default dictionary;
