import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Chat from './Pages/Chat/Chat'
import Info from './Pages/Info/Info'
import IA from './Pages/IA/IA'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/chat/:contacto_id' element={<Chat/>} />
      <Route path='/info/:contacto_id' element={<Info/>} />
      <Route path='/ia' element={<IA/>} />
    </Routes>
  )
}

export default App