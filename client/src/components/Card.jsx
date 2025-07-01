import axios from 'axios'

export const Card = ({ _id, name, category, time, portions, imageUrl, onView, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro que deseas eliminar esta receta?')) {
      try {
        await axios.delete(`http://localhost:3000/recetas/${_id}`)
        alert('Receta eliminada');
        onDelete(_id)
      } catch (error) {
        alert('error al eliminar la receta')
        console.log(error)
      }
    }
  };

  return (
    <div className='bg-emerald-100 max-w-sm h-110 p-2 rounded-lg shadow-md hover:shadow-2xl hover:scale-101 transition-all duration-300'>
      <div className='flex justify-center'>
        <img
          className='rounded-lg object-cover h-56 w-full'
          src={`http://localhost:3000/uploads/${imageUrl}`}
          alt={`Foto de la receta ${name}`}
        />
      </div>
      <div className='p-2 text-center'>
        <h3 className='text-2xl font-bold capitalize border-b-2 border-emerald-500'>{name}</h3>
        <p className='text-gray-700 capitalize'>{category}</p>
        <p className='text-sm text-gray-600'>⏱️ {time} min | 🍽️ {portions} porciones</p>
      </div>
      <button
          className='bg-emerald-500 hover:bg-emerald-700 text-white font-semibold p-2 rounded-2xl mx-auto block w-1/2 text-center transition-all duration-300'
          onClick={() => {
            onView();
          }}
        >Ver receta
      </button>
      <div className="flex items-center justify-center gap-2">
        <button
            className="my-2 bg-yellow-500 hover:bg-yellow-200 text-white font-semibold p-2 rounded-2xl w-1/2 text-center transition-all duration-300"
          >editar
        </button>
        <button
            className="my-2 bg-red-500 hover:bg-red-200 text-white font-semibold p-2 rounded-2xl w-1/2 text-center transition-all duration-300"
            onClick={handleDelete}
          >eliminar
        </button>
      </div>
    </div>
  );
};
