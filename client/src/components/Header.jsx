import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Header = () => {

    const {userData} = useContext(AppContext) ;

  return (
    <div className='flex items-center justify-center min-h-screen text-center bg-gradient-to-br from-blue-200 to-purple-400'>
  
     <div  className='border border-blue-900 rounded-lg px-10 py-5  '>     
         <h2 className='text-4xl font-bold text-indigo-500 mt-5'> Welcome, {userData ? userData.name :'Developer'} ! </h2>
        <h2 className='text-xl font-semibold mt-5'> Hey , This is  a practice project for Authorization.. </h2>
        <h2 className='text-3xl font-semibold mt-5'> Try It</h2>
     </div>
  
    </div>


    // <div className='relative h-screen'>
    // <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>

    //     <p className='gap-5 text-3xl sm:text-3xl px-[75px] justify-centre mb-[30px]'> Welcome Man </p>
    //     <p className='font-bold'> Hii, This is  a practice project for Authorization </p>
    //     <p className='px-[35px] mt-[15px] text-xl font-bold' >Click on Login Button to LOGIN</p>

    // </div>

    // </div>
  )
}

export default Header