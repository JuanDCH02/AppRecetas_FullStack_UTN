import React, { useState } from 'react'
import { IngredientCard } from './IngredientCard';

export const AddIngredient = () => {

    const [ingredientes, setIngredientes] = useState([]);
    const [nombreIng, setNombreIng] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [unidad, setUnidad] = useState('');

    const agregarIngrediente = (e) => {
        e.preventDefault();
        if(!nombreIng || !cantidad || !unidad) {
            console.log('faltan datos')
            return
        }     
        setIngredientes([
            ...ingredientes,
            {nombreIng, cantidad, unidad}
        ])
        setCantidad('')
        setUnidad('')
        setNombreIng('')
    }
    const eliminarIngrediente = (e, indexEliminar) => {
        e.preventDefault();
        setIngredientes(ingredientes.filter((_, index) => index !== indexEliminar));
    }

  return (
    <div className='flex gap-5 mt-8'>
        
        <div className='w-1/2 bg-gray-100 p-4 rounded-lg shadow-inner'>

            <label className='block mb-2 font-medium'>Nombre</label>
            <input 
                className="border rounded w-full p-2 mb-4 bg-white"
                type="text" 
                placeholder='Nombre del ingrediente' 
                value={nombreIng} 
                onChange={(e) => setNombreIng(e.target.value)} 
            />

            <label className='block mb-2 font-medium'>Cantidad</label>
            <input 
                className="border rounded w-full p-2 mb-4 bg-white"
                type="number"
                placeholder='Cantidad' 
                value={cantidad} 
                onChange={(e) => setCantidad(e.target.value)} 
            />

            <label className='block mb-2 font-medium'>Unidad</label>
            <select 
                className='w-full p-2 rounded mb-4 border bg-white'
                value={unidad} 
                onChange={(e) => setUnidad(e.target.value)}>
                <option value="" disabled>--Unidad--</option>
                <option value="gr">gr</option>
                <option value="ml">ml</option>
                <option value="taza">taza</option>
            </select>

            <button
                onClick={agregarIngrediente}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >Agregar ingrediente
            </button>
        </div >

        <div className='w-1/2 bg-gray-100 p-4 rounded-lg shadow-inner'>
            <div className='block '>
            {
                ingredientes.map((ingrediente, index) =>(
                    <IngredientCard
                    key={index}
                    nombre={ingrediente.nombreIng}
                    cantidad={ingrediente.cantidad}
                    unidad={ingrediente.unidad}
                    eliminarIngrediente={(e) => eliminarIngrediente(e, index)}
                    />
                ))
            }
            </div>
        </div>
    </div>
  )
}
