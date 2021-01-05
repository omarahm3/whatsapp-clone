import React, { useState, useEffect } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'

function Chat() {
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, _] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(querySnapshot => (
        setRoomName(querySnapshot.data().name)
      ));

      db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(querySnapshot => (
          setMessages(querySnapshot.docs.map(doc => {
            const data  = doc.data()
            data.id     = doc.id
            return data
          }))
        ))
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })

    setInput('');
  }

  return (
    <div className="chat">

      {roomId ? (
        <div className="chat__header">
          <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />

          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            {messages && messages.length > 0 ? (
              <p>Last seen {" "} {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()} </p>
            ) : null}
          </div>

          <div className="chat__headerRight">
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
      ) : null}

      <div className="chat__body">
        {messages.map(message => (
          <p key={message.id} className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
        
      </div>

      {roomId ? (
        <div className="chat__footer">
          <InsertEmoticon />
          <form>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" />
            <button onClick={sendMessage} type="submit">Send a message</button>
          </form>
          <Mic />
        </div>
      ) : null}

    </div>
  )
}

export default Chat
