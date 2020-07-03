export function createContainer(element, ...classes) {
  const container = document.createElement(element);

  container.classList.add(...classes);

  return container;
}

export class DictionaryItem {
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
    wordItem.setAttribute('data-id', `${this.id}`);
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
    this.addMoveBtnClickHandler(btnMove, this.tab);

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
      const wordItemToDelete = document.getElementById(`${this.id}`);

      wordItemToDelete.classList.add('hidden');
      wordItemToDelete.classList.remove('d-flex');
      if (tabName === 'all') {
        // TODO: mark wordItemToDelete as deleted on server
      } else {
        // TODO: mark wordItemToDifficult as difficult on server
      }
    });
  }

  createColumnWord() {
    const columnWord = createContainer('div', 'wordlist__item-col');
    const word = createContainer('div', 'wordlist__word');
    const transcription = createContainer('div', 'wordlist__transcription');
    const translation = createContainer('div', 'wordlist__translation');

    word.innerHTML = this.word;
    translation.innerHTML = this.translation;
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
