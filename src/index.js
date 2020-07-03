import app from './components/App';

import '../node_modules/bootstrap/dist/js/bootstrap';
import AppStore from './components/AppStore';

AppStore.loadSettings().then(() => app.start());
