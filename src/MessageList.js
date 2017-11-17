import React, { Component } from 'react';

class MessageList extends Component {
  render () {
    return (
      <div>
        <h3>Messages</h3>
        {this.props.messages.map((message, i) => {
          return <p key={i}>{message.content}</p>
        })}
      </div>
    )
  }
}

export default MessageList
