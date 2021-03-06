import { GET_NEWGAME, CONNECT_MQTT, GET_VIEWER_GAME, GET_ALL_GAMES, UPDATE_GAME } from '../types';

const initialState = {
    user: null,
    game: null,
    client: null,
    allGames: [],
}

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_NEWGAME: {
            return {
                ...state,
                user: { id: action.payload[0].id, nick: action.payload[0].nick, cash: action.payload[0].cash },
                game: action.payload[1]
            }
        }

        case GET_VIEWER_GAME: {
            return {
                ...state,
                user: { id: action.payload.viewerId, nick: action.payload.nick},
                game: action.payload.game
            }
        }

        case GET_ALL_GAMES: {
            if (action.payload !== false) {
                return {
                    ...state,
                    allGames: action.payload
                }
            } else {
                return {
                    ...state,
                    allGames: []
                }
            }
        }

        case UPDATE_GAME: {
            if (action.payload.id === state.game.id) {
                return {
                    ...state,
                    game: { ...state.game, users: action.payload.users, bets: action.payload.bets}
                }
            }
            return state
        }

        case CONNECT_MQTT: {
            return {
                ...state,
                client: action.payload
            }
        }

        default: {
            return state
        }
    }
}