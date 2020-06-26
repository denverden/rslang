import homePage from '../home-page/HomePage';
import aboutPage from '../about-page/AboutPage';
import error404 from '../error404/Error404';
import promoPage from '../promo-page/PromoPage';

const routes = [
  { path: '', components: [homePage] },
  { path: 'about', components: [aboutPage] },
  { path: '***', components: [error404] },
  { path: 'promo', components: [promoPage] },
];

export default routes;
