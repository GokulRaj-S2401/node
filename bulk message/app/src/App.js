import './App.css'
import { NavLink } from 'react-router-dom'

import Router from './Router'
const App = () =>{
  return(
    <>
      <header>
        <NavLink to="/logo" className='brand' >SenderQ</NavLink>
        <nav>
          <ul>
            <li>
            <NavLink 
          className={({isActive})=>isActive? 'navActive':'nav' }
          to="/emailSender" >Email Sender</NavLink>
            </li>
            <li>
            <NavLink
          className={({isActive})=>isActive? 'navActive':'nav' }
          to="/smsSender" > SMS Sender </NavLink>
            </li>
          </ul> 
        </nav>
      </header>
        <Router />
    </>
  )
}


export default App