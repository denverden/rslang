const settingsObj = {
  'Main:': [
    {
      type: 'number',
      name: 'cardAmount',
      text: 'Amount of cards per day: ',
    },
    {
      type: 'radio',
      name: 'newRepeatedWords',
      value: 'newOnly',
      text: ' New words only',
    },
    {
      type: 'radio',
      name: 'newRepeatedWords',
      value: 'repeatedOnly',
      text: ' Words to be repeated only',
    },
    {
      type: 'radio',
      name: 'newRepeatedWords',
      value: 'both',
      text: ' Both',
    },
  ],
  'Card settings:': [
    {
      type: 'checkbox',
      name: 'showTranslation',
      text: ' Show word translation',
    },
    {
      type: 'checkbox',
      name: 'showMeaning',
      text: ' Show word meaning',
    },
    {
      type: 'checkbox',
      name: 'showExample',
      text: ' Show word usage example',
    },
    {
      type: 'checkbox',
      name: 'showTranscription',
      text: ' Show word transcription',
    },
    {
      type: 'checkbox',
      name: 'showImage',
      text: ' Show association image',
    },
    {
      type: 'checkbox',
      name: 'showExampleTranslation',
      text: ' Show word meaning and usage example translation',
    },
    {
      type: 'checkbox',
      name: 'indicateDifficultyBtn',
      text: ' Show buttons to indicate word difficulty',
    },
  ],
  'Additional:': [
    {
      type: 'checkbox',
      name: 'showAnswerBtn',
      text: ' Add \'Show answer\' button',
    },
    {
      type: 'checkbox',
      name: 'deleteWordBtn',
      text: ' Add \'Delete word\' button',
    },
    {
      type: 'checkbox',
      name: 'moveDifficultBtn',
      text: ' Add \'Move to difficult\' button',
    },
  ],
};

export default settingsObj;
