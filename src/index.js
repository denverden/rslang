import app from './components/App';
import '../node_modules/bootstrap/dist/js/bootstrap';
import AppStore from './components/AppStore';

const hash = window.location.hash.slice(1);

if (hash === 'speakit') {
  app.start('speakit');
} else if (hash === 'savanna') {
  app.start('savanna');  
} else {
  AppStore.loadSettings().then(() => app.start());
}
