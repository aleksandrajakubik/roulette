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
import LostDialog from './LoserDialog';

function Game({ game, client, postBet, confirmBet, deleteUser, changeBet }) {

    useEffect(() => {
        client.subscribe('newGameStatus');
        client.subscribe(`rolledNumber/${game.game.id}`);
        client.subscribe(`request/${game.game.id}`);
        client.subscribe(`answer/${game.game.id}`);
        client.subscribe('clear')
        client.on('message', (topic, payload, packet) => {
            if (topic === `rolledNumber/${game.game.id}`) {
                setRolledNumber(parseInt(payload.toString()));
                setBetted(false)
                setConfirmed(false)
                setChanged(false);
            }
            if (topic === `request/${game.game.id}`) {
                setRequest({"userId": JSON.parse(payload).userId.toString(),"nick": JSON.parse(payload).nick.toString(), "betType": JSON.parse(payload).betType.toString(), "betCash": parseInt(JSON.parse(payload).betCash)})
            }
            if (topic === `answer/${game.game.id}`) {
                if (JSON.parse(payload).answer.toString() === "YES") {
                    if (JSON.parse(payload).nick.toString() === game.user.nick) {
                        setChanged(true);
                        changeBet(game.user.id, JSON.parse(payload).betType.toString(), parseInt(JSON.parse(payload).betCash), game.game.id);
                    }
                }
            }
            if (topic === 'clear') {
                setRequest({})
                setBet("")
            }
        });
    }, [])

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },

    }));

    const classes = useStyles();
    const [bet, setBet] = useState("");
    const [value, setValue] = useState('black');
    const [rolledNumber, setRolledNumber] = useState("");
    const [betted, setBetted] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [request, setRequest] = useState({});
    const [changed, setChanged] = useState(false);
    const [errorCash, setErrorCash] = useState({ text: "", error: false });

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    function onChangeCash(event) {
        setBet(event.target.value !== "" ? parseInt(event.target.value) : "")
        if (event.target.value > userCash) {
            setErrorCash({ text: "You bet more than you have!", error: true })
        } else {
            setBet(parseInt(event.target.value))
            setErrorCash({ text: "", error: false })
        }
    }

    const handleChangeBet = () => {
        client.publish(`request/${game.game.id}`, `${JSON.stringify({"userId": game.user.id,"nick": game.user.nick, "betCash": bet, "betType": value})}`)
    }

    const handleClose = () => {
        deleteUser(game.game.id, game.user.id)
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
                    {userCash === 0 ? <LostDialog handleClose={handleClose}/> : null}
                    {request.nick ? <ModalDialog nick={request.nick} userId={request.userId} client={client} id={game.game.id} betCash={request.betCash} betType={request.betType} /> : null}
                    <p>Rolled number:</p>
                    <p>{rolledNumber ? rolledNumber : "Game has not started yet!"}</p>
                    <FormControl component="fieldset" disabled={confirmed}>
                        <FormLabel component="legend">Your bet:</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={(e) => handleChange(e)}>
                            <FormControlLabel value="black" control={<Radio color="primary" />} label="Black" />
                            <FormControlLabel value="red" control={<Radio color="primary" />} label="Red" />
                            <FormControlLabel value="odd" control={<Radio color="primary" />} label="Odd" />
                            <FormControlLabel value="even" control={<Radio color="primary" />} label="Even" />
                        </RadioGroup>
                        <TextField id="outlined-basic" helperText={errorCash.text} error={errorCash.error} disabled={confirmed} label="Cash" onChange={(e) => onChangeCash(e)} value={bet} variant="outlined" />
                    </FormControl>
                    {betted ? <Button
                        className={classes.button}
                        variant="contained"
                        disabled={changed || errorCash.error}
                        onClick={handleChangeBet}>Change Bet</Button> :
                        <Button
                            className={classes.button}
                            variant="contained"
                            disabled={confirmed || errorCash.error}
                            onClick={() => {
                                postBet(game.user.id, bet, value, game.game.id);
                                setBetted(true)
                                setBet("")
                            }}>
                            Bet
                    </Button>
                    }
                    {betted ? <Button
                        className={classes.button}
                        variant="contained"
                        disabled={confirmed || errorCash.error}
                        onClick={() => {
                            confirmBet(game.game.id);
                            setConfirmed(true)
                        }}>
                        Confirm
                    </Button> : null}
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