class PageContent extends Component {
  constructor(navBar) {
    super();
    this.navBar = navBar;
    this.startPage = new StartPage();
    this.moviePage = new MoviePage();
    this.aboutPage = new AboutUs();
    this.moviesSchedulePage = new MoviesSchedulePage();
    this.bookingConfirmation = new BookingConfirmation();
    this.accountPage = new AccountPage(this.navBar);
    this.bookShowPage = new BookShowPage();
  }
}
