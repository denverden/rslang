import Component from '../Component';

class Header extends Component {}

const header = new Header({
  selector: 'header',
  template: `
            <div class="container">
              <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">RS LANG</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarText">
                  <ul class="navbar-nav text-right">
                    <li class="nav-item active">
                      <a class="btn btn-secondary" href="#sign-in">Sign In</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
  `,
});

export default header;
