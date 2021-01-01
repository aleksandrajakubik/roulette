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
import { postBet, confirmBet } from '../store/actions/gameAction';

function Game({ game, client, postBet, confirmBet }) {

    useEffect(() => {
        client.subscribe('winners');
        client.on('message', (topic, payload, packet) => {
            if(topic==='winners'){
                console.log(payload.toString())
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

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className='Game'>
            <div className='GameState'>
                <p>Your cash: </p>
                <p>{game.user.cash}</p>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Your bet:</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="black" control={<Radio color="primary"/>} label="Black" />
                        <FormControlLabel value="red" control={<Radio color="primary"/>} label="Red" />
                        <FormControlLabel value="odd" control={<Radio color="primary"/>} label="Odd" />
                        <FormControlLabel value="even" control={<Radio color="primary"/>} label="Even" />
                    </RadioGroup>
                    <TextField id="outlined-basic" label="Cash" onChange={(e) => setBet(parseInt(e.target.value))} value={bet} variant="outlined"/>
                </FormControl>
                <Button className={classes.button} variant="contained" onClick={() => postBet(game.user.id, bet, value, game.game.id)}>Bet</Button>
                <Button className={classes.button} variant="contained" onClick={() => confirmBet(game.game.id)}>Confirm</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    gameState: state.game.game,
    client: state.game.client
})

export default connect(mapStateToProps, { postBet, confirmBet })(Game);