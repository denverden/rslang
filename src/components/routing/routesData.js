import homePage from '../home-page/HomePage';
import aboutPage from '../about-page/AboutPage';
import signinPage from '../signin-page/SignInPage';
import error404 from '../error404/Error404';

const routes = [
  { path: '', components: [homePage] },
  { path: 'about', components: [aboutPage] },
  { path: 'sign-in', components: [signinPage] },
  { path: '***', components: [error404] },
];

export default routes;
