import Component from '../Component';

import './games-page.scss';

class GamesPage extends Component { }

const gamesPage = new GamesPage({
  selector: 'main',
  template: `<div class="container">
              <div class="games-page">
                <div class="games-page__card card" style="width: 18rem;">
                  <div class="games-page__image games-page__image--speakit card-img-top"></div>
                  <div class="card-body text-center">
                    <h5 class="card-title">SpeakIt</h5>
                    <p class="card-text">Train your pronunciation. Listen carefully and learn how to pronounce.</p>
                    <a href="#" class="btn btn-primary" target="_blank">Start Game</a>
                  </div>
                </div>
                <div class="games-page__card card" style="width: 18rem;">
                  <div class="games-page__disable"></div>
                  <div class="games-page__image games-page__image--development card-img-top"></div>
                  <div class="card-body text-center">
                    <h5 class="card-title">English puzzle</h5>
                    <p class="card-text">This game is under development. In the near future you will be able to play it.</p>
                    <a href="#" class="btn btn-primary" target="_blank">Start Game</a>
                  </div>
                </div>
                <div class="games-page__card card" style="width: 18rem;">
                  <div class="games-page__disable"></div>
                  <div class="games-page__image games-page__image--development card-img-top"></div>
                  <div class="card-body text-center">
                    <h5 class="card-title">Саванна</h5>
                    <p class="card-text">This game is under development. In the near future you will be able to play it.</p>
                    <a href="#" class="btn btn-primary" target="_blank">Start Game</a>
                  </div>
                </div>
                <div class="games-page__card card" style="width: 18rem;">
                  <div class="games-page__disable"></div>
                  <div class="games-page__image games-page__image--development card-img-top"></div>
                  <div class="card-body text-center">
                    <h5 class="card-title">Аудиовызов</h5>
                    <p class="card-text">This game is under development. In the near future you will be able to play it.</p>
                    <a href="#" class="btn btn-primary" target="_blank">Start Game</a>
                  </div>
                </div>
                <div class="games-page__card card" style="width: 18rem;">
                <div class="games-page__disable"></div>
                  <div class="games-page__image games-page__image--development card-img-top"></div>
                  <div class="card-body text-center">
                    <h5 class="card-title">Спринт</h5>
                    <p class="card-text">This game is under development. In the near future you will be able to play it.</p>
                    <a href="#" class="btn btn-primary" target="_blank">Start Game</a>
                  </div>
                </div>
                <div class="games-page__card card" style="width: 18rem;">
                  <div class="games-page__disable"></div>
                  <div class="games-page__image games-page__image--development card-img-top"></div>
                  <div class="card-body text-center">
                    <h5 class="card-title">Своя игра</h5>
                    <p class="card-text">This game is under development. In the near future you will be able to play it.</p>
                    <a href="#" class="btn btn-primary" target="_blank">Start Game</a>
                  </div>
                </div>
              </div>
            </div>
            `,
});

export default gamesPage;
