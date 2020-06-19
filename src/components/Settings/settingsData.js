export const settingsObj = {
  'Main:': [
    {
      type: 'number',
      name: 'cardAmount',
      text: 'Amount of cards per day: ',
      value: '50',
    },
    {
      type: 'radio',
      name: 'newOrRepetitionWords',
      text: 'Learn new words only',
      value: 'newOnly',
    },
    {
      type: 'radio',
      name: 'newOrRepetitionWords',
      text: 'Learn words for repetition only',
      value: 'repeatedOnly',
    },
    {
      type: 'radio',
      name: 'newOrRepetitionWords',
      text: 'Learn both words for repetition and new',
      value: 'both',
    },
  ],
  'Card Settings:': [
    {
      type: 'checkbox',
      name: 'showTranslation',
      text: 'Show word translation',
    },
    {
      type: 'checkbox',
      name: 'showMeaning',
      text: 'Show word meaning',
    },
    {
      type: 'checkbox',
      name: 'showExample',
      text: 'Show word usage example',
    },
    {
      type: 'checkbox',
      name: 'showTranscription',
      text: 'Show word transcription',
    },
    {
      type: 'checkbox',
      name: 'showImage',
      text: 'Show association image',
    },
    {
      type: 'checkbox',
      name: 'showExampleTranslation',
      text: 'Show word meaning and usage example translation',
    },
    {
      type: 'checkbox',
      name: 'indicateDifficultyBtn',
      text: 'Show buttons to indicate word difficulty',
    },
  ],
  'Additional:': [
    {
      type: 'checkbox',
      name: 'showAnswerBtn',
      text: 'Add "Show answer" button',
    },
    {
      type: 'checkbox',
      name: 'deleteWordBtn',
      text: 'Add "Delete word" button',
    },
    {
      type: 'checkbox',
      name: 'moveDifficultBtn',
      text: 'Add "Move to difficult" button',
    },
  ],
};

export const settingsState = {
  cardAmount: '50',
  deleteWordBtn: false,
  indicateDifficultyBtn: false,
  moveDifficultBtn: false,
  newOrRepetitionWords: 'newOnly',
  showAnswerBtn: false,
  showExample: false,
  showExampleTranslation: false,
  showImage: false,
  showMeaning: false,
  showTranscription: false,
  showTranslation: true,
};
