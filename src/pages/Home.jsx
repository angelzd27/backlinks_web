import React from 'react'
import Sidebar from '../components/Sidebar'
import Searcher from './homePages/Searcher'
import Users from './homePages/Users'
import Account from './homePages/Account'
import { expiredJWT } from '../services/jwt'
import { Navigate, Route, Routes } from 'react-router-dom'
import Settings from './homePages/Settings'
import Contacts from './homePages/Contacts'
import Websites from './homePages/Websites'

const Home = () => {
    return (
      <>
        {
          expiredJWT() ? (<Navigate to="/auth/login" />) : (
            <div>
              <div className='flex min-h-screen bg-slate-50'>
                <Sidebar />
                <div className='bg-gradient-to-r from-blue-50 from-10% via-[#F5F6FA] via-30% to-[#E4E5FD] to-90% w-full xl:ml-64'>
                  <Routes>
                    <Route path='/' element={<Searcher />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/contacts' element={<Contacts />} />
                    <Route path='/websites' element={<Websites />} />
                    <Route path='/*' element={<Navigate to='/not-found' />} />
                  </Routes>
                </div>
              </div>
            </div>
          )
        }
      </>
    )
  }

export default Home