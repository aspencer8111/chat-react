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
      <section className='roomList'>
      <ul>
      {
       this.state.rooms.map(room =>
         <div>
         <div id={room.key}>{ room }</div>
         </div>
       )
      }
      </ul>
      </section>
    )
  }
}

export default RoomList
