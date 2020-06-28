import header from '../header/Header';
import homePage from '../home-page/HomePage';
import aboutPage from '../about-page/AboutPage';
import signinPage from '../signin-page/SignInPage';
import signupPage from '../signup-page/SignUpPage';
import error404 from '../error404/Error404';

const routes = [
  { path: '', components: [header, homePage] },
  { path: 'about', components: [header, aboutPage] },
  { path: 'sign-in', components: [header, signinPage] },
  { path: 'sign-up', components: [header, signupPage] },
  { path: '***', components: [header, error404] },
];

export default routes;
