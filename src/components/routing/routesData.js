import homePage from '../home-page/HomePage';
import aboutPage from '../about-page/AboutPage';
import gamesPage from '../games-page/GamesPage';
import error404 from '../error404/Error404';

const routes = [
  { path: '', components: [homePage] },
  { path: 'about', components: [aboutPage] },
  { path: 'games', components: [gamesPage] },
  { path: '***', components: [error404] },
];

export default routes;
