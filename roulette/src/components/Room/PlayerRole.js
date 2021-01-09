import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import SearchGameLogin from '../Login/SearchGameLogin';
import ViewerLogin from '../Login/ViewerLogin';

function PlayerRole({ chosenGame }) {

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        paper: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(5),
                width: theme.spacing(25),
                height: theme.spacing(25),
            },
        },
        button: {
            margin: theme.spacing(1),
        },
    }));

    const classes = useStyles();
    const [role, setRole] = useState("");

    return (
        <div>
            {role === "player" ? <SearchGameLogin chosenGame={chosenGame} /> : (role === "viewer" ? <ViewerLogin chosenGame={chosenGame}/>: null)}
            {role === "" ?
                <div className={classes.paper}>
                    <Paper elevation={3}>
                        <h3>Choose your role</h3>
                        {chosenGame.users.length < chosenGame.maxUsers ? 
                        <>
                        <Button className={classes.button} variant="contained" onClick={() => setRole("player")}>Player</Button>
                        <Button className={classes.button} variant="contained" onClick={() => setRole("viewer")}>Viewer</Button>
                        </>
                        :
                        <Button className={classes.button} variant="contained" onClick={() => setRole("viewer")}>Viewer</Button>
                        }
                    </Paper>
                 </div> : null}
        </div>
    );

}

export default PlayerRole;