import React, { Component } from 'react';
import { Provider } from 'react-redux'
import './css/App.css';
import store from './store'
import Game from './containers/Game'
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="game">
            <Header />
            <Game />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
