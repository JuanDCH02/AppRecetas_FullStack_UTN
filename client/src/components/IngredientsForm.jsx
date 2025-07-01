import { useState } from 'react'
import { AddIngredient } from './AddIngredient'
import axios from 'axios'

export const IngredientsForm = ({onAddRecipe, onUpdateRecipe, setAddRecipe, recipeSelected}) => {

    //manejo de los errores
    const [errorMsg, setErrorMsg] = useState('');
    //estado de la imagen
    const [imageFile, setImageFile] = useState(recipeSelected?.imageFile || null);
    //estado general de mi receta
   const [recipe, setRecipe]= useState({
        name:recipeSelected?.name || '',
        category:recipeSelected?.category || '',
        time:recipeSelected?.time || 0,
        portions:recipeSelected?.portions || 0,
        preparation:recipeSelected?.preparation || '',
   })
   const initialState = ({
        name:'',
        category:'',
        time:0,
        portions:0,
        preparation:'',
   })
   //listado de ingredientes
    const [ingredients, setIngredients] = useState(recipeSelected?.ingredients || []);
    //estado del ingrediente actual
    const [ingredient, setIngredient] = useState({
        ingName: '',
        quantity: 0,
        unit: ''
    })

    // Maneja los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe((prev) => ({
          ...prev,
          [name]: name === 'time'|| name === 'portions' ? Number(value) : value
        }))
    }
    //controlo que esten los campos llenos y un minimo de ingredientes
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipe.name || !recipe.category || !recipe.preparation) {
        setErrorMsg('faltan datos de la receta');
        return;
    }
    if (!imageFile && !recipeSelected) {
        setErrorMsg('falta la imagen');
        return;
    }   
    if (ingredients.length < 2) {
      setErrorMsg('faltan ingredientes');
      return;
    }
    try {
        const formData = new FormData();
        formData.append('name', recipe.name)
        formData.append('category', recipe.category)
        formData.append('time', recipe.time)
        formData.append('portions', recipe.portions)
        formData.append('preparation', recipe.preparation)
        if (imageFile) {
            formData.append('image', imageFile);
        } else if (recipeSelected?.imageUrl) {
            formData.append('imageUrl', recipeSelected.imageUrl);
        }
        formData.append('ingredients', JSON.stringify(ingredients));
        console.log([...formData.entries()]);
        let res;
        //EDITO LA RECETA
        if(recipeSelected){
            res = await axios.put(`http://localhost:3000/recetas/${recipeSelected._id}`, formData);
            console.log('receta actualizada', res.data)
            onUpdateRecipe(res.data)
        } else{
            //CREO LA RECETA
            res  = await axios.post('http://localhost:3000/recetas', formData);
            console.log('Receta creada:', res.data);
            onAddRecipe(res.data) 
        }
        //cierro modal y borro los errores
        setErrorMsg('')
        setAddRecipe(false)
    }   catch (error) {
        console.error('Error al guardar receta:', error)
        setErrorMsg('Error al crear receta');
        }
        finally{
        // Limpiar formularios
        setRecipe(initialState)
        setIngredients([])
        setImageFile(null)
        }
    };

  return (
    <div className='flex flex-col items-center justify-center mx-2 '>
        
        <form className='my-10 p-10 bg-amber-50 max-w-4xl mx-auto border rounded-lg space-y-4 group'
        onSubmit={(e) => handleSubmit(e)}>
            {errorMsg && (
            <div className="bg-red-100 text-red-800 p-2 rounded mb-3">
                {errorMsg}
            </div>
            )}  
            <div className='flex flex-col-1 lg:flex-col-2 items-center justify-center gap-2'>
                
                <label className='font-semibold '
                >Nombre de la receta:
                </label>
                <input className='border p-1 rounded-md border-gray-500 bg-white' 
                    placeholder='Pasta con queso' 
                    type="text" name='name'
                    value={recipe.name}
                    onChange={(e)=> handleChange(e)}
                />
                <label className='font-semibold'
                    >Categoria de la receta:
                </label>
                <select className='border p-1 rounded-md border-gray-500 bg-white'
                    name='category'
                    value={recipe.category}
                    onChange={(e)=> handleChange(e)}
                >
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
                <input className='border p-1 rounded-md border-gray-500 bg-white' 
                    type="number" name='time'
                    placeholder='30' 
                    value={recipe.time}
                    onChange={(e)=> handleChange(e)}
                />
                <label className='font-semibold'
                    >Cantidad de porciones:
                </label>
                <input className='border p-1 rounded-md border-gray-500 bg-white' 
                    type="number" name='portions'
                    placeholder='4'
                    value={recipe.portions}
                    onChange={(e)=> handleChange(e)}
                />
            </div>
            <div className='flex items-center gap-2 justify-center'>
                <label htmlFor="image" className='font-semibold'
                    >Imagen:
                </label>
                <input type="file"
                    className='border p-1 rounded-md border-gray-500 bg-white'
                    id='image' name='image'
                    accept='image/*'
                    onChange={(e) => setImageFile(e.target.files[0])}
                 />
                {recipeSelected?.imageUrl && !imageFile && (
                    <img
                      src={`http://localhost:3000/uploads/${recipeSelected.imageUrl}`}
                      alt="imagen actual"
                      className="w-32 h-24 object-cover rounded-md mb-2"
                    />
                )}
            </div>

            <div className='flex flex-col items-center justify-center gap-2 '>
                <h3 className='font-semibold'
                    >Ingredientes:
                </h3>
            </div>

            <AddIngredient
                ingredient={ingredient}
                setIngredient={setIngredient}
                ingredients={ingredients}
                setIngredients={setIngredients}
            />

            <div>
                <label htmlFor="preparation" className='mb-2 font-medium'
                    >Preparacion:
                </label>
                <textarea name="preparation" id="preparation" value={recipe.preparation}
                    onChange={(e)=> handleChange(e)}
                    placeholder='remover ingredientes, etc...'
                    className='block w-full border p-4 rounded-md border-gray-500 bg-white '>
                    
                </textarea>
            </div>

            <input type="submit" 
                className=" group-hover:opacity-100 transition-all duration-300 w-full hover:bg-emerald-700 hover:text-white font-medium rounded-lg text-md px-5 py-2.5 text-center"
                value={'Guardar Receta'}
            />
           
        </form>
    </div>
  )
}
