import React from 'react';
import './App.css';
import Header from "./components/lobby/header";
import Body from "./components/lobby/body";

function App() {
  return (
      <div className="wrap_app">
          <Header/>
          <Body></Body>
      </div>
  )
}
export default App;
