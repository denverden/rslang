import header from '../header/Header';
import homePage from '../home-page/HomePage';
import aboutPage from '../about-page/AboutPage';
import gamesPage from '../games-page/GamesPage';
import error404 from '../error404/Error404';
import dictionary from '../dictionary/Dictionary';
import settingsPage from '../settings-page/SettingsPage';
import signinPage from '../signin-page/SignInPage';
import signupPage from '../signup-page/SignUpPage';
import learnPage from '../learn-page/LearnPage';

const routes = [
  { path: '', components: [header, homePage] },
  { path: 'about', components: [header, aboutPage] },
  { path: 'games', components: [header, gamesPage] },
  { path: 'sign-in', components: [header, signinPage] },
  { path: 'sign-up', components: [header, signupPage] },
  { path: '***', components: [header, error404] },
  { path: 'dictionary', components: [header, dictionary] },
  { path: 'settings', components: [header, settingsPage] },
  { path: 'learn', components: [header, learnPage] },
];

export default routes;
