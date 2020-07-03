import header from '../header/Header';
import homePage from '../home-page/HomePage';
import aboutPage from '../about-page/AboutPage';
import gamesPage from '../games-page/GamesPage';
import error404 from '../error404/Error404';
<<<<<<< HEAD
import promoPage from '../promo-page/PromoPage';

const routes = [
  { path: '', components: [homePage] },
  { path: 'about', components: [aboutPage] },
  { path: '***', components: [error404] },
  { path: 'promo', components: [promoPage] },
=======
import settingsPage from '../settings-page/SettingsPage';
import signinPage from '../signin-page/SignInPage';
import signupPage from '../signup-page/SignUpPage';

const routes = [
  { path: '', components: [header, homePage] },
  { path: 'about', components: [header, aboutPage] },
  { path: 'games', components: [header, gamesPage] },
  { path: 'sign-in', components: [header, signinPage] },
  { path: 'sign-up', components: [header, signupPage] },
  { path: 'settings', components: [header, settingsPage] },
  { path: '***', components: [header, error404] },
>>>>>>> 86ec9252b8afaffc6d1356e2af2d09784dfb0f53
];

export default routes;
