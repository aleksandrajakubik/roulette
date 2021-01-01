import { GET_NEWGAME, CONNECT_MQTT } from '../types';
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

export const postBet = (userId, cash, type, id) => async dispatch => {
    try {
        const res = axios.post(`http://localhost:5000/games/${id}/bet`,{userId, cash, type});
    } catch(e) {
        console.log(e)
    }
}

export const confirmBet = (id) => async dispatch => {
    const res = axios.post(`http://localhost:5000/games/${id}/confirm`);
}