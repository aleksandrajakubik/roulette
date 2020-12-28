import React, { useState } from 'react';
import '../styles/App.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Room from './Room';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }))

  const classes = useStyles();

  const [games, setGames] = useState([]);
  const [search, setSearch] = useState(false);

  function getGames(){
    axios.get("http://localhost:5000/games")
      .then(res => {
        return res.data ? setGames(res.data) : null})
    setSearch(true)
  }

  return (
    <div className="App">
      <Button className={classes.margin} variant="contained">New Game</Button>
      <Button className={classes.margin} variant="contained" onClick={getGames}>Search Games</Button>
      { search ? games.length !== 0 ? games.map(g => <p>{g}</p>) : <p>No game have been created yet!</p>: null}
    </div>
  );
}

export default App;