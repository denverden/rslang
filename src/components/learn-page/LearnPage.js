import Component from '../Component';
import AppStore from '../AppStore';
import './learn-page.scss';

class LearnPage extends Component {
  async isWordUser(wordId) {
    if (AppStore.userWords.length <= 0) {
      try {
        const res = await fetch(`${AppStore.apiUrl}/users/${AppStore.userId}/words`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${AppStore.userToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        const result = await res.json();

        if (!result.error) {
          AppStore.userWords = result;
        }
      } catch (err) {
        AppStore.viewMessage('alert-danger', 'Error read word API');
      }
    }

    let status = false;
    AppStore.userWords.forEach((element) => {
      if (element.wordId === wordId) {
        status = true;
      }
    });
    return status;
  }

  async getWord() {
    const res = await fetch(`${AppStore.apiUrl}/words/${AppStore.learnWords[AppStore.positionWord].wordId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${AppStore.userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();
    AppStore.learnWords[AppStore.positionWord].desc = result;
  }

  async createWord(position) {
    this.isWordUser(AppStore.learnWords[position].wordId).then((isStatus) => {
      let method = 'POST';
      if (isStatus) method = 'PUT';
      const obj = JSON.parse(JSON.stringify(AppStore.learnWords[position]));
      delete obj.desc;
      AppStore.userWords.push(obj);
      delete obj.wordId;
      delete obj.id;
      fetch(`${AppStore.apiUrl}/users/${AppStore.userId}/words/${AppStore.learnWords[position].wordId}`, {
        method,
        headers: {
          Authorization: `Bearer ${AppStore.userToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
    });
  }

  async readWords(group, page, realWord) {
    const res = await fetch(`${AppStore.apiUrl}/words?group=${group}&page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${AppStore.userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();

    result.forEach((element) => {
      const word = {};
      word.wordId = element.id;
      word.difficulty = 'string';
      word.optional = {};
      word.optional.deleted = false;
      word.optional.time = new Date();
      word.optional.ratio = 0;
      word.optional.success = 0;
      word.optional.error = 0;
      word.desc = element;
      this.isWordUser(word.wordId).then((isStatus) => {
        if (AppStore.learnWords.length <= realWord - 1) {
          if (!isStatus) AppStore.learnWords.push(word);
        }
      });
    });
  }

  async readUserWords(count) {
    const res = await fetch(`${AppStore.apiUrl}/users/${AppStore.userId}/words`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${AppStore.userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();

    result.sort((a, b) => (new Date(a.optional.time) - new Date(b.optional.time)));

    result.forEach((element) => {
      if (!element.optional.deleted) AppStore.learnWords.push(element);
    });
    if (count < AppStore.learnWords.length) {
      AppStore.learnWords = AppStore.learnWords.splice(0, count);
    }
  }

  async creatLearnWords() {
    if (AppStore.learnWords.length <= 0 && AppStore.settings.optional.newOrRepetitionWords === 'both') {
      const c = AppStore.settings.optional.wordsPerDay - AppStore.settings.optional.newWordsPerDay;
      await this.readUserWords(c);
      const realWord = +AppStore.learnWords.length + +AppStore.settings.optional.newWordsPerDay;
      let group = 0;
      let page = 0;
      while (AppStore.learnWords.length < realWord || group > 5) {
        // eslint-disable-next-line no-await-in-loop
        await this.readWords(group, page, realWord);
        page += 1;
        if (page > 29) {
          page = 0;
          group += 1;
        }
      }
    }

    if (AppStore.learnWords.length <= 0 && AppStore.settings.optional.newOrRepetitionWords === 'repeatedOnly') {
      const c = AppStore.settings.optional.wordsPerDay - AppStore.settings.optional.newWordsPerDay;
      await this.readUserWords(c);
    }

    if (AppStore.learnWords.length <= 0 && AppStore.settings.optional.newOrRepetitionWords === 'newOnly') {
      const realWord = +AppStore.learnWords.length + +AppStore.settings.optional.newWordsPerDay;
      let group = 0;
      let page = 0;
      while (AppStore.learnWords.length < realWord || group > 5) {
        // eslint-disable-next-line no-await-in-loop
        await this.readWords(group, page, realWord);
        page += 1;
        if (page > 29) {
          page = 0;
          group += 1;
        }
      }
    }
  }

  renderCard() {
    const WORD_INPUT = document.querySelector('.learn-page__input');
    document.querySelector('.card-footer').classList.add('hidden');
    document.querySelector('.learn-page__transcription').classList.add('hidden');
    document.querySelector('.learn-page__meaning-ru').classList.add('hidden');
    document.querySelector('.learn-page__meaning').classList.add('hidden');
    document.querySelector('.learn-page__example-ru').classList.add('hidden');
    document.querySelector('.learn-page__example').classList.add('hidden');
    document.querySelector('.learn-page__view').classList.add('hidden');
    document.querySelector('.learn-page__enter').classList.remove('hidden');
    document.querySelector('.learn-page__next').classList.add('hidden');
    document.querySelector('.loader').classList.remove('hidden');
    document.querySelector('.learn-page__card').classList.add('hidden');
    this.creatLearnWords().then(() => {
      if (AppStore.positionWord < AppStore.learnWords.length) {
        this.getWord().then(() => {
          document.querySelector('.learn-page__start').innerHTML = AppStore.positionWord;
          document.querySelector('.learn-page__end').innerHTML = AppStore.learnWords.length;
          document.querySelector('.progress-bar').style.width = `${Math.round((AppStore.positionWord / AppStore.learnWords.length) * 100)}%`;
          document.querySelector('.loader').classList.add('hidden');
          document.querySelector('.learn-page__card').classList.remove('hidden');
          WORD_INPUT.style.width = `${AppStore.learnWords[AppStore.positionWord].desc.word.length * 11}px`;
          WORD_INPUT.focus();
          if (AppStore.settings.optional.showWordTranslation) {
            document.querySelector('.learn-page__translate').innerHTML = AppStore.learnWords[AppStore.positionWord].desc.wordTranslate;
          }
          if (AppStore.settings.optional.showTranscription) {
            document.querySelector('.learn-page__transcription').classList.remove('hidden');
            document.querySelector('.learn-page__transcription').innerHTML = AppStore.learnWords[AppStore.positionWord].desc.transcription;
          }
          if (AppStore.settings.optional.showMeaning) {
            document.querySelector('.learn-page__meaning').classList.remove('hidden');
            document.querySelector('.learn-page__meaning').innerHTML = `<strong>Meaning:</strong> ${AppStore.learnWords[AppStore.positionWord].desc.textMeaning}`;
            document.querySelector('.learn-page__meaning').classList.add('no-see');
          }
          if (AppStore.settings.optional.showMeaningTranslation) {
            document.querySelector('.learn-page__meaning-ru').innerHTML = `<strong>Meaning translation:</strong> ${AppStore.learnWords[AppStore.positionWord].desc.textMeaningTranslate}`;
          }
          if (AppStore.settings.optional.showExample) {
            document.querySelector('.learn-page__example').classList.remove('hidden');
            document.querySelector('.learn-page__example').innerHTML = `<strong>Example:</strong> ${AppStore.learnWords[AppStore.positionWord].desc.textExample}`;
            document.querySelector('.learn-page__example').classList.add('no-see');
          }
          if (AppStore.settings.optional.showExampleTranslation) {
            document.querySelector('.learn-page__example-ru').innerHTML = `<strong>Example translation:</strong> ${AppStore.learnWords[AppStore.positionWord].desc.textExampleTranslate}`;
          }
          if (AppStore.settings.optional.showAnswerBtn) {
            document.querySelector('.learn-page__view').classList.remove('hidden');
          }
          if (AppStore.settings.optional.showImage) {
            const img = `url('data:image/jpg;base64,${AppStore.learnWords[AppStore.positionWord].desc.image}')`;
            document.querySelector('.learn-page__image').style.background = img;
          }
          if (AppStore.settings.optional.sound) {
            document.querySelector('#audio_word').src = `data:audio/mpeg;base64,${AppStore.learnWords[AppStore.positionWord].desc.audio}`;
            document.querySelector('#audio_meaning').src = `data:audio/mpeg;base64,${AppStore.learnWords[AppStore.positionWord].desc.audioMeaning}`;
            document.querySelector('#audio_example').src = `data:audio/mpeg;base64,${AppStore.learnWords[AppStore.positionWord].desc.audioExample}`;
          }
        });
      } else {
        document.querySelector('.learn-page__card').classList.add('hidden');
        document.querySelector('.loader').classList.add('hidden');
        document.querySelector('.learn-page__card-info').classList.remove('hidden');
        document.querySelector('.progress-bar').style.width = '100%';
        document.querySelector('.learn-page__start').innerHTML = AppStore.positionWord;
      }
    });
  }

  beforeRender() {
    if (!AppStore.isLoggedIn) {
      window.location.hash = '#sign-in';
    }
    AppStore.positionWord = localStorage.getItem('positionWord') ? +localStorage.getItem('positionWord') : 0;
  }

  afterRender() {
    this.renderCard();
    document.querySelector('.learn-page__enter').addEventListener('click', () => {
      if (document.querySelector('.learn-page__input').value === AppStore.learnWords[AppStore.positionWord].desc.word) {
        if (AppStore.settings.optional.indicateDifficultyBtn) {
          document.querySelector('.card-footer').classList.remove('hidden');
        } else {
          document.querySelector('.learn-page__enter').classList.add('hidden');
          document.querySelector('.learn-page__next').classList.remove('hidden');
        }
        document.querySelectorAll('.no-see').forEach(
          (element) => element.classList.remove('no-see'),
        );
        if (AppStore.settings.optional.showMeaningTranslation) {
          document.querySelector('.learn-page__meaning-ru').classList.remove('hidden');
        }
        if (AppStore.settings.optional.showExampleTranslation) {
          document.querySelector('.learn-page__example-ru').classList.remove('hidden');
        }
        if (AppStore.settings.optional.sound) {
          document.querySelector('#audio_word').play();
          document.querySelector('#audio_word').addEventListener('ended', () => {
            if (AppStore.settings.optional.showMeaning) {
              document.querySelector('#audio_meaning').play();
              document.querySelector('#audio_meaning').addEventListener('ended', () => {
                if (AppStore.settings.optional.showExample) document.querySelector('#audio_example').play();
              }, false);
            } else if (AppStore.settings.optional.showExample) document.querySelector('#audio_example').play();
          }, false);
        }
        document.querySelector('.learn-page__input').style.border = '2px solid green';
      } else {
        document.querySelector('.learn-page__input').style.border = '2px solid red';
        AppStore.learnWords[AppStore.positionWord].optional.ratio -= 1;
        AppStore.learnWords[AppStore.positionWord].optional.error += 1;
        AppStore.learnWords[AppStore.positionWord].optional.time = new Date();
        this.createWord(AppStore.positionWord);
      }
    });
    document.querySelector('.learn-page__view').addEventListener('click', () => {
      document.querySelector('.learn-page__input').value = AppStore.learnWords[AppStore.positionWord].desc.word;
    });
    if (AppStore.settings.optional.sound) {
      document.getElementById('sound').checked = true;
    }
    document.querySelector('.learn-page__next').addEventListener('click', () => {
      document.querySelector('.js-click.normal').dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancellable: true,
        }),
      );
    });
    document.querySelector('.learn-page__input').addEventListener('keydown', (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        if (document.querySelector('.learn-page__next').classList.contains('hidden')) {
          document.querySelector('.learn-page__enter').dispatchEvent(
            new MouseEvent('click', {
              bubbles: true,
              cancellable: true,
            }),
          );
        } else {
          document.querySelector('.js-click.normal').dispatchEvent(
            new MouseEvent('click', {
              bubbles: true,
              cancellable: true,
            }),
          );
        }
      }
    });
    document.querySelector('#sound').addEventListener('change', () => {
      const BTN_CHECK = document.getElementById('sound');
      if (!BTN_CHECK.checked) {
        document.querySelectorAll('audio').forEach((e) => { e.muted = true; });
        AppStore.settings.optional.sound = false;
      } else {
        document.querySelectorAll('audio').forEach((e) => { e.muted = false; });
        AppStore.settings.optional.sound = true;
      }
    });
    document.querySelectorAll('.js-click').forEach(
      (element) => element.addEventListener('click', (e) => {
        AppStore.learnWords[AppStore.positionWord].optional.ratio += 1;
        AppStore.learnWords[AppStore.positionWord].optional.success += 1;
        AppStore.learnWords[AppStore.positionWord].optional.time = new Date();
        if (e.target.classList.contains('again')) {
          this.createWord(AppStore.positionWord).then(() => {
            const val = AppStore.learnWords[AppStore.positionWord];
            AppStore.learnWords.push(val);
            AppStore.learnWords.splice(AppStore.positionWord, 1);
          });
        } else {
          if (e.target.classList.contains('hard')) AppStore.learnWords[AppStore.positionWord].difficulty = 'hard';
          if (e.target.classList.contains('normal')) AppStore.learnWords[AppStore.positionWord].difficulty = 'normal';
          if (e.target.classList.contains('easy')) AppStore.learnWords[AppStore.positionWord].difficulty = 'easy';
          this.createWord(AppStore.positionWord);
          AppStore.positionWord += 1;
        }
        document.querySelector('.learn-page__input').value = '';
        localStorage.setItem('positionWord', AppStore.positionWord);
        this.renderCard();
      }),
    );
    document.querySelector('.js-click-clear').addEventListener('click', () => {
      localStorage.removeItem('positionWord');
      AppStore.positionWord = 0;
      document.location.reload();
    });
  }
}

const learnPage = new LearnPage({
  selector: 'main',
  template: `<div class="learn-page">
                <div class="loader mt-5 hidden">
                  <div class="spinner-border text-secondary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div class="learn-page__card-info card hidden">
                  <h3>You have learned all the words for today. Want to repeat it?</h3>
                  <button type="button" class="btn btn-primary btn-sm js-click-clear">REPEAT AGAIN</button>
                </div>
                <div class="learn-page__card card">
                  <div class="learn-page__card-header card-header">
                  <div class="custom-control custom-switch btn-sound">
                    <input type="checkbox" class="custom-control-input" id="sound">
                    <label class="custom-control-label" for="sound">Sound</label>
                  </div>
                  </div>
                  <div class="learn-page__card-body card-body">
                    <div class="learn-page__content">
                      <div class="learn-page__image"></div>
                      <div class="learn-page__word">
                        <button type="button" class="learn-page__view btn btn-primary">View</button>
                        <input class="learn-page__input" type="text" maxlength="50" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                        <button type="button" class="learn-page__enter btn btn-primary">Enter</button>
                        <button type="button" class="learn-page__next btn btn-primary">Next word</button>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="learn-page__translate list-group-item"></li>
                        <li class="learn-page__transcription list-group-item"></li>
                        <li class="learn-page__meaning no-see list-group-item"></li>
                        <li class="learn-page__meaning-ru list-group-item"></li>
                        <li class="learn-page__example no-see list-group-item"></li>
                        <li class="learn-page__example-ru list-group-item"></li>
                      </ul>
                    </div>
                  </div>
                  <div class="learn-page__card-footer card-footer hidden">
                    <button type="button" class="btn btn-light btn-sm js-click again">Again</button>
                    <button type="button" class="btn btn-light btn-sm js-click hard">Hard</button>
                    <button type="button" class="btn btn-light btn-sm js-click normal">Normal</button>
                    <button type="button" class="btn btn-light btn-sm js-click easy">Easy</button>
                  </div>
                </div>
                <div class="learn-page__info">
                  <div class="learn-page__start">0</div>
                  <div class="learn-page__progress progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"></div>
                  </div>
                  <div class="learn-page__end">0</div>
                </div>
              </div>
              <audio id="audio_word">
              <audio id="audio_meaning">
              <audio id="audio_example">
              `,
});

export default learnPage;
