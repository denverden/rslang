import Component from '../Component';

import './adout-page.scss';

import iconRoman from './icon_roman.png';
import iconDen from './icon_den.png';
import iconKonstantin from './icon_konstantin.png';
import iconLena from './icon_lena.png';
import iconAlex from './icon_alex.png';
import iconAlexS from './icon_alexS.png';
import mail from './mail.svg';
import gitHub from './github.svg';

class AboutPage extends Component {}

const aboutPage = new AboutPage({
  selector: 'main',
  template: `
  <div class="container text-center">
        <h1>TEAM<h1>
        <h6 class="text-center">
          Behind this project is a team of Rolling Scopes School students.
        </h6>
        <h6 class="text-center">
          Each of which has put maximum of his strength to achieve an excellent
          result.
        </h6>
        <h6 class="text-center">
          RsLang application is the result of collaboration between the
          following developers:
        </h6>
      </div>

      <div class="container">
        <div class="person-card person-card--roman">
          <img src="${iconRoman}" alt="icon" class="person-icon">
          <div class="person-info">
            <h3 class="person-info__name">Roman Yarinski</h3>
            <p><strong>Adout Me:</strong> My goal is to provide technologies to people in order to make their lives easier and better.
            I try my best to learn something new about technologies,
            for example programming languages that I use to create different programms with algorithms.</p>
            <p><strong>Contribution:</strong> SingIn/Up, AboutPage.</p>
            <p><strong>Skills:</strong> Git  HTML  CSS  SASS  JavaScript  Node.js  MySQL</p>
            <div class="contact-info">
            <strong>Contacts:</strong>
              <a href="mailto:299442676t@gmail.com" class="mail contact"><img src="${mail}" alt="Mail" width="20px">&nbsp;EMail</a>
              <a href="https://github.com/Roman-Yarinski" class="git contact"><img src="${gitHub}" alt="Git" width="20px">&nbsp;GitHub</a>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="person-card person-card--den">
          <img src="${iconDen}" alt="icon" class="person-icon">
          <div class="person-info">
            <h3 class="person-info__name">Denis Novikov</h3>
            <p><strong>Adout Me:</strong> I love to study and I always open to new knowledge.
            I have work experience with projects, which allows me to quickly and flexibly respond to changes.
            I think that everything is not possible to know.</p>
            <p><strong>Contribution:</strong> Team lead, SingIn/Up, Routing.</p>
            <p><strong>Skills:</strong> Git   HTML  CSS  SASS  JavaScript  Node.js  PHP  MySQL  Java</p>
            <div class="contact-info">
            <strong>Contacts:</strong>
              <a href="mailto:denverden@mail.ru" class="mail contact"><img src="${mail}" alt="Mail" width="20px">&nbsp;EMail</a>
              <a href="https://github.com/denverden" class="git contact"><img src="${gitHub}" alt="Git" width="20px">&nbsp;GitHub</a>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="person-card person-card--lena">
          <img src="${iconLena}" alt="icon" class="person-icon">
          <div class="person-info">
            <h3 class="person-info__name">Lena Zamnius</h3>
            <p><strong>Adout Me:</strong> Courteous and enthusiastic, I am interested in IT and everything in its orbit.
            I recently began to be fascinated by web programming, e.g. developing apps and building websites.
            As this area complements my studies,
            I am keen to gain more experience in the field. For this reason,
            I am looking for a company willing to offer me a placement among their developers.</p>
            <p><strong>Contribution:</strong> Settings.</p>
            <p><strong>Skills:</strong> JavaScript  Python  HTML  CSS  Sass  BEM  Bootstrap  MySQL  GIT  GitHub</p>
            <div class="contact-info">
            <strong>Contacts:</strong>
              <a href="mailto:lena.zamnius@gmail.com" class="mail contact"><img src="${mail}" alt="Mail" width="20px">&nbsp;EMail</a>
              <a href="https://github.com/lenazamnius" class="git contact"><img src="${gitHub}" alt="Git" width="20px">&nbsp;GitHub</a>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="person-card person-card--konstantin">
          <img src="${iconKonstantin}" alt="icon" class="person-icon">
          <div class="person-info">
            <h3 class="person-info__name">Konstantin Karpus</h3>
            <p><strong>Adout Me:</strong> I want to learn and discover something new in software development.</p>
            <p><strong>Contribution:</strong> Mini games.</p>
            <p><strong>Skills:</strong> Delphi FireBird  DataBase  HTML5  CSS3</p>
            <div class="contact-info">
            <strong>Contacts:</strong>
              <a href="mailto:ks@wintecs.by" class="mail contact"><img src="${mail}" alt="Mail" width="20px">&nbsp;EMail</a>
              <a href="https://github.com/KarpusKonstantin" class="git contact"><img src="${gitHub}" alt="Git" width="20px">&nbsp;GitHub</a>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="person-card person-card--alex">
          <img src="${iconAlex}" alt="icon" class="person-icon">
          <div class="person-info">
            <h3 class="person-info__name">Aleksey Isaev</h3>
            <p><strong>Adout Me:</strong>  I don’t have a lot of experience, but I try my best to learn something new about technologies,
            for example programming languages that I use to create different programms with algorithms.</p>
            <p><strong>Contribution:</strong> Main page.</p>
            <p><strong>Skills:</strong> C++  C#  HTML5  CSS3 </p>
            <div class="contact-info">
            <strong>Contacts:</strong>
              <a href="mailto:anscarfull@mail.ru" class="mail contact"><img src="${mail}" alt="Mail" width="20px">&nbsp;EMail</a>
              <a href="https://github.com/anscfl" class="git contact"><img src="${gitHub}" alt="Git" width="20px">&nbsp;GitHub</a>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="person-card person-card--alexS">
          <img src="${iconAlexS}" alt="icon" class="person-icon">
          <div class="person-info">
            <h3 class="person-info__name">Aleksey Safin</h3>
            <p><strong>Adout Me:</strong> Budding newbie.
            Slowly becoming a programmer.</p>
            <p><strong>Contribution:</strong> Footer/Header.</p>
            <p><strong>Skills:</strong> HTML CSS PHP JavaScript</p>
            <div class="contact-info">
            <strong>Contacts:</strong>
              <a href="mailto:safiko@ya.ru" class="mail contact"><img src="${mail}" alt="Mail" width="20px">&nbsp;EMail</a>
              <a href="https://github.com/frisko-sposad" class="git contact"><img src="${gitHub}" alt="Git" width="20px">&nbsp;GitHub</a>
            </div>
          </div>
        </div>
      </div>`,
});

export default aboutPage;
