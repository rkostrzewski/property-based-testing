import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { RegistrationForm } from './registration';
import { RegisterUserModel } from './registration/Model';
import { ThankYouMessage } from './ThankYouMessage';
import logo from './logo.svg';
import './App.css';

function App() {
  const [user, setUser] = useState<RegisterUserModel | null>(null)

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Container>
      {
          user != null
            ? (<ThankYouMessage email={user.email} />)
            : (<RegistrationForm register={setUser} />)
        }
      </Container>
    </div>
  );
}

export default App;
