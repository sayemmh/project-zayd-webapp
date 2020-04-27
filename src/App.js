import React, { Component } from 'react';
import { Provider } from 'react-redux'
import './css/App.css';
import store from './store'
import Game from './containers/Game'
import "bootstrap/dist/css/bootstrap.min.css";
import TopNavBar from "./components/TopNavBar";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <TopNavBar />
          <div className="game">
            <Game />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
