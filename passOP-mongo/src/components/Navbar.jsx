import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>

        <div className='container px-40 py-16 mx-auto flex justify-between items-center px-4 py-5 h-4 '>

        <div className="logo font-bold text-2xl">
            <span className='text-green-700'>  &lt; </span>
            Pass
            <span className='text-green-500'>OP/ &gt; </span>
          
        </div>
        
        <button className='text-white bg-green-700 my-2 rounded-full flex gap-2 justify-between items-center '>
          <img className = 'invert w-8 p-1'src='icons/github.svg' alt='github'/>
          {/* <span className='font-bold px-2'>GitHub</span> */}
        </button>

        </div>
    </nav>
  )
}

export default Navbar