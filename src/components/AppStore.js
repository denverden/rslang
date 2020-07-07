class AppStore {
  constructor() {
    this.isLoggedIn = false;
    this.userId = '';
    this.userToken = '';
    this.settings = {};
  }

  viewMessage(type = '', text = '', time = 4000) {
    const classToast = {
      'alert-primary': 'bg-primary text-white',
      'alert-secondary': 'bg-secondary text-white',
      'alert-success': 'bg-success text-white',
      'alert-danger': 'bg-danger text-white',
      'alert-warning': 'bg-warning text-dark',
      'alert-info': 'bg-info text-white',
      'alert-light': 'bg-light text-dark',
      'alert-dark': 'bg-dark text-white',
    };
    if (type !== '' && text !== '') {
      const toast = document.createElement('p');
      toast.innerHTML = `<div class="toast fade show" role="alert">
                          <div class="toast-header ${classToast[type]}">
                            <strong class="mr-auto">${type.replace('alert-', '').toUpperCase()}</strong>
                            <button type="button" class="ml-2 mb-1 close text-white" data-dismiss="toast" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="toast-body">
                            ${text}
                          </div>
                        </div>`;
      const currentToast = document.querySelector('.message').appendChild(toast);
      setTimeout(() => {
        currentToast.classList.add('fade');
        setTimeout(() => {
          currentToast.remove();
        }, 500);
      }, time);
      currentToast.querySelector('.close').addEventListener('click', () => {
        currentToast.classList.add('fade');
        setTimeout(() => {
          currentToast.remove();
        }, 500);
      });
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
          this.settings = result;
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
