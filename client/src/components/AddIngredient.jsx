
import { IngredientCard } from './IngredientCard';

export const AddIngredient = ({ingredient,setIngredient,ingredients,setIngredients}) => {

    const initialState = ({
        ingName: '',
        quantity: 0,
        unit: ''
    })
     // Maneja los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setIngredient((prev) => ({
          ...prev,
          [name]: name === 'quantity' ? Number(value) : value
        }))
    }

    const addIngredient = (e) => {
        e.preventDefault();
        if(!ingredient.ingName || !ingredient.quantity || !ingredient.unit) {
            console.log('faltan datos')
            return
        }     
        setIngredients([...ingredients, ingredient])
        setIngredient(initialState)
    }
    
    const deleteIngredient = (e, indexEliminar) => {
        e.preventDefault();
        setIngredients(ingredients.filter((_, index) => index !== indexEliminar));
    }

  return (
    <div className='flex gap-5 mt-8'>
        
        <div className='w-1/2 bg-gray-100 p-4 rounded-lg shadow-inner'>

            <label className='block mb-2 font-medium'>Nombre</label>
            <input 
                className="border rounded w-full p-2 mb-4 bg-white"
                type="text" 
                name='ingName'
                placeholder='Nombre del ingrediente' 
                value={ingredient.ingName} 
                onChange={(e) => handleChange(e)} 
            />

            <label className='block mb-2 font-medium'>Cantidad</label>
            <input 
                className="border rounded w-full p-2 mb-4 bg-white"
                type="number"
                placeholder='Cantidad' 
                name='quantity'
                value={ingredient.quantity} 
                onChange={(e) => handleChange(e)} 
            />

            <label className='block mb-2 font-medium'>Unidad</label>
            <select 
                className='w-full p-2 rounded mb-4 border bg-white'
                value={ingredient.unit} 
                name='unit'
                onChange={(e) => handleChange(e)}>
                <option value="" disabled>--Unidad--</option>
                <option value="gr">gr</option>
                <option value="ml">ml</option>
                <option value="tzas">taza</option>
                <option value="uds">unidad</option>
                <option value="cdas">cucharada</option>
            </select>

            <button
                onClick={addIngredient}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >Agregar ingrediente
            </button>
        </div >

        <div className='w-1/2 bg-gray-100 p-4 rounded-lg shadow-inner '>
            <div className='overflow-y-scroll h-70'>
            {
            ingredients.map((ingredient, index) =>(
                <IngredientCard
                key={index}
                nombre={ingredient.ingName}
                cantidad={ingredient.quantity}
                unidad={ingredient.unit}
                deleteIngredient={(e) => deleteIngredient(e, index)}
                />
            ))
            }
            </div>
        </div>
    </div>
  )
}
