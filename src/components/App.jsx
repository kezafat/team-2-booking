import React, { Component } from 'react';
import '../avoidFOUC';
import NavBar from './NavBar'
import Footer from './Footer'
import MoviesContainer from './MoviesContainer'
import ShowContainer from './ShowContainer'
import StartPage from './StartPage'
import Auditoria from './Auditoria'
import Auditorium from './Auditorium'
import AccountPage from './account/AccountPage'
import LoginPage from './account/LoginPage'
import RegisterPage from './account/RegisterPage'
import UserPage from './account/UserPage'
import { Route, } from 'react-router-dom'
import { Spinner, } from 'reactstrap'
import BookShow from './BookShow'

class App extends Component {
  constructor(props) {
    super(props);
    this.setAuth = this.setAuth.bind(this);
    global.auth = false;
    global.user = {};
    this.state = {
      setAuth: this.setAuth,
      display: "welcome",
      linkVal: <Spinner />,
    }
  }

  setAuth(data, userdata = {}) {
    global.auth = data.authStatus;
    global.user = userdata;
    this.setState(data);
  }

  render() {
    return (
      <div className="App">
        <header>
          <NavBar state={this.state} />
        </header>
        <main className="container">
          <Route exact path="/" component={StartPage} />
          <Route path="/filmer" component={MoviesContainer} />
          <Route path="/visningar" component={ShowContainer} />
          <Route exact path="/biografer" component={Auditoria} />
          <Route path="/biografer/:name" component={Auditorium} />
          <Route exact path="/konto" render={() => <div><AccountPage state={this.state} /></div>} />
          <Route exact path="/logga-in" render={() => <div><LoginPage state={this.state} /></div>} />
          <Route exact path="/registrera-konto" render={() => <div><RegisterPage state={this.state} /></div>} />
          <Route exact path="/mitt-konto" render={() => <div><UserPage state={this.state} /></div>} />
        </main>
        <Footer />
        <header>
          <NavBar />
        </header>
        <main className="main-content container mt-4 mb-3">
          <Route exact path="/" component={StartPage} />
          <Route path="/filmer" component={MoviesContainer} />
          <Route exact path="/visningar" component={ShowContainer} />
          <Route path="/visningar/:auditorium/:date/:time" component={BookShow} />
          <Route exact path="/biografer" component={Auditoria} />
          <Route path="/biografer/:name" component={Auditorium} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
