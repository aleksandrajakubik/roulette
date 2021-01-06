import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { getGames } from '../store/actions/gameAction';
import PlayerRole from './PlayerRole';
import { Button } from '@material-ui/core';

function SearchGames({ games, getGames }) {

    useEffect(() => {
        getGames()
    }, []);

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    const [gameId, setGameId] = useState("");
    const chosenGame = gameId !== "" ? games.find(g => g.id === gameId) : null;

    return (
        <div>
            {gameId !== "" ? <PlayerRole chosenGame={chosenGame}/> : 
            games.length !== 0 ? games.map((g, index) =>
                <Button key={g.id} className={classes.button} variant="contained" onClick={() => setGameId(g.id)}>{`Game ${index}`}</Button>)
                : <p>No games have been created yet!</p>
            }
        </div>
    )
}


const mapStateToProps = (state) => ({
    games: state.game.allGames
})

export default connect(mapStateToProps, { getGames })(SearchGames);