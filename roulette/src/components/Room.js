import React from 'react';
import '../styles/Room.css'
import Game from './Game';
import UserList from './UserList';
import Chat from './Chat';

function Room() {

  return (
    <div className="Room">
      <Game />
      <UserList />
      <Chat />
    </div>
  );
}

export default Room;