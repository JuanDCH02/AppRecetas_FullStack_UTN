
export const createReceta = async (formData) => {
  const response = await fetch('http://localhost:3000/recetas', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Error al crear la receta api front');
  return await response.json();
};
