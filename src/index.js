// import app from './components/App';

import '../node_modules/bootstrap/dist/js/bootstrap';

import Speakit from './components/SpeakIt/SpeakIt';

// app.start();

function speakItInitialization() {
  const mySpeakIt = new Speakit();
  mySpeakIt.init('main');
}

speakItInitialization();
