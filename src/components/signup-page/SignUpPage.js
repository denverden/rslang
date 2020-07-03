import Component from '../Component';
import AppStore from '../AppStore';
import settingsDefault from './settingsDefault';

class SignUpPage extends Component {
  afterRender() {
    document.querySelector('.js-click').addEventListener('click', (event) => {
      event.preventDefault();
      const EMAIL = document.querySelector('#inputEmail').value;
      const PASSWORD = document.querySelector('#inputPassword').value;
      const CONFIRM_PASSWORD = document.querySelector('#inputConfirmPassword').value;
      this.doSingUp(EMAIL, PASSWORD, CONFIRM_PASSWORD);
    });
  }

  async doSettings(email, password) {
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
        await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${result.userId}/settings`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${result.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(settingsDefault),
        });
      }
    } catch (err) {
      AppStore.viewMessage('alert-danger', err);
    }
  }

  async doSingUp(regEmail, regPassword, regConfirmPass) {
    const BTN = document.querySelector('.js-click');
    BTN.disabled = true;
    BTN.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;&nbsp;Loading...';

    let pattern = /^([A-Za-z0-9_\-.])+[@]([A-Za-z0-9_\-.])+[.]([A-Za-z]{2,4})$/;
    if (!pattern.test(regEmail)) {
      AppStore.viewMessage('alert-danger', 'Invalid email.');
      BTN.innerHTML = 'Sing up';
      BTN.disabled = false;
      return;
    }

    if (regPassword !== regConfirmPass) {
      AppStore.viewMessage('alert-danger', 'Password mismatch.');
      BTN.innerHTML = 'Sing up';
      BTN.disabled = false;
      return;
    }

    // eslint-disable-next-line
    pattern = /(?=.*[0-9])(?=.*[+-_@$!%*?&#.,;:{}\[\]])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z+-_@$!%*?&#.,;:{}\[\]]{8,}/g;
    if (!pattern.test(regPassword)) {
      AppStore.viewMessage('alert-danger', 'Invalid password. The password must contain at least 8 characters, at least one uppercase letter, one lowercase letter, one digit and one special character from +-_@$!%*?&#.,;:[]{}');
      BTN.innerHTML = 'Sing up';
      BTN.disabled = false;
      return;
    }

    try {
      const res = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: regEmail,
          password: regPassword,
        }),
      });

      const result = await res.json();

      if (!result.error) {
        this.doSettings(regEmail, regPassword);
        AppStore.viewMessage('alert-info', 'Registration successfully completed. You can log in.');
        window.location.hash = '#sign-in';
      } else {
        AppStore.viewMessage('alert-danger', 'Registration error');
        BTN.innerHTML = 'Sing up';
        BTN.disabled = false;
      }
    } catch (err) {
      AppStore.viewMessage('alert-danger', 'Registration error');
      BTN.innerHTML = 'Sing up';
      BTN.disabled = false;
    }
  }
}

const signupPage = new SignUpPage({
  selector: 'main',
  template: `
            <div class="container">
              <form class="form-signin">
                <div class="text-center mb-4">
                  <h1 class="h3 mb-3 font-weight-normal">Sing Up</h1>
                </div>

                <div class="form-label-group">
                  <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required>
                  <label for="inputEmail">Email address</label>
                </div>

                <div class="form-label-group">
                  <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                  <label for="inputPassword">Password</label>
                </div>

                <div class="form-label-group">
                  <input type="password" id="inputConfirmPassword" class="form-control" placeholder="Password" required>
                  <label for="inputPassword">Confirm password</label>
                </div>

                <button class="btn btn-lg btn-primary btn-block js-click sing-in">Sign up</button>
              </form>
            </div>
  `,
});

export default signupPage;
