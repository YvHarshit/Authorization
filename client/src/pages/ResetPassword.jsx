import React from 'react'

const ResetPassword = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'> 
    
    <form className='bg-slate-900 p-8 rounded-lg  text-sm'>

      <h1 className='text-white text-3xl font-semibold text-center mb-4'> Reset Password </h1>
        <p className='text-indigo-300 text-md font-semibold text-center mb-4'> Enter Your Registered Email-Id</p>

           <div className='mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg[#333A5C]'> 
            <label className='text-white text-lg p-2'> Email Id :  </label> 
            <input className='bg-gray-200 outline-none text-lg text-black rounded-lg p-2' type='email' placeholder='Email Id' /> 
           </div>
        

    </form>
    
     </div>
  )
}

export default ResetPassword