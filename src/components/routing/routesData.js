import header from '../header/Header';
import homePage from '../home-page/HomePage';
import aboutPage from '../about-page/AboutPage';
import gamesPage from '../games-page/GamesPage';
import error404 from '../error404/Error404';
import dictionary from '../dictionary/Dictionary';
import settingsPage from '../settings-page/SettingsPage';
import signInPage from '../signin-page/SignInPage';
import signUpPage from '../signup-page/SignUpPage';

const routes = [
  { path: '', components: [header, homePage] },
  { path: 'about', components: [header, aboutPage] },
  { path: 'games', components: [header, gamesPage] },
  { path: 'sign-in', components: [header, signInPage] },
  { path: 'sign-up', components: [header, signUpPage] },
  { path: '***', components: [header, error404] },
  { path: 'dictionary', components: [header, dictionary] },
  { path: 'settings', components: [header, settingsPage] },
];

export default routes;
