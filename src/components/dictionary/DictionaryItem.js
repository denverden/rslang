import AppStore from '../AppStore';
import { createContainer } from './helpers';
import { getUserWordInfo, updateWordInfo } from './userWord';

class DictionaryItem {
  constructor(data, state) {
    const {
      id,
      word,
      audio,
      image,
      wordTranslate,
      transcription,
      textMeaning,
      textExample,
    } = data;
    this.id = id;
    this.word = word;
    this.audio = audio;
    this.image = image;
    this.wordTranslate = wordTranslate;
    this.transcription = transcription;
    this.textMeaning = textMeaning;
    this.textExample = textExample;
    this.wordState = state.settings.optional;
    this.tabName = state.dictionaryTab;
  }

  generateItem() {
    const wordItem = createContainer('div', 'wordlist__item', 'd-flex', 'flex-column', 'flex-md-row');
    const itemGroup = createContainer('div', 'wordlist__item-group', 'd-flex', 'flex-row-reverse', 'flex-md-column', 'flex-lg-row', 'align-items-center', 'ml-0', 'ml-md-auto');
    const itemColumnBtn = this.createColumnBtn();
    const itemColumnWord = this.createColumnWord();
    const itemColumnExample = this.createColumnExample();
    const itemColumnImage = this.createColumnImage();
    const itemColumnStat = this.createColumnStat();

    itemGroup.appendChild(itemColumnImage);
    itemGroup.appendChild(itemColumnStat);
    wordItem.setAttribute('id', `${this.id}`);
    wordItem.appendChild(itemColumnBtn);
    wordItem.appendChild(itemColumnWord);
    wordItem.appendChild(itemColumnExample);
    wordItem.appendChild(itemGroup);

    return wordItem;
  }

  createColumnBtn() {
    const columnBtn = createContainer('div', 'wordlist__item-col', 'd-flex', 'flex-row', 'flex-md-column');
    const btnSound = createContainer('button', 'wordlist__btn', 'btn');
    const btnMove = createContainer('button', 'wordlist__btn', 'btn');

    if (!this.wordState.sound) btnSound.setAttribute('disabled', '');
    btnSound.setAttribute('type', 'button');
    btnMove.setAttribute('type', 'button');
    btnSound.innerHTML = '<i class="fas fa-volume-up"></i>';
    btnMove.innerHTML = (this.tabName === 'all') ? '<i class="far fa-trash-alt"></i>' : '<i class="fas fa-undo-alt"></i>';
    columnBtn.appendChild(btnSound);
    columnBtn.appendChild(btnMove);
    this.addSoundBtnClickHandler(btnSound);
    this.addMoveBtnClickHandler(btnMove, this.tabName);

    return columnBtn;
  }

  addSoundBtnClickHandler(element) {
    element.addEventListener('click', () => {
      const sound = new Audio(this.audio);

      sound.play();
    });
  }

  addMoveBtnClickHandler(element, tabName) {
    element.addEventListener('click', () => {
      const targetWord = document.getElementById(`${this.id}`);
      const targetWordId = targetWord.getAttribute('id');

      targetWord.classList.add('hidden');
      targetWord.classList.remove('d-flex');
      // TODO: retrieve word to all(remove from deleted or difficult)
      if (tabName === 'all') {
        this.markWordAs(targetWordId, 'moveToDeleted');
      } else if (tabName === 'deleted') {
        this.markWordAs(targetWordId, 'restoreFromDeleted');
      } else if (tabName === 'difficult') {
        this.markWordAs(targetWordId, 'restoreFromDifficult');
      }
    });
  }

  async markWordAs(wordId, mark) {
    const wordObj = await getUserWordInfo(wordId);

    delete wordObj.id;
    delete wordObj.wordId;

    if (mark === 'moveToDeleted') {
      if (!wordObj.optional.deleted) {
        wordObj.optional.deleted = true;
        await updateWordInfo(wordId, wordObj, mark);
      } else {
        AppStore.viewMessage('alert-info', 'You have already deleted this word');
      }
    }
    if (mark === 'restoreFromDeleted') {
      wordObj.optional.deleted = false;
      await updateWordInfo(wordId, wordObj, mark);
    }
    if (mark === 'restoreFromDifficult') {
      wordObj.difficulty = 'string';
      await updateWordInfo(wordId, wordObj, mark);
    }
  }

  createColumnWord() {
    const columnWord = createContainer('div', 'wordlist__item-col');
    const word = createContainer('div', 'wordlist__word');
    const transcription = createContainer('div', 'wordlist__transcription');
    const translation = createContainer('div', 'wordlist__translation');

    word.innerHTML = this.word;
    translation.innerHTML = this.wordTranslate;
    transcription.innerHTML = this.wordState.showTranscription ? this.transcription : '';
    columnWord.appendChild(word);
    columnWord.appendChild(transcription);
    columnWord.appendChild(translation);

    return columnWord;
  }

  createColumnExample() {
    const columnExample = createContainer('div', 'wordlist__item-col');

    if (this.wordState.showMeaning) {
      const meaning = createContainer('div', 'wordlist__meaning');

      meaning.innerHTML = `<span class="wordlist__meaning-title">Meaning: </span>${this.textMeaning}`;
      columnExample.appendChild(meaning);
    }
    if (this.wordState.showExample) {
      const example = createContainer('div', 'wordlist__example');

      example.innerHTML = `<span class="wordlist__example-title">Example: </span>${this.textExample}`;
      columnExample.appendChild(example);
    }

    return columnExample;
  }

  createColumnImage() {
    const columnImage = createContainer('div', 'wordlist__item-col');
    const image = createContainer('div', 'wordlist__image');

    if (this.wordState.showImage) {
      image.style.backgroundImage = `url(${this.image})`;
      columnImage.appendChild(image);
    }

    return columnImage;
  }

  createColumnStat() {
    const columnStat = createContainer('div', 'wordlist__item-col');
    const statAll = createContainer('div', 'wordlist__statistic-item');
    const statLast = createContainer('div', 'wordlist__statistic-item');
    const statAgain = createContainer('div', 'wordlist__statistic-item');

    // TODO: implement how to show statistic with different numbers (time/times, minute(s)/hour(s))
    // should come from word statistic data
    const statAllVal = 0;
    const statLastVal = 0;
    const statAgainVal = 0;

    statAll.innerHTML = `Repeated: <span class="wordlist__statistic-all">${statAllVal} </span>times`;
    statLast.innerHTML = `Last repeated: <span class="wordlist__statistic-last">${statLastVal} </span>min ago`;
    statAgain.innerHTML = `Repeat again: in <span class="wordlist__statistic-again">${statAgainVal} </span>hour`;
    columnStat.appendChild(statAll);
    columnStat.appendChild(statLast);
    columnStat.appendChild(statAgain);

    return columnStat;
  }
}

export default DictionaryItem;
