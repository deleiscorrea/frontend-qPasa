import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Chat from './Pages/Chat/Chat'
import Info from './Pages/Info/Info'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import CreateContact from './Pages/CreateContact/CreateContact'
import Contacts from './Pages/Contacts/Contacts'
import DetailContact from './Pages/DetailContact/DetailContact'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/reset-password/:reset_token' element={<ResetPassword/>} />
      {/* <Route element={<ProtectedRoute/>}> */}
        <Route path='/home' element={<Home/>} />
        <Route path='/contacts' element={<Contacts/>} />
        <Route path='/contacts/:contacto_id' element={<DetailContact/>} />
        <Route path='/contacts/new' element={<CreateContact/>} />
        <Route path='/chat/:contacto_id' element={<Chat/>} />
        <Route path='/info/:contacto_id' element={<Info/>} />
      {/* </Route> */}
    </Routes>
  )
}

export default App