import React, { useState, useEffect } from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import db from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {
  const [messages, setMessages] = useState('')

  useEffect(() => {
    if (id) {
      db
        .collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(querySnapshot => (
          setMessages(querySnapshot.docs.map(message => {
            const data = message.data()
            data.id = message.id
            return data
          }))
        ))
    }
  }, [id])

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      db.collection('rooms').add({
        name: roomName
      })
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p> {messages[0]?.message} </p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  )
}


export default SidebarChat
