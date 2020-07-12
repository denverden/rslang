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

  async createWord() {
    const obj = JSON.parse(JSON.stringify(AppStore.learnWords[AppStore.positionWord]));
    delete obj.desc;
    AppStore.userWords.push(obj);
    delete obj.wordId;
    const res = await fetch(`${AppStore.apiUrl}/users/${AppStore.userId}/words/${AppStore.learnWords[AppStore.positionWord].wordId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AppStore.userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    const result = await res.json();
  }

  async readWords(group, page) {
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
        if (AppStore.learnWords.length <= AppStore.settings.optional.newWordsPerDay - 1) {
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
    if (count > AppStore.learnWords.length) {
      AppStore.learnWords = AppStore.learnWords.slice(0, count - 1);
    }
  }

  async creatLearnWords() {
    if (!AppStore.learnWords.length > 0 && AppStore.settings.optional.newOrRepetitionWords === 'both') {
      const c = AppStore.settings.optional.wordsPerDay - AppStore.settings.optional.newWordsPerDay;
      await this.readUserWords(c);
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
    console.log(AppStore.learnWords);
  }

  renderCard() {
    document.querySelector('.learn-page__end').innerHTML = AppStore.settings.optional.wordsPerDay;
    this.creatLearnWords().then(() => {
      this.getWord().then(() => {
        if (AppStore.settings.optional.showWordTranslation) {
          document.querySelector('.learn-page__translate').innerHTML = AppStore.learnWords[AppStore.positionWord].desc.wordTranslate;
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
      });
    });
  }

  beforeRender() {
    if (!AppStore.isLoggedIn) {
      window.location.hash = '#sign-in';
    }
    AppStore.positionWord = localStorage.getItem('positionWord') ? localStorage.getItem('positionWord') : 0;
  }

  afterRender() {
    this.renderCard();
    document.querySelector('.learn-page__input').addEventListener('keydown', (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        if (document.querySelector('.learn-page__input').value === AppStore.learnWords[AppStore.positionWord].desc.word) {
          document.querySelector('.learn-page__input').value = '';
          AppStore.learnWords[AppStore.positionWord].optional.ratio += 1;
          AppStore.learnWords[AppStore.positionWord].optional.success += 1;
          this.createWord();
          AppStore.positionWord += 1;
          localStorage.setItem('positionWord', AppStore.positionWord);
          this.renderCard();
        } else {
          AppStore.learnWords[AppStore.positionWord].optional.ratio -= 1;
          AppStore.learnWords[AppStore.positionWord].optional.error += 1;
        }
      }
    });
  }
}

const learnPage = new LearnPage({
  selector: 'main',
  template: `<div class="learn-page">
                <div class="learn-page__card card">
                  <div class="learn-page__card-header card-header"></div>
                  <div class="card-header__card-body card-body">
                    <div class="learn-page__content">
                      <div class="learn-page__image"></div>
                      <div class="learn-page__word">
                        <input class="learn-page__input" type="text" maxlength="50" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                      </div>
                      <div class="learn-page__translate"></div>
                    </div>
                  </div>
                  <div class="learn-page__card-footer card-footer">
                    <button class="learn-page__sound btn invisible" type="button"><i class="fas fa-volume-up"></i></button>
                  </div>
                </div>
                <div class="learn-page__info">
                  <div class="learn-page__start">0</div>
                  <div class="learn-page__progress progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"></div>
                  </div>
                  <div class="learn-page__end"></div>
                </div>
              </div>`,
});

export default learnPage;
