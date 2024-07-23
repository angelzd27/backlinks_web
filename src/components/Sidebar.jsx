import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdMenu, MdMenuOpen } from 'react-icons/md'
import { removeJWT } from '../services/jwt';
import Swal from "sweetalert2";

const Sidebar = () => {
  const location = useLocation()

  const [showMenu, setShowMenu] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [navLinks] = useState([{ icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", name: "Searcher", page: "/" }, { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", name: "Websites", page: "websites" }, { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", name: "Contacts", page: "contacts" }, { icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", name: "Users", page: "users" },])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <div className={` h-screen fixed shadow-md xl:left-0 w-min shadow-gray-600 z-10 transition-all duration-400 ${showMenu ? 'left-0' : '-left-full'}`}>
        <div className="flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
          <div className="flex flex-row items-center justify-between h-14 mb-5 mx-5">
            <div className='flex flex-row justify-center items-center'>
              <h3 className='font-semibold text-3xl'>Welcome</h3>
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow border-t">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className=" font-light tracking-wide text-gray-500">Menu</div>
                </div>
              </li>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    key={link.page}
                    to={link.page}
                    className={`relative flex flex-row items-center h-11 focus:outline-none border-l-4 pr-6 ${location.pathname === `/home${link.page}` ? 'border-okip-500 hover:border-okip-600 bg-gray-50 text-gray-800 font-semibold' : 'border-transparent hover:border-okip-500 hover:bg-gray-50 text-gray-600 hover:text-gray-800'}`}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon}></path></svg>
                    </span>
                    <span className="ml-2 text-lg tracking-wide truncate">{link.name}</span>
                  </Link>
                </li>
              ))}
              <li className="px-5 pt-5 border-t">
                <div className="flex flex-row items-center h-8">
                  <div className="font-light tracking-wide text-gray-500">Others</div>
                </div>
              </li>
              {/* <li>
                <Link to="/account" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-okip-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </span>
                  <span className="ml-2 text-lg tracking-wide truncate">Profile</span>
                </Link>
              </li> */}
              <li>
                <Link to="/settings" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-okip-500 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </span>
                  <span className="ml-2 text-lg tracking-wide truncate">Settings</span>
                </Link>
              </li>
              <li>
                <Link to="/auth/">
                  <button className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-okip-500 pr-6" onClick={() => {
                    removeJWT()
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Logging out',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }}>
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </span>
                    <span className="ml-2 text-lg tracking-wide truncate">Logout</span>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {
        windowWidth < 1280 ?
          <button
            className='fixed right-4 bottom-4 text-2xl bg-primary-900 p-3 rounded-full z-20 text-yummy-800'
            onClick={() => { setShowMenu(!showMenu) }}>
            {
              showMenu ? <MdMenuOpen /> : <MdMenu />
            }
          </button >
          :
          <></>
      }
    </>
  )
}

export default Sidebar