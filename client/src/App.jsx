import { Header } from './components/Header'
import { Card } from './components/card'
import { Footer } from './components/Footer'
import { LoginForm } from './components/LoginForm'
import { IngredientsForm } from './components/IngredientsForm'
import { useEffect, useState } from 'react'


function App() {
  const [recipes, setRecipes] = useState([]);

  //hago el llamado a mi db y cargo todas las recetas
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/recetas');
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error al obtener recetas:', error);
      }
    };
  
    fetchRecipes();
  }, []);

  //las divido por categoria
  const recetasPastas = recipes.filter(r => r.category === 'pastas');
  const recetasPostres = recipes.filter(r => r.category === 'dessert');
  const recetasVeganas = recipes.filter(r => r.category === 'veggie');

  return (
    <>
      <div className='mt-40'>
        <Header />
      </div>


     <h2 className='text-3xl text-center font-black my-10 p-3 bg-amber-100 max-w-4xl mx-auto'
        >Todas Las Recetas
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
      gap-4 max-w-6xl mx-auto items-center justify-center'>
        {recipes.map(receta => (
        <Card key={receta._id} name={receta.name} category={receta.category} />
      ))}
      </div>
      

      <h2 className='text-3xl text-center font-black my-10 p-3 bg-amber-100 max-w-4xl mx-auto'
        >Seccion de Pastas
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
      gap-4 max-w-6xl mx-auto items-center justify-center'>
        {recetasPastas.map(receta => (
          <Card key={receta._id} name={receta.name} category={receta.category} />
        ))}

      </div>
      
      <h2 className='text-3xl text-center font-black my-10 p-3 bg-amber-100 max-w-4xl mx-auto'
        >Seccion de Postres
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
      gap-4 max-w-6xl mx-auto items-center justify-center'>
        {recetasPostres.map(receta => (
          <Card key={receta._id} name={receta.name} category={receta.category} />
        ))}

      </div>

      <h2 className='text-3xl text-center font-black my-10 p-3 bg-amber-100 max-w-4xl mx-auto'
        >Seccion de Veganos
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
      gap-4 max-w-6xl mx-auto items-center justify-center'>
        {recetasVeganas.map(receta => (
          <Card key={receta._id} name={receta.name} category={receta.category} />
        ))}

      </div>
      <LoginForm />
      <IngredientsForm />
      <Footer />
    </>
  )  
}

export default App
