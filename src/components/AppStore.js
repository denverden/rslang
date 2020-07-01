class AppStore {
  constructor() {
    this.isLoggedIn = false;
    this.userId = '';
    this.userToken = '';
    this.settings = {};
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
}

export default new AppStore();
