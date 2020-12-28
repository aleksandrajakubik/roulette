import React from 'react';
import '../styles/App.css'
import Game from './Game';
import UserList from './UserList';
import Chat from './Chat';

function App() {

  return (
    <div className="App">
      <Game />
      <UserList />
      <Chat />
    </div>
  );
}

export default App;