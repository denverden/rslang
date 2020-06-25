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
    this.state = state;
  }

  generateItem() {
    const wordItem = createContainer('div', 'wordlist__item', 'd-flex', 'flex-column', 'flex-md-row');
    const itemGroup = createContainer('div', 'wordlist__item-group', 'd-flex', 'flex-row-reverse', 'flex-md-column', 'flex-lg-row', 'align-items-center', 'ml-0', 'ml-md-auto');
    const itemColumnBtn = this.createColumnBtn();
    const itemColumnWord = this.createColumnWord();
    const itemColumnExmp = this.createColumnExample();
    const itemColumnImage = this.createColumnImage();
    const itemColumnStat = this.createColumnStat();

    itemGroup.appendChild(itemColumnImage);
    itemGroup.appendChild(itemColumnStat);
    wordItem.setAttribute('id', `${this.id}`);
    wordItem.appendChild(itemColumnBtn);
    wordItem.appendChild(itemColumnWord);
    wordItem.appendChild(itemColumnExmp);
    wordItem.appendChild(itemGroup);

    return wordItem;
  }

  createColumnBtn() {
    const columnBtn = createContainer('div', 'wordlist__item-col', 'd-flex', 'flex-row', 'flex-md-column');
    const btnSound = createContainer('div', 'wordlist__btn');
    const btnDelete = createContainer('div', 'wordlist__btn');

    btnSound.setAttribute('data-audio-src', this.audio);
    btnSound.innerHTML = '<i class="fas fa-volume-up"></i>';
    btnDelete.innerHTML = '<i class="far fa-trash-alt"></i>';
    columnBtn.appendChild(btnSound);
    columnBtn.appendChild(btnDelete);
    this.addSoundBtnClickHandler(btnSound);
    this.addDeleteBtnClickHandler(btnDelete);

    return columnBtn;
  }

  addSoundBtnClickHandler(element) {
    element.addEventListener('click', () => {
      const sound = new Audio(`https://raw.githubusercontent.com/lenazamnius/rslang-data/master/${this.audio}`);

      sound.play();
    });
  }

  addDeleteBtnClickHandler(element) {
    element.addEventListener('click', () => {
      const wordItemToDelete = document.getElementById(`${this.id}`);

      wordItemToDelete.classList.add('hidden');
      wordItemToDelete.classList.remove('d-flex');
      // TODO: mark wordItemToDelete as deleted on server
    });
  }

  createColumnWord() {
    const columnWord = createContainer('div', 'wordlist__item-col');
    const word = createContainer('div', 'wordlist__word');
    const transcription = createContainer('div', 'wordlist__transcription');
    const translation = createContainer('div', 'wordlist__translation');

    word.innerHTML = this.word;
    translation.innerHTML = this.translation;
    transcription.innerHTML = this.state.showTranscription ? this.transcription : '';
    columnWord.appendChild(word);
    columnWord.appendChild(transcription);
    columnWord.appendChild(translation);

    return columnWord;
  }

  createColumnExample() {
    const columnExample = createContainer('div', 'wordlist__item-col');

    if (this.state.showMeaning) {
      const meaning = createContainer('div', 'wordlist__meaning');

      meaning.innerHTML = `<span class="wordlist__meaning-title">Meaning: </span>${this.textMeaning}`;
      columnExample.appendChild(meaning);
    }
    if (this.state.showExample) {
      const example = createContainer('div', 'wordlist__example');

      example.innerHTML = `<span class="wordlist__example-title">Example: </span>${this.textExample}`;
      columnExample.appendChild(example);
    }

    return columnExample;
  }

  createColumnImage() {
    const columnImage = createContainer('div', 'wordlist__item-col');
    const image = createContainer('div', 'wordlist__image');

    if (this.state.showImage) {
      image.style.backgroundImage = `url(https://raw.githubusercontent.com/lenazamnius/rslang-data/master/${this.image})`;
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
    statAll.innerHTML = `Repeated all: <span class="wordlist__statistic-all">${this.state.statAll}</span> times`;
    statLast.innerHTML = `Last repeated: <span class="wordlist__statistic-last">${this.state.statLast}</span>min ago`;
    statAgain.innerHTML = `Repeat again: in <span class="wordlist__statistic-again">${this.state.statAgain}</span> hour`;
    columnStat.appendChild(statAll);
    columnStat.appendChild(statLast);
    columnStat.appendChild(statAgain);

    return columnStat;
  }
}
