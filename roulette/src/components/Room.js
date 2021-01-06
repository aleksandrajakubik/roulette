import React, { useEffect } from 'react';
import { connect } from "react-redux";
import '../styles/Room.css'
import Game from './Game';
import UserList from './UserList';
import Chat from './Chat';
import { updateGame, deleteUser } from '../store/actions/gameAction';


function Room({ game, updateGame, deleteUser }) {

  useEffect(() => {
    game.client.subscribe(`update`);
    game.client.on('message', (topic, payload, packet) => {
      if (topic === 'update') {
        updateGame(payload)
      }
    });
    return () => {
      deleteUser(game.game.id, game.user.id)
      game.client.publish(`chat/${game.game.id}`, `${game.user.nick} has left`)
    };
  }, []);

  return (
    <div className="Room">
      <Game game={game} />
      <UserList users={game.game.users} />
      <Chat user={game.user} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  game: state.game
})

export default connect(mapStateToProps, { updateGame, deleteUser })(Room);