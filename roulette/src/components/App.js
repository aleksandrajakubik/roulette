import React from 'react';
import '../styles/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Nav from './Nav';
import Home from './Home';
import Login from './Login';

function App() {

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
