import React, { useEffect } from 'react';
import { connect } from "react-redux";
import '../styles/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connectToMQTT } from '../store/actions/gameAction'
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import Room from './Room';

function App({ game, connectToMQTT }) {

  useEffect(() => {
    connectToMQTT()
  }, [])
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
          <Route path="/game/:id">
            <Room game={game} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  game: state.game
})

export default connect(mapStateToProps, { connectToMQTT })(App);
