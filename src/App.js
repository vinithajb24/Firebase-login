import logo from './logo.svg';
import './App.css';
import Authen from './Authen';
import { Component } from 'react';

class App extends Component {
  render(){
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
          </div>
      <Authen />
    </div>
  );
}
}
export default App;
