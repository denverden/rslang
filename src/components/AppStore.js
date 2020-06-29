import { extendObservable } from 'mobx';

class AppStore {
  constructor() {
    extendObservable(this, {
      isLoggedIn: false,
      userId: '',
      userToken: '',
      dictionaryTab: 'all',
      settings: {
        sound: true,
        cardAmount: '50',
        deleteWordBtn: false,
        indicateDifficultyBtn: false,
        moveDifficultBtn: false,
        newOrRepetitionWords: 'newOnly',
        showAnswerBtn: false,
        showExample: true,
        showExampleTranslation: false,
        showImage: true,
        showMeaning: true,
        showTranscription: true,
        showTranslation: true,
        statAll: 0,
        statLast: 0,
        statAgain: 1,
      },
    });
  }

  viewMessage(type = '', text = '') {
    if (type !== '' && text !== '') {
      const msgHtml = `<div class="alert ${type} alert-dismissible fade show" role="alert">
                  <span class="message__text"></span>
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>`;
      document.querySelector('.message .container').innerHTML = msgHtml;
      document.querySelector('.message').classList.remove('d-none');
      document.querySelector('.message__text').innerHTML = text;
    }
  }
}

export default new AppStore();
