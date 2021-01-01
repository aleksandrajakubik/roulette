import React from 'react';
import '../styles/Room.css'
import Game from './Game';
import UserList from './UserList';
import Chat from './Chat';


function Room({ game }) {

  return (
    <div className="Room">
      <Game game={game} />
      <UserList user={game.user} />
      <Chat user={game.user} />
    </div>
  );
}

export default Room;