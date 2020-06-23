import homePage from '../home-page/HomePage';
import aboutPage from '../about-page/AboutPage';
import error404 from '../error404/Error404';
import settingsPage from '../settings-page/SettingsPage';

const routes = [
  { path: '', components: [homePage] },
  { path: 'about', components: [aboutPage] },
  { path: '***', components: [error404] },
  { path: 'settings', components: [settingsPage] },
];

export default routes;
