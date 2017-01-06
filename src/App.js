import React, { Component } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ItemBox from './components/ItemBox';
//import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return(
      <div>
        <Header title="Movies"/>
        <SearchBar />
        <ItemBox />
      </div>
    );
  }

  /*
  render(){
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React. Nam!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.

        </p>
      </div>
    );
  }
  */
}

export default App;
