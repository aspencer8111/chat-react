import React, { Component } from 'react';
import RoomList from './RoomList'
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

  _handleRoomChange(e) {
    this.setState({newRoomName: e.target.value})
  }

  _addRoom(e) {
    e.preventDefault()
    this.roomsRef.push( { name: this.state.newRoomName } )
    e.target.children[0].value = ''
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <RoomList firebase={ firebase }
                    _handleRoomChange={ this._handleRoomChange }
                    _addRoom={ this._addRoom } />
        </div>
      </div>
    );
  }
}

export default App;
