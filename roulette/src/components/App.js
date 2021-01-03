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
import NewGameLogin from './NewGameLogin';
import Room from './Room';
import SearchGames from './SearchGames';
import SearchGamesLogin from './SearchGameLogin';

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
            <NewGameLogin />
          </Route>
          <Route path="/games">
            <SearchGames />
          </Route>
          <Route path="/searchLogin">
            <SearchGamesLogin />
          </Route>
          <Route path="/game/:id">
            <Room />
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
