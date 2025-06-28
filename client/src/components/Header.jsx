
import React from 'react'

export const Header = () => {
  return (
    <header className='w-full py-8 px-5 bg-green-300 flex justify-between items-center fixed top-0 left-0 right-0 z-10 shadow-md'>

      <h1 className='text-5xl font-bold text-white'>MIReceta</h1>

      <div className='flex'>
          
          <button className='capitalize hover:bg-emerald-700 hover:text-white rounded-lg p-2 font-black hover:cursor-pointer transition-all duration-300'
          >agregar receta
          </button>
          <button className='capitalize hover:bg-emerald-700 hover:text-white rounded-lg p-2 font-black hover:cursor-pointer transition-all duration-300'
          >cerrar sesion
          </button>
        </div>
    </header>

  )
}
