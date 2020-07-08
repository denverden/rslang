import blank from './blank.jpg';
import audio from './audio.svg';

const templatesHTML = {
  getStartPageHTML() {
    return `<div class="startpage">
              <h1 class="startpage--title">САВАННА</h1>
              <p class="startpage--intro-text">
                  Тренировка Саванна развивает словарный запас. 
                  Чем больше слов ты знаешь, тем больше очков опыта получишь.
              </p>
              <a href="#" class="startpage--intro-btn">Start</a>
            </div>
            
            <div class="container hidden">
                <div class="info">          
                  <div class="info__score"></div>
                </div>

                
                <div class="current">
                  <p class="current__translation"></p>
                  <input type="text" class="current__input none" readonly="">
                </div> 
                
                <div class="cards"></div>
                
                <div class="btns">
                    <a href="#" class="btns__restart">Restart</a>
                    <a href="#" class="btns__speak">Speak please</a>
                    <a href="#" class="btns__result">Results</a>
                </div>
                
            </div>
            
            <div class="resultpage hidden">
              <div class="resultpage__container">
                  <p class="results__container--errors">Errors
                      <span class="resultpage__errors-num">10</span>
                  </p>
                  <div class="resultpage__errors-item"></div>
                  <p class="results__container--success">Success
                      <span class="resultpage__success-num">0</span>
                  </p>
                  <div class="resultpage__success-item"></div>
                  
                  <div class="resultpage__btns-res">
                      <a href="#" class="resultpage__return">Return</a>
                      <a href="#" class="resultpage__new-game">New game</a>
                      <a href="#" class="resultpage__statistics">Statistics</a>
                  </div>
              </div>
            </div>

            <div class="statistics hidden">
              <div class="statistics__container">
              </div>

              <div class="statistics__btns">
                  <a href="#" class="statistics__return">Close</a>
              </div>
            </div>

            <audio class="audio"></audio>`;
  },

  getCardItemHTML(idx, wordObj) {
    return `<div class="cards__item" data-wordid="${wordObj.id}">
              <span class="cards__item--audio-icon" data-wordid="${wordObj.id}">${idx}</span>
              <p class="cards__item--word" data-wordid="${wordObj.id}">${wordObj.wordTranslate}</p>
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
