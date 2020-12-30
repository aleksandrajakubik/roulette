import React from 'react';
import '../styles/Room.css'
import Game from './Game';
import UserList from './UserList';
import Chat from './Chat';

function Room({ game }) {
  return (
    <div className="Room">
      <Game />
      <UserList user={game.user}/>
      <Chat />
    </div>
  );
}

export default Room;