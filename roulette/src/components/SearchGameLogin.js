import React, { useState } from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { getGame } from '../store/actions/gameAction';
import { Link } from "react-router-dom";

function SearchGameLogin({ chosenGame, game, getGame }) {

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
                width: theme.spacing(40),
                height: theme.spacing(40),
            },
        },
        button: {
            margin: theme.spacing(1),
        },
    }));

    const classes = useStyles();
    const [nick, setNick] = useState("");
    const [cash, setCash] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [errorNick, setErrorNick] = useState({ text: "", error: false });
    const [errorCash, setErrorCash] = useState({ text: "", error: false });


    function onChangeNick(event) {
        setNick(event.target.value)
        if (chosenGame.users.find(u => u.nick === event.target.value)) {
            setErrorNick({ text: "This nick is taken!", error: true })
        } else {
            setNick(event.target.value)
            setErrorNick({ text: "", error: false })
        }
    }

    function onChangeCash(event) {
        setCash(event.target.value !== "" ? parseInt(event.target.value) : "")
        if (event.target.value < 50) {
            setErrorCash({ text: "You can't start with less than 50!", error: true })
        } else {
            setCash(parseInt(event.target.value))
            setErrorCash({ text: "", error: false })
        }
    }


    return (
        <div className={classes.paper}>
            <Paper elevation={3}>
                <h3>Login</h3>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        helperText={errorNick.text}
                        error={errorNick.error}
                        id="outlined-basic"
                        label="Nick"
                        variant="outlined"
                        onChange={(e) => onChangeNick(e)}
                        value={nick}
                        disabled={confirm} />
                    <TextField
                        id="outlined-basic"
                        helperText={errorCash.text}
                        error={errorCash.error}
                        label="Cash"
                        variant="outlined"
                        onChange={(e) => onChangeCash(e)}
                        value={cash}
                        disabled={confirm} />
                    {confirm ? null : <Button disabled={errorNick.error || errorCash.error} className={classes.button} variant="contained" onClick={() => { getGame(chosenGame.id, nick, cash); setConfirm(true) }}>Confirm</Button>}
                    {confirm ? <Link to={`/game/${game ? game.id : ""}`} style={{ textDecoration: 'none' }}>
                        <Button className={classes.button} variant="contained">Start!</Button>
                    </Link> : null}
                </form>
            </Paper>
        </div>
    );

}

const mapStateToProps = (state) => ({
    game: state.game.game
})

export default connect(mapStateToProps, { getGame })(SearchGameLogin);