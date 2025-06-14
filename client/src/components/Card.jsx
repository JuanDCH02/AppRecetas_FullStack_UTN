

export const Card = ({name, category}) => {
  return (
    <div className='bg-emerald-100 max-w-sm p-2 rounded-lg shadow-md hover:shadow-2xl hover:scale-101 transition-all duration-300'>
        <div className=' flex justify-center'>
            <img src="../../public/espaguetis-con-crema-de-queso.jpg" alt="foto de la receta" />
        </div>
        <div className='p-2 text-center'>
            <h3 className='text-2xl font-bold capitalize border-b-2 border-emerald-500'>{name}</h3>
            <p className=''>{category}</p>
        </div>
        <a className='bg-emerald-500 hover:bg-emerald-700 text-white font-semibold p-2 rounded-2xl mx-auto block w-1/2 text-center transition-all duration-300'
            href="#">Ver receta
        </a>
    </div>
  )
}
