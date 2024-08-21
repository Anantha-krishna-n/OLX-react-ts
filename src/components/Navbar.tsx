import React, { useState } from 'react'
import olx from '../assets/olx-logo.png'
import { FaSearch,FaChevronDown  } from 'react-icons/fa'
import Login from './Login'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';



const Navbar = () => {
    const { user, loginWithGoogle, logout } = useAuth();
    const [loginPopup,Setloginpopup]=useState<boolean>(false)
    const navigate = useNavigate();
  return (
   <>
   <div className='flex p-4 items-center bg-slate-100 shadow-md'>
<Link to ='/'>
    <img src={olx} alt="OLX Logo" className='w-11 h-9 mx-3' />
</Link>

    <div className="relative flex items-center border-2 border-black w-64 p-2 bg-white">
      <FaSearch className='w-8 h-7 text-gray-600' />
      <input
        type="text"
        placeholder="Location..."
        className="flex-1 pl-2 pr-10 border-none outline-none"
      />
      <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 w-6 h-6" />
    </div>

    <div className='relative flex items-center h-12 ml-6 border-black bg-white'>
        <input 
          type="text" 
          placeholder='Find Cars, Mobile Phones and more' 
          className='pl-10 pr-14 border border-black outline-none'
          style={{ width: '46rem',height:'45px' }}         />
        <FaSearch  
          className='absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black w-10 h-11 p-2 ' 
          />
      </div>
      <div className='flex items-center h-12 ml-6 cursor-pointer underline hover:no-underline'>
          {user ? (
            <h1 className='font-bold text-lg flex items-center'>
              Profile<FaChevronDown className='ml-2 text-lg' />
            </h1>
          ) : (
            <Link to="/signup" className='font-bold text-lg flex items-center'>
            Signup<FaChevronDown className='ml-2 text-lg' />
          </Link>
          )}
        </div>
    <div className='relative flex items-center h-12 ml-6 cursor-pointer underline hover:no-underline'>
          {user ? (
            <h1 onClick={logout} className='font-bold text-lg ml-3'>Logout</h1>
          ) : (
            <h1 onClick={() => Setloginpopup(!loginPopup)} className='font-bold text-lg ml-3'>Login</h1>
          )}
        </div>
    <div onClick={() => navigate('/sell')} className='flex items-center h-12 ml-6 cursor-pointer'>
        <div 
          style={{
            position: 'relative',
            padding: '3px',
            borderRadius: '8px',
            background: 'linear-gradient(to right, yellow 50%, blue 50%)',
            backgroundClip: 'border-box',
            display: 'inline-block'
          }}
        >
          <h1 
            style={{
              backgroundColor: 'white',
              padding: '0px',
              borderRadius: '8px',
              margin: 0,
              height:'30px',
              width:'95px',

            }}
            className='font-bold text-lg'
          >
          +    Sell
          </h1>
        </div>
      </div>
  </div>
  {loginPopup &&  <Login  Setloginpopup={Setloginpopup}/>}
   </>
  )
}

export default Navbar