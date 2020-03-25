import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { RegistrationForm } from './registration';
import logo from './logo.svg';
import './App.css';

function App() {
  const [hasRegistered, setRegistered] = useState(false)

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Container>
      {
          hasRegistered
            ? null
            : (<RegistrationForm register={() => setRegistered(true)} />)
        }
      </Container>
    </div>
  );
}

export default App;
