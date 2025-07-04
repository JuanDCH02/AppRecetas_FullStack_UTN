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
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState()
  const [filter, setFilter] = useState('');
  const [recipeSelected, setRecipeSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [addRecipe,setAddRecipe] = useState(false)

  const cerrarModal = () => {
    setRecipeSelected(null);
    setIsEditing(false);
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(prev => prev.filter(recipe => recipe._id !== id));
  };
  const handleNewRecipe = (newRecipe) =>{
    setRecipes(prev => [...prev, newRecipe])
  }
  const handleUpdateRecipe = (updatedRecipe) =>{
    setRecipes(prev => prev.map(r => 
      updatedRecipe._id === r._id? updatedRecipe: r
    ))
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
    }
  }, [user]);

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

  //Si no está autenticado mostramos el login
  if (!isAuth) {
    return (
    <>
      <Header
        setIsAuth={setIsAuth} 
      />
      <LoginForm
        setUser={setUser}
      />
    </>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER + FILTROS */}
      <div className="mt-40">
        <Header setAddRecipe={setAddRecipe} setIsAuth={setIsAuth} />
      </div>
  
      <div className="flex justify-between items-center my-10 px-6 py-3 bg-amber-100 w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-black">Recetas</h2>
        <select
          name="filter"
          className="border p-2 rounded-md border-gray-500 bg-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">--Todas--</option>
          <option value="pastas">Pastas</option>
          <option value="postres">Postres</option>
          <option value="veganos">Veganos</option>
        </select>
      </div>
  
      {/* MAIN contenido dinámico */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
        gap-4 max-w-6xl mx-auto items-center justify-center flex-1">
        {recipes.length === 0 && (
          <p className='text-center text-2xl font-bold'>No hay recetas</p>
        )}
        {(filter ? recipes.filter((r) => r.category === filter) : recipes).map(
          (recipe) => (
            <Card
              key={recipe._id}
              recipe={recipe}
              onView={() => {
                setRecipeSelected(recipe);
                setIsEditing(false);
              }}
              onDelete={handleDeleteRecipe}
              onEdit={() => {
                setRecipeSelected(recipe);
                setIsEditing(true);
              }}
            />
          )
        )}
      </main>
  
      {/* MODAL mostrar recetas */}
      {recipeSelected && !isEditing && (
        <Modal onClose={cerrarModal}>
          <ShowRecipe recipe={recipeSelected} />
        </Modal>
      )}

      {/* FORMULARIO para agregar recetas */}
      {addRecipe && (
       
        <Modal onClose={() => setAddRecipe(false)}>
          <IngredientsForm
            setAddRecipe={setAddRecipe}
            onAddRecipe={handleNewRecipe}
            onUpdateRecipe={handleUpdateRecipe}
          />
        </Modal>
      )}

      {/* FORMULARIO para editar recetas */}
      {recipeSelected && isEditing && (
        <Modal onClose={cerrarModal}>
          <IngredientsForm
            onAddRecipe={handleNewRecipe}
            onUpdateRecipe={handleUpdateRecipe}
            setAddRecipe={setAddRecipe}
            recipeSelected={recipeSelected}
          />
        </Modal>
      )}
  
      {/* FOOTER */}
      <Footer />
    </div>
  )
    
}

export default App
