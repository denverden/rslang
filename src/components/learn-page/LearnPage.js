import Component from '../Component';
import AppStore from '../AppStore';

class LearnPage extends Component {
  beforeRender() {
    if (!AppStore.isLoggedIn) {
      window.location.hash = '#sign-in';
    }
  }
}

const learnPage = new LearnPage({
  selector: 'main',
  template: `Learn`,
});

export default learnPage;
