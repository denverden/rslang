class AppStore {
  constructor() {
    this.isLoggedIn = false;
    this.userId = '';
    this.userToken = '';
    this.settings = {};
    this.words = {};
  }

  viewMessage(type = '', text = '') {
    if (type !== '' && text !== '') {
      const msgHtml = `<div class="alert ${type} alert-dismissible fade show" role="alert">
                  <span class="message__text"></span>
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>`;
      document.querySelector('.message .container').innerHTML = msgHtml;
      document.querySelector('.message').classList.remove('d-none');
      document.querySelector('.message__text').innerHTML = text;
    }
  }

  async loadSettings() {
    const id = localStorage.getItem('userId') ? localStorage.getItem('userId') : '';
    const token = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : '';

    if (id !== '' && token !== '') {
      try {
        const res = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        const result = await res.json();

        if (result) {
          this.isLoggedIn = true;
          this.userId = id;
          this.userToken = token;
        } else {
          this.isLoggedIn = false;
        }
      } catch (err) {
        this.isLoggedIn = false;
      }
    } else {
      this.isLoggedIn = false;
    }
  }
}

export default new AppStore();
