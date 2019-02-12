class AccountPage extends Component {

  constructor(navBar) {
    super();
    this.addRoute('/mitt-konto', 'Mitt konto');
    this.navBar = navBar;
    this.loginHandler = new LoginHandler(this.navBar, this);
    this.addEvents({
      'click .logOutBtn': 'logOut',
      'click .loginBtn': 'logIn',
      'click .registerBtn': 'register',
      'click .testrest': 'testrest'
    });
    this.loggedIn = false;
    this.loginNotify = "";
    this.registerNotify = "";
    this.userData = {};
    this.checkUserLoginState();
    this.userBookings = [];
  }

  mount() {
    if (!this.loggedIn) {
      // Not logged in do whatever u like here
      this.userBookings = [];
    } else {
      this.fetchBookings();
    }
  }

  async fetchBookings() {
    let jewser = await User.find(`.find({_id: "${this.userData._id}"})`);
    let jewserBookings = jewser[0].bookings;

    for (let booking of jewserBookings) {
      if (booking.show.movie.title) {
        this.userBookings.push(booking);
      }
    }

    this.showUserBookings()
    this.render();
  }


  showUserBookings() {
    let html = "";

    function getTicketHtml(data) {
      let adult = data.tickets.adult;
      let senior = data.tickets.senior;
      let kids = data.tickets.kids;
      let seats = data.seats.join(', ');
      return `
      <ul class="list-group">
        <p class="font-weight-bold">Bokade biljetter</p>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Vuxna<span class="badge badge-primary badge-pill">${adult}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Barn<span class="badge badge-primary badge-pill">${kids}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Pensionärer<span class="badge badge-primary badge-pill">${senior}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Platser: ${seats}
        </li>
      </ul>
      `
    }

    for (let booking of this.userBookings) {
      let tickets = getTicketHtml(booking);
      let place = booking.show.auditorium.name;
      let date = booking.show.date;
      let time = booking.show.time;
      let movieTitle = booking.show.movie.title;
      let description = "Ska vi ha filmens beskrivning också eller info overload?";
      let picpath = `/images/${booking.show.movie.images[0]}`;
      html += `
      <div class="card text-center mb-2">
        <div class="card-header">
          <span class="font-weight-bold">${date}</span> klockan ${time} i
          <span class="font-weight-light">${place}</span>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <div class="text-center mb-2">
                <h4>${movieTitle}</h4>
                <img src="${picpath}" class="rounded" alt="Bild på omslaget för ${movieTitle}">
              </div>
            </div>
            <div class="col">
            ${tickets}
            <p class=" jumbotron">${description}</p>
            </div>
          </div>
        </div>
        <div class="card-footer text-muted">
          <a href="#" class="btn btn-danger">Avboka biljetterna?</a>
        </div>
      </div>
      `
    }
    return html;
  }


  async checkUserLoginState() {
    let state = await this.loginHandler.checkLogin()
    if (state.msg == "ok") {
      this.updateUserData(state);
      this.loginState(true);
    } else {
      this.loginState(false);
    }
  }

  async logIn() {
    let userData = {
      "email": $('.loginUserEmail').val(),
      "password": $('.loginUserPassword').val()
    }

    if (!this.loginHandler.emailValidator(userData.email) || !userData.password) {
      this.redirectToLogin("Kontrollera att du har en giltig e-post adress och att du fyllt i ett lösenord.");
      return;
    }

    let res = await this.loginHandler.loginUser(userData);

    if (res.msg == "ok") {
      this.updateUserData(res);
      this.loginState(true);
    } else if (res.msg == "goregister") {
      this.redirectToRegister('Du är ännu inte medlem. Skapa gärna ett konto :)');
    } else if (res.msg == "badpass") {
      this.redirectToLogin('Hmm.. säker på ditt lösen?');
    }
  }

  async logOut() {
    let status = await this.loginHandler.logOut();

    if (status.msg == "ok") {
      this.loginState(false);
      this.userData = {};
      this.render();
    }
  }

  async register() {
    let userData = {
      "email": $('.regUserEmail').val(),
      "name": $('.regUserName').val(),
      "password": $('.regUserPassword').val()
    }

    if (!this.loginHandler.emailValidator(userData.email) || !userData.password || !userData.name) {
      this.redirectToRegister("Alla fält måste vara korrekt ifyllda.");
      return;
    }

    let res = await this.loginHandler.registerUser(userData);

    if (res.msg == "ok") {
      this.updateUserData(res);
      this.loginState(true);
    } else if (res.msg == "login") {
      this.redirectToLogin('Hur många konton ska du ha egentligen? Logga in istället :P');
    }

  }


  updateUserData(state) {
    // Accept userdata from backend
    Object.assign(this.userData, state);
  }

  loginState(bool) {
    if (bool) {
      this.clearNotifications();
      AccountPage.auth = true;
    } else {
      AccountPage.auth = false;
    }
    this.loggedIn = bool;
    this.mount();
    this.render();
    this.navBar.updateNavStatus(this);
  }

  redirectToLogin(msg) {
    this.loginNotify = msg;
    this.render();
    $('#collapseLogin').collapse()
  }

  redirectToRegister(msg) {
    this.registerNotify = msg;
    this.render();
    $('#collapseRegister').collapse();
  }

  clearNotifications() {
    this.loginNotify = "";
    this.registerNotify = "";
    this.render();
  }

}

AccountPage.auth = false;