import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  function buttonClick (e) {
    console.log('123', e)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={buttonClick}>Click</button>
      </header>
    </div>
  );
}

export default App;
