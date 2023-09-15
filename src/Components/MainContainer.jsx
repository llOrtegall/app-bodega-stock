import './myStyles.css';
import { Sidebar } from './Sidebar'
import { ChatArea } from './ChatArea';

export function MainContainer() {


  const item = {
    _id: 1,
    name: "Test 1",
    lastMessage: "Last message 1",
    timeStamp: "today"
  }


  return (
    <div className='main-container'>
      <Sidebar />
      <ChatArea name={item.name} timeStamp={item.timeStamp} />
    </div>
  )
}