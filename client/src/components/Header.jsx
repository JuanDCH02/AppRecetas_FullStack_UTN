
import React from 'react'

export const Header = () => {
  return (
    <header className='w-full py-8 px-5 bg-green-300 flex justify-between items-center fixed top-0 left-0 right-0 z-10 shadow-md'>

      <h1 className='text-5xl font-bold text-white'>MIReceta</h1>

      <nav className='flex'>
        <ul 
        className='flex gap-4 font-semibold'>
          <li>
            <a href="#">Pastas</a>
          </li>
          <li>
            <a href="#">Desserts</a>
          </li>
          <li>
            <a href="#">Veggies</a>
          </li>
        </ul>      
      </nav>

      <div className='flex'>
          <button className='hover:bg-emerald-700 hover:text-white rounded-lg p-2 font-black hover:cursor-pointer transition-all duration-300'>Login</button>
          <button className='hover:bg-emerald-700 hover:text-white rounded-lg p-2 font-black hover:cursor-pointer transition-all duration-300'>Register</button>
        </div>
    </header>

  )
}
