import Component from '../Component';

import './signin-page.scss';

class SignInPage extends Component { }

const signinPage = new SignInPage({
  selector: 'main',
  template: `<div class="container">
              <form class="form-signin">
                <div class="text-center mb-4">
                  <h1 class="h3 mb-3 font-weight-normal">SingIn</h1>
                </div>

                <div class="form-label-group">
                  <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                  <label for="inputEmail">Email address</label>
                </div>

                <div class="form-label-group">
                  <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                  <label for="inputPassword">Password</label>
                </div>

                <a class="btn btn-lg btn-primary btn-block" href="dashboard.html" >Sign in</a>
                <p class="mt-4 mb-3 text-muted text-center">Not registered? <a class="link" href="#sign-up">Create an account</a></p>
              </form>
            </div>`,
});

export default signinPage;
