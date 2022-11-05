import { Routes,Route,Navigate } from 'react-router-dom'
import Email from './components/Email'
import Sms from './components/Sms'
import Table from './components/Table'
import Home from './components/Home'
const Router = ()=>{
    return(
        <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/smsSender' element={<Sms />} />
          <Route path='/emailSender' element={<Email />} />
          <Route path='/logo' element={<Navigate to="/" replace />} />
        </Routes>
        </>
    )
}

export default Router