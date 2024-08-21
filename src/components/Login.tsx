
import  guitar from '../assets/loginEntryPointPost (1).webp'
import phone from '../assets/phone.png'
import google from '../assets/google.png'

import { signInWithPopup } from 'firebase/auth'
import {auth,googleProvider} from '../firebase/Setup'
import { useState } from 'react'
import LoginUser from './LoginUser';
import { Link } from 'react-router-dom';

interface popupProps{
    Setloginpopup:any
}


const Login = (props:popupProps) => {

    const googleSignin= async ()=>{
        try{
           await signInWithPopup(auth,googleProvider)
        }catch(err){
            console.log(err)
        }
    }


  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

    <div className="fixed inset-0 bg-zinc-950  bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
       
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:w-96 sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <h1  onClick={()=>props?.Setloginpopup(false)} className=' cursor-pointer font font-semibold text-3xl'>X</h1>
            <div className="sm:flex sm:items-start">
          
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className="mt-2">
                    <img src={guitar} className='w-20 h-20 ml-32' />
                  <p className="text-base font-medium mt-5 text-center">Help us became one of the safest places <br/> to buy and sell.</p>
                </div>
                <div className='flex border-2 border-black p-2 rounded-md mt-12'>
                    <img src={phone} className='w-6 h-6' />
                    <h1 className='font-semibold ml-3'>Continue with phone</h1>
                </div>
                <div onClick={googleSignin} className='flex border-2 border-gray-300 p-2 rounded-md mt-9'>
                    <img src={google} className='w-6 h-6' />
                    <h1 className='font-semibold ml-20'>Continue with google</h1>
                </div>
                <h1 className='text-center mt-4 cursor-pointer'>OR</h1>
                <Link to="/login-user" className="text-center mt-4 underline cursor-pointer block">
                    Login with Email
                  </Link>                <h1 className='text-center mt-28 text-xs'>All your personal details are safe with us.</h1>
                <h1 className='text-center mt-4 text-xs'>If you continue, you are accepting <span className='text-blue-600'>OLX Terms and <br/>Conditions and Privacy Policy</span></h1>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Login