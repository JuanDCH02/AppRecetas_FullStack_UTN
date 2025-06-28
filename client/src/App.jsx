import { Header } from './components/Header'
import { Card } from './components/Card'
import { Footer } from './components/Footer'
import { LoginForm } from './components/LoginForm'
import { IngredientsForm } from './components/IngredientsForm'
import { ShowRecipe } from './components/ShowRecipe'
import {Modal} from './components/Modal'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);

  const cerrarModal = () => setRecetaSeleccionada(null);

  //hago el llamado a mi db y cargo todas las recetas
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios('http://localhost:3000/recetas');
        setRecipes(res.data);
      } catch (error) {
        console.error('Error al obtener recetas:', error);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
  console.log('Receta seleccionada:', recetaSeleccionada);
  }, [recetaSeleccionada]);


  return (
    <>
      <div className='mt-40'>
        <Header />
      </div>

      <div className='flex justify-around my-10 p-3 bg-amber-100 max-w-4xl mx-auto'>
        <h2 className='text-3xl text-center font-black '
          >Recetas 
        </h2>
        <select name="filter"
          className='border p-1 rounded-md border-gray-500 bg-white'
          value={filter}
          onChange={e => setFilter(e.target.value)}>
          <option value="">--Todas--</option>
          <option value="pastas">Pastas</option>
          <option value="dessert">Postres</option>
          <option value="veggie">Veganos</option>
        </select>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
        gap-4 max-w-6xl mx-auto items-center justify-center'>
        {(filter? recipes.filter(receta => receta.category === filter)
          : recipes
          ).map(recipe => (
            <Card key={recipe._id}
              {...recipe}
              onview={() => setRecetaSeleccionada(recipe)}
             />
          ))}
      </div>
      {recetaSeleccionada && (
        <Modal onClose={cerrarModal}>
          <ShowRecipe recipe={recetaSeleccionada} />
        </Modal>
      )}

        {/* 
      <ShowRecipe 
      recipe={recipes[0]}
      />*/}
      <LoginForm />
      <IngredientsForm />
      <Footer />
    </>
  )  
}

export default App
