import { GET_NEWGAME, CONNECT_MQTT, GET_CASH, GET_ALL_GAMES, UPDATE_GAME } from '../types';
import axios from 'axios';
const MQTT = require('mqtt');

export const connectToMQTT = () => async dispatch => {
    try {
        const client = MQTT.connect('ws://10.45.3.251:8000/mqtt');
        dispatch({
            type: CONNECT_MQTT,
            payload: client
        })

    } catch(e) {
        console.log(e)
    }
}

export const getNewGame = (nick, cash) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:5000/games', {nick: nick, cash: cash});
        dispatch({
            type: GET_NEWGAME,
            payload: res.data
        })

    } catch (e) {
        console.log(e)
    }
}

export const getGame = (id, nick, cash) => async dispatch => {
    try {
        const res = await axios.post(`http://localhost:5000/games/${id}`, {nick, cash});
        dispatch({
            type: GET_NEWGAME,
            payload: res.data
        })
    } catch(e) {
        console.log(e)
    }
}

export const getGames = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/games');
        dispatch({
            type: GET_ALL_GAMES,
            payload: res.data
        })

    } catch(e) {
        console.log(e)
    }
}

export const updateGame = (game) => dispatch => {
    dispatch({
        type: UPDATE_GAME,
        payload: JSON.parse(game)
    })
}

export const getUserCashAfterRoll = (cash) => dispatch => {
    dispatch({
        type: GET_CASH,
        payload: cash
    })
}

export const postBet = (userId, cash, type, id) => async dispatch => {
    try {
        await axios.post(`http://localhost:5000/games/${id}/bet`,{userId, cash, type});
    } catch(e) {
        console.log(e)
    }
}

export const confirmBet = (id) => async dispatch => {
    try {
        const res = await axios.post(`http://localhost:5000/games/${id}/confirm`);
    }
    catch(e) {
        console.log(e)
    }
    
}