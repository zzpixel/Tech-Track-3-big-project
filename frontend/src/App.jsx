import { useState } from 'react'
import Signup from './assets/Signup'
import Signin from './assets/Signin'
import Home from './assets/Home'
import UserDataGet from './assets/UserDataGet'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/getstarted" element={<UserDataGet />} />
      </Routes>
    </BrowserRouter>
  )
}