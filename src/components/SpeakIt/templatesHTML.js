import blank from './images/blank.jpg';
import audio from './images/audio.svg';

const templatesHTML = {
  getStartPageHTML() {
    return `<div class="startpage d-flex align-items-center">
              <div class="container px-5 text-center">
                <h1 class="startpage--title">SpeakIt</h1>
                <p class="startpage--intro-text">
                  The SpeakIt game helps you improve your english pronunciation. The more words you say correctly, the more experience points you'll get.
                  Click on a word in order to hear word pronunciation before start the game. Turn on microphone and say words.
                </p>
                <a href="#" class="startpage--intro-btn btn btn-info btn-lg mt-2">Start</a>
              </div>
            </div>

            <div class="speakit-container flex-column justify-content-center align-items-center hidden py-4">
              <div class="speakit-wrapper d-flex flex-column justify-content-center align-items-center container">
                <div class="speakit-info d-flex flex-column flex-md-row align-items-center justify-content-md-between">
                  <div class="speakit-info__pages">
                    <span class="speakit-info__pages--page activePage" data-groupno="0" ></span>
                    <span class="speakit-info__pages--page" data-groupno="1"></span>
                    <span class="speakit-info__pages--page" data-groupno="2"></span>
                    <span class="speakit-info__pages--page" data-groupno="3"></span>
                    <span class="speakit-info__pages--page" data-groupno="4"></span>
                    <span class="speakit-info__pages--page" data-groupno="5"></span>
                  </div>
                  <div class="speakit-info__score pt-3 pt-md-0"></div>
                </div>
                <div class="current d-flex flex-column align-items-center">
                  <img class="current__image" src="${blank}" alt="image of current word">
                  <p class="current__translation text-center"></p>
                  <input type="text" class="current__input none" readonly>
                </div>
                <div class="cards"></div>
                <div class="btns d-flex flex-column flex-md-row mt-4">
                    <a href="#" class="btn btn-lg btn-info btns__restart mb-2 mb-md-0 mx-0 mx-md-2">Restart</a>
                    <a href="#" class="btn btn-lg btn-info btns__speak mb-2 mb-md-0 mx-0 mx-md-2">Press and speak</a>
                    <a href="#" class="btn btn-lg btn-info btns__result mb-2 mb-md-0 mx-0 mx-md-2">Results</a>
                </div>
              </div>
            </div>

            <div class="resultpage align-items-center justify-content-center hidden">
              <div class="resultpage__container">
                  <p class="results__container--errors">Errors
                      <span class="resultpage__errors-num">10</span>
                  </p>
                  <div class="resultpage__errors-item mb-4"></div>
                  <p class="results__container--success">Success
                      <span class="resultpage__success-num">0</span>
                  </p>
                  <div class="resultpage__success-item"></div>
                  <div class="resultpage__btns-res d-flex flex-column flex-sm-row justify-content-center text-center mt-4">
                      <a href="#" class="btn btn-info btn-md resultpage__return mb-2 m-sm-0 mx-0 mx-sm-3">Return</a>
                      <a href="#" class="btn btn-info btn-md resultpage__new-game mb-2 m-sm-0 mx-0 mx-sm-3">New game</a>
                      <a href="#" class="btn btn-info btn-md resultpage__statistics mb-2 m-sm-0 mx-0 mx-sm-3">Statistics</a>
                  </div>
              </div>
            </div>

            <div class="statistics align-items-center justify-content-center hidden">
              <div class="statistics__container"></div>
              <div class="statistics__btns">
                  <a href="#" class="btn btn-danger statistics__return">Close</a>
              </div>
            </div>

            <audio class="audio"></audio>`;
  },

  getCardItemHTML(wordObj) {
    return `<div class="cards__item" data-wordid="${wordObj.id}">
              <span class="cards__item--audio-icon" data-wordid="${wordObj.id}"><img data-wordid="${wordObj.id}" src="${audio}" alt="audio icon"> </span>
              <p class="cards__item--word" data-wordid="${wordObj.id}">${wordObj.word}</p>
              <p class="cards__item--transcription" data-wordid="${wordObj.id}">${wordObj.transcription}</p>
            </div>`;
  },

  getResultItemHTML(wordObj) {
    return `<div class="resultpage__item" data-wordid="${wordObj.id}">
              <span class="resultpage__item--audio-icon"><img data-wordid="${wordObj.id}" src="${audio}" alt="audio icon"></span>
              <p class="resultpage__item--word"  data-wordid="${wordObj.id}">${wordObj.word}</p>
              <p class="resultpage__item--transcription" data-wordid="${wordObj.id}">${wordObj.wordTranslate}</p>
              <p class="resultpage__item--translation" data-wordid="${wordObj.id}">${wordObj.transcription}</p>
            </div>`;
  },

  getStatisticsHeaderHTML(id, date, group, errors, success) {
    return `<div class="statistics__header" data-id="${id}">
              <p class="statistics__header--date"  data-id="${id}">Date: ${date}</p>
              <p class="statistics__header--group"  data-id="${id}">Group: ${group}</p>
              <p class="statistics__header--errors" data-id="${id}">Errors: <span class="statistics__errors-num">${errors}</span></p>
              <p class="statistics__header--success" data-id="${id}">Success: <span class="statistics__success-num">${success}</span></p>
            </div>
    `;
  },

  getStatisticsContainerHTML(id) {
    return `
              <div class="statistics-items headerid-${id} none">
                <p class="statistics__container--errors">Errors</p>
                <dic class="statistics__errors-item"></dic>

                <p class="statistics__container--success">Success</p>
                <dic class="statistics__success-item"></dic>
              </div>
            `;
  },

  getStarHTML() {
    return '<div class="info__score--star"></div>';
  },
};

export default templatesHTML;
