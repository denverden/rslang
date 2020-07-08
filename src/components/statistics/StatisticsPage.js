import './statistics.scss';

import Component from '../Component';
import AppStore from '../AppStore';

class StatisticsPage extends Component {
  beforeRender() {
    if (!AppStore.isLoggedIn) {
      window.location.hash = '#sign-in';
    }
  }
}

const statisticsPage = new StatisticsPage({
  selector: 'main',
  template: '<div class="statistics-container"></div>',
});

export default statisticsPage;
