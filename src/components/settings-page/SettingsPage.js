import './settings.scss';

import Component from '../Component';
import renderSettingsTemplate from './renderTemplate';

class SettingsPage extends Component {}

const settingsPage = new SettingsPage({
  selector: 'main',
  template: renderSettingsTemplate(),
});

export default settingsPage;
