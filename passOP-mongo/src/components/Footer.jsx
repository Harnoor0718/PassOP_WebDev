import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center'>
         <div className="logo font-bold text-2xl ">
            <span className='text-green-700'>  &lt; </span>
            Pass
            <span className='text-green-500'>OP/ &gt; </span>
          
        </div>
        <div className='flex gap-2 justify-center items-center'>

        Created with <img className = "w-6" src='icons/heart.png' alt=''/> by Harnoor
        </div>
    </div>
  )
}

export default Footer