import { GET_NEWGAME } from '../types';
import axios from 'axios';

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