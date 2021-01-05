import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { DonutLarge, MoreVert, Chat, SearchOutlined} from '@material-ui/icons'
import { IconButton, Avatar } from '@material-ui/core'
import SidebarChat from './SidebarChat'
import db from './firebase'
import { useStateValue } from './StateProvider'

function Sidebar() {
  const [{ user }, dispatch] = useStateValue()
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(querySnapshot => (
      setRooms(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name
        })
      ))
    ));

    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms && rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
