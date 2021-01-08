import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import '../styles/View.css';
import Paper from '@material-ui/core/Paper';
import Chat from './Chat';
import { updateGame, deleteUser } from '../store/actions/gameAction';


function View({ game, updateGame, deleteUser }) {

    useEffect(() => {
        game.client.subscribe(`update`);
        game.client.subscribe(`rolledNumber`);
        game.client.on('message', (topic, payload, packet) => {
            if (topic === 'update') {
                updateGame(payload)
            }
            if (topic === 'rolledNumber') {
                setRolledNumber(parseInt(payload.toString()));
            }
        });
        return () => {
            deleteUser(game.game.id, game.user.id)
            game.client.publish(`chat/${game.game.id}`, `${game.user.nick} (viewer) has left`)
        };
    }, []);

    const useStyles = makeStyles((theme) => ({
        paper: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(30),
                height: theme.spacing(30),
            },
        },
    }));
    const classes = useStyles();
    const [rolledNumber, setRolledNumber] = useState("")

    return (
        <div className="View">
            <h2>Rolled number: {rolledNumber}</h2>
            <div className="ViewGame" >
                <div className="Players">
                    <h2>Players</h2>
                </div>
                {game.game.users.map(g =>
                    <div key={g.id} className={classes.paper}>
                        <Paper elevation={3}>
                            <p><b>{g.nick}</b></p>
                            <p>Cash: {g.cash}</p>
                            <p>Bet cash: {game.game.bets.length > 0 ? 
                                game.game.bets.filter(b => b["bettingUser"]["id"] === g.id).length > 0 ? game.game.bets.filter(b => b["bettingUser"]["id"] === g.id)[0].bet.cash : "no bet yet"
                                : "no bet yet"}</p>
                            <p>Bet type: {game.game.bets.length > 0 ? 
                                game.game.bets.filter(b => b["bettingUser"]["id"] === g.id).length > 0 ? game.game.bets.filter(b => b["bettingUser"]["id"] === g.id)[0].bet.type : "no bet yet"
                                : "no bet yet"}</p>
                        </Paper>
                    </div>
                )
                }
            </div>
            <Chat user={game.user} role={"viewer"} component={"view"} />
        </div>
    );
}
const mapStateToProps = (state) => ({
    game: state.game
})

export default connect(mapStateToProps, { updateGame, deleteUser })(View);