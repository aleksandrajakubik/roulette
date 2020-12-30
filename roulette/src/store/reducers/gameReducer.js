import { GET_NEWGAME } from '../types';

const initialState = {
    user: null,
    game: null
}

export default function(state = initialState, action) {

    switch(action.type){

        case GET_NEWGAME: {
            return {
                user: {id: action.payload[0].id, nick: action.payload[0].nick, cash: action.payload[0].cash},
                game: action.payload[1]
            }
        }

        default: {
            return state
        }
    }
}