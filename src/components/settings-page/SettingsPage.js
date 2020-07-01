import AppStore from '../AppStore';

import Component from '../Component';

class SettingsPage extends Component {
  beforeRender() {
    if (!AppStore.isLoggedIn) {
      window.location.hash = '#sign-in';
    }
  }
}

const settingsPage = new SettingsPage({
  selector: 'main',
  template: '',
});

export default settingsPage;
