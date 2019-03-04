import React, { Component } from 'react';
import '../avoidFOUC';
import NavBar from  './NavBar'
import MoviesContainer from './MoviesContainer'
import ShowContainer from './ShowContainer'
import StartPage from './StartPage'
import Auditoria from './Auditoria'
import Auditorium from './Auditorium'
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
        <NavBar />
      </header>
      <main className="container">
        <Route exact path="/" component={StartPage} />
        <Route path="/filmer" component={MoviesContainer} />
        <Route path="/visningar" component={ShowContainer} />
        <Route exact path="/biografer" component={Auditoria} /> 
        <Route path ="/biografer/:name" component={Auditorium} />
      </main>
      <footer>

      </footer>
      </div>
    );
  }
}

export default App;