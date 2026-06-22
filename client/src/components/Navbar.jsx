import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from "axios"

const Navbar = () => {

    const navigate = useNavigate()

    const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContext)

    const logout = async () => {
      try {
        axios.defaults.withCredentials = true ;

        const {data} = await axios.post(backendUrl + '/api/auth/logout') ;
        data.success && setIsLoggedin(false)
        data.success && setUserData(false)
        navigate('/')

      } catch (error) {
        toast.error(error.message) ;
        
      }
    }


    const sendVerificationOtp = async () => {
      try {
        axios.defaults.withCredentials = true ;

        const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp') ;

        if(data.success) {
          navigate('/email-verify')
          toast.success(data.message)
        }
        else {
          toast.error(data.message)
        }
        
      } catch (error) {
        toast.error(error.message)        
      }
    }



  return (
    <div className='w-full  flex justify-between item-center p-4 sm:p-6 sm:px-24 absolute top-0 bg-gradient-to-br from-blue-200 to-purple-400'>
        <h3 className='w-28 sm:w-32 text-xl font-bold'> Auth Practice</h3>


        {userData ? 
        <div className='w-12 h-12 text-2xl font-semibold flex justify-center items-center rounded-full text-white relative bg-slate-900 relative group'>
          {userData.name[0].toUpperCase()}

          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black text-sm rounded pt-15'>
            <ul className='list-none m-0 p-2 bg-gray-100'>
              {!userData.isAccountVerified && 
              <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'> Verify Email</li> }
              
              <li onClick={logout}
              className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'> LogOut</li>
            </ul>

          </div>  
           
           </div> 
        :
        <button onClick={()=> navigate('/login')}
         className='flex item-centre gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer'> Login </button>
        
         }
    </div>
  )
}

export default Navbar