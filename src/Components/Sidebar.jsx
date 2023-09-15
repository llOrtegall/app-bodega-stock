import './mystyles.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { PersonAdd } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { GroupAdd } from '@mui/icons-material';
import { Nightlight } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { ConversationsItem } from './ConversationsItem';
import { useState } from 'react'

export function Sidebar() {

  const [conversation, setConversation] = useState([
    {
      _id: 1,
      name: "Test 1",
      lastMessage: "Last message",
      timeStamp: "today"
    },
    {
      _id: 2,
      name: "Test 2",
      lastMessage: "Last message",
      timeStamp: "today"
    },
    {
      _id: 3,
      name: "Test 2",
      lastMessage: "Last message",
      timeStamp: "today"
    },
  ]);

  console.log(setConversation);

  return (
    <section className="sidebar-container">
      <div className='sb-header'>
        <div>
          <IconButton >
            <AccountCircleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton >
            <PersonAdd />
          </IconButton>
          <IconButton >
            <GroupAdd />
          </IconButton>
          <IconButton >
            <Nightlight />
          </IconButton>
        </div>
      </div>

      <div className='sb-search'>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input type="text" placeholder='search' className='search-box' />
      </div>

      <div className='sb-conversations'>
        {conversation.map((items => {
          return <ConversationsItem key={items._id} props={items} />
        }))}
      </div>
    </section>
  )
}