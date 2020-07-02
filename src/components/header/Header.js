/* eslint-disable no-restricted-globals */
import Component from '../Component';
import AppStore from '../AppStore';

class Header extends Component {
  logout() {
    // eslint-disable-next-line no-alert
    const isLogout = confirm('Do you really want to log out?');
    if (isLogout) {
      localStorage.clear();
      AppStore.isLoggedIn = false;
      AppStore.userId = '';
      AppStore.userToken = '';
      AppStore.settings = {};
      window.location.href = '';
    }
  }

  afterRender() {
    const BTN_LOGOUT = document.querySelector('.logout');
    const BTN_SINGIN = document.querySelector('.singin');
    if (AppStore.isLoggedIn) {
      BTN_LOGOUT.classList.remove('d-none');
      BTN_SINGIN.classList.add('d-none');
      document.querySelectorAll('.nav-item.d-none').forEach(
        (e) => e.classList.remove('d-none'),
      );
    } else {
      BTN_LOGOUT.classList.add('d-none');
      BTN_SINGIN.classList.remove('d-none');
      document.querySelectorAll('.nav-item.d-none').forEach(
        (e) => e.classList.add('d-none'),
      );
    }
    BTN_LOGOUT.addEventListener('click', () => { this.logout(); });
  }
}

const header = new Header({
  selector: 'header',
  template: `
            <nav class="navbar navbar-expand-lg navbar-light bg-light px-5 py-4">
              <div class="container-fluid">
                <a class="navbar-brand" href="#">RS LANG</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarText">
                  <ul class="navbar-nav text-right">
                    <li class="nav-item">
                      <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#about">About</a>
                    </li>
                    <li class="nav-item learn d-none">
                      <a class="nav-link" href="#learn">Learn</a>
                    </li>
                    <li class="nav-item games d-none">
                      <a class="nav-link" href="#games">Games</a>
                    </li>
                    <li class="nav-item dictionary d-none">
                      <a class="nav-link" href="#dictionary">Dictionary</a>
                    </li>
                    <li class="nav-item settings d-none">
                      <a class="nav-link" href="#settings">Settings</a>
                    </li>
                    <li class="nav-item">
                      <a class="btn btn-secondary singin" href="#sign-in">Sign In</a>
                      <button class="btn btn-secondary logout d-none">Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          `,
});

export default header;
