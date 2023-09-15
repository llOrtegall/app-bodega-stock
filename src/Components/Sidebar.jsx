import './mystyles.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { PersonAdd } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { GroupAdd } from '@mui/icons-material';
import { Nightlight } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { ConversationsItem } from './ConversationsItem';

export function Sidebar() {
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
        <ConversationsItem />
      </div>
    </section>
  )
}