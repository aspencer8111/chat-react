import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      newRoomName: ''
    }
    this.roomsRef = this.props.firebase.database().ref('rooms')
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot  => {
      const room = Object.assign(snapshot.val(), {key: snapshot.key})
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  _handleChange(e) {
    this.setState({newRoomName: e.target.value})
  }

  _addRoom(e) {
    e.preventDefault()
    this.roomsRef.push( { name: this.state.newRoomName } )
  }

  render() {
    return (
      <div className="roomList">
        <section className='roomList'>
          <form onSubmit={ this._addRoom.bind(this)  }>
            <input onChange={ this._handleChange.bind(this) } type='text' placeholder='New Room Name' />
            <input type='submit' value='Add Room' />
          </form>
          <ul>
          {
           this.state.rooms.map((room, i) =>
             <div key={i} >
               <div id={room.key}>{ room.name }</div>
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
