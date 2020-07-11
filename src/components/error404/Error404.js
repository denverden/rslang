import Component from '../Component';

import './error404.scss';
import img404 from './404_bg.png';

class Error404 extends Component {}

const error404 = new Error404({
  selector: 'main',
  template: `
  <div class="wrap">
    <h1 class="error-page text-center">Oops, something went wrong.</h1>
    <h6 class="text-center">Here you won’t learn new words.</h6>
    <h6 class="text-center">Better return to the main page and you will continue to study English with RsLang.</h6>
    <img class="img-fluid" src="${img404}" alt="error404">
    <a class="error-page-btn btn btn-primary" href="#learn">TO LEARN</a>
  </div>`,
});

export default error404;
