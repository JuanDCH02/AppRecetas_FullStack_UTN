

export const ShowRecipe = ({recipe}) => {
  return (
    <div className="container max-w-5xl mx-auto my-10 p-5 border border-gray-300 rounded-lg shadow-lg bg-emerald-100">
        <div className="text-center block">
            <h2 className="text-3xl font-bold my-5 capitalize">
                {recipe.name} - {recipe.category}
            </h2>
            <p className="text-lg font-normal text-gray-700">{recipe.time} mins</p>
        </div>
        
        <div className="flex flex-col items-center">
            <img src={`http://localhost:3000/uploads/${recipe.imageUrl}`}  alt={recipe.name} 
            className=" w-sm h-sm rounded-lg mb-5" />
        </div>
        <div className="text-lg text-gray-700 text-center w-3/4 mx-auto">
            <h3 className="font-semibold mb-2">Ingredientes:</h3>
            <ul className="list-disc list-inside mb-5">
                {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.quantity} {ingredient.unit} de {ingredient.ingName}
            </li>
          ))}
            </ul>

            <h3 className="font-semibold mb-2">Instrucciones:</h3>
            <p>{recipe.preparation}</p>
        </div>
    </div>
  )
}
