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
      newMessage: '',
      messages: []
    }
    this.messagesRef = firebase.database().ref('messages')
  }

  _handleRoomChange(e) {
    this.setState({newRoomName: e.target.value})
  }

  _handleMessageChange(e) {
    this.setState({newMessage: e.target.value})
  }

  addRoom(e) {
    e.preventDefault()
    this.roomsRef.push( { name: this.state.newRoomName } )
    e.target.children[0].value = ''
  }

  addMessage(e) {
    e.preventDefault()
    let message = {
      content: this.state.newMessage,
      username: 'alex',
      roomId: this.state.activeRoomId,
      sentAt: firebase.database.ServerValue.TIMESTAMP
    }
    this.messagesRef.push(message)
  }

  setRoom(room) {
    this.setState({  messages: [] })
    this.messagesRef.orderByChild("roomId").equalTo(room.key).on('child_added', snapshot  => {
      const message = Object.assign(snapshot.val(), {key: snapshot.key})
      this.setState({ messages: this.state.messages.concat( message ) })
    })
    this.setState({ activeRoomId: room.key })
  }

  showMessagesDiv() {
    if (this.state.activeRoomId === '') {
      return <em>Select A Room</em>
    } else {
      return (
        <div className="Messages">
          <MessageList firebase={ firebase }
                       messages={ this.state.messages }
                       addMessage={ this.addMessage.bind(this) }
                       _handleMessageChange={ this._handleMessageChange.bind(this) } />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Rooms">
          <RoomList firebase={ firebase }
                    _handleRoomChange={ this._handleRoomChange }
                    addRoom={ this.addRoom }
                    setRoom={ this.setRoom.bind(this) }/>
        </div>
        {  this.showMessagesDiv() }
      </div>
    );
  }
}

export default App;
