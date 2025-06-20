

export const IngredientCard = ({ nombre, cantidad, unidad, deleteIngredient }) => {
    return (
        <div className="flex justify-between w-full gap-1.5 bg-white shadow-md rounded-xl p-4 mb-3">
          <h3 className="font-bold text-md">{nombre}</h3>
          <p>{cantidad} {unidad}</p>
          <button className="bg-red-500 text-white py-1 px-2 rounded-md"
            onClick={deleteIngredient}
          >X</button>    
        </div>
      );
}
