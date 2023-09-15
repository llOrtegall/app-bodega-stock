import { IconButton } from '@mui/material';
import './myStyles.css';
import { Delete } from '@mui/icons-material';
import { Send } from '@mui/icons-material';
import { MessageSelf } from './MessageSelf';
import { MessageOthers } from './MessageOthers';

export function ChatArea({ name, timeStamp }) {
  return (
    <div className='chatArea-container'>

      <div className='chatArea-header'>
        <p className='con-icon'>{name[0]}</p>
        <div className='header-text'>
          <p className='con-title'>{name}</p>
          <p className='con-timeStamp'>{timeStamp}</p>
        </div>
        <IconButton>
          <Delete />
        </IconButton>
      </div>

      <div className='message-container'>
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
      </div>

      <div className='text-input-area'>
        <input placeholder='Type a message' className='search-box' />
        <IconButton>
          <Send />
        </IconButton>
      </div>

    </div >
  )
}


