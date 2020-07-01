export const settingsData = {
  'Main:': [
    {
      type: 'number',
      name: 'wordsPerDay',
      text: 'Amount of words per day: ',
      value: '50',
    },
    {
      type: 'number',
      name: 'newWordsPerDay',
      text: 'Amount of new words per day: ',
      value: '20',
    },
    {
      type: 'checkbox',
      name: 'sound',
      text: 'Is sound on:',
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
      name: 'showWordTranslation',
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
      name: 'showMeaningTranslation',
      text: 'Show word meaning translation',
    },
    {
      type: 'checkbox',
      name: 'showExampleTranslation',
      text: 'Show word usage example translation',
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

export default settingsData;
