import './savanna.scss';
import Game from './Game';
import templatesHTML from './templatesHTML';

class Speakit {
  constructor() {
    this.currentGameObject = '';
    this.container = '';
  }

  createNewGame(group) {
    this.currentGameObject = new Game(group);
    this.currentGameObject.init();
  }

  registerStartButtonEvent() {
    const startpage = document.querySelector('.startpage');
    startpage.classList.add('hidden');

    this.createNewGame(0);

    this.container.classList.remove('hidden');
  }

  init(elementId) {
    const el = document.getElementById(elementId);
    el.classList.add('mt-0');
    el.insertAdjacentHTML('beforeEnd', templatesHTML.getStartPageHTML());

    const startButton = document.querySelector('.startpage--intro-btn');
    startButton.addEventListener('click', this.registerStartButtonEvent.bind(this));

    document.querySelector('.resultpage__new-game').addEventListener('click', () => {
      document.location.reload(true);
    });

    this.container = document.querySelector('.savanna-container');
  }
}

export default Speakit;
