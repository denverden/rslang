import './settings.scss';

import Component from '../Component';
import AppStore from '../AppStore';
import renderSettingsTemplate from './renderTemplate';

class SettingsPage extends Component {
  beforeRender() {
    if (!AppStore.isLoggedIn) {
      window.location.hash = '#sign-in';
    } else {
      this.template = renderSettingsTemplate();
    }
  }
}

const settingsPage = new SettingsPage({
  selector: 'main',
  template: '',
});

export default settingsPage;
