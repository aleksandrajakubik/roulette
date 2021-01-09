import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ModalDialog from './ModalDialog'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { postBet, confirmBet, deleteUser, changeBet } from '../../store/actions/gameAction';
import roulette from '../../styles/roulette.jpg';

function Game({ game, client, postBet, confirmBet, deleteUser, changeBet }) {

    useEffect(() => {
        client.subscribe('newGameStatus');
        client.subscribe('rolledNumber');
        client.subscribe('request');
        client.subscribe('answer');
        client.subscribe('clear')
        client.on('message', (topic, payload, packet) => {
            if (topic === "rolledNumber") {
                setRolledNumber(parseInt(payload.toString()));
                setBetted(false)
                setConfirmed(false)
                setChanged(false);
            }
            if (topic === 'request') {
                setRequestNick(payload.toString())
            }
            if (topic === 'answer') {
                if (JSON.parse(payload).answer.toString() === "YES") {
                    if (JSON.parse(payload).nick.toString() === game.user.nick) {
                        setChanged(true);
                        changeBet(game.user.id, JSON.parse(payload).betType.toString(), parseInt(JSON.parse(payload).betCash), game.game.id);
                    }
                }
            }
            if (topic === 'clear') {
                setRequestNick("")
            }
        });
    }, [])

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
    const [requestNick, setRequestNick] = useState("");
    const [changed, setChanged] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChangeBet = () => {
        client.publish(`request`, `${game.user.nick}`)
    }

    const userCash = game.game.users.find(u => u.id === game.user.id).cash;
    const userBetCash = game.game.bets.length > 0 ? game.game.bets.filter(b => b["bettingUser"]["id"] === game.user.id).length > 0 ? game.game.bets.filter(b => b["bettingUser"]["id"] === game.user.id)[0].bet.cash : "no bet yet" : "no bet yet";
    const userBetType = game.game.bets.length > 0 ? game.game.bets.filter(b => b["bettingUser"]["id"] === game.user.id).length > 0 ? game.game.bets.filter(b => b["bettingUser"]["id"] === game.user.id)[0].bet.type : "no bet yet" : "no bet yet";

    return (
        <>
            <div className='Game'>
                <div>
                    <img src={roulette} />
                </div>
                <div className='GameState'>
                    {requestNick ? <ModalDialog nick={requestNick} userId={game.user.id} client={client} id={game.game.id} betCash={bet} betType={value}/> : null}
                    <p>Rolled number:</p>
                    <p>{rolledNumber ? rolledNumber : "Game has not started yet!"}</p>
                    <FormControl component="fieldset" disabled={confirmed}>
                        <FormLabel component="legend">Your bet:</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel value="black" control={<Radio color="primary" />} label="Black" />
                            <FormControlLabel value="red" control={<Radio color="primary" />} label="Red" />
                            <FormControlLabel value="odd" control={<Radio color="primary" />} label="Odd" />
                            <FormControlLabel value="even" control={<Radio color="primary" />} label="Even" />
                        </RadioGroup>
                        <TextField id="outlined-basic" disabled={confirmed} label="Cash" onChange={(e) => setBet(parseInt(e.target.value))} value={bet} variant="outlined" />
                    </FormControl>
                    {betted ? <Button
                        className={classes.button}
                        variant="contained"
                        disabled={changed}
                        onClick={handleChangeBet}>Change Bet</Button> :
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
                        disabled={confirmed}
                        onClick={() => {
                            confirmBet(game.game.id);
                            setConfirmed(true)
                        }}>
                        Confirm
                    </Button>
                </div>
            </div>
            <div className='Wallet'>
                <h2>Your game status:</h2>
                <p>Your cash: </p>
                <p>{userCash}</p>
                <p>Bet cash: {userBetCash}</p>
                <p>Bet type: {userBetType}</p>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    client: state.game.client
})

export default connect(mapStateToProps, { postBet, confirmBet, deleteUser, changeBet })(Game);