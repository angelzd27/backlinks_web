import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './authPages/Login'
import Recovery from './authPages/Recovery'

const Auth = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Navigate to='/auth/login' />} />
            <Route path='/login' element={<Login />} />
            <Route path='/recovery' element={<Recovery />} />
            <Route path='/*' element={<Navigate to='/not-found' />} />
        </Routes>
    </>
  )
}

export default Auth