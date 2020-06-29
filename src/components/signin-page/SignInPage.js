import Component from '../Component';
import AppStore from '../AppStore';

import './signin-page.scss';

class SignInPage extends Component {
  beforeRender() {
    if (AppStore.isLoggedIn) {
      window.location.href = '#dashboard';
    }
  }

  afterRender() {
    document.querySelector('.js-click').addEventListener('click', (event) => {
      event.preventDefault();
      const EMAIL = document.querySelector('#inputEmail').value;
      const PASSWORD = document.querySelector('#inputPassword').value;
      this.doLogin(EMAIL, PASSWORD);
    });
  }

  async doLogin(email, password) {
    const BTN = document.querySelector('.js-click');
    BTN.disabled = true;
    BTN.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;&nbsp;Loading...';
    try {
      const res = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await res.json();

      if (result) {
        AppStore.isLoggedIn = true;
        AppStore.userId = result.userId;
        AppStore.userToken = result.token;
        localStorage.setItem('userId', result.userId);
        localStorage.setItem('userToken', result.token);
        AppStore.viewMessage();
        window.location.hash = '#dashboard';
      }
    } catch (err) {
      AppStore.viewMessage('alert-danger', 'Wrong login or password.');
      BTN.innerHTML = 'Sing in';
      BTN.disabled = false;
    }
  }
}

const signInPage = new SignInPage({
  selector: 'main',
  template: `
            <div class="container">
              <form class="form-signin">
                <div class="text-center mb-4">
                  <h1 class="h3 mb-3 font-weight-normal">SingIn</h1>
                </div>

                <div class="form-label-group">
                  <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required>
                  <label for="inputEmail">Email address</label>
                </div>

                <div class="form-label-group">
                  <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                  <label for="inputPassword">Password</label>
                </div>

                <button class="btn btn-lg btn-primary btn-block js-click sing-in">Sign in</button>
                <p class="mt-4 mb-3 text-muted text-center">Not registered? <a class="link" href="#sign-up">Create an account</a></p>
              </form>
            </div>`,
});

export default signInPage;
