import React, { Component } from 'react';
import RoomList from './RoomList'
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDMYuVMzWCWn5Sryf_vim8ggJ2ViCzoRNI",
  authDomain: "blocchat-alex.firebaseapp.com",
  databaseURL: "https://blocchat-alex.firebaseio.com",
  projectId: "blocchat-alex",
  storageBucket: "blocchat-alex.appspot.com",
  messagingSenderId: "777777566638"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <RoomList firebase={ firebase }/>
        </div>
      </div>
    );
  }
}

export default App;
