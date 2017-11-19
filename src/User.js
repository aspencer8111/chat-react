import React, { Component } from 'react';

class User extends Component {
  showUserAuthButtons() {
    if(this.props.username){
      return <button onClick={ this.props.logout }>LogOut</button>
    } else {
      return <button onClick={ this.props.login }>LogIn</button>
    }
  }

  render() {
    return (
      <div className="userButtons">
        { this.showUserAuthButtons() }
      </div>
    )
  }
}

export default User
