import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: []
    }
    this.roomsRef = this.props.firebase.database().ref('rooms')
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot  => {
      const room = Object.assign(snapshot.val(), {key: snapshot.key})
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  render() {
    return (
      <div className="roomList">
        <h3>Rooms</h3>
        <section className='roomList'>
          <form onSubmit={ this.props.addRoom.bind(this) }>
            <div className="form-group">
              <input className="form-control" onChange={ this.props._handleRoomChange.bind(this) } type='text' placeholder='New Room Name' />
              <br />
              <input type='submit' value='Add Room' className="btn btn-primary"/>
            </div>
          </form>
          <ul>
          {
           this.state.rooms.map((room, i) =>
            <li key={i} onClick={ () => { this.props.setRoom(room) } } >{ room.name } </li>
           )
          }
          </ul>
        </section>
      </div>
    )
  }
}

export default RoomList
