// import app from './components/App';

import '../node_modules/bootstrap/dist/js/bootstrap';

import Savanna from './components/Savanna/Savanna';

// app.start();

function speakItInitialization() {
  console.log('run savanna');
  const mySavanna = new Savanna();
  mySavanna.init('main');
}

speakItInitialization();
