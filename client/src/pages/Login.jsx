import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from "axios" ;
import { toast } from 'react-toastify';

const Login = () => {

    const Navigate = useNavigate()

    const {backendUrl, setIsLoggedin} = useContext(AppContext)

    const [state , setState] = useState('Sign-up')

    const [name , setName] = useState('') ;
    const [email , setEmail] = useState('') ;
    const [password , setPassword] = useState('') ;

    const onSubmitHandler = async(e) => {
        try {
            e.preventDefault() ;

            axios.defaults.withCredentials = true ; 

            if(state === 'Sign-up') {
               const {data} =  await axios.post(backendUrl + '/api/auth/register', {name, email,password}) 

               if(data.success) {
                setIsLoggedin(true)
                Navigate('/') ;
               }
               else {
                // alert(data.message) ;
                toast.error(data.message)
            }

            }
            else {
                const {data} =  await axios.post(backendUrl + '/api/auth/login', {email,password}) 

               if(data.success) {
                setIsLoggedin(true)
                Navigate('/') ;
               }
               else {
                // alert(data.message) ;
                toast.error(data.message)
            }
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

    


  return (

    <>
    <div className=' h-[50px] bg-gradient-to-br from-purple-4000 to-blue-200'>
        

    <button onClick={()=>Navigate('/')}
        className='border border-blue-500 rounded-full w-24 bg-gradient-to-br from-blue-200 to-purple-400 m-[10px]'> Go to home </button>
    </div>

    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>

        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-1/4 text-indigo-300 text-lg '>
    
            <h2 className='text-3xl font-semibold text-white text-center mb-3'> {state === 'Sign-up' ? "Create Account" : "Login !"} </h2>
    
            <p className='text-sm font-semibold text-center mb-3 text-blue-400'> {state === 'Sign-up' ? "Create Your Account" : "Login to your account !"} </p>

            <form onSubmit={onSubmitHandler}>

                {
                state === 'Sign-up' &&  
                (<div className='mb-5 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A5c]'> 
                    <label className='text-white w-30'> Full Name : </label> 
                    <input onChange={(e)=> setName(e.target.value)} value={name}
                           className='text-gray-100  rounded-full px-5' type='text' placeholder='Enter Name' /> </div> )}

                

                <div className='mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A5c]'> 
                    <label  className='text-white w-30'> Email : </label> 
                    <input onChange={(e)=> setEmail(e.target.value)} value = {email}
                           className='text-gray-100  rounded-full px-5' type='text' placeholder='Enter Email' /> </div>

                <div className='mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A5c]'> 
                    <label className='text-white w-30'> Password : </label> 
                    <input onChange={(e)=> setPassword(e.target.value)} value = {password}
                           className='text-gray-100 rounded-full px-5' type='password' placeholder='Enter Password' /> </div>


                <p onClick={() => Navigate('/reset-password')}
                   className='mb-4 text-sm cursor-pointer'> Forget Password ?</p>

                <button className='w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-md'> {state} </button>
                
            </form>   
            

            {state === 'Sign-up' ? 

            (<p className='mt-4 text-center text-sm text-white'> Already Have an Account ?{'    '}
                <span onClick={() => setState('Login')} 
                className='cursor-pointer underline text-blue-400'> Login Here .</span>
                </p>) : 

            (    <p className='mt-4 text-center text-sm text-white'> Don't Have an Account ?{'    '}
                <span onClick={() => setState('Sign-up')}
                className='cursor-pointer underline text-blue-400'> Sign-Up Here .</span>
            </p>) } 

            

            
    
        </div>        
    </div>
    </>
  )
}

export default Login