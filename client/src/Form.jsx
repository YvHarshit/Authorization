import React from 'react'

function Form() {
  return (
    <div>
        
        <form  className='m-[30px] p-[30px] flex flex-col w-[300px] h-[450px] bg-green-300 gap-[20px]' onSubmit={}>
            
 
        <label>Name : </label> <input className="p-[8px] border border-solid rounded-sm"  type="text" placeholder='Enter Your Name' id="name"></input>

        <label>Email : </label> <input className="p-[8px] border border-solid rounded-sm" type="text" placeholder='Enter Your Email' id="name"></input>
        
        <label>Password : </label> <input className="p-[8px] border border-solid rounded-sm" type="password" placeholder='Enter Your password' id="name"></input>

        <button className='bg-green-600 mt-[20px] rounded-sm h-[45px] hover:scale-102'>Submit</button>
        


        </form>
    </div>
  )
}

export default Form