import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { postBet, confirmBet, deleteUser, changeBet } from '../store/actions/gameAction';

function Game({ game, client, postBet, confirmBet, deleteUser, changeBet }) {

    useEffect(() => {
        client.subscribe('newGameStatus');
        client.subscribe('rolledNumber');
        client.on('message', (topic, payload, packet) => {
            if (topic === "rolledNumber") {
                setRolledNumber(parseInt(payload.toString()));
                setBetted(false)
                setConfirmed(false)
            }
        });
    }, [client])

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },

    }));

    const classes = useStyles();
    const [bet, setBet] = useState(0);
    const [value, setValue] = useState('black');
    const [rolledNumber, setRolledNumber] = useState("");
    const [betted, setBetted] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const userCash = game.game.users.find(u => u.id === game.user.id).cash;

    return (
        <div className='Game'>
            <div className='GameState'>
                <p>Your cash: </p>
                <p>{userCash}</p>
                <p>Rolled number:</p>
                <p>{rolledNumber ? rolledNumber : "Game has not started yet!"}</p>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Your bet:</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="black" control={<Radio color="primary" />} label="Black" />
                        <FormControlLabel value="red" control={<Radio color="primary" />} label="Red" />
                        <FormControlLabel value="odd" control={<Radio color="primary" />} label="Odd" />
                        <FormControlLabel value="even" control={<Radio color="primary" />} label="Even" />
                    </RadioGroup>
                    <TextField id="outlined-basic" label="Cash" onChange={(e) => setBet(parseInt(e.target.value))} value={bet} variant="outlined" />
                </FormControl>
                {betted ? <Button
                    className={classes.button}
                    variant="contained"
                    disabled={confirmed}
                    onClick={() => changeBet(game.user.id, bet, value, game.game.id)}>Change Bet</Button> :
                    <Button
                        className={classes.button}
                        variant="contained"
                        disabled={confirmed}
                        onClick={() => {
                            postBet(game.user.id, bet, value, game.game.id);
                            setBetted(true)
                        }}>
                        Bet
                    </Button>
                }
                <Button
                    className={classes.button}
                    variant="contained"
                    onClick={() => {
                        confirmBet(game.game.id);
                        setConfirmed(true)
                    }}>
                    Confirm
                    </Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    client: state.game.client
})

export default connect(mapStateToProps, { postBet, confirmBet, deleteUser, changeBet })(Game);