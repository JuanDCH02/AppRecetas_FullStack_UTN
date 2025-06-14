import React from 'react'
import { AddIngredient } from './AddIngredient'

export const IngredientsForm = () => {

   

  return (
    <div className='flex flex-col items-center justify-center '>
        <form className='my-10 p-10 bg-amber-50 max-w-4xl mx-auto border rounded-lg space-y-4'>
            <div className='flex flex-col-1 lg:flex-col-2 items-center justify-center gap-2'>
                <label className='font-semibold '
                >Nombre de la receta:
                </label>
                <input className='border p-1 rounded-md border-gray-500 bg-white' type="text" placeholder='Pasta con queso' />
                <label className='font-semibold'
                    >Categoria de la receta:
                </label>
                <select className='border p-1 rounded-md border-gray-500 bg-white'>
                    <option value="" disabled>--Categoria--</option>
                    <option value="pastas">Pastas</option>
                    <option value="postres">Postres</option>
                    <option value="veganos">Veganos</option>
                </select>
            </div>

            <div className='flex flex-col-1 lg:flex-col-2 items-center justify-center gap-2'>
                <label className='font-semibold'
                    >Tiempo de preparacion:
                </label>
                <input className='border p-1 rounded-md border-gray-500 bg-white' type="number" placeholder='30' />
                <label className='font-semibold'
                    >Cantidad de porciones:
                </label>
                <input className='border p-1 rounded-md border-gray-500 bg-white' type="number" placeholder='4' />
            </div>

            <div className='flex flex-col items-center justify-center gap-2 '>
                <h3 className='font-semibold'
                    >Ingredientes:
                </h3>
            </div>

            <AddIngredient/>

            

            
            
        </form>
    </div>
  )
}
