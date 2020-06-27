import blank from './blank.jpg';
import audio from './audio.svg';

const templatesHTML = {
  getStartPageHTML() {
    return `<div class="startpage">
              <h1 class="startpage--title">SpeakIt</h1>
              <p class="startpage--intro-text">
                  Click on the words to hear them sound.<br>
                  Click on the button and speak the words into the microphone.
              </p>
              <a href="#" class="startpage--intro-btn">Start</a>
            </div>
            
            <div class="container hidden">
                <div class="info">          
                  <ul class="info__pages">
                    <li class="info__pages--page activePage" data-groupno="0" ></li>
                    <li class="info__pages--page" data-groupno="1"></li>
                    <li class="info__pages--page" data-groupno="2"></li>
                    <li class="info__pages--page" data-groupno="3"></li>
                    <li class="info__pages--page" data-groupno="4"></li>
                    <li class="info__pages--page" data-groupno="5"></li>
                  </ul> 

                  <div class="info__score"></div>
                </div>

                
                <div class="current">
                  <img class="current__image" src="${blank}" alt="">
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
                  <p class="results__container--errors">Ошибок
                      <span class="resultpage__errors-num">10</span>
                  </p>
                  <div class="resultpage__errors-item"></div>
                  <p class="results__container--succes">Знаю
                      <span class="resultpage__succes-num">0</span>
                  </p>
                  <div class="resultpage__succes-item"></div>
                  
                  <div class="resultpage__btns-res">
                      <a href="#" class="resultpage__return">Return</a>
                      <a href="#" class="resultpage__new-game">New game</a>
                      <a href="#" class="resultpage__statistics">Statistics</a>
                  </div>
              </div>
            </div>

            <div class="statistics hidden">
              <div class="statistics__container">
                <table class="table-statistics">
                  <tr class="table-title">
                      <th colspan="5">Statistics - SpeakIt</th>
                  </tr>
                  <tr class="table-header">
                      <td data-title=0 data-table-sort="none"><span data-title=0>+</span></td>
                      <td data-title=1 data-table-sort="none"><span data-title=1>Date</span></td>
                      <td data-title=2 data-table-sort="none"><span data-title=2>Group</span></td>
                      <td data-title=3 data-table-sort="none"><span data-title=3>Success</span></td>
                      <td data-title=4 data-table-sort="none"><span data-title=4>Errors</span></td>
                  </tr>
                 </table>              
              </div>
            </div>

            <audio class="audio"></audio>`;
  },

  getImageCenterHTML() {
    return `<div class="current">
                <img class="current__image" src="${blank}" alt="">
                <p class="current__translation"></p>
                <input type="text" class="current__input none" readonly="">
            </div>`;
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

  getStarHTML() {
    return '<div class="info__score--star"></div>';
  },
};

export default templatesHTML;
