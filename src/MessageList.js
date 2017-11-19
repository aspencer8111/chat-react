import React, { Component } from 'react';

class MessageList extends Component {
  render () {
    return (
      <div>
        <h3>Messages</h3>
        {this.props.messages.map((message, i) => {
          return <p key={i}>{`${message.username} said: ${message.content}`}</p>
        })}
        <hr />
        <form onSubmit={this.props.addMessage}>
          <input type='input' onChange={this.props._handleMessageChange} placeholder='Say something cool!'/>
          <input type='submit' value="GO!" />
        </form>
      </div>
    )
  }
}

export default MessageList
