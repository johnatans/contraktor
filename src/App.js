import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import Home from './screens/Home.js';
import List from './screens/List.js';
import Footer from './components/Footer.js';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Router>

        <header className="header">
          <Link to="/">
            <h1>Contraktor</h1>
          </Link>
          <ul>
            <li>
              <Link to="/lista">Lista</Link>
            </li>
            <li>
              <Link to="/">Cadastro</Link>
            </li>
          </ul>
        </header>

        <Switch>
          <Route path="/lista">
            <List />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        
        <Footer />
      </Router>
    )
  };

};

export default App;
