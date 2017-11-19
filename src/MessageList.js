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
        <form className="form-group" onSubmit={this.props.addMessage}>
          <textarea className="form-control" onChange={this.props._handleMessageChange} placeholder='Say something cool!'></textarea>
          <input className="btn btn-primary" type='submit' value="Submit" />
        </form>
      </div>
    )
  }
}

export default MessageList
