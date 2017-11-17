import React, { Component } from 'react';
import RoomList from './RoomList'
import MessageList from './MessageList'
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

  constructor(){
    super()
    this.state = {
      activeRoomId: '',
      messages: []
    }
    this.messagesRef = firebase.database().ref('messages')
  }

  _handleRoomChange(e) {
    this.setState({newRoomName: e.target.value})
  }

  _addRoom(e) {
    e.preventDefault()
    this.roomsRef.push( { name: this.state.newRoomName } )
    e.target.children[0].value = ''
  }

  getMessages(roomId) {
    let messagesArray = []
    this.messagesRef.orderByChild("roomId").equalTo(roomId).on("value", function(snapshot) {
      let messagesObj = snapshot.val();
      for( var message in messagesObj) {
        messagesArray.push(messagesObj[message])
      }
    })
    this.setState({ messages: messagesArray })
  }


  _setRoom(room) {
    this.setState({ activeRoomId: room.key })
    this.getMessages(room.key)
  }

  render() {
    return (
      <div className="App">
        <div className="Rooms">
          <RoomList firebase={ firebase }
                    _handleRoomChange={ this._handleRoomChange }
                    _addRoom={ this._addRoom }
                    _setRoom={ this._setRoom.bind(this) }/>
        </div>
        <div className="Messages">
          <MessageList firebase={ firebase }
                       messages={ this.state.messages }/>
        </div>
      </div>
    );
  }
}

export default App;
