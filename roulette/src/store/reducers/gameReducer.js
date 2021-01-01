import { GET_NEWGAME, CONNECT_MQTT, GET_CASH } from '../types';

const initialState = {
    user: null,
    game: null,
    client: null
}

export default function(state = initialState, action) {

    switch(action.type){

        case GET_NEWGAME: {
            return {
                ...state,
                user: {id: action.payload[0].id, nick: action.payload[0].nick, cash: action.payload[0].cash},
                game: action.payload[1]
            }
        }

        case CONNECT_MQTT: {
            return {
                ...state,
                client: action.payload
            }
        }

        case GET_CASH: {
            return {
                ...state, 
                user: {...state.user, cash: action.payload}
            }
        }

        default: {
            return state
        }
    }
}