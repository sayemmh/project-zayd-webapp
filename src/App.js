import React, { Component } from 'react';
import { Provider } from 'react-redux'
import './css/App.css';
import store from './store'
import Game from './containers/Game'
import "bootstrap/dist/css/bootstrap.min.css";
import TopNavBar from "./components/TopNavBar";
import Footer from "./components/Footer";
// import { GoogleLogin } from "react-google-login";
// import config from "./config.json";

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = { isAuthenticated: false, user: null, token: "" };
  // }

  // logout = () => {
  //   this.setState({ isAuthenticated: false, token: "", user: null });
  // };

  // onFailure = error => {
  //   alert(error);
  // };

  // googleResponse = response => {
  //   const tokenBlob = new Blob(
  //     [JSON.stringify({ access_token: response.accessToken }, null, 2)],
  //     { type: "application/json" }
  //   );
  //   const post_options = {
  //     method: "POST",
  //     body: tokenBlob,
  //     mode: "cors",
  //     cache: "default"
  //   };
  //   fetch("http://localhost:5000/api/v1/auth/google", post_options).then(
  //     res => {
  //       const token = res.headers.get("x-auth-token");
  //       console.log(res);
  //       res.json().then(user => {
  //         if (token) {
  //           this.setState({ isAuthenticated: true, user, token });
  //         }
  //       });
  //     }
  //   );
  // };

  render() {

    // let loginButton = this.state.isAuthenticated ? (
    //   <div>
    //     <p>Authenticated</p>

    //     <div>
    //       <button onClick={this.logout} className="button">
    //         Log out
    //       </button>
    //     </div>
    //   </div>
    // ) : (
    //     <div>
    //       <GoogleLogin
    //         clientId={config.GOOGLE_CLIENT_ID}
    //         buttonText="Login"
    //         onSuccess={this.googleResponse}
    //         onFailure={this.onFailure}
    //       />
    //     </div>
    //   );
    return (
      <Provider store={store}>
        <div className="App">
          <TopNavBar />
          {/* {loginButton} */}
          <div className="game">
            <Game />
          </div>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
