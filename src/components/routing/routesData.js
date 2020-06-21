import homePage from '../home-page/HomePage';
import aboutPage from '../about-page/AboutPage';
import error404 from '../error404/Error404';

const routes = [
  { path: '', component: homePage },
  { path: 'about', component: aboutPage },
  { path: '***', component: error404 },
];

export default routes;
