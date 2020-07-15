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

    result.forEach((element) => {
      AppStore.learnWords.push(element);
    });
    if (count < AppStore.learnWords.length) {
      AppStore.learnWords = AppStore.learnWords.splice(0, count);
    }
  }

  async creatLearnWords() {
    if (!AppStore.learnWords.length > 0 && AppStore.settings.optional.newOrRepetitionWords === 'both') {
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

    if (!AppStore.learnWords.length > 0 && AppStore.settings.optional.newOrRepetitionWords === 'repeatedOnly') {
      const c = AppStore.settings.optional.wordsPerDay - AppStore.settings.optional.newWordsPerDay;
      await this.readUserWords(c);
    }

    if (!AppStore.learnWords.length > 0 && AppStore.settings.optional.newOrRepetitionWords === 'newOnly') {
      let group = 0;
      let page = 0;
      while (AppStore.learnWords.length < AppStore.settings.optional.newWordsPerDay || group > 5) {
        // eslint-disable-next-line no-await-in-loop
        await this.readWords(group, page);
        page += 1;
        if (page > 29) {
          page = 0;
          group += 1;
        }
      }
    }
  }

  renderCard() {
    document.querySelector('.card-footer').classList.add('hidden');
    document.querySelector('.learn-page__meaning-ru').classList.add('hidden');
    document.querySelector('.learn-page__example-ru').classList.add('hidden');
    document.querySelector('.loader').classList.remove('hidden');
    document.querySelector('.learn-page__card').classList.add('hidden');
    this.creatLearnWords().then(() => {
      if (AppStore.positionWord < AppStore.learnWords.length) {
        this.getWord().then(() => {
          document.querySelector('.learn-page__end').innerHTML = AppStore.learnWords.length;
          document.querySelector('.progress-bar').style.width = `${Math.round((AppStore.positionWord / AppStore.learnWords.length) * 100)}%`;
          document.querySelector('.loader').classList.add('hidden');
          document.querySelector('.learn-page__card').classList.remove('hidden');
          if (AppStore.settings.optional.showWordTranslation) {
            document.querySelector('.learn-page__translate').innerHTML = AppStore.learnWords[AppStore.positionWord].desc.wordTranslate;
          }
          if (AppStore.settings.optional.showTranscription) {
            document.querySelector('.learn-page__transcription').innerHTML = AppStore.learnWords[AppStore.positionWord].desc.transcription;
          }
          if (AppStore.settings.optional.showMeaning) {
            document.querySelector('.learn-page__meaning').innerHTML = `Meaning: ${AppStore.learnWords[AppStore.positionWord].desc.textMeaning}`;
            document.querySelector('.learn-page__meaning').classList.add('no-see');
          }
          if (AppStore.settings.optional.showMeaningTranslation) {
            document.querySelector('.learn-page__meaning-ru').innerHTML = `Meaning translation: ${AppStore.learnWords[AppStore.positionWord].desc.textMeaningTranslate}`;
          }
          if (AppStore.settings.optional.showExample) {
            document.querySelector('.learn-page__example').innerHTML = `Example: ${AppStore.learnWords[AppStore.positionWord].desc.textExample}`;
            document.querySelector('.learn-page__example').classList.add('no-see');
          }
          if (AppStore.settings.optional.showExampleTranslation) {
            document.querySelector('.learn-page__example-ru').innerHTML = `Example translation: ${AppStore.learnWords[AppStore.positionWord].desc.textExampleTranslate}`;
          }
          if (AppStore.settings.optional.showImage) {
            const img = `url('data:image/jpg;base64,${AppStore.learnWords[AppStore.positionWord].desc.image}')`;
            document.querySelector('.learn-page__image').style.background = img;
          }
          if (AppStore.settings.optional.sound) {
            document.querySelector('.learn-page__sound').classList.remove('invisible');
            const audio = `data:audio/mpeg;base64,${AppStore.learnWords[AppStore.positionWord].desc.audio}`;
            document.querySelector('.learn-page__sound').addEventListener('click', () => {
              const sound = new Audio(audio);
              sound.play();
            });
          }
          console.log(AppStore.learnWords);
        });
      } else {
        document.querySelector('.learn-page__card').classList.add('hidden');
        document.querySelector('.loader').classList.add('hidden');
        document.querySelector('.learn-page__card-info').classList.remove('hidden');
        document.querySelector('.progress-bar').style.width = '100%';
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
        }
        document.querySelectorAll('.no-see').forEach(
          (element) => element.classList.remove('no-see'),
        );
        document.querySelector('.learn-page__meaning-ru').classList.remove('hidden');
        document.querySelector('.learn-page__example-ru').classList.remove('hidden');
      } else {
        AppStore.learnWords[AppStore.positionWord].optional.ratio -= 1;
        AppStore.learnWords[AppStore.positionWord].optional.error += 1;
        AppStore.learnWords[AppStore.positionWord].optional.time = new Date();
        this.createWord(AppStore.positionWord);
      }
    });
    document.querySelector('.learn-page__input').addEventListener('keydown', (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        document.querySelector('.learn-page__enter').dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancellable: true,
          }),
        );
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
                    <button class="learn-page__sound btn invisible" type="button"><i class="fas fa-volume-up"></i></button>
                  </div>
                  <div class="learn-page__card-body card-body">
                    <div class="learn-page__content">
                      <div class="learn-page__image"></div>
                      <div class="learn-page__word">
                        <input class="learn-page__input" type="text" maxlength="50" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                        <button type="button" class="learn-page__enter btn btn-primary btn-sm">Enter</button>
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
              </div>`,
});

export default learnPage;
