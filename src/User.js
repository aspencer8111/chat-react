import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <div className="userButtons">
        <button onClick={ this.props.login }>LogIn</button>
        <button onClick={ this.props.logout }>LogOut</button>
      </div>
    )
  }
}

export default User
