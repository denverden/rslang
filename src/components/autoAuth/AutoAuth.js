import Component from '../Component';
import AppStore from '../AppStore';

class AutoAuth extends Component {
  async beforeRender() {
    const id = localStorage.getItem('userId') ? localStorage.getItem('userId') : '';
    const token = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : '';

    if (id !== '' && token !== '') {
      try {
        const res = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        const result = await res.json();

        if (result) {
          AppStore.isLoggedIn = true;
          AppStore.userId = id;
          AppStore.userToken = token;
        } else {
          AppStore.isLoggedIn = false;
        }
      } catch (err) {
        AppStore.isLoggedIn = false;
      }
    } else {
      AppStore.isLoggedIn = false;
    }
  }
}

const autoAuth = new AutoAuth({
  selector: 'main',
  template: '',
});

export default autoAuth;
