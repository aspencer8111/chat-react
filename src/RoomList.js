import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      newRoomName: '',
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
          <form onSubmit={ this.props._addRoom.bind(this)  }>
            <input onChange={ this.props._handleRoomChange.bind(this) } type='text' placeholder='New Room Name' />
            <input type='submit' value='Add Room' />
          </form>
          <ul>
          {
           this.state.rooms.map((room, i) =>
             <div key={i} >
               <div id={room.key}>
                  <li onClick={ () => { this.props._setRoom(room) } } >{ room.name } </li>
               </div>
             </div>
           )
          }
          </ul>
        </section>
      </div>
    )
  }
}

export default RoomList
