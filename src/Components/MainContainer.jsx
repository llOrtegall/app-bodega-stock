import './myStyles.css';
import { Sidebar } from './Sidebar'
import { WorkArea } from './WorkArea'

export function MainContainer() {
  return (
    <div className='main-container'>
      <Sidebar />
      <WorkArea />
    </div>
  )
}